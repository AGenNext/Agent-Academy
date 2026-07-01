# Claude Course Certification

## Certification Name

**AGenNext Certified Claude Agent Engineer**

## Certification Purpose

This certification validates that a learner can use Claude in a governed engineering workflow, not merely prompt Claude for isolated answers.

A certified learner must demonstrate capability across context engineering, Claude Code, MCP, Skills, Subagents, Hooks, API integration, governance, evaluation, and production handoff.

## Passing Requirements

| Requirement | Minimum Standard |
|---|---|
| Module completion | all 10 modules |
| Lab completion | at least 8 of 10 labs |
| Project completion | at least 3 projects |
| Capstone | required |
| Written exam | 80% |
| Peer or reviewer approval | required |
| Evidence | required |

## Evidence Requirements

The learner must submit repository evidence for:

- `CLAUDE.md`
- Claude Code change plan
- MCP server or MCP integration spec
- At least one `SKILL.md`
- At least three Subagent definitions
- Hook or policy gate definition
- Claude API app or service spec
- Governance matrix
- Evaluation cases
- Capstone README

## Scoring Rubric

| Area | Weight | What Good Looks Like |
|---|---:|---|
| Context Engineering | 15% | clear, durable, source-grounded context with commands and safety rules |
| Claude Code Workflow | 15% | plan-first, test-aware, reviewable engineering flow |
| MCP | 10% | safe tool boundary, least privilege, auditability |
| Skills | 10% | reusable, scoped, clear `SKILL.md` capability |
| Subagents | 10% | specialist roles with explicit boundaries and escalation |
| Hooks | 10% | meaningful validation and policy gates |
| Claude API | 10% | safe tool use, streaming or structured output, error handling |
| Governance | 10% | identity, policy, audit, cost, evaluation, approval |
| Capstone Quality | 10% | coherent production workflow with evidence |

## Written Exam Topics

Learners must answer questions on:

1. Claude surfaces and use cases.
2. Claude Code workflow design.
3. Context engineering and `CLAUDE.md`.
4. MCP tool boundaries.
5. Skills and reusable capability packaging.
6. Subagent design.
7. Hooks and validation.
8. Claude API tool use.
9. Governance and audit.
10. Safe failure modes.

## Capstone Review Checklist

| Check | Pass Criteria |
|---|---|
| Purpose | workflow goal is clear |
| Architecture | components and responsibilities are documented |
| Context | `CLAUDE.md` exists and is useful |
| Tools | allowed and denied tools are explicit |
| Skills | at least one reusable Skill exists |
| Subagents | roles and escalation rules are documented |
| Hooks | policy gates exist |
| API | API boundary is documented or implemented |
| Tests | test plan or test output exists |
| Evaluation | expected behavior and failure cases are covered |
| Security | risks and controls are documented |
| Cost | cost controls or estimates are documented |
| Runbook | operator steps are documented |

## Certification Decision

The reviewer must choose one:

- **Certified** — all critical criteria met.
- **Certified with Conditions** — minor gaps remain but production posture is understandable.
- **Not Certified Yet** — missing evidence, unsafe workflow, or unclear governance.

## Renewal

Renewal should happen whenever major Claude platform features or enterprise governance requirements change. Suggested renewal cadence: every 12 months.
