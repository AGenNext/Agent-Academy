# Agent Academy

Agent Academy is the API-first learning and certification platform for enterprise agent engineering.

It is modeled as a university-grade platform, not as an LMS implementation.

Moodle, Mahara, Open edX, Udemy, mobile apps, enterprise portals, and partner portals are external clients. Agent Academy remains the system of record for academic structure, enrollments, learning paths, transcripts, evidence, certifications, labs, organizations, and audit events.

## Core Principle

```text
Agent Academy is the system of record.
Every external application is a client.
```

## What Agent Academy Owns

- Institution model
- Schools, departments, programs, and courses
- Learning paths
- Students, instructors, reviewers, mentors, and organizations
- Enrollments and cohorts
- Progress and transcripts
- Assessments, rubrics, submissions, grades, and feedback
- Certificates, badges, renewals, and public verification
- Portfolio evidence index
- Lab launches and workspace records
- Marketplace listings
- Analytics and audit events

## External Clients

| Client | Role |
|---|---|
| Moodle | LMS and learning surface |
| Mahara | portfolio and evidence surface |
| Open edX | future learning surface if needed |
| Udemy | future distribution surface if needed |
| Enterprise Portal | organization dashboards and compliance reporting |
| Partner Portal | partner delivery and cohort management |
| Mobile App | learner experience client |

## Architecture Docs

| Document | Purpose |
|---|---|
| [Platform Architecture](./architecture/README.md) | Agent Academy as system of record and external-client architecture |
| [Domain Model](./architecture/domain-model.md) | university-grade canonical domain model |
| [API Overview](./api/README.md) | API-first principles and API groups |
| [API Resource Map](./api/resources.md) | first resource and endpoint map |
| [External Integrations](./integrations/README.md) | Moodle and Mahara as direct API clients |
| [MVP Roadmap](./roadmap/mvp.md) | first end-to-end learner journey |

## Curriculum

| Course | Title | Duration | Level |
|---|---|---|---|
| [01](./courses/01-surrealdb-foundations) | SurrealDB Foundations | 2h | Beginner |
| [02](./courses/02-agent-memory) | Agent Memory | 2h | Intermediate |
| [03](./courses/03-live-queries) | Live Queries & Real-Time Presence | 1.5h | Intermediate |
| [04](./courses/04-knowledge-graph) | Knowledge Graph with Schema.org JSON-LD | 2.5h | Intermediate |
| [05](./courses/05-digital-twins) | Digital Twin Backbone | 2h | Advanced |
| [06](./courses/06-agent-rules) | Agent Rules & Hard Governance | 2h | Advanced |
| [07](./courses/07-multi-tenancy) | Multi-tenancy & Scoped Auth | 1.5h | Advanced |
| [08](./courses/08-eval-trust) | Evaluation, Trust & Provenance | 2h | Advanced |
| [09](./courses/09-agent-skills) | Agent Skills & Blueprints | 1.5h | Intermediate |
| [10](./courses/10-finops-billing) | FinOps & Cost Attribution | 1.5h | Advanced |
| [Claude](./courses/claude) | Claude as a Course: Building Enterprise AI Agents | 8-10h / 4 weeks | Intermediate-Advanced |

## MVP Journey

The first release should prove this flow:

```text
Student enrolls
-> starts course in Moodle
-> launches lab
-> submits evidence
-> receives assessment
-> earns certificate
-> portfolio is updated in Mahara
```

## Integration Rule

For v1, integrate directly with Agent Academy APIs.

```text
Moodle -> Agent Academy APIs
Mahara -> Agent Academy APIs
Agent Academy APIs -> AGenNext Platform
```

No distribution layer. No middleware. No LMS abstraction layer until production needs prove it.

## Release Rule

Build the API first, then integrate clients.

```text
Domain Model -> API Contract -> Service -> Client Integration
```
