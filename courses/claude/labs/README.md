# Claude Course Labs

Each lab produces a reviewable artifact. Do not treat labs as screenshots or notes only; every lab should leave behind a file, command, test, or documented decision.

## Lab 01 — Claude System Map

Create a system map for Claude in an enterprise workflow.

### Required Sections

- Claude surfaces used
- Users and roles
- Allowed tools
- Denied tools
- Approval gates
- Audit events
- Failure mode

### Output

`docs/claude-system-map.md`

---

## Lab 02 — Claude Code Repository Review

Use Claude Code to inspect a repository and produce a change plan before edits.

### Required Sections

- Repository summary
- Architecture assumptions
- Commands discovered
- Test strategy
- Proposed change
- Risk
- Rollback plan

### Output

`docs/claude-code-change-plan.md`

---

## Lab 03 — `CLAUDE.md` Context File

Write a repository-level `CLAUDE.md` that makes context durable.

### Required Sections

- Mission
- Architecture
- Commands
- Environment
- Safety rules
- Review criteria
- Known constraints

### Output

`CLAUDE.md`

---

## Lab 04 — Read-Only MCP Server

Design or implement a read-only MCP server that exposes project inventory.

### Required Tool

`list_project_files`

### Tool Contract

Input:

```json
{
  "root": "string",
  "max_depth": 3
}
```

Output:

```json
{
  "files": [
    {
      "path": "README.md",
      "kind": "markdown"
    }
  ]
}
```

### Output

`mcp/project-inventory-server/README.md`

---

## Lab 05 — Production Readiness Skill

Create a reusable Skill for release review.

### Output

`skills/production-readiness/SKILL.md`

### Minimum Checks

- Build
- Tests
- Linting
- Secrets
- Config
- Observability
- Deployment
- Runbook
- Security-sensitive changes

---

## Lab 06 — Specialist Subagents

Define five Subagents for software delivery.

### Required Agents

| Agent | Responsibility |
|---|---|
| Architect Agent | design and tradeoffs |
| Builder Agent | implementation |
| Reviewer Agent | code review |
| Security Agent | risk review |
| Release Agent | release readiness |

### Output

`agents/software-delivery-team.md`

---

## Lab 07 — Hooks and Guardrails

Define hooks that gate agent action.

### Required Hooks

- Before file edit
- After file edit
- Before commit
- Before release
- On security-sensitive change

### Output

`hooks/code-change-policy.md`

---

## Lab 08 — Claude API Tool Assistant

Build or specify a Claude API app that can use one safe local tool.

### Required Features

- System prompt
- Streaming response
- Tool schema
- Tool execution boundary
- Error handling
- Audit log

### Output

`apps/claude-tool-assistant/README.md`

---

## Lab 09 — Governance Matrix

Create a governance matrix for Claude workflows.

### Required Columns

| Capability | Risk | Control | Evidence | Owner |
|---|---|---|---|---|

### Output

`governance/claude-governance-matrix.md`

---

## Lab 10 — Production Capstone

Build a governed Claude workflow end to end.

### Output

`capstone/README.md`

### Required Evidence

- Architecture
- Commands
- Tests
- Policy gates
- Evaluation
- Deployment notes
- Known limitations
- Operator runbook
