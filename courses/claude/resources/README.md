# Claude Course Resources

Use this page as the resource index for learners. Keep links current and prefer official documentation when possible.

## Primary Resource Categories

| Category | What to Study |
|---|---|
| Claude overview | Claude model family, product surfaces, safety behavior |
| Claude Code | installation, CLI usage, repository workflows, development patterns |
| Claude API | messages, streaming, tool use, files, vision, structured output |
| MCP | clients, servers, tools, resources, prompts, security boundaries |
| Skills | `SKILL.md`, packaging, progressive disclosure, reusable procedures |
| Subagents | specialist roles, routing, delegation, escalation |
| Hooks | validation, notifications, pre/post action controls |
| Enterprise | admin controls, data handling, audit, governance, cost controls |

## Internal AGenNext References

| Reference | Purpose |
|---|---|
| `AGenNext/Agent-Platform` | production platform patterns |
| `AGenNext/Agent-Skills` | reusable capability model |
| `AGenNext/Agent-Protocols` | MCP, A2A, AG-UI, auth, commerce, payment protocols |
| `AGenNext/Agent-Trust` | trust, evaluation, and review patterns |
| `AGenNext/Agent-Ops` | operations, observability, and incident patterns |
| `AGenNext/Agent-Courses` | structured curriculum |

## Recommended Study Order

```text
Claude overview
  ↓
Claude Code
  ↓
Context Engineering
  ↓
MCP
  ↓
Skills
  ↓
Subagents
  ↓
Hooks
  ↓
Claude API
  ↓
Enterprise Governance
  ↓
Capstone
```

## Reading Checklist

Before starting the capstone, learners should be able to explain:

- What context Claude receives.
- What tools Claude can access.
- What actions Claude cannot take.
- What evidence proves the work is correct.
- What policy gates protect production systems.
- What costs are incurred.
- What audit trail exists.
- Who approves risky changes.

## Resource Maintenance Policy

This course should be reviewed whenever Claude platform capabilities change. Update this resource index when new official guidance affects:

- Claude Code workflows
- MCP tool design
- Skills packaging
- Subagent behavior
- Hooks behavior
- API features
- Enterprise governance controls
