-- Agent Academy ontology extension
-- Adds release-ready Resource and Profile primitives while keeping the existing primitive graph model.

DEFINE TABLE resource SCHEMAFULL;
DEFINE FIELD identifier ON resource TYPE string;
DEFINE FIELD kind ON resource TYPE string;
DEFINE FIELD name ON resource TYPE string;
DEFINE FIELD description ON resource TYPE option<string>;
DEFINE FIELD version ON resource TYPE string;
DEFINE FIELD status ON resource TYPE string ASSERT $value IN ['draft','review','approved','published','active','deprecated','archived','revoked'];
DEFINE FIELD owner ON resource TYPE option<string>;
DEFINE FIELD tenantId ON resource TYPE option<string>;
DEFINE FIELD workspaceId ON resource TYPE option<string>;
DEFINE FIELD visibility ON resource TYPE string ASSERT $value IN ['private','organization','public','restricted'];
DEFINE FIELD language ON resource TYPE option<string>;
DEFINE FIELD tags ON resource FLEXIBLE TYPE array;
DEFINE FIELD labels ON resource FLEXIBLE TYPE object;
DEFINE FIELD provenance ON resource FLEXIBLE TYPE object;
DEFINE FIELD trustScore ON resource TYPE option<float>;
DEFINE FIELD effectiveFrom ON resource TYPE option<datetime>;
DEFINE FIELD effectiveUntil ON resource TYPE option<datetime>;
DEFINE FIELD data ON resource FLEXIBLE TYPE object;
DEFINE FIELD createdAt ON resource TYPE datetime DEFAULT time::now();
DEFINE FIELD updatedAt ON resource TYPE datetime DEFAULT time::now();
DEFINE FIELD createdBy ON resource TYPE option<string>;
DEFINE FIELD updatedBy ON resource TYPE option<string>;
DEFINE INDEX resource_identifier_unique ON resource COLUMNS identifier UNIQUE;
DEFINE INDEX resource_kind_idx ON resource COLUMNS kind;
DEFINE INDEX resource_status_idx ON resource COLUMNS status;
DEFINE INDEX resource_owner_idx ON resource COLUMNS owner;

DEFINE TABLE profile SCHEMAFULL;
DEFINE FIELD identifier ON profile TYPE string;
DEFINE FIELD profileType ON profile TYPE string ASSERT $value IN ['LearnerProfile','InstructorProfile','OrganizationProfile','JobProfile','CourseProfile','SkillProfile','CredentialProfile'];
DEFINE FIELD subject ON profile TYPE string;
DEFINE FIELD name ON profile TYPE string;
DEFINE FIELD description ON profile TYPE option<string>;
DEFINE FIELD status ON profile TYPE string ASSERT $value IN ['draft','review','approved','published','active','deprecated','archived','revoked'];
DEFINE FIELD version ON profile TYPE string;
DEFINE FIELD components ON profile FLEXIBLE TYPE array;
DEFINE FIELD data ON profile FLEXIBLE TYPE object;
DEFINE FIELD createdAt ON profile TYPE datetime DEFAULT time::now();
DEFINE FIELD updatedAt ON profile TYPE datetime DEFAULT time::now();
DEFINE INDEX profile_identifier_unique ON profile COLUMNS identifier UNIQUE;
DEFINE INDEX profile_type_idx ON profile COLUMNS profileType;
DEFINE INDEX profile_subject_idx ON profile COLUMNS subject;

DEFINE TABLE ontology_term SCHEMAFULL;
DEFINE FIELD identifier ON ontology_term TYPE string;
DEFINE FIELD layer ON ontology_term TYPE string;
DEFINE FIELD name ON ontology_term TYPE string;
DEFINE FIELD description ON ontology_term TYPE option<string>;
DEFINE FIELD status ON ontology_term TYPE string ASSERT $value IN ['draft','active','deprecated','archived'];
DEFINE FIELD mappings ON ontology_term FLEXIBLE TYPE array;
DEFINE FIELD data ON ontology_term FLEXIBLE TYPE object;
DEFINE FIELD createdAt ON ontology_term TYPE datetime DEFAULT time::now();
DEFINE INDEX ontology_term_identifier_unique ON ontology_term COLUMNS identifier UNIQUE;
DEFINE INDEX ontology_layer_idx ON ontology_term COLUMNS layer;

DEFINE TABLE resource_edge TYPE RELATION IN resource OUT resource SCHEMAFULL;
DEFINE FIELD predicate ON resource_edge TYPE string;
DEFINE FIELD provenance ON resource_edge FLEXIBLE TYPE object;
DEFINE FIELD confidence ON resource_edge TYPE option<float>;
DEFINE FIELD createdAt ON resource_edge TYPE datetime DEFAULT time::now();
DEFINE INDEX resource_edge_predicate_idx ON resource_edge COLUMNS predicate;
