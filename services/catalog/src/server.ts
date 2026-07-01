import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { CourseRepository } from "./repository.js";
import { CreateCourseSchema, PatchCourseSchema } from "./schema.js";

export function buildServer(repository = new CourseRepository()) {
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
    const result = repository.list(query);

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
    const course = repository.get(identifier);

    if (!course) {
      return reply.status(404).send({
        error: {
          code: "course.not_found",
          message: `Course not found: ${identifier}`
        },
        meta: { request_id: request.id }
      });
    }

    return reply.send({ data: course, meta: { request_id: request.id, version: "v1" } });
  });

  app.post("/api/v1/courses", async (request, reply) => {
    const input = CreateCourseSchema.parse(request.body);

    try {
      const course = repository.create(input);
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
      const course = repository.patch(identifier, patch);
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

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 4001);
  const host = process.env.HOST ?? "0.0.0.0";
  const app = buildServer();

  app.listen({ port, host }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
