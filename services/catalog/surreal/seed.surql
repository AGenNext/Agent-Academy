-- Minimal seed helper for Agent Academy Catalog Service.
-- The runtime service also ships TypeScript seed data for local in-memory mode.

CREATE course:claude_as_a_course CONTENT {
  data: {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': 'https://github.com/AGenNext/Agent-Academy/courses/claude',
    identifier: 'course:claude-as-a-course',
    name: 'Claude as a Course: Building Enterprise AI Agents',
    description: 'A production-oriented learning track for building enterprise-grade AI agent systems with Claude, Claude Code, the Claude API, MCP, Skills, Subagents, Hooks, and AGenNext governance patterns.',
    courseCode: 'AA-CLD-200',
    provider: {
      '@type': 'Organization',
      name: 'AGenNext Agent Academy',
      url: 'https://github.com/AGenNext/Agent-Academy'
    },
    educationalLevel: 'Intermediate-Advanced',
    learningResourceType: 'Course',
    teaches: ['Claude platform foundations', 'Claude Code workflows', 'Context engineering', 'MCP', 'Skills', 'Subagents', 'Hooks', 'Claude API', 'Enterprise governance'],
    assesses: ['repository-level context design', 'MCP tool boundary design', 'production capstone evidence'],
    syllabusSections: [],
    hasCourseInstance: [],
    keywords: ['Claude', 'Claude Code', 'MCP', 'Skills', 'Subagents', 'Hooks'],
    agennext: {
      slug: 'claude-as-a-course',
      status: 'active',
      visibility: 'public',
      schools: ['School of AI Platforms', 'School of Agent Engineering'],
      programs: ['Agent Engineer', 'Senior Agent Engineer'],
      tags: ['vendor-track', 'claude', 'mcp', 'agent-engineering'],
      version: '0.1.0'
    },
    dateCreated: '2026-07-01T00:00:00.000Z',
    dateModified: '2026-07-01T00:00:00.000Z',
    datePublished: '2026-07-01T00:00:00.000Z'
  }
};
