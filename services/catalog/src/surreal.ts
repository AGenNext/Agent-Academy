import type { Course, CreateCourseInput, PatchCourseInput } from "./schema.js";
import { CourseSchema } from "./schema.js";
import type { CourseListQuery, CourseListResult } from "./repository.js";

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

const now = () => new Date().toISOString();

function escapeString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function normalizeIdentifier(identifier: string): string {
  return identifier.replace(/^course:/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
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

    if (!last) {
      throw new Error("SurrealDB returned no result");
    }

    if (last.status === "ERR") {
      throw new Error(last.detail ?? "SurrealDB query failed");
    }

    return last.result;
  }
}

export class SurrealCourseRepository {
  constructor(private readonly client: SurrealHttpClient) {}

  async list(query: CourseListQuery = {}): Promise<CourseListResult> {
    const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
    const offset = Math.max(query.offset ?? 0, 0);
    const where: string[] = [];

    if (query.status) {
      where.push(`data.agennext.status = '${escapeString(query.status)}'`);
    }

    if (query.educationalLevel) {
      where.push(`string::lowercase(<string> data.educationalLevel) = '${escapeString(query.educationalLevel.toLowerCase())}'`);
    }

    if (query.provider) {
      where.push(`string::contains(string::lowercase(data.provider.name), '${escapeString(query.provider.toLowerCase())}')`);
    }

    if (query.tag) {
      where.push(`'${escapeString(query.tag)}' IN data.agennext.tags`);
    }

    if (query.q) {
      const q = escapeString(query.q.toLowerCase());
      where.push(`string::contains(string::lowercase(data.name + ' ' + data.description + ' ' + data.courseCode + ' ' + data.agennext.slug), '${q}')`);
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const rows = await this.client.query<Array<{ data: Course }>>(
      `SELECT data FROM course ${whereClause} ORDER BY data.courseCode LIMIT ${limit} START ${offset};`
    );
    const countRows = await this.client.query<Array<{ count: number }>>(
      `SELECT count() FROM course ${whereClause} GROUP ALL;`
    );

    const items = rows.map((row) => CourseSchema.parse(row.data));
    return {
      items,
      total: countRows[0]?.count ?? items.length,
      limit,
      offset
    };
  }

  async get(identifier: string): Promise<Course | undefined> {
    const id = normalizeIdentifier(identifier);
    const direct = await this.client.query<Array<{ data: Course }>>(`SELECT data FROM course:${id};`);
    const directCourse = direct[0]?.data;

    if (directCourse) {
      return CourseSchema.parse(directCourse);
    }

    const slug = escapeString(identifier);
    const rows = await this.client.query<Array<{ data: Course }>>(
      `SELECT data FROM course WHERE data.identifier = '${slug}' OR data.agennext.slug = '${slug}' LIMIT 1;`
    );
    return rows[0]?.data ? CourseSchema.parse(rows[0].data) : undefined;
  }

  async create(input: CreateCourseInput): Promise<Course> {
    const id = normalizeIdentifier(input.identifier);
    const course = CourseSchema.parse({
      ...input,
      dateCreated: now(),
      dateModified: now()
    });

    const json = JSON.stringify(course);
    const result = await this.client.query<Array<{ data: Course }>>(
      `CREATE course:${id} CONTENT { data: ${json} } RETURN data;`
    );

    return CourseSchema.parse(result[0]?.data ?? course);
  }

  async patch(identifier: string, patch: PatchCourseInput): Promise<Course> {
    const existing = await this.get(identifier);
    if (!existing) {
      throw new Error(`course not found: ${identifier}`);
    }

    const id = normalizeIdentifier(existing.identifier);
    const updated = CourseSchema.parse({
      ...existing,
      ...patch,
      agennext: {
        ...existing.agennext,
        ...(patch.agennext ?? {})
      },
      dateModified: now()
    });

    const result = await this.client.query<Array<{ data: Course }>>(
      `UPDATE course:${id} CONTENT { data: ${JSON.stringify(updated)} } RETURN data;`
    );

    return CourseSchema.parse(result[0]?.data ?? updated);
  }
}

export function surrealConfigFromEnv(): SurrealConfig | undefined {
  const endpoint = process.env.SURREALDB_ENDPOINT;
  const namespace = process.env.SURREALDB_NAMESPACE;
  const database = process.env.SURREALDB_DATABASE;
  const username = process.env.SURREALDB_USERNAME;
  const password = process.env.SURREALDB_PASSWORD;

  if (!endpoint || !namespace || !database || !username || !password) {
    return undefined;
  }

  return { endpoint, namespace, database, username, password };
}
