import type { OntologyTerm, Profile, Resource, ResourceEdge } from "./ontology.js";

export interface ListQuery {
  kind?: string;
  status?: string;
  q?: string;
  limit?: number;
  offset?: number;
}

export class OntologyRepository {
  private readonly resources = new Map<string, Resource>();
  private readonly profiles = new Map<string, Profile>();
  private readonly terms = new Map<string, OntologyTerm>();
  private readonly edges: Array<ResourceEdge & { id: string }> = [];

  metadata() {
    return {
      name: "agent-academy-canonical-ontology",
      version: "0.1.0",
      releaseStatus: "release-candidate",
      resourceBase: true,
      profilePrimitive: true
    };
  }

  listResources(query: ListQuery = {}) {
    return this.filter(Array.from(this.resources.values()), query);
  }

  getResource(identifier: string) {
    return this.resources.get(identifier);
  }

  createResource(input: Resource) {
    if (this.resources.has(input.identifier)) throw new Error(`resource already exists: ${input.identifier}`);
    this.resources.set(input.identifier, input);
    return input;
  }

  listProfiles(query: ListQuery = {}) {
    return this.filter(Array.from(this.profiles.values()), query);
  }

  getProfile(identifier: string) {
    return this.profiles.get(identifier);
  }

  createProfile(input: Profile) {
    if (this.profiles.has(input.identifier)) throw new Error(`profile already exists: ${input.identifier}`);
    this.profiles.set(input.identifier, input);
    return input;
  }

  listTerms(query: ListQuery = {}) {
    return this.filter(Array.from(this.terms.values()), query);
  }

  createTerm(input: OntologyTerm) {
    if (this.terms.has(input.identifier)) throw new Error(`term already exists: ${input.identifier}`);
    this.terms.set(input.identifier, input);
    return input;
  }

  createEdge(input: ResourceEdge) {
    if (!this.resources.has(input.from)) throw new Error(`source resource not found: ${input.from}`);
    if (!this.resources.has(input.to)) throw new Error(`target resource not found: ${input.to}`);
    const edge = { ...input, id: `resource-edge:${input.from}:${input.predicate}:${input.to}` };
    this.edges.push(edge);
    return edge;
  }

  listEdges(identifier?: string) {
    if (!identifier) return this.edges;
    return this.edges.filter((edge) => edge.from === identifier || edge.to === identifier);
  }

  private filter<T extends { identifier: string; kind?: string; status?: string; name?: string; description?: string }>(items: T[], query: ListQuery) {
    const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
    const offset = Math.max(query.offset ?? 0, 0);
    let filtered = items;
    if (query.kind) filtered = filtered.filter((item) => item.kind === query.kind);
    if (query.status) filtered = filtered.filter((item) => item.status === query.status);
    if (query.q) {
      const q = query.q.toLowerCase();
      filtered = filtered.filter((item) => [item.identifier, item.name, item.description].filter(Boolean).join(" ").toLowerCase().includes(q));
    }
    return { items: filtered.slice(offset, offset + limit), total: filtered.length, limit, offset };
  }
}
