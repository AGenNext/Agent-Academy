# Agent Academy API

Agent Academy is API-first.

External applications such as Moodle, Mahara, Open edX, Udemy, partner portals, enterprise portals, and mobile apps consume Agent Academy APIs. They do not own the Academy domain.

## API Principles

1. Agent Academy is the system of record.
2. Every external application is a client.
3. APIs expose capabilities, not implementation details.
4. Business logic stays in Agent Academy services.
5. Clients may render, collect, and notify, but canonical records stay in Agent Academy.
6. Every important action emits an audit event.
7. Every integration must be identity-aware and permission-aware.

## API Groups

| API Group | Purpose |
|---|---|
| Identity API | people, roles, authentication context |
| Institution API | academy, schools, departments, terms, policies |
| Catalog API | programs, courses, modules, lessons, resources |
| Learning Path API | role-based and certification-based paths |
| Registrar API | students, enrollments, cohorts, transcripts |
| Assessment API | assessments, submissions, rubrics, evaluation |
| Grade API | grades, decisions, feedback |
| Certification API | certificates, badges, verification, renewals |
| Portfolio API | artifacts, evidence, skills, showcases |
| Lab API | lab launch, workspace provisioning, lab runs |
| Organization API | enterprise customers, partners, teams, seats |
| Marketplace API | courses, skills, templates, paid/private offerings |
| Analytics API | learning events, platform events, reports |
| Audit API | immutable operational and academic evidence |

## Base Path

```text
/api/v1
```

## Resource Naming

Use plural nouns.

```text
/schools
/programs
/courses
/students
/enrollments
/assessments
/certificates
/portfolio-artifacts
/labs
/organizations
```

## API Ownership

| Capability | API Owner | Example Clients |
|---|---|---|
| course catalog | Catalog API | Moodle, docs site, partner portal |
| enrollment | Registrar API | Moodle, enterprise portal |
| transcript | Registrar API | Moodle, student portal |
| portfolio evidence | Portfolio API | Mahara, student portal |
| certificate | Certification API | Moodle, public verify page |
| lab launch | Lab API | Moodle, Agent IDE, Agent Builder |
| organization reports | Organization API + Analytics API | enterprise portal |
| assessment | Assessment API | Moodle, evaluator service |

## Standard Resource Fields

All core resources should include:

```json
{
  "id": "string",
  "type": "string",
  "status": "draft|active|archived",
  "created_at": "ISO-8601 datetime",
  "updated_at": "ISO-8601 datetime",
  "created_by": "person id",
  "updated_by": "person id",
  "version": "string"
}
```

## Standard Response Envelope

```json
{
  "data": {},
  "meta": {
    "request_id": "string",
    "version": "v1"
  }
}
```

## Error Envelope

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  },
  "meta": {
    "request_id": "string"
  }
}
```

## Authentication

API clients should use OAuth2/OIDC or signed service credentials.

Human identity should be carried through requests where possible.

```text
External Client -> Agent Academy API -> Service -> Audit Event
```

## Authorization

Every write requires role and scope checks.

Example roles:

- student
- instructor
- reviewer
- mentor
- registrar
- administrator
- organization_admin
- partner_admin
- service_account

## Audit Events

Every mutation should emit an audit event.

Examples:

- student.enrolled
- course.published
- lab.launched
- assignment.submitted
- assessment.graded
- certificate.issued
- portfolio.artifact.created
- organization.report.generated

## Integration Position

Moodle and Mahara integrate directly with Agent Academy APIs.

There is no distribution layer in v1.

```text
Moodle -> Agent Academy APIs
Mahara -> Agent Academy APIs
Agent Academy APIs -> AGenNext Platform
```

## v1 API Goal

The v1 API should support one end-to-end journey:

```text
Student enrolls -> starts course -> launches lab -> submits evidence -> receives grade -> earns certificate -> portfolio updated
```
