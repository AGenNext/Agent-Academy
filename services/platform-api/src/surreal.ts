import type { PatchPrimitive, Primitive, Relationship } from "./domain.js";
import { PrimitiveSchema, RelationshipSchema } from "./domain.js";
import type { PrimitiveListQuery, PrimitiveListResult } from "./repository.js";

export interface PlatformRepository {
  list(query?: PrimitiveListQuery): Promise<PrimitiveListResult> | PrimitiveListResult;
  get(identifier: string): Promise<Primitive | undefined> | Primitive | undefined;
  create(input: Primitive): Promise<Primitive> | Primitive;
  patch(identifier: string, patch: PatchPrimitive): Promise<Primitive> | Primitive;
  relate(input: Relationship): Promise<Relationship & { id: string }> | (Relationship & { id: string });
  listRelationships(identifier?: string): Promise<Array<Relationship & { id: string }>> | Array<Relationship & { id: string }>;
}

export interface SurrealConfig {
  endpoint: string;
  namespace: string;
  database: string;
  username: string;
  password: string;
}

interface SurrealResult<T> {
  status: "OK" | "ERR";
  time: string;
  result: T;
  detail?: string;
}

function escapeString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function recordIdFromIdentifier(identifier: string): string {
  return identifier.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export class SurrealHttpClient {
  constructor(private readonly config: SurrealConfig) {}

  async query<T>(sql: string): Promise<T> {
    const response = await fetch(`${this.config.endpoint.replace(/\/$/, "")}/sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        NS: this.config.namespace,
        DB: this.config.database,
        Authorization: `Basic ${Buffer.from(`${this.config.username}:${this.config.password}`).toString("base64")}`
      },
      body: sql
    });

    if (!response.ok) {
      throw new Error(`SurrealDB HTTP error ${response.status}: ${await response.text()}`);
    }

    const results = (await response.json()) as SurrealResult<T>[];
    const last = results.at(-1);

    if (!last) throw new Error("SurrealDB returned no result");
    if (last.status === "ERR") throw new Error(last.detail ?? "SurrealDB query failed");

    return last.result;
  }
}

export class SurrealPrimitiveRepository implements PlatformRepository {
  constructor(private readonly client: SurrealHttpClient) {}

  async list(query: PrimitiveListQuery = {}): Promise<PrimitiveListResult> {
    const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
    const offset = Math.max(query.offset ?? 0, 0);
    const where: string[] = [];

    if (query.kind) where.push(`kind = '${escapeString(query.kind)}'`);
    if (query.status) where.push(`status = '${escapeString(query.status)}'`);
    if (query.q) {
      const q = escapeString(query.q.toLowerCase());
      where.push(`string::contains(string::lowercase(identifier + ' ' + name + ' ' + description), '${q}')`);
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const rows = await this.client.query<Primitive[]>(`SELECT * FROM primitive ${whereClause} ORDER BY identifier LIMIT ${limit} START ${offset};`);
    const countRows = await this.client.query<Array<{ count: number }>>(`SELECT count() FROM primitive ${whereClause} GROUP ALL;`);

    const items = rows.map((item) => PrimitiveSchema.parse(item));
    return { items, total: countRows[0]?.count ?? items.length, limit, offset };
  }

  async get(identifier: string): Promise<Primitive | undefined> {
    const id = recordIdFromIdentifier(identifier);
    const direct = await this.client.query<Primitive[]>(`SELECT * FROM primitive:${id};`);
    if (direct[0]) return PrimitiveSchema.parse(direct[0]);

    const rows = await this.client.query<Primitive[]>(`SELECT * FROM primitive WHERE identifier = '${escapeString(identifier)}' LIMIT 1;`);
    return rows[0] ? PrimitiveSchema.parse(rows[0]) : undefined;
  }

  async create(input: Primitive): Promise<Primitive> {
    const id = recordIdFromIdentifier(input.identifier);
    const existing = await this.get(input.identifier);
    if (existing) throw new Error(`primitive already exists: ${input.identifier}`);

    const result = await this.client.query<Primitive[]>(`CREATE primitive:${id} CONTENT ${JSON.stringify(input)} RETURN *;`);
    return PrimitiveSchema.parse(result[0] ?? input);
  }

  async patch(identifier: string, patch: PatchPrimitive): Promise<Primitive> {
    const existing = await this.get(identifier);
    if (!existing) throw new Error(`primitive not found: ${identifier}`);

    const id = recordIdFromIdentifier(existing.identifier);
    const updated = PrimitiveSchema.parse({
      ...existing,
      ...patch,
      data: {
        ...existing.data,
        ...(patch.data ?? {})
      }
    });

    const result = await this.client.query<Primitive[]>(`UPDATE primitive:${id} CONTENT ${JSON.stringify(updated)} RETURN *;`);
    return PrimitiveSchema.parse(result[0] ?? updated);
  }

  async relate(input: Relationship): Promise<Relationship & { id: string }> {
    const from = await this.get(input.from);
    const to = await this.get(input.to);
    if (!from) throw new Error(`source primitive not found: ${input.from}`);
    if (!to) throw new Error(`target primitive not found: ${input.to}`);

    const fromId = recordIdFromIdentifier(from.identifier);
    const toId = recordIdFromIdentifier(to.identifier);
    const edgeId = recordIdFromIdentifier(`${from.identifier}:${input.predicate}:${to.identifier}`);
    const payload = {
      predicate: input.predicate,
      source_kind: input.source_kind ?? from.kind,
      target_kind: input.target_kind ?? to.kind,
      provenance: input.provenance,
      confidence: input.confidence,
      status: input.status
    };

    const rows = await this.client.query<Array<Record<string, unknown>>>(
      `RELATE primitive:${fromId}->relationship:${edgeId}->primitive:${toId} CONTENT ${JSON.stringify(payload)} RETURN *;`
    );

    const row = rows[0] ?? payload;
    return RelationshipSchema.extend({ id: RelationshipSchema.shape.from.optional().transform(() => `relationship:${edgeId}`) }).parse({
      ...input,
      source_kind: payload.source_kind,
      target_kind: payload.target_kind,
      id: `relationship:${edgeId}`,
      ...row
    }) as Relationship & { id: string };
  }

  async listRelationships(identifier?: string): Promise<Array<Relationship & { id: string }>> {
    const where = identifier
      ? `WHERE in.identifier = '${escapeString(identifier)}' OR out.identifier = '${escapeString(identifier)}'`
      : "";
    const rows = await this.client.query<Array<Record<string, unknown>>>(`SELECT *, meta::id(id) AS id, in.identifier AS from, out.identifier AS to FROM relationship ${where};`);
    return rows.map((row) => ({
      id: String(row.id),
      from: String(row.from),
      to: String(row.to),
      predicate: String(row.predicate),
      source_kind: row.source_kind as Relationship["source_kind"],
      target_kind: row.target_kind as Relationship["target_kind"],
      provenance: row.provenance as Relationship["provenance"],
      confidence: row.confidence as Relationship["confidence"],
      status: (row.status as Relationship["status"]) ?? "active"
    }));
  }
}

export function surrealConfigFromEnv(): SurrealConfig | undefined {
  const endpoint = process.env.SURREALDB_ENDPOINT;
  const namespace = process.env.SURREALDB_NAMESPACE;
  const database = process.env.SURREALDB_DATABASE;
  const username = process.env.SURREAL_USER ?? process.env.SURREALDB_USERNAME;
  const password = process.env.SURREAL_PASS ?? process.env.SURREALDB_PASSWORD;

  if (!endpoint || !namespace || !database || !username || !password) return undefined;
  return { endpoint, namespace, database, username, password };
}
