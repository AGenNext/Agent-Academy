# Claude: Building Enterprise AI Agents

## Course Purpose

Claude is now a full engineering surface: chat, API, coding assistant, tool orchestrator, context-aware collaborator, and enterprise workflow participant. This course teaches how to use Claude responsibly in production systems.

The course is practical. Every module produces an artifact that can be committed, reviewed, tested, and reused.

---

## Module 01 — Claude Platform Foundations

### Learning Goals

- Understand Claude as a family of interfaces and APIs.
- Distinguish Claude.ai, Claude Code, Claude API, MCP, Skills, Subagents, and Hooks.
- Explain where Claude ends and the platform begins.
- Identify security and governance responsibilities in Claude-powered workflows.

### Topics

- Claude platform overview
- Claude for individuals, teams, and enterprises
- Safety model and constitutional behavior
- Prompting versus context engineering
- Agent workflow boundaries
- Human-at-gate approval model

### Lab

Create a one-page system map showing how Claude fits into an enterprise agent workflow.

### Deliverable

`docs/claude-system-map.md`

---

## Module 02 — Claude Code

### Learning Goals

- Use Claude Code for repository-aware development.
- Create safe coding workflows with planning, diffs, review, and commits.
- Use Claude Code for debugging, refactoring, test generation, and documentation.

### Topics

- Installation and authentication
- Repository onboarding
- Planning before editing
- Reading code safely
- Generating patches
- Running tests
- Git workflow
- Pull request handoff

### Lab

Use Claude Code to analyze a repository and produce a change plan before modifying code.

### Deliverable

`docs/claude-code-change-plan.md`

---

## Module 03 — Context Engineering

### Learning Goals

- Design durable Claude context for a repository.
- Use `CLAUDE.md` to encode project rules, architecture, commands, and review criteria.
- Reduce hallucination through source-grounded context.

### Topics

- Context windows and limits
- `CLAUDE.md` structure
- Project memory
- Task framing
- Context freshness
- Source-grounded development
- Anti-patterns: vague goals, hidden constraints, unbounded autonomy

### Lab

Create a production-grade `CLAUDE.md` for a repo.

### Deliverable

`CLAUDE.md`

### Suggested Template

```md
# CLAUDE.md

## Mission

Describe what this repository exists to do.

## Architecture

Describe the main modules and their responsibilities.

## Commands

- Install:
- Test:
- Lint:
- Build:
- Run:

## Safety Rules

- Never commit secrets.
- Never bypass tests.
- Never change public APIs without documenting migration.
- Prefer small, reviewable patches.

## Review Criteria

- Code compiles.
- Tests pass.
- Documentation is updated.
- Security-sensitive changes are explained.
```

---

## Module 04 — Model Context Protocol

### Learning Goals

- Understand MCP as the tool boundary for model-to-system integration.
- Build a small MCP server.
- Consume MCP tools safely.
- Design enterprise MCP governance.

### Topics

- MCP clients and servers
- Tools, resources, prompts
- Tool descriptions and contracts
- Least privilege access
- Audit logging
- Local, hosted, and enterprise MCP patterns
- MCP with GitHub, database, Kubernetes, and observability tools

### Lab

Build a local MCP server that exposes a read-only project inventory tool.

### Deliverable

`mcp/project-inventory-server/README.md`

---

## Module 05 — Skills

### Learning Goals

- Package repeatable agent capabilities as Skills.
- Write `SKILL.md` files using progressive disclosure.
- Separate skill instructions from secrets, credentials, and runtime policy.

### Topics

- What a Skill is
- `SKILL.md`
- Skill scope and activation
- Reusable procedures
- Files and references
- Skill composition
- Enterprise skill catalog

### Lab

Create a Skill for production readiness review.

### Deliverable

`skills/production-readiness/SKILL.md`

### Skill Skeleton

