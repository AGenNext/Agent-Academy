# Academy Governance

AGenNext Academy must stay accurate, production-aligned, and evidence-based.

## Governance Goals

- Keep courses current.
- Prevent unsupported claims.
- Require practical evidence.
- Align learning with production platform patterns.
- Make vendor tracks useful without becoming vendor marketing.
- Preserve AGenNext's platform-first point of view.

## Course Lifecycle

```text
Proposed -> Draft -> Review -> Active -> Maintained -> Deprecated -> Archived
```

## Status Definitions

| Status | Meaning |
|---|---|
| Proposed | course idea exists, no structure yet |
| Draft | outline exists, content is incomplete |
| Review | complete enough for technical review |
| Active | published and usable |
| Maintained | active and recently reviewed |
| Deprecated | still visible but no longer recommended |
| Archived | kept for historical reference only |

## Course Acceptance Criteria

A course can become Active only when it includes:

- README
- course outline
- syllabus or module map
- labs
- exercises or projects
- assessment criteria
- completion standard
- governance or safety notes
- maintenance rule

## Review Checklist

| Check | Required Question |
|---|---|
| Accuracy | Is the course technically correct? |
| Freshness | Does it reflect current platform reality? |
| Evidence | Does each module produce a reviewable artifact? |
| Safety | Are risky operations gated or denied? |
| Vendor neutrality | Is the course useful without lock-in? |
| Production readiness | Does the course teach real operational concerns? |
| Accessibility | Can a learner follow the course from a clean repo? |

## Maintenance Cadence

| Course Type | Review Cadence |
|---|---|
| Core AGenNext architecture | quarterly |
| Vendor platform course | monthly or after major vendor change |
| Security and governance course | monthly |
| Domain course | quarterly |
| Certification rubric | quarterly |

## Evidence Policy

Every lab and project should require one or more of:

- source file
- diagram
- command output
- test result
- evaluation set
- policy matrix
- runbook
- pull request
- deployment notes
- review decision

## Vendor Track Policy

Vendor courses should teach the vendor platform honestly while mapping it back to AGenNext controls:

```text
Vendor Capability -> Platform Boundary -> Governance Control -> Evidence
```

## Deprecation Policy

A course should be marked Deprecated when:

- its platform features changed significantly
- recommended APIs are no longer current
- safety guidance is incomplete
- labs no longer run
- better replacement course exists

## Ownership Model

Each course should eventually define:

- course owner
- reviewer
- last reviewed date
- next review date
- supported platform versions
- known limitations

## Academy Rule

The Academy must teach what can be built, operated, reviewed, and trusted.
