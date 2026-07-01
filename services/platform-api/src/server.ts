import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { PatchPrimitiveSchema, PrimitiveCatalog, PrimitiveSchema, RelationshipSchema } from "./domain.js";
import { PrimitiveRepository } from "./repository.js";
import { SurrealHttpClient, SurrealPrimitiveRepository, surrealConfigFromEnv, type PlatformRepository } from "./surreal.js";

export function buildServer(repository: PlatformRepository = new PrimitiveRepository()) {
  const app = Fastify({ logger: true });
  app.register(cors, { origin: true });

  app.get("/health", async () => ({ status: "ok", service: "agent-academy-platform-api" }));
  app.get("/ready", async () => ({ status: "ready", service: "agent-academy-platform-api" }));
  app.get("/metrics", async (_request, reply) => {
    reply.header("Content-Type", "text/plain; version=0.0.4");
    return "agent_academy_platform_api_up 1\n";
  });

  app.get("/api/v1/primitives/catalog", async (request) => ({
    data: PrimitiveCatalog,
    meta: { request_id: request.id, version: "v1" }
  }));

  app.get("/api/v1/primitives", async (request) => {
    const QuerySchema = z.object({
      kind: z.string().optional(),
      status: z.string().optional(),
      q: z.string().optional(),
      limit: z.coerce.number().int().positive().max(100).optional(),
      offset: z.coerce.number().int().nonnegative().optional()
    });
    const query = QuerySchema.parse(request.query);
    const result = await repository.list(query);
    return {
      data: result.items,
      meta: { request_id: request.id, version: "v1", total: result.total, limit: result.limit, offset: result.offset }
    };
  });

  app.post("/api/v1/primitives", async (request, reply) => {
    const input = PrimitiveSchema.parse(request.body);
    try {
      const created = await repository.create(input);
      return reply.status(201).send({ data: created, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(409).send({ error: { code: "primitive.conflict", message: error instanceof Error ? error.message : "Primitive conflict" }, meta: { request_id: request.id } });
    }
  });

  app.get("/api/v1/primitives/:identifier", async (request, reply) => {
    const Params = z.object({ identifier: z.string().min(1) });
    const { identifier } = Params.parse(request.params);
    const item = await repository.get(identifier);
    if (!item) return reply.status(404).send({ error: { code: "primitive.not_found", message: `Primitive not found: ${identifier}` }, meta: { request_id: request.id } });
    return { data: item, meta: { request_id: request.id, version: "v1" } };
  });

  app.patch("/api/v1/primitives/:identifier", async (request, reply) => {
    const Params = z.object({ identifier: z.string().min(1) });
    const { identifier } = Params.parse(request.params);
    const patch = PatchPrimitiveSchema.parse(request.body);
    try {
      const updated = await repository.patch(identifier, patch);
      return { data: updated, meta: { request_id: request.id, version: "v1" } };
    } catch (error) {
      return reply.status(404).send({ error: { code: "primitive.not_found", message: error instanceof Error ? error.message : "Primitive not found" }, meta: { request_id: request.id } });
    }
  });

  app.post("/api/v1/relationships", async (request, reply) => {
    const input = RelationshipSchema.parse(request.body);
    try {
      const relationship = await repository.relate(input);
      return reply.status(201).send({ data: relationship, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(400).send({ error: { code: "relationship.invalid", message: error instanceof Error ? error.message : "Invalid relationship" }, meta: { request_id: request.id } });
    }
  });

  app.get("/api/v1/relationships", async (request) => {
    const Query = z.object({ primitive: z.string().optional() });
    const query = Query.parse(request.query);
    const items = await repository.listRelationships(query.primitive);
    return { data: items, meta: { request_id: request.id, version: "v1", total: items.length } };
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: { code: "validation.failed", message: "Request validation failed", details: error.flatten() }, meta: { request_id: request.id } });
    }
    request.log.error(error);
    return reply.status(500).send({ error: { code: "internal.error", message: "Internal server error" }, meta: { request_id: request.id } });
  });

  return app;
}

function repositoryFromEnv(): PlatformRepository {
  const config = surrealConfigFromEnv();
  if (!config) return new PrimitiveRepository();
  return new SurrealPrimitiveRepository(new SurrealHttpClient(config));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";
  buildServer(repositoryFromEnv()).listen({ port, host }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
