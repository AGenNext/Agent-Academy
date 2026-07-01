-- Agent Academy platform schema
-- SurrealDB is the canonical datastore for all platform primitives.

DEFINE TABLE primitive SCHEMAFULL;
DEFINE FIELD kind ON primitive TYPE string ASSERT $value IN ['Identity','Account','Organization','Capability','Skill','Technology','JobProfile','LearningPath','Resource','Artifact','Evidence','Assessment','Credential','Wallet'];
DEFINE FIELD identifier ON primitive TYPE string;
DEFINE FIELD name ON primitive TYPE option<string>;
DEFINE FIELD description ON primitive TYPE option<string>;
DEFINE FIELD status ON primitive TYPE string ASSERT $value IN ['draft','active','archived','deprecated','suspended','revoked'];
DEFINE FIELD version ON primitive TYPE string;
DEFINE FIELD data ON primitive FLEXIBLE TYPE object;
DEFINE FIELD created_at ON primitive TYPE datetime DEFAULT time::now();
DEFINE FIELD updated_at ON primitive TYPE datetime DEFAULT time::now();
DEFINE FIELD created_by ON primitive TYPE option<string>;
DEFINE FIELD updated_by ON primitive TYPE option<string>;
DEFINE INDEX primitive_identifier_unique ON primitive COLUMNS identifier UNIQUE;
DEFINE INDEX primitive_kind_idx ON primitive COLUMNS kind;
DEFINE INDEX primitive_status_idx ON primitive COLUMNS status;

DEFINE TABLE relationship TYPE RELATION IN primitive OUT primitive SCHEMAFULL;
DEFINE FIELD predicate ON relationship TYPE string;
DEFINE FIELD source_kind ON relationship TYPE string;
DEFINE FIELD target_kind ON relationship TYPE string;
DEFINE FIELD provenance ON relationship FLEXIBLE TYPE option<object>;
DEFINE FIELD confidence ON relationship TYPE option<float>;
DEFINE FIELD status ON relationship TYPE string ASSERT $value IN ['active','archived','deprecated'];
DEFINE FIELD created_at ON relationship TYPE datetime DEFAULT time::now();
DEFINE INDEX relationship_predicate_idx ON relationship COLUMNS predicate;

DEFINE TABLE event SCHEMAFULL;
DEFINE FIELD type ON event TYPE string;
DEFINE FIELD subject ON event TYPE option<string>;
DEFINE FIELD actor ON event TYPE option<string>;
DEFINE FIELD data ON event FLEXIBLE TYPE object;
DEFINE FIELD occurred_at ON event TYPE datetime DEFAULT time::now();
DEFINE INDEX event_type_idx ON event COLUMNS type;
DEFINE INDEX event_subject_idx ON event COLUMNS subject;

DEFINE TABLE audit_event SCHEMAFULL;
DEFINE FIELD action ON audit_event TYPE string;
DEFINE FIELD actor ON audit_event TYPE option<string>;
DEFINE FIELD resource_type ON audit_event TYPE string;
DEFINE FIELD resource_id ON audit_event TYPE option<string>;
DEFINE FIELD decision ON audit_event TYPE option<string>;
DEFINE FIELD metadata ON audit_event FLEXIBLE TYPE object;
DEFINE FIELD occurred_at ON audit_event TYPE datetime DEFAULT time::now();
DEFINE INDEX audit_action_idx ON audit_event COLUMNS action;
DEFINE INDEX audit_resource_idx ON audit_event COLUMNS resource_type, resource_id;

DEFINE TABLE credential_status SCHEMAFULL;
DEFINE FIELD credential_id ON credential_status TYPE string;
DEFINE FIELD status ON credential_status TYPE string ASSERT $value IN ['active','revoked','suspended','expired'];
DEFINE FIELD reason ON credential_status TYPE option<string>;
DEFINE FIELD updated_at ON credential_status TYPE datetime DEFAULT time::now();
DEFINE INDEX credential_status_id_unique ON credential_status COLUMNS credential_id UNIQUE;
