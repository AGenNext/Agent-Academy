# Agent Academy Platform Architecture

Agent Academy is the platform and system of record for academy capabilities.

Moodle, Mahara, Open edX, Udemy, mobile apps, partner portals, enterprise portals, and any future learning surface are clients of Agent Academy. They are not the architecture.

## Core Principle

```text
Agent Academy is the system of record.
Every external application is a client.
```

This means:

- Agent Academy owns the canonical domain model.
- Agent Academy owns public APIs.
- Agent Academy owns academic records, enrollments, certifications, learning paths, and platform integrations.
- External systems render experiences and call Agent Academy APIs.
- Moodle can be used as the LMS surface.
- Mahara can be used as the portfolio surface.
- Both remain replaceable because they do not own the core Academy model.

## University Model

Think of Agent Academy as the university.

| University Function | Agent Academy Capability | Possible Client Surface |
|---|---|---|
| Institution | governance, policy, identity, programs | Academy Portal |
| Registrar | students, enrollments, transcripts, completions | Moodle, portal, enterprise dashboard |
| Academic Affairs | schools, departments, programs, course catalog | Moodle, docs site |
| Faculty | instructors, reviewers, mentors, cohorts | Moodle, teacher portal |
| Learning Management | lessons, assignments, gradebook views | Moodle |
| Portfolio Office | evidence, projects, capstones, reflections | Mahara |
| Certification Office | certificates, badges, renewal, verification | Moodle, portal, public verify page |
| Research Labs | hands-on labs and workspaces | Agent Platform, Agent IDE, Agent Builder |
| Career Services | portfolio, skills, badges, showcase | Mahara, career portal |
| Enterprise Programs | organizations, teams, compliance training | enterprise portal, Moodle cohorts |

## Layered Architecture

```text
External Clients
────────────────────────────────────────────
Moodle
Mahara
Open edX
Udemy
Mobile App
Partner Portal
Enterprise Portal
Custom Web Portal

                │
                ▼

Agent Academy Public APIs
────────────────────────────────────────────
Identity API
Registrar API
Catalog API
Learning Path API
Enrollment API
Assessment API
Grade API
Certification API
Portfolio API
Lab API
Organization API
Marketplace API
Analytics API

                │
                ▼

Agent Academy Services
────────────────────────────────────────────
Identity
Registrar
Catalog
Learning
Assessment
Certification
Portfolio
Labs
Organizations
Marketplace
Analytics
Audit

                │
                ▼

AGenNext Platform
────────────────────────────────────────────
Agent Platform
Agent Builder
Agent IDE
Agent Runtime
GitHub
Agent Registry
Agent Skills
Agent Evals
Agent Identity
Agent Governance
Agent Observability
```

## Boundary Rule

External applications may store local presentation state, but canonical records live in Agent Academy.

| Data | Canonical Owner |
|---|---|
| student identity | Agent Academy Identity |
| course catalog | Agent Academy Catalog |
| learning paths | Agent Academy Learning Path Service |
| enrollment record | Agent Academy Registrar |
| transcript | Agent Academy Registrar |
| certification | Agent Academy Certification Service |
| lab provisioning | Agent Academy Lab Service + AGenNext Platform |
| portfolio evidence | Agent Academy Portfolio Service, with Mahara as portfolio surface |
| grades and assessment records | Agent Academy Assessment and Grade Services |
| organization and cohort records | Agent Academy Organization Service |

## What Moodle Is

Moodle is the first LMS client and external learning surface.

It can handle:

- course delivery UI
- lesson navigation
- assignments
- quiz presentation
- discussions
- calendar
- notifications
- teacher workflows
- learner dashboard

Moodle should call Agent Academy APIs for canonical capabilities.

## What Mahara Is

Mahara is the first portfolio client.

It can handle:

- learner portfolios
- capstone showcase
- reflections
- evidence presentation
- skills profile
- shareable portfolio pages

Mahara should not be the only source of truth for achievement. Agent Academy should retain the canonical evidence index and credential records.

## What Agent Academy Owns

Agent Academy owns:

- institution model
- API contracts
- identity and roles
- course specifications
- programs and learning paths
- enrollments
- academic records
- assessments
- certifications
- portfolio evidence index
- lab launches
- organization and cohort relationships
- audit events
- analytics events

## Release-Ready Design Rule

Build the API first, then integrate clients.

```text
Domain Model -> API Contract -> Service -> Client Integration
```

Do not start by customizing Moodle. Start by defining what Agent Academy owns, then let Moodle consume it.
