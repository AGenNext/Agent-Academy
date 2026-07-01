# API Resource Map

This document defines the first Agent Academy API resources.

## Institution API

```text
GET    /api/v1/academies
GET    /api/v1/academies/{academy_id}
GET    /api/v1/schools
POST   /api/v1/schools
GET    /api/v1/schools/{school_id}
PATCH  /api/v1/schools/{school_id}
GET    /api/v1/departments
POST   /api/v1/departments
GET    /api/v1/terms
POST   /api/v1/terms
GET    /api/v1/policies
POST   /api/v1/policies
```

## Catalog API

```text
GET    /api/v1/programs
POST   /api/v1/programs
GET    /api/v1/programs/{program_id}
PATCH  /api/v1/programs/{program_id}
GET    /api/v1/courses
POST   /api/v1/courses
GET    /api/v1/courses/{course_id}
PATCH  /api/v1/courses/{course_id}
GET    /api/v1/courses/{course_id}/modules
POST   /api/v1/courses/{course_id}/modules
GET    /api/v1/modules/{module_id}/lessons
POST   /api/v1/modules/{module_id}/lessons
GET    /api/v1/courses/{course_id}/resources
POST   /api/v1/courses/{course_id}/resources
```

## Learning Path API

```text
GET    /api/v1/learning-paths
POST   /api/v1/learning-paths
GET    /api/v1/learning-paths/{path_id}
PATCH  /api/v1/learning-paths/{path_id}
GET    /api/v1/learning-paths/{path_id}/requirements
POST   /api/v1/learning-paths/{path_id}/requirements
```

## Registrar API

```text
GET    /api/v1/students
POST   /api/v1/students
GET    /api/v1/students/{student_id}
PATCH  /api/v1/students/{student_id}
GET    /api/v1/instructors
POST   /api/v1/instructors
GET    /api/v1/reviewers
POST   /api/v1/reviewers
GET    /api/v1/enrollments
POST   /api/v1/enrollments
GET    /api/v1/enrollments/{enrollment_id}
PATCH  /api/v1/enrollments/{enrollment_id}
GET    /api/v1/cohorts
POST   /api/v1/cohorts
GET    /api/v1/students/{student_id}/transcript
```

## Learning Progress API

```text
GET    /api/v1/students/{student_id}/progress
POST   /api/v1/progress-events
GET    /api/v1/enrollments/{enrollment_id}/progress
PATCH  /api/v1/progress/{progress_id}
```

## Assessment API

```text
GET    /api/v1/assessments
POST   /api/v1/assessments
GET    /api/v1/assessments/{assessment_id}
PATCH  /api/v1/assessments/{assessment_id}
GET    /api/v1/assessments/{assessment_id}/rubric
POST   /api/v1/assessments/{assessment_id}/rubric
POST   /api/v1/assessment-attempts
GET    /api/v1/assessment-attempts/{attempt_id}
POST   /api/v1/submissions
GET    /api/v1/submissions/{submission_id}
POST   /api/v1/submissions/{submission_id}/evidence
POST   /api/v1/review-decisions
```

## Grade API

```text
GET    /api/v1/grades
POST   /api/v1/grades
GET    /api/v1/students/{student_id}/grades
GET    /api/v1/enrollments/{enrollment_id}/grades
POST   /api/v1/feedback
GET    /api/v1/submissions/{submission_id}/feedback
```

## Certification API

```text
GET    /api/v1/certifications
POST   /api/v1/certifications
GET    /api/v1/certifications/{certification_id}
GET    /api/v1/certifications/{certification_id}/rules
POST   /api/v1/certifications/{certification_id}/rules
POST   /api/v1/certificates/issue
GET    /api/v1/certificates/{certificate_id}
GET    /api/v1/certificates/verify/{verification_id}
POST   /api/v1/badges/issue
GET    /api/v1/students/{student_id}/badges
GET    /api/v1/students/{student_id}/certificates
```

## Portfolio API

```text
GET    /api/v1/students/{student_id}/portfolio
POST   /api/v1/portfolio-artifacts
GET    /api/v1/portfolio-artifacts/{artifact_id}
PATCH  /api/v1/portfolio-artifacts/{artifact_id}
POST   /api/v1/portfolio-artifacts/{artifact_id}/reflections
POST   /api/v1/portfolio-artifacts/{artifact_id}/endorsements
GET    /api/v1/students/{student_id}/skills
POST   /api/v1/skill-records
GET    /api/v1/showcases/{showcase_id}
POST   /api/v1/showcases
```

## Lab API

```text
GET    /api/v1/labs
POST   /api/v1/labs
GET    /api/v1/labs/{lab_id}
POST   /api/v1/labs/{lab_id}/launch
GET    /api/v1/lab-runs/{lab_run_id}
PATCH  /api/v1/lab-runs/{lab_run_id}
POST   /api/v1/workspaces
GET    /api/v1/workspaces/{workspace_id}
DELETE /api/v1/workspaces/{workspace_id}
```

## Organization API

```text
GET    /api/v1/organizations
POST   /api/v1/organizations
GET    /api/v1/organizations/{organization_id}
PATCH  /api/v1/organizations/{organization_id}
GET    /api/v1/organizations/{organization_id}/teams
POST   /api/v1/organizations/{organization_id}/teams
GET    /api/v1/organizations/{organization_id}/cohorts
POST   /api/v1/organizations/{organization_id}/cohorts
GET    /api/v1/organizations/{organization_id}/reports
POST   /api/v1/organizations/{organization_id}/seats
```

## Marketplace API

```text
GET    /api/v1/marketplace/listings
POST   /api/v1/marketplace/listings
GET    /api/v1/marketplace/listings/{listing_id}
POST   /api/v1/marketplace/listings/{listing_id}/subscribe
GET    /api/v1/marketplace/subscriptions
```

## Analytics API

```text
POST   /api/v1/analytics/events
GET    /api/v1/analytics/students/{student_id}
GET    /api/v1/analytics/courses/{course_id}
GET    /api/v1/analytics/organizations/{organization_id}
```

## Audit API

```text
POST   /api/v1/audit/events
GET    /api/v1/audit/events
GET    /api/v1/audit/events/{event_id}
```

## v1 Minimum Endpoints

For the first working release, implement only what is needed for the core journey:

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
