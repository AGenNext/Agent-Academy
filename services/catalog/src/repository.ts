import { randomUUID } from "node:crypto";
import { Course, CourseSchema, CreateCourseInput, PatchCourseInput } from "./schema.js";
import { seedCourses } from "./seed.js";

export interface CourseListQuery {
  q?: string;
  status?: Course["agennext"]["status"];
  educationalLevel?: string;
  provider?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}

export interface CourseListResult {
  items: Course[];
  total: number;
  limit: number;
  offset: number;
}

const now = () => new Date().toISOString();

export class CourseRepository {
  private readonly courses = new Map<string, Course>();

  constructor(initialCourses: Course[] = seedCourses) {
    for (const course of initialCourses) {
      const parsed = CourseSchema.parse(course);
      this.courses.set(parsed.identifier, parsed);
    }
  }

  list(query: CourseListQuery = {}): CourseListResult {
    const limit = Math.min(Math.max(query.limit ?? 50, 1), 100);
    const offset = Math.max(query.offset ?? 0, 0);

    let items = Array.from(this.courses.values());

    if (query.q) {
      const q = query.q.toLowerCase();
      items = items.filter((course) => {
        const haystack = [
          course.name,
          course.description,
          course.courseCode,
          course.agennext.slug,
          ...(course.keywords ?? []),
          ...course.agennext.tags
        ].join(" ").toLowerCase();
        return haystack.includes(q);
      });
    }

    if (query.status) {
      items = items.filter((course) => course.agennext.status === query.status);
    }

    if (query.educationalLevel) {
      items = items.filter((course) => {
        const level = typeof course.educationalLevel === "string" ? course.educationalLevel : course.educationalLevel.name;
        return level.toLowerCase() === query.educationalLevel!.toLowerCase();
      });
    }

    if (query.provider) {
      items = items.filter((course) => course.provider.name.toLowerCase().includes(query.provider!.toLowerCase()));
    }

    if (query.tag) {
      items = items.filter((course) => course.agennext.tags.includes(query.tag!));
    }

    const total = items.length;
    const paged = items.slice(offset, offset + limit);
    return { items: paged, total, limit, offset };
  }

  get(identifier: string): Course | undefined {
    return this.courses.get(identifier) ?? Array.from(this.courses.values()).find((course) => course.agennext.slug === identifier);
  }

  create(input: CreateCourseInput): Course {
    if (this.courses.has(input.identifier)) {
      throw new Error(`course identifier already exists: ${input.identifier}`);
    }

    const created = CourseSchema.parse({
      ...input,
      "@id": input["@id"] || `urn:agennext:academy:course:${input.identifier || randomUUID()}`,
      dateCreated: now(),
      dateModified: now()
    });

    this.courses.set(created.identifier, created);
    return created;
  }

  patch(identifier: string, patch: PatchCourseInput): Course {
    const existing = this.get(identifier);
    if (!existing) {
      throw new Error(`course not found: ${identifier}`);
    }

    const updated = CourseSchema.parse({
      ...existing,
      ...patch,
      agennext: {
        ...existing.agennext,
        ...(patch.agennext ?? {})
      },
      dateModified: now()
    });

    this.courses.delete(existing.identifier);
    this.courses.set(updated.identifier, updated);
    return updated;
  }
}
