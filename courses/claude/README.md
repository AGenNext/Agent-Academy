# Claude as a Course

A production-oriented learning track for building enterprise-grade AI agent systems with Claude, Claude Code, the Claude API, MCP, Skills, Subagents, Hooks, and AGenNext governance patterns.

This course treats Claude as more than a chat interface. It teaches Claude as an engineering surface, an agent runtime partner, a tool orchestration layer, and a governed enterprise capability.

## Course Outcomes

By the end of this course, learners can:

- Use Claude and Claude Code for real software delivery workflows.
- Design repository-level context using `CLAUDE.md` and durable project memory.
- Build and consume MCP servers safely.
- Package reusable agent capabilities as Skills.
- Compose specialist Subagents for engineering, research, review, security, and operations.
- Use Hooks for validation, policy checks, and workflow guardrails.
- Build Claude API applications with streaming, tool use, structured output, files, and vision.
- Deploy a governed enterprise agent workflow with testing, observability, and cost controls.
- Map Claude workflows into AGenNext platform principles: identity, policy, provenance, evaluation, and human-at-gate approval.

## Suggested Duration

| Track | Duration | Audience |
|---|---:|---|
| Fast track | 8-10 hours | Experienced AI engineers |
| Standard track | 4 weeks | Product + platform teams |
| Enterprise track | 6 weeks | IT, security, governance, and platform teams |

## Modules

| Module | Title | Focus |
|---|---|---|
| 01 | Claude Platform Foundations | Claude, Claude.ai, Claude API, safety, enterprise surfaces |
| 02 | Claude Code | CLI workflows, planning, refactoring, debugging, Git integration |
| 03 | Context Engineering | `CLAUDE.md`, repo memory, task framing, long-running projects |
| 04 | MCP | Model Context Protocol, MCP clients, servers, tool boundaries |
| 05 | Skills | Reusable agent capabilities, `SKILL.md`, packaging, governance |
| 06 | Subagents | Specialist agents, routing, delegation, review, safety |
| 07 | Hooks | Pre/post hooks, validation, policy checks, CI handoff |
| 08 | Claude API | Messages, streaming, tool use, structured output, files, vision |
| 09 | Enterprise Governance | security, audit, approvals, identity, policy, cost management |
| 10 | Production Capstone | build, evaluate, deploy, and document a governed agent workflow |

## Repository Layout

```text
courses/claude/
├── README.md
├── COURSE.md
├── syllabus.yaml
├── labs/
│   └── README.md
├── exercises/
│   └── README.md
├── projects/
│   └── README.md
├── resources/
│   └── README.md
└── certification.md
```

## Completion Standard

A learner completes the course when they submit:

1. A working Claude Code repository workflow.
2. A working MCP server or MCP integration.
3. A reusable Skill with a valid `SKILL.md`.
4. At least three specialist Subagent definitions.
5. Hook-based validation for at least one safety or quality gate.
6. A Claude API application with streaming and tool use.
7. A production capstone with README, architecture notes, tests, and evaluation evidence.

## AGenNext Positioning

This course is part of the AGenNext agent engineering curriculum. It teaches Claude inside a wider production model:

```text
Capability → Policy → Tool Boundary → Execution → Evidence → Review → Release
```

Claude is used as an engineering partner. The platform remains responsible for governance, identity, evaluation, auditability, and production controls.
