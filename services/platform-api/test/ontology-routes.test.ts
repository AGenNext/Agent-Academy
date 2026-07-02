import { describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";

describe("ontology API", () => {
  it("creates resources, profiles, terms, and graph edges", async () => {
    const app = buildServer();

    const ontology = await app.inject({ method: "GET", url: "/api/v1/ontology" });
    expect(ontology.statusCode).toBe(200);

    const term = await app.inject({
      method: "POST",
      url: "/api/v1/ontology/terms",
      payload: { identifier: "term:test-skill", layer: "competency", name: "Test Skill", status: "active" }
    });
    expect(term.statusCode).toBe(201);

    const course = await app.inject({
      method: "POST",
      url: "/api/v1/resources",
      payload: { identifier: "course:test", kind: "Course", name: "Test Course", version: "0.1.0", status: "published", visibility: "public" }
    });
    expect(course.statusCode).toBe(201);

    const skill = await app.inject({
      method: "POST",
      url: "/api/v1/resources",
      payload: { identifier: "skill:test", kind: "Skill", name: "Test Skill", version: "0.1.0", status: "published", visibility: "public" }
    });
    expect(skill.statusCode).toBe(201);

    const edge = await app.inject({
      method: "POST",
      url: "/api/v1/graph/resources",
      payload: { from: "course:test", to: "skill:test", predicate: "teaches", confidence: 1 }
    });
    expect(edge.statusCode).toBe(201);

    const profile = await app.inject({
      method: "POST",
      url: "/api/v1/profiles",
      payload: { identifier: "profile:test", profileType: "LearnerProfile", subject: "identity:test", name: "Test Profile", status: "active", version: "0.1.0", components: ["skill:test"] }
    });
    expect(profile.statusCode).toBe(201);

    const list = await app.inject({ method: "GET", url: "/api/v1/resources?q=Test" });
    expect(list.statusCode).toBe(200);
    expect(list.json().meta.total).toBe(2);
  });
});
