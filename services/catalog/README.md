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

If no SurrealDB environment variables are present, the service uses in-memory seed data.

## Run with SurrealDB

Apply the schema first:

```bash
surreal sql \
  --conn http://localhost:8000 \
  --user <user> \
  --pass <password> \
  --ns agennext \
  --db academy \
  --file surreal/schema.surql
```

Optionally apply seed data:

```bash
surreal sql \
  --conn http://localhost:8000 \
  --user <user> \
  --pass <password> \
  --ns agennext \
  --db academy \
  --file surreal/seed.surql
```

Then set:

```bash
export SURREALDB_ENDPOINT=http://localhost:8000
export SURREALDB_NAMESPACE=agennext
export SURREALDB_DATABASE=academy
export SURREALDB_USERNAME=<user>
export SURREALDB_PASSWORD=<password>
export AUDIT_SINK=console
npm run dev
```

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

## Persistence

The service supports two repository modes:

| Mode | Use |
|---|---|
| In-memory | local development and tests |
| SurrealDB HTTP | platform runtime persistence |

The runtime automatically selects SurrealDB when all `SURREALDB_*` environment variables are set.

## Audit

Set `AUDIT_SINK=console` to emit course audit events for:

- `course.listed`
- `course.read`
- `course.created`
- `course.updated`

The next production step is to persist audit events to the Agent Academy Audit API or SurrealDB `audit_event` table.

## Container

```bash
docker build -t agent-academy-catalog ./services/catalog
docker run --env-file ./services/catalog/.env.example -p 4001:4001 agent-academy-catalog
```

## Kubernetes

```bash
kubectl apply -f services/catalog/deploy/k8s.yaml
```

The manifest expects SurrealDB to be reachable through the configured service endpoint.

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

- Add authentication and scoped authorization.
- Persist audit events through the Audit API.
- Add module and lesson endpoints.
- Add course import from repo course folders.
- Add Moodle read integration for course catalog.
