# Agent Academy Domain Model

Agent Academy is modeled as a university-grade platform, not as an LMS implementation.

## Domain Groups

```text
Institution
Academic
People
Learning
Assessment
Credential
Portfolio
Enterprise
Platform
```

---

## 1. Institution Domain

The institution domain defines the Academy itself.

| Entity | Description |
|---|---|
| Academy | the institution root |
| Campus | logical or regional academy instance |
| School | major academic unit, such as School of Agent Engineering |
| Department | focused unit inside a school |
| Policy | institutional rule or governance document |
| Calendar | academic schedule, terms, events |
| Term | academic time period |

### Relationships

```text
Academy -> Campus
Academy -> School
School -> Department
Academy -> Calendar
Calendar -> Term
Academy -> Policy
```

---

## 2. Academic Domain

The academic domain defines what can be studied.

| Entity | Description |
|---|---|
| Program | structured credential path, such as Agent Engineer |
| Course | complete course unit |
| Module | major section of a course |
| Lesson | learning unit inside a module |
| Lab | hands-on activity |
| Project | practical build assignment |
| Capstone | final integrated project |
| Resource | reading, video, repository, file, or external material |

### Relationships

```text
School -> Program
Department -> Program
Program -> Course
Course -> Module
Module -> Lesson
Module -> Lab
Course -> Project
Program -> Capstone
Course -> Resource
```

---

## 3. People Domain

The people domain defines academy participants.

| Entity | Description |
|---|---|
| Person | base identity for all humans |
| Applicant | person applying to a program |
| Student | enrolled learner |
| Instructor | teaches courses |
| Teaching Assistant | assists instructors |
| Reviewer | reviews projects, capstones, or certification evidence |
| Mentor | guides learners |
| Administrator | manages academy operations |
| Alumni | completed learner record |

### Relationships

```text
Person -> Applicant
Person -> Student
Person -> Instructor
Person -> Reviewer
Student -> Alumni
Instructor -> Course
Reviewer -> Assessment
Mentor -> Student
```

---

## 4. Learning Domain

The learning domain tracks enrollment and progress.

| Entity | Description |
|---|---|
| Enrollment | student registration in a course, path, or program |
| Cohort | group of students taking a course together |
| Progress | completion state for module, lesson, lab, or course |
| Attendance | attendance for live or cohort-based sessions |
| Submission | student-submitted work |
| Feedback | instructor or reviewer comments |
| Transcript | canonical academic record |

### Relationships

```text
Student -> Enrollment
Enrollment -> Course
Enrollment -> LearningPath
Cohort -> Course
Student -> Cohort
Student -> Progress
Student -> Submission
Submission -> Feedback
Student -> Transcript
```

---

## 5. Assessment Domain

The assessment domain defines how learning is evaluated.

| Entity | Description |
|---|---|
| Assessment | exam, quiz, project review, capstone review, or practical test |
| Rubric | scoring criteria |
| Grade | score or decision |
| Evaluation | automated or human evaluation event |
| Attempt | student attempt against an assessment |
| Evidence | proof attached to a submission |
| ReviewDecision | approve, reject, revise, certify, block |

### Relationships

```text
Course -> Assessment
Assessment -> Rubric
Student -> Attempt
Attempt -> Grade
Submission -> Evidence
Reviewer -> ReviewDecision
ReviewDecision -> Grade
```

---

## 6. Credential Domain

The credential domain defines certifications and achievements.

| Entity | Description |
|---|---|
| Badge | lightweight achievement |
| Certificate | formal credential |
| Certification | credential program |
| CredentialRule | requirements for issuance |
| Verification | public credential verification record |
| Renewal | credential renewal event |

### Relationships

```text
Program -> Certification
Certification -> CredentialRule
Student -> Badge
Student -> Certificate
Certificate -> Verification
Certificate -> Renewal
```

---

## 7. Portfolio Domain

The portfolio domain captures learner evidence and professional growth.

| Entity | Description |
|---|---|
| Portfolio | learner-owned evidence space |
| Artifact | project, repo, document, video, diagram, lab result, reflection |
| Reflection | learner explanation of what was built or learned |
| Showcase | public or private presentation page |
| SkillRecord | skill demonstrated by evidence |
| Endorsement | reviewer, instructor, mentor, or partner validation |

### Relationships

```text
Student -> Portfolio
Portfolio -> Artifact
Artifact -> Reflection
Artifact -> SkillRecord
Artifact -> Endorsement
Portfolio -> Showcase
```

Mahara can present and manage the portfolio experience, but Agent Academy should retain the canonical evidence and credential index.

---

## 8. Enterprise Domain

The enterprise domain supports companies, universities, and partners.

| Entity | Description |
|---|---|
| Organization | company, university, partner, or customer |
| Team | group inside an organization |
| Contract | commercial or institutional agreement |
| TrainingProgram | org-specific program |
| ComplianceReport | organization progress and compliance evidence |
| Seat | assigned learner access |
| Partner | training or delivery partner |

### Relationships

```text
Organization -> Team
Organization -> Contract
Organization -> TrainingProgram
Organization -> ComplianceReport
Organization -> Seat
Partner -> TrainingProgram
Student -> Organization
```

---

## 9. Platform Domain

The platform domain connects Academy to AGenNext systems.

| Entity | Description |
|---|---|
| Workspace | provisioned lab or coding environment |
| LabRun | execution instance of a lab |
| AgentProject | agent project created by learner |
| Repository | GitHub or other source repository |
| ToolAccess | granted tool capability |
| AuditEvent | immutable activity record |
| AnalyticsEvent | learning or platform event |

### Relationships

```text
Lab -> Workspace
Student -> LabRun
LabRun -> Workspace
LabRun -> AuditEvent
Student -> AgentProject
AgentProject -> Repository
Student -> ToolAccess
```

---

## Canonical Ownership Rule

Agent Academy owns the canonical records for:

- academic structure
- users and roles
- enrollments
- transcripts
- course specifications
- assessment records
- credential rules
- certificates
- portfolio evidence index
- lab launch records
- enterprise organization relationships

External systems can cache, display, or enrich these records, but they are not the primary source of truth.