```md
# Production Readiness Review

## Purpose

Review a repository for production readiness across build, test, security, observability, documentation, and deployment.

## When to Use

Use when a repo is preparing for release, handoff, or enterprise review.

## Procedure

1. Inspect project structure.
2. Identify build and test commands.
3. Check CI/CD coverage.
4. Check secrets and configuration hygiene.
5. Check observability and runbook coverage.
6. Produce a release readiness report.

## Output

Return a table of findings with severity, evidence, and recommended fix.
```

---

## Module 06 — Subagents

### Learning Goals

- Design specialist Claude subagents.
- Use subagents for planning, implementation, review, security, documentation, and operations.
- Avoid uncontrolled delegation.

### Topics

- Specialist roles
- Routing criteria
- Shared context
- Escalation rules
- Review loops
- Multi-agent failure modes
- Human-at-gate checkpoints

### Lab

Define a five-agent software delivery team.

### Deliverable

`agents/software-delivery-team.md`

### Required Subagents

- Architect Agent
- Builder Agent
- Reviewer Agent
- Security Agent
- Release Agent

---

## Module 07 — Hooks

### Learning Goals

- Use hooks to add guardrails around agent workflows.
- Design pre-action and post-action validation.
- Connect hooks to CI/CD and policy checks.

### Topics

- Pre hooks
- Post hooks
- Notification hooks
- Validation hooks
- Policy hooks
- Test hooks
- Commit hooks
- GitHub Actions handoff

### Lab

Create a hook checklist for code changes.

### Deliverable

`hooks/code-change-policy.md`

### Example Hook Policy

```md
# Code Change Policy

Before editing:
- Read relevant files.
- Produce a plan.
- Identify tests.

After editing:
- Run tests.
- Summarize changed files.
- Explain risk.
- Request review for security-sensitive changes.
```

---

## Module 08 — Claude API

### Learning Goals

- Build applications using the Claude API.
- Use streaming, tool use, structured output, files, and vision.
- Design API boundaries for enterprise systems.

### Topics

- Messages API
- System prompts
- Streaming
- Tool use
- JSON and structured output
- Files
- Vision
- Error handling
- Retries and rate limits
- Cost tracking

### Lab

Build a small API-backed assistant that can call one safe local tool.

### Deliverable

`apps/claude-tool-assistant/README.md`

---

## Module 09 — Enterprise Governance

### Learning Goals

- Govern Claude workflows in enterprise environments.
- Apply identity, access, policy, audit, evaluation, and cost controls.
- Connect Claude workflows to AGenNext platform principles.

### Topics

- Identity and access
- Least privilege
- Tool authorization
- Prompt and context provenance
- Human approvals
- Audit events
- Evaluation and trust scoring
- Cost attribution
- Data handling
- Incident review

### Lab

Create a governance matrix for Claude-based agent workflows.

### Deliverable

`governance/claude-governance-matrix.md`

---

## Module 10 — Production Capstone

### Goal

Build a governed Claude-powered engineering workflow from end to end.

### Required Capstone Features

- Repository-level `CLAUDE.md`
- Claude Code workflow
- MCP integration
- Reusable Skill
- At least three Subagents
- Hook-based quality gate
- Claude API app or service
- Evaluation checklist
- Security checklist
- Deployment notes
- Final architecture README

### Final Deliverable

`capstone/README.md`

### Review Standard

The capstone is complete only when it can be reviewed by another engineer using repository evidence. Claims without files, commands, tests, screenshots, logs, or documented decisions do not count.

---

## Final Exam

The final exam is practical. Learners must explain and demonstrate:

1. How context is constructed.
2. What tools Claude can access.
3. What Claude is not allowed to do.
4. How output is verified.
5. How cost is tracked.
6. How security-sensitive actions are gated.
7. How the workflow can be operated by a team.
8. How the system fails safely.

---

## AGenNext Doctrine

Claude accelerates the work. AGenNext governs the loop.

```text
Intent → Context → Tool → Action → Evidence → Evaluation → Approval → Release
```

No production workflow should rely on model output alone. Every serious workflow must bind action to evidence.
