import type { PatchPrimitive, Primitive, Relationship } from "./domain.js";

export interface PrimitiveListQuery {
  kind?: string;
  status?: string;
  q?: string;
  limit?: number;
  offset?: number;
}

export interface PrimitiveListResult {
  items: Primitive[];
  total: number;
  limit: number;
  offset: number;
}

export class PrimitiveRepository {
  private readonly primitives = new Map<string, Primitive>();
  private readonly relationships: Array<Relationship & { id: string }> = [];

  list(query: PrimitiveListQuery = {}): PrimitiveListResult {
    const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
    const offset = Math.max(query.offset ?? 0, 0);
    let items = Array.from(this.primitives.values());

    if (query.kind) items = items.filter((item) => item.kind === query.kind);
    if (query.status) items = items.filter((item) => item.status === query.status);
    if (query.q) {
      const q = query.q.toLowerCase();
      items = items.filter((item) => [item.identifier, item.name, item.description].filter(Boolean).join(" ").toLowerCase().includes(q));
    }

    const total = items.length;
    return { items: items.slice(offset, offset + limit), total, limit, offset };
  }

  get(identifier: string): Primitive | undefined {
    return this.primitives.get(identifier);
  }

  create(input: Primitive): Primitive {
    if (this.primitives.has(input.identifier)) {
      throw new Error(`primitive already exists: ${input.identifier}`);
    }
    this.primitives.set(input.identifier, input);
    return input;
  }

  patch(identifier: string, patch: PatchPrimitive): Primitive {
    const existing = this.get(identifier);
    if (!existing) throw new Error(`primitive not found: ${identifier}`);
    const updated: Primitive = { ...existing, ...patch, data: { ...existing.data, ...(patch.data ?? {}) } };
    this.primitives.set(identifier, updated);
    return updated;
  }

  relate(input: Relationship): Relationship & { id: string } {
    if (!this.get(input.from)) throw new Error(`source primitive not found: ${input.from}`);
    if (!this.get(input.to)) throw new Error(`target primitive not found: ${input.to}`);
    const relationship = { ...input, id: `relationship:${input.from}:${input.predicate}:${input.to}` };
    this.relationships.push(relationship);
    return relationship;
  }

  listRelationships(identifier?: string): Array<Relationship & { id: string }> {
    if (!identifier) return this.relationships;
    return this.relationships.filter((edge) => edge.from === identifier || edge.to === identifier);
  }
}
