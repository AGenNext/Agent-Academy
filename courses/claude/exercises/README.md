# Claude Course Exercises

These exercises are designed for repeated practice. Each one should be completed in a separate branch or folder so learners can compare approaches over time.

## Exercise 01 — Prompt to Context

Convert a vague prompt into a structured task brief.

### Input

```text
Make this repo production ready.
```

### Output Template

```md
# Task Brief

## Goal

## Non-goals

## Repository Evidence Needed

## Commands to Run

## Files Likely to Change

## Risks

## Approval Needed
```

---

## Exercise 02 — Safe Claude Code Plan

Write a plan Claude Code should produce before editing.

### Required Elements

- Files inspected
- Assumptions
- Proposed edits
- Tests
- Rollback
- Review notes

---

## Exercise 03 — `CLAUDE.md` Quality Review

Review a `CLAUDE.md` file and score it from 1-5 across:

| Category | Score | Notes |
|---|---:|---|
| Mission clarity | | |
| Architecture clarity | | |
| Commands | | |
| Safety rules | | |
| Review criteria | | |
| Freshness | | |

---

## Exercise 04 — MCP Tool Boundary

Design a safe tool contract for an MCP server.

### Scenario

Claude needs to inspect deployment status but must not mutate the cluster.

### Output

Define:

- Tool name
- Tool description
- Input schema
- Output schema
- Denied actions
- Audit events

---

## Exercise 05 — Skill Decomposition

Break a large skill into smaller reusable skills.

### Starting Skill

```text
Operate the whole platform.
```

### Expected Decomposition

At minimum:

- Production readiness review
- Security review
- Release note generation
- Incident summary
- Cost review

---

## Exercise 06 — Subagent Boundaries

For each subagent, define what it can and cannot do.

| Subagent | Can Do | Cannot Do | Escalates When |
|---|---|---|---|
| Architect | | | |
| Builder | | | |
| Reviewer | | | |
| Security | | | |
| Release | | | |

---

## Exercise 07 — Hook Design

Create a hook policy for preventing accidental secret exposure.

### Required Controls

- Pre-edit warning
- Secret pattern check
- Commit block
- Manual approval
- Incident note

---

## Exercise 08 — API Tool Use Review

Review a Claude API tool schema for risk.

### Questions

1. Can the tool mutate state?
2. Can the tool access secrets?
3. Is input validated?
4. Is output bounded?
5. Is every call auditable?
6. Can a human interrupt the flow?

---

## Exercise 09 — Evaluation Design

Create a lightweight evaluation set for a Claude workflow.

### Required Cases

- Happy path
- Ambiguous request
- Unsafe request
- Missing context
- Tool failure
- Cost-sensitive request
- Security-sensitive request

---

## Exercise 10 — Release Review

Review a capstone as if it were going to production.

### Required Output

```md
# Release Review

## Decision

Approve / Block / Approve with Conditions

## Evidence

## Risks

## Required Fixes

## Follow-up Work
```
