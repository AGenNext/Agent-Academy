# Agent Academy MVP Roadmap

The MVP proves Agent Academy as an API-first university platform.

Moodle and Mahara are direct API clients.

No distribution layer.
No middleware.
No custom integration platform.

## MVP Goal

Validate one complete learner journey:

```text
Student enrolls
-> starts course in Moodle
-> launches lab
-> submits evidence
-> receives assessment
-> earns certificate
-> portfolio is updated in Mahara
```

## MVP Scope

### In Scope

- API-first Agent Academy domain model
- course catalog API
- enrollment API
- progress event API
- lab launch API
- submission API
- review decision API
- certificate issue API
- portfolio artifact API
- audit event API
- direct Moodle client integration
- direct Mahara client integration

### Out of Scope

- distribution layer
- LMS abstraction layer
- multi-LMS publishing
- heavy Moodle customization
- custom student portal
- full marketplace
- billing
- advanced analytics
- mobile app

## MVP Services

| Service | Responsibility |
|---|---|
| Identity | user and role context |
| Catalog | course, module, lesson metadata |
| Registrar | students, enrollments, transcripts |
| Learning Progress | activity and completion events |
| Lab | lab launch and workspace records |
| Assessment | submissions, rubrics, review decisions |
| Certification | certificate rules and issuance |
| Portfolio | evidence and artifact index |
| Audit | immutable event trail |

## MVP API Set

```text
GET    /api/v1/courses
GET    /api/v1/courses/{course_id}
POST   /api/v1/enrollments
GET    /api/v1/students/{student_id}/progress
POST   /api/v1/progress-events
POST   /api/v1/labs/{lab_id}/launch
POST   /api/v1/submissions
POST   /api/v1/review-decisions
POST   /api/v1/certificates/issue
POST   /api/v1/portfolio-artifacts
POST   /api/v1/audit/events
```

## MVP Data Stores

The implementation can start with a simple database schema.

Recommended tables or collections:

- people
- students
- instructors
- courses
- modules
- lessons
- labs
- enrollments
- progress_events
- lab_runs
- submissions
- evidence
- review_decisions
- grades
- certificates
- portfolio_artifacts
- audit_events

## MVP Moodle Flow

```text
1. Moodle displays Agent Academy course catalog.
2. Student enrolls.
3. Moodle calls POST /api/v1/enrollments.
4. Student opens course.
5. Moodle records progress through POST /api/v1/progress-events.
6. Student clicks Launch Lab.
7. Moodle calls POST /api/v1/labs/{lab_id}/launch.
8. Agent Academy provisions or requests workspace from AGenNext Platform.
9. Moodle redirects student to workspace URL.
10. Student submits assignment.
11. Moodle calls POST /api/v1/submissions.
12. Reviewer grades or evaluator runs.
13. Agent Academy records decision.
14. Moodle displays grade and feedback.
```

## MVP Mahara Flow

```text
1. Student completes project or capstone.
2. Evidence is submitted to Agent Academy.
3. Agent Academy creates portfolio artifact metadata.
4. Mahara displays the portfolio artifact.
5. Student adds reflection.
6. Mahara posts reflection metadata to Portfolio API.
7. Reviewer endorses artifact.
8. Agent Academy updates skill record and certificate evidence.
```

## MVP Success Criteria

The MVP is successful when:

- Moodle can display at least one Agent Academy course.
- Moodle can enroll one student through Agent Academy API.
- Moodle can launch one lab through Agent Academy API.
- A submission can be recorded.
- A review decision can be recorded.
- A certificate can be issued.
- A portfolio artifact can be created and surfaced in Mahara.
- All key actions emit audit events.

## Release Checklist

- [ ] API docs created
- [ ] sample course loaded
- [ ] sample student created
- [ ] sample Moodle integration path documented
- [ ] sample Mahara integration path documented
- [ ] audit events emitted
- [ ] README explains Agent Academy as system of record
- [ ] security notes documented
- [ ] demo journey documented

## Next After MVP

After the MVP works, add:

1. organization and cohort support
2. enterprise reports
3. certification verification page
4. marketplace listings
5. analytics dashboards
6. additional course platforms only if needed
