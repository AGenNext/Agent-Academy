import { describe, expect, it } from "vitest";
import { buildServer } from "./server.js";

const app = buildServer();

describe("Courses API", () => {
  it("lists schema.org Course resources", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/courses" });
    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]["@context"]).toBe("https://schema.org");
    expect(body.data[0]["@type"]).toBe("Course");
    expect(body.data[0].courseCode).toBeTruthy();
    expect(body.meta.total).toBeGreaterThan(0);
  });

  it("retrieves a course by slug", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/courses/claude-as-a-course" });
    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(body.data.name).toContain("Claude");
    expect(body.data.syllabusSections.length).toBeGreaterThan(0);
    expect(body.data.hasCourseInstance.length).toBeGreaterThan(0);
  });

  it("filters courses by tag", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/courses?tag=claude" });
    expect(response.statusCode).toBe(200);

    const body = response.json();
    expect(body.data.length).toBe(1);
    expect(body.data[0].agennext.tags).toContain("claude");
  });

  it("rejects invalid course payloads", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/courses",
      payload: {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Missing required fields"
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("validation.failed");
  });

  it("creates a valid schema.org-aligned course", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/courses",
      payload: {
        "@context": "https://schema.org",
        "@type": "Course",
        "@id": "urn:agennext:academy:course:test-course",
        identifier: "course:test-course",
        name: "Test Course",
        description: "A test course for validating the courses API.",
        courseCode: "AA-TST-100",
        provider: {
          "@type": "Organization",
          name: "AGenNext Agent Academy"
        },
        educationalLevel: "Beginner",
        learningResourceType: "Course",
        teaches: ["API validation"],
        agennext: {
          slug: "test-course",
          status: "draft",
          visibility: "private",
          schools: [],
          programs: [],
          tags: ["test"],
          version: "0.1.0"
        }
      }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json().data.identifier).toBe("course:test-course");
  });
});
