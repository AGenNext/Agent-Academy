import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { CourseRepository } from "./repository.js";
import { CreateCourseSchema, PatchCourseSchema } from "./schema.js";
import { ConsoleAuditSink, NoopAuditSink, type AuditSink } from "./audit.js";
import { SurrealCourseRepository, SurrealHttpClient, surrealConfigFromEnv } from "./surreal.js";

export interface CourseStore {
  list(query?: unknown): Promise<unknown> | unknown;
  get(identifier: string): Promise<unknown> | unknown;
  create(input: unknown): Promise<unknown> | unknown;
  patch(identifier: string, patch: unknown): Promise<unknown> | unknown;
}

export interface ServerOptions {
  repository?: CourseStore;
  audit?: AuditSink;
}

function actorFromRequest(request: { headers: Record<string, string | string[] | undefined> }): string | undefined {
  const actor = request.headers["x-agennext-actor"];
  return Array.isArray(actor) ? actor[0] : actor;
}

export function buildServer(options: ServerOptions = {}) {
  const repository = options.repository ?? new CourseRepository();
  const audit = options.audit ?? new NoopAuditSink();
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: true
  });

  app.get("/health", async () => ({ status: "ok", service: "agent-academy-catalog" }));

  app.get("/api/v1/courses", async (request, reply) => {
    const QuerySchema = z.object({
      q: z.string().optional(),
      status: z.enum(["draft", "active", "archived", "deprecated"]).optional(),
      educationalLevel: z.string().optional(),
      provider: z.string().optional(),
      tag: z.string().optional(),
      limit: z.coerce.number().int().positive().max(100).optional(),
      offset: z.coerce.number().int().nonnegative().optional()
    });

    const query = QuerySchema.parse(request.query);
    const result = await repository.list(query) as { items: unknown[]; total: number; limit: number; offset: number };

    await audit.emit({
      action: "course.listed",
      actor: actorFromRequest(request),
      resource_type: "Course",
      metadata: { query, total: result.total }
    });

    return reply.send({
      data: result.items,
      meta: {
        request_id: request.id,
        version: "v1",
        total: result.total,
        limit: result.limit,
        offset: result.offset
      }
    });
  });

  app.get("/api/v1/courses/:identifier", async (request, reply) => {
    const ParamsSchema = z.object({ identifier: z.string().min(1) });
    const { identifier } = ParamsSchema.parse(request.params);
    const course = await repository.get(identifier);

    if (!course) {
      return reply.status(404).send({
        error: {
          code: "course.not_found",
          message: `Course not found: ${identifier}`
        },
        meta: { request_id: request.id }
      });
    }

    await audit.emit({
      action: "course.read",
      actor: actorFromRequest(request),
      resource_type: "Course",
      resource_id: identifier
    });

    return reply.send({ data: course, meta: { request_id: request.id, version: "v1" } });
  });

  app.post("/api/v1/courses", async (request, reply) => {
    const input = CreateCourseSchema.parse(request.body);

    try {
      const course = await repository.create(input);
      await audit.emit({
        action: "course.created",
        actor: actorFromRequest(request),
        resource_type: "Course",
        resource_id: input.identifier,
        metadata: { courseCode: input.courseCode, slug: input.agennext.slug }
      });
      return reply.status(201).send({ data: course, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(409).send({
        error: {
          code: "course.conflict",
          message: error instanceof Error ? error.message : "Course already exists"
        },
        meta: { request_id: request.id }
      });
    }
  });

  app.patch("/api/v1/courses/:identifier", async (request, reply) => {
    const ParamsSchema = z.object({ identifier: z.string().min(1) });
    const { identifier } = ParamsSchema.parse(request.params);
    const patch = PatchCourseSchema.parse(request.body);

    try {
      const course = await repository.patch(identifier, patch);
      await audit.emit({
        action: "course.updated",
        actor: actorFromRequest(request),
        resource_type: "Course",
        resource_id: identifier,
        metadata: { fields: Object.keys(patch) }
      });
      return reply.send({ data: course, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(404).send({
        error: {
          code: "course.not_found",
          message: error instanceof Error ? error.message : "Course not found"
        },
        meta: { request_id: request.id }
      });
    }
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: {
          code: "validation.failed",
          message: "Request validation failed",
          details: error.flatten()
        },
        meta: { request_id: request.id }
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      error: {
        code: "internal.error",
        message: "Internal server error"
      },
      meta: { request_id: request.id }
    });
  });

  return app;
}

function repositoryFromEnv(): CourseStore {
  const config = surrealConfigFromEnv();
  if (!config) {
    return new CourseRepository();
  }

  return new SurrealCourseRepository(new SurrealHttpClient(config));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 4001);
  const host = process.env.HOST ?? "0.0.0.0";
  const app = buildServer({
    repository: repositoryFromEnv(),
    audit: process.env.AUDIT_SINK === "console" ? new ConsoleAuditSink() : new NoopAuditSink()
  });

  app.listen({ port, host }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
