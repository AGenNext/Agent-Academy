import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { OntologyTermSchema, ProfileSchema, ResourceEdgeSchema, ResourceSchema } from "./ontology.js";
import { OntologyRepository } from "./ontology-repository.js";

export async function registerOntologyRoutes(app: FastifyInstance, repository = new OntologyRepository()) {
  const QuerySchema = z.object({
    kind: z.string().optional(),
    status: z.string().optional(),
    q: z.string().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    offset: z.coerce.number().int().nonnegative().optional()
  });

  app.get("/api/v1/ontology", async (request) => ({ data: repository.metadata(), meta: { request_id: request.id, version: "v1" } }));

  app.get("/api/v1/ontology/terms", async (request) => {
    const result = repository.listTerms(QuerySchema.parse(request.query));
    return { data: result.items, meta: { request_id: request.id, version: "v1", total: result.total, limit: result.limit, offset: result.offset } };
  });

  app.post("/api/v1/ontology/terms", async (request, reply) => {
    try {
      const created = repository.createTerm(OntologyTermSchema.parse(request.body));
      return reply.status(201).send({ data: created, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(409).send({ error: { code: "ontology_term.conflict", message: error instanceof Error ? error.message : "Ontology term conflict" }, meta: { request_id: request.id } });
    }
  });

  app.get("/api/v1/resources", async (request) => {
    const result = repository.listResources(QuerySchema.parse(request.query));
    return { data: result.items, meta: { request_id: request.id, version: "v1", total: result.total, limit: result.limit, offset: result.offset } };
  });

  app.post("/api/v1/resources", async (request, reply) => {
    try {
      const created = repository.createResource(ResourceSchema.parse(request.body));
      return reply.status(201).send({ data: created, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(409).send({ error: { code: "resource.conflict", message: error instanceof Error ? error.message : "Resource conflict" }, meta: { request_id: request.id } });
    }
  });

  app.get("/api/v1/resources/:identifier", async (request, reply) => {
    const { identifier } = z.object({ identifier: z.string().min(1) }).parse(request.params);
    const item = repository.getResource(identifier);
    if (!item) return reply.status(404).send({ error: { code: "resource.not_found", message: `Resource not found: ${identifier}` }, meta: { request_id: request.id } });
    return { data: item, meta: { request_id: request.id, version: "v1" } };
  });

  app.get("/api/v1/profiles", async (request) => {
    const result = repository.listProfiles(QuerySchema.parse(request.query));
    return { data: result.items, meta: { request_id: request.id, version: "v1", total: result.total, limit: result.limit, offset: result.offset } };
  });

  app.post("/api/v1/profiles", async (request, reply) => {
    try {
      const created = repository.createProfile(ProfileSchema.parse(request.body));
      return reply.status(201).send({ data: created, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(409).send({ error: { code: "profile.conflict", message: error instanceof Error ? error.message : "Profile conflict" }, meta: { request_id: request.id } });
    }
  });

  app.post("/api/v1/graph/resources", async (request, reply) => {
    try {
      const created = repository.createEdge(ResourceEdgeSchema.parse(request.body));
      return reply.status(201).send({ data: created, meta: { request_id: request.id, version: "v1" } });
    } catch (error) {
      return reply.status(400).send({ error: { code: "resource_edge.invalid", message: error instanceof Error ? error.message : "Invalid resource edge" }, meta: { request_id: request.id } });
    }
  });

  app.get("/api/v1/graph/resources", async (request) => {
    const query = z.object({ resource: z.string().optional() }).parse(request.query);
    const items = repository.listEdges(query.resource);
    return { data: items, meta: { request_id: request.id, version: "v1", total: items.length } };
  });
}
