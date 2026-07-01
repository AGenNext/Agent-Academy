# Courses Module

The Courses module is the first implemented Agent Academy API module.

It follows the platform rule:

```text
Agent Academy is the system of record.
External applications are clients.
```

## Canonical Type

The canonical course type is:

```text
https://schema.org/Course
```

Agent Academy stores and returns Course resources as JSON-LD.

## Why This Matters

A course must be portable across Moodle, Mahara, Open edX, Udemy, partner portals, enterprise portals, and future clients.

If the course is modeled only as a Moodle record, it becomes trapped inside Moodle.

If it is modeled as a canonical `schema.org/Course`, every platform can consume the same semantic course definition.

## Implemented Course Properties

| Agent Academy Field | Schema.org Field | Purpose |
|---|---|---|
| `@context` | `@context` | JSON-LD context |
| `@type` | `Course` | canonical type |
| `@id` | `@id` | stable semantic identifier |
| `identifier` | `identifier` | system identifier |
| `name` | `name` | course title |
| `description` | `description` | course description |
| `courseCode` | `courseCode` | provider course code |
| `provider` | `provider` | academy organization |
| `creator` | `creator` | creator of course content |
| `author` | `author` | course author |
| `maintainer` | `maintainer` | course maintainer |
| `inLanguage` | `inLanguage` | course language |
| `availableLanguage` | `availableLanguage` | available learner languages |
| `educationalLevel` | `educationalLevel` | beginner, intermediate, advanced, etc. |
| `learningResourceType` | `learningResourceType` | course, lab, project, etc. |
| `educationalUse` | `educationalUse` | instruction, assignment, lab, certification preparation |
| `teaches` | `teaches` | learning outcomes |
| `assesses` | `assesses` | assessed competencies |
| `competencyRequired` | `competencyRequired` | required competencies |
| `coursePrerequisites` | `coursePrerequisites` | course prerequisites |
| `educationalCredentialAwarded` | `educationalCredentialAwarded` | certificate or credential awarded |
| `occupationalCredentialAwarded` | `occupationalCredentialAwarded` | occupational credential awarded |
| `numberOfCredits` | `numberOfCredits` | academy credits |
| `syllabusSections` | `syllabusSections` | module or syllabus sections |
| `hasCourseInstance` | `hasCourseInstance` | specific offering or cohort |
| `about` | `about` | subject matter |
| `keywords` | `keywords` | search and discovery keywords |
| `isAccessibleForFree` | `isAccessibleForFree` | free-access flag |
| `offers` | `offers` | offer or pricing metadata |
| `license` | `license` | content license |
| `creativeWorkStatus` | `creativeWorkStatus` | draft, published, archived, deprecated |
| `dateCreated` | `dateCreated` | creation date |
| `dateModified` | `dateModified` | modification date |
| `datePublished` | `datePublished` | publication date |
| `totalHistoricalEnrollment` | `totalHistoricalEnrollment` | historical enrollment count |

## Agent Academy Extension

The platform-specific extension lives under `agennext`:

```json
{
  "agennext": {
    "slug": "claude-as-a-course",
    "status": "active",
    "visibility": "public",
    "schools": ["School of AI Platforms"],
    "programs": ["Agent Engineer"],
    "tags": ["claude", "mcp"],
    "version": "0.1.0"
  }
}
```

This keeps Agent Academy operational metadata separate from Schema.org fields while preserving JSON-LD compatibility.

## API Endpoints

```text
GET    /api/v1/courses
GET    /api/v1/courses/{identifier}
POST   /api/v1/courses
PATCH  /api/v1/courses/{identifier}
```

## Client Use

### Moodle

Moodle can call:

```text
GET /api/v1/courses
GET /api/v1/courses/{identifier}
```

Then render course catalog and course detail pages.

### Mahara

Mahara can reference the same Course identifiers when attaching portfolio artifacts to learning evidence.

### Future Clients

Any future platform should consume the same Course API rather than receive a platform-specific course export first.

## Next Step

Replace the in-memory repository with SurrealDB persistence and add audit events for course create and patch operations.
