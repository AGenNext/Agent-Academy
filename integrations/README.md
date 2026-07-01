# External Client Integrations

Agent Academy integrates directly with external applications through its APIs.

There is no distribution layer in v1.

## Integration Rule

```text
External Application -> Agent Academy API -> Agent Academy Service -> AGenNext Platform
```

External applications are clients. They should not own core Academy records.

## First Clients

| Client | Role |
|---|---|
| Moodle | LMS and learning surface |
| Mahara | portfolio and evidence surface |

Future clients may include Open edX, Udemy, Canvas, mobile apps, partner portals, enterprise portals, or custom frontends.

## Moodle Integration

Moodle is the first LMS client.

### Moodle Responsibilities

- learner dashboard
- course navigation
- lesson delivery
- assignments UI
- quizzes UI
- discussion forums
- calendar
- notifications
- teacher workflows

### Agent Academy Responsibilities

- canonical course catalog
- enrollments
- learning paths
- lab launch records
- assessment rules
- certification rules
- portfolio evidence index
- transcript records
- audit events

### Moodle -> Agent Academy Flows

#### Course Catalog

```text
Moodle requests course catalog
-> GET /api/v1/courses
-> render course list
```

#### Enrollment

```text
Student enrolls in Moodle
-> POST /api/v1/enrollments
-> Registrar creates canonical enrollment
-> Moodle displays enrollment state
```

#### Launch Lab

```text
Student clicks Launch Lab in Moodle
-> POST /api/v1/labs/{lab_id}/launch
-> Agent Academy Lab Service provisions workspace through AGenNext Platform
-> API returns launch URL
-> Moodle redirects student
```

#### Course Progress

```text
Student completes activity in Moodle
-> POST /api/v1/progress-events
-> Agent Academy updates progress and transcript context
```

#### Assessment

```text
Assignment submitted in Moodle
-> POST /api/v1/submissions
-> Assessment Service creates canonical submission
-> Reviewer or evaluator grades
-> Grade returned for Moodle display
```

#### Certificate

```text
Course completed
-> POST /api/v1/certificates/issue
-> Certification Service checks rules
-> Certificate issued or rejected
-> Moodle displays result
```

## Mahara Integration

Mahara is the first portfolio client.

### Mahara Responsibilities

- portfolio pages
- artifact presentation
- reflections
- showcase views
- learner-controlled sharing

### Agent Academy Responsibilities

- canonical evidence index
- skill records
- credential links
- reviewer endorsements
- audit records

### Mahara -> Agent Academy Flows

#### Add Artifact

```text
Learner adds portfolio artifact in Mahara
-> POST /api/v1/portfolio-artifacts
-> Agent Academy indexes artifact and links it to learner record
```

#### Add Reflection

```text
Learner writes reflection in Mahara
-> POST /api/v1/portfolio-artifacts/{artifact_id}/reflections
-> Agent Academy stores reflection metadata
```

#### Endorsement

```text
Reviewer endorses artifact
-> POST /api/v1/portfolio-artifacts/{artifact_id}/endorsements
-> Agent Academy updates skill evidence
```

## Direct Integration, No Middleware

The v1 integration is intentionally simple:

```text
Moodle -> Agent Academy APIs
Mahara -> Agent Academy APIs
```

Do not build a separate integration platform until there are multiple production clients with repeated integration logic.

## Client Responsibility Boundary

| Concern | Client Owns | Agent Academy Owns |
|---|---|---|
| UI rendering | yes | no |
| local navigation | yes | no |
| canonical course data | no | yes |
| enrollment record | no | yes |
| transcript | no | yes |
| certificate rule | no | yes |
| lab provisioning | no | yes |
| audit event | no | yes |
| portfolio presentation | yes | no |
| portfolio evidence index | no | yes |

## Authentication

External clients should authenticate with Agent Academy using:

- OAuth2/OIDC for human user context
- service credentials for system-to-system calls
- scoped tokens for specific capabilities

## Security Rule

External clients should never receive broad platform credentials.

They receive only the ability to call the Agent Academy API scopes required for their function.
