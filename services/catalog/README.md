# Agent Academy Catalog Service

This service implements the first end-to-end Agent Academy Courses module.

It exposes schema.org-aligned `Course` resources through REST endpoints that Moodle, Mahara, or any future external client can consume directly.

## Why Schema.org

Agent Academy treats course content as semantic web data. A course is not only an LMS page. It is a canonical `schema.org/Course` resource with explicit metadata for provider, course code, prerequisites, credentials, syllabus sections, instances, learning outcomes, assessment outcomes, educational level, language, and status.

## Implemented Endpoints

```text
GET    /health
GET    /api/v1/courses
GET    /api/v1/courses/{identifier}
POST   /api/v1/courses
PATCH  /api/v1/courses/{identifier}
```

## Run Locally

```bash
cd services/catalog
npm install
npm run dev
```

The service starts on port `4001` by default.

## Example

```bash
curl http://localhost:4001/api/v1/courses
curl http://localhost:4001/api/v1/courses/claude-as-a-course
```

## Query Parameters

```text
q
status
educationalLevel
provider
tag
limit
offset
```

Example:

```bash
curl 'http://localhost:4001/api/v1/courses?tag=claude&status=active'
```

## Course Shape

The canonical response is JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://github.com/AGenNext/Agent-Academy/courses/claude",
  "identifier": "course:claude-as-a-course",
  "name": "Claude as a Course: Building Enterprise AI Agents",
  "courseCode": "AA-CLD-200",
  "provider": {
    "@type": "Organization",
    "name": "AGenNext Agent Academy"
  },
  "educationalLevel": "Intermediate-Advanced",
  "learningResourceType": "Course",
  "teaches": ["Claude Code workflows", "MCP", "Enterprise AI governance"],
  "syllabusSections": [],
  "hasCourseInstance": [],
  "agennext": {
    "slug": "claude-as-a-course",
    "status": "active",
    "visibility": "public",
    "schools": [],
    "programs": [],
    "tags": [],
    "version": "0.1.0"
  }
}
```

## Schema.org Alignment

Implemented core `Course` fields:

- `@context`
- `@type`
- `@id`
- `identifier`
- `name`
- `description`
- `courseCode`
- `provider`
- `creator`
- `author`
- `maintainer`
- `inLanguage`
- `availableLanguage`
- `educationalLevel`
- `learningResourceType`
- `educationalUse`
- `teaches`
- `assesses`
- `competencyRequired`
- `coursePrerequisites`
- `educationalCredentialAwarded`
- `occupationalCredentialAwarded`
- `numberOfCredits`
- `syllabusSections`
- `hasCourseInstance`
- `about`
- `keywords`
- `isAccessibleForFree`
- `offers`
- `license`
- `creativeWorkStatus`
- `dateCreated`
- `dateModified`
- `datePublished`
- `totalHistoricalEnrollment`

The `agennext` object carries platform-specific operational metadata without breaking JSON-LD compatibility.

## Tests

```bash
npm test
```

Tests cover:

- listing courses
- retrieving by slug
- filtering by tag
- rejecting invalid course payloads
- creating a valid schema.org-aligned course

## Production Next Steps

- Replace in-memory repository with SurrealDB persistence.
- Add authentication and scoped authorization.
- Emit audit events for create and patch.
- Add module and lesson endpoints.
- Add course import from repo course folders.
- Add Moodle read integration for course catalog.
