import type { Course } from "./schema.js";

const provider = {
  "@type": "Organization" as const,
  "@id": "https://github.com/AGenNext/Agent-Academy#organization",
  name: "AGenNext Agent Academy",
  url: "https://github.com/AGenNext/Agent-Academy"
};

export const seedCourses: Course[] = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://github.com/AGenNext/Agent-Academy/courses/claude",
    identifier: "course:claude-as-a-course",
    name: "Claude as a Course: Building Enterprise AI Agents",
    description: "A production-oriented learning track for building enterprise-grade AI agent systems with Claude, Claude Code, the Claude API, MCP, Skills, Subagents, Hooks, and AGenNext governance patterns.",
    courseCode: "AA-CLD-200",
    url: "https://github.com/AGenNext/Agent-Academy/tree/main/courses/claude",
    provider,
    creator: provider,
    maintainer: provider,
    inLanguage: "en",
    availableLanguage: ["en"],
    educationalLevel: "Intermediate-Advanced",
    learningResourceType: "Course",
    educationalUse: ["instruction", "lab", "project", "certification preparation"],
    teaches: [
      "Claude platform foundations",
      "Claude Code workflows",
      "Context engineering",
      "Model Context Protocol",
      "Agent Skills",
      "Subagents",
      "Hooks",
      "Claude API",
      "Enterprise AI governance"
    ],
    assesses: [
      "repository-level context design",
      "MCP tool boundary design",
      "production capstone evidence",
      "governed agent workflow design"
    ],
    competencyRequired: ["basic Git workflow", "basic API familiarity", "command-line familiarity"],
    coursePrerequisites: ["Basic Git and GitHub workflow", "Basic command-line usage", "Familiarity with APIs"],
    educationalCredentialAwarded: {
      "@type": "EducationalOccupationalCredential",
      name: "AGenNext Certified Claude Agent Engineer",
      credentialCategory: "Certificate",
      recognizedBy: provider
    },
    numberOfCredits: {
      "@type": "StructuredValue",
      value: 4,
      unitText: "academy credits"
    },
    syllabusSections: [
      {
        "@type": "Syllabus",
        name: "Claude Platform Foundations",
        position: 1,
        description: "Claude surfaces, safety, and enterprise boundaries.",
        teaches: ["Claude platform model", "governance boundaries"]
      },
      {
        "@type": "Syllabus",
        name: "Claude Code",
        position: 2,
        description: "Repository-aware development, planning, review, and Git workflows.",
        teaches: ["Claude Code workflow", "safe code changes"]
      },
      {
        "@type": "Syllabus",
        name: "MCP, Skills, Subagents, and Hooks",
        position: 3,
        description: "Reusable capabilities and governed tool boundaries.",
        teaches: ["MCP", "Skills", "Subagents", "Hooks"]
      },
      {
        "@type": "Syllabus",
        name: "Production Capstone",
        position: 4,
        description: "Build and review a governed Claude-powered engineering workflow.",
        assesses: ["capstone", "evidence", "governance"]
      }
    ],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: "Self-paced public cohort",
        courseMode: ["online", "self-paced"],
        instructor: provider,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://github.com/AGenNext/Agent-Academy/tree/main/courses/claude"
        }
      }
    ],
    about: ["AI agents", "Claude", "enterprise agent engineering", "MCP", "governance"],
    keywords: ["Claude", "Claude Code", "MCP", "Skills", "Subagents", "Hooks", "Agent Academy"],
    isAccessibleForFree: true,
    license: "Apache-2.0",
    creativeWorkStatus: "Published",
    dateCreated: "2026-07-01T00:00:00.000Z",
    dateModified: "2026-07-01T00:00:00.000Z",
    datePublished: "2026-07-01T00:00:00.000Z",
    totalHistoricalEnrollment: 0,
    agennext: {
      slug: "claude-as-a-course",
      status: "active",
      visibility: "public",
      schools: ["School of AI Platforms", "School of Agent Engineering"],
      programs: ["Agent Engineer", "Senior Agent Engineer"],
      tags: ["vendor-track", "claude", "mcp", "agent-engineering"],
      version: "0.1.0"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://github.com/AGenNext/Agent-Academy/courses/01-surrealdb-foundations",
    identifier: "course:surrealdb-foundations",
    name: "SurrealDB Foundations",
    description: "Foundational course for using SurrealDB as an agent runtime and canonical data layer for Agent Academy and AGenNext systems.",
    courseCode: "AA-SDB-100",
    url: "https://github.com/AGenNext/Agent-Academy/tree/main/courses/01-surrealdb-foundations",
    provider,
    creator: provider,
    maintainer: provider,
    inLanguage: "en",
    availableLanguage: ["en"],
    educationalLevel: "Beginner",
    learningResourceType: "Course",
    educationalUse: ["instruction", "lab"],
    teaches: ["SurrealDB basics", "schemafull tables", "records", "queries", "agent runtime data model"],
    assesses: ["basic SurrealDB usage", "course lab completion"],
    competencyRequired: ["basic database familiarity"],
    coursePrerequisites: ["Basic SQL or query language familiarity"],
    numberOfCredits: {
      "@type": "StructuredValue",
      value: 2,
      unitText: "academy credits"
    },
    syllabusSections: [
      {
        "@type": "Syllabus",
        name: "Runtime-first Data Model",
        position: 1,
        description: "Why SurrealDB is treated as a runtime layer for agent systems.",
        teaches: ["runtime model", "records", "namespaces", "databases"]
      },
      {
        "@type": "Syllabus",
        name: "Schema and Rules",
        position: 2,
        description: "Define schemafull tables and hard constraints.",
        teaches: ["schemafull", "constraints", "validation"]
      }
    ],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: "Self-paced public cohort",
        courseMode: ["online", "self-paced"],
        instructor: provider
      }
    ],
    about: ["SurrealDB", "agent runtime", "data model"],
    keywords: ["SurrealDB", "database", "agent runtime", "schema"],
    isAccessibleForFree: true,
    license: "Apache-2.0",
    creativeWorkStatus: "Published",
    dateCreated: "2026-07-01T00:00:00.000Z",
    dateModified: "2026-07-01T00:00:00.000Z",
    datePublished: "2026-07-01T00:00:00.000Z",
    totalHistoricalEnrollment: 0,
    agennext: {
      slug: "surrealdb-foundations",
      status: "active",
      visibility: "public",
      schools: ["School of Data & Knowledge", "School of Agent Engineering"],
      programs: ["Agent Practitioner", "Agent Engineer"],
      tags: ["surrealdb", "foundation", "runtime"],
      version: "0.1.0"
    }
  }
];
