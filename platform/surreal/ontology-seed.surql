CREATE resource:academy_course_claude CONTENT {
  identifier: 'course:claude-as-a-course',
  kind: 'Course',
  name: 'Claude as a Course',
  description: 'Release candidate course resource for agent engineering.',
  version: '0.1.0',
  status: 'published',
  owner: 'org:agennext-agent-academy',
  visibility: 'public',
  language: 'en',
  tags: ['agent-engineering','claude','ai'],
  labels: { release: 'mvp' },
  provenance: { source: 'platform/ontology/academy-ontology.yaml' },
  trustScore: 0.8,
  data: { schemaOrgType: 'Course' }
};

CREATE resource:skill_governed_agent_workflows CONTENT {
  identifier: 'skill:governed-agent-workflows',
  kind: 'Skill',
  name: 'Governed Agent Workflows',
  description: 'Design and operate agent workflows with policy, evidence, and approvals.',
  version: '0.1.0',
  status: 'published',
  owner: 'org:agennext-agent-academy',
  visibility: 'public',
  language: 'en',
  tags: ['skill','governance','agents'],
  labels: { framework: 'SFIA' },
  provenance: { source: 'ontology-seed' },
  trustScore: 0.8,
  data: {
    proficiency: ['awareness','basic','working','practitioner','advanced','expert','master'],
    expertise: ['beginner','intermediate','advanced','senior','principal','architect','authority'],
    tools: ['Claude','Kubernetes','SurrealDB'],
    frameworkMappings: [{ framework: 'SFIA', version: '9', skillCode: 'PROG', level: 3 }]
  }
};

CREATE profile:learner_demo CONTENT {
  identifier: 'profile:learner-demo',
  profileType: 'LearnerProfile',
  subject: 'identity:learner-demo',
  name: 'Demo Learner Profile',
  description: 'Release candidate learner profile assembled from skills, artifacts, evidence, and credentials.',
  status: 'active',
  version: '0.1.0',
  components: ['skill:governed-agent-workflows','course:claude-as-a-course'],
  data: { readiness: 'mvp-demo' }
};

CREATE ontology_term:resource CONTENT { identifier: 'term:resource', layer: 'foundation', name: 'Resource', description: 'Versioned object that can be owned, referenced, audited, and reused.', status: 'active', mappings: ['schema:Thing'] };
CREATE ontology_term:skill CONTENT { identifier: 'term:skill', layer: 'competency', name: 'Skill', description: 'Measurable competency with proficiency and expertise.', status: 'active', mappings: ['schema:DefinedTerm','SFIA'] };
CREATE ontology_term:credential CONTENT { identifier: 'term:credential', layer: 'credential', name: 'Credential', description: 'Portable proof issued from evidence.', status: 'active', mappings: ['OpenBadges','W3C-VC','DID'] };

RELATE resource:academy_course_claude->resource_edge:course_teaches_skill->resource:skill_governed_agent_workflows CONTENT { predicate: 'teaches', provenance: { source: 'ontology-seed' }, confidence: 1.0 };
