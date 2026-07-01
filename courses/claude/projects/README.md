# Claude Course Projects

Projects convert course concepts into reviewable systems. Each project should be submitted with a README, commands, screenshots or logs when useful, and clear evidence of testing.

## Project 01 — Claude Code Delivery Workflow

### Goal

Create a repeatable Claude Code workflow for one repository.

### Required Artifacts

- `CLAUDE.md`
- `docs/change-plan.md`
- `docs/review-checklist.md`
- Test command output or documented test plan
- Pull request summary template

### Review Criteria

- The workflow starts with planning.
- The workflow does not skip tests.
- Risk is documented.
- Human review is explicit.

---

## Project 02 — Read-Only MCP Server

### Goal

Build or specify an MCP server that gives Claude safe, bounded repository or platform visibility.

### Required Artifacts

- Tool list
- Tool schemas
- Denied operations
- Audit log design
- Example interaction
- Security notes

### Constraint

The server must be read-only unless the project explicitly adds an approval gate.

---

## Project 03 — Enterprise Skill Library

### Goal

Create a small library of reusable Skills for agent engineering.

### Required Skills

- Production readiness review
- Security review
- Documentation review
- Release note generation
- Cost review

### Required Artifact

Each Skill must include a `SKILL.md` file.

---

## Project 04 — Subagent Delivery Team

### Goal

Design a multi-agent software delivery team with clear roles and boundaries.

### Required Agents

- Architect Agent
- Builder Agent
- Reviewer Agent
- Security Agent
- Release Agent

### Required Controls

- No subagent can approve its own work.
- Security-sensitive changes require Security Agent review.
- Release requires human approval.
- Tool access is role-specific.

---

## Project 05 — Claude API Tool Assistant

### Goal

Build a small Claude API application that uses one safe local tool.

### Required Features

- Streaming output
- Tool schema
- Tool execution wrapper
- Error handling
- Audit log
- Cost estimate note

### Example Safe Tools

- `summarize_file`
- `list_project_files`
- `read_documentation_section`
- `validate_json_schema`

---

## Final Capstone — Governed Claude Engineering Workflow

### Goal

Build an end-to-end Claude-powered workflow that can be used in a real engineering organization.

### Required Components

| Component | Required Evidence |
|---|---|
| Context | `CLAUDE.md` |
| Coding workflow | change plan and review checklist |
| MCP | server spec or implementation |
| Skills | at least one reusable `SKILL.md` |
| Subagents | at least three specialist roles |
| Hooks | quality and security gates |
| API | Claude API app or service spec |
| Governance | policy, audit, approval, and cost matrix |
| Evaluation | test cases and expected outcomes |
| Release | deployment and runbook notes |

### Capstone README Structure

```md
# Governed Claude Engineering Workflow

## Purpose

## Architecture

## Claude Surfaces Used

## Context Design

## Tool Boundaries

## Skills

## Subagents

## Hooks

## API Usage

## Governance

## Evaluation

## Deployment

## Runbook

## Known Limitations
```
