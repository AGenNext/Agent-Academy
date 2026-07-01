-- MVP seed data for Agent Academy platform primitives

CREATE primitive:org_agennext CONTENT {
  kind: 'Organization',
  identifier: 'org:agennext-agent-academy',
  name: 'AGenNext Agent Academy',
  description: 'Kubernetes-native academy platform for agent engineering.',
  status: 'active',
  version: '0.1.0',
  data: {
    roles: ['academy','training-provider','certifying-authority'],
    did: 'did:web:academy.agennext.example'
  }
};

CREATE primitive:cap_agent_engineering CONTENT {
  kind: 'Capability',
  identifier: 'capability:agent-engineering',
  name: 'Agent Engineering',
  description: 'Design, build, govern, and operate agentic systems.',
  status: 'active',
  version: '0.1.0',
  data: { domain: 'AI Platforms' }
};

CREATE primitive:skill_governed_agent_workflows CONTENT {
  kind: 'Skill',
  identifier: 'skill:governed-agent-workflows',
  name: 'Governed Agent Workflows',
  description: 'Ability to design agent workflows with policy, evidence, and human gates.',
  status: 'active',
  version: '0.1.0',
  data: {
    proficiencyScale: ['awareness','basic','working','practitioner','advanced','expert','master'],
    expertiseLevels: ['beginner','intermediate','advanced','senior','principal','architect','authority'],
    frameworks: [{ framework: 'SFIA', version: '9', skillCode: 'PROG', level: 3 }],
    evidenceRules: ['artifact-reviewed','assessment-approved']
  }
};

CREATE primitive:tech_kubernetes CONTENT {
  kind: 'Technology',
  identifier: 'technology:kubernetes',
  name: 'Kubernetes',
  description: 'Container orchestration platform.',
  status: 'active',
  version: '0.1.0',
  data: { type: 'platform', ecosystem: 'CNCF' }
};

CREATE primitive:job_agent_engineer CONTENT {
  kind: 'JobProfile',
  identifier: 'job-profile:agent-engineer',
  name: 'Agent Engineer',
  description: 'Builds governed agent systems and platform workflows.',
  status: 'active',
  version: '0.1.0',
  data: {
    designation: 'Agent Engineer',
    seniority: 'intermediate',
    requiredSkills: ['skill:governed-agent-workflows'],
    requiredTechnologies: ['technology:kubernetes']
  }
};

CREATE primitive:path_agent_engineer CONTENT {
  kind: 'LearningPath',
  identifier: 'learning-path:agent-engineer',
  name: 'Agent Engineer Learning Path',
  description: 'Path from foundation to job-ready agent engineering capability.',
  status: 'active',
  version: '0.1.0',
  data: {
    target: 'job-profile:agent-engineer',
    steps: ['course:claude-as-a-course'],
    completionRules: ['skill:governed-agent-workflows assessed']
  }
};

RELATE primitive:cap_agent_engineering->relationship:cap_skill_governed->primitive:skill_governed_agent_workflows CONTENT {
  predicate: 'contains',
  source_kind: 'Capability',
  target_kind: 'Skill',
  status: 'active',
  confidence: 1.0
};

RELATE primitive:skill_governed_agent_workflows->relationship:skill_uses_kubernetes->primitive:tech_kubernetes CONTENT {
  predicate: 'uses',
  source_kind: 'Skill',
  target_kind: 'Technology',
  status: 'active',
  confidence: 0.8
};

RELATE primitive:job_agent_engineer->relationship:job_requires_skill->primitive:skill_governed_agent_workflows CONTENT {
  predicate: 'requires',
  source_kind: 'JobProfile',
  target_kind: 'Skill',
  status: 'active',
  confidence: 1.0
};
