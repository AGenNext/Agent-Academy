-- Agent Academy Catalog Service schema
-- Canonical course data is stored as schema.org JSON-LD in course.data.

DEFINE TABLE course SCHEMAFULL;
DEFINE FIELD data ON TABLE course TYPE object;
DEFINE FIELD data.`@context` ON TABLE course TYPE string ASSERT $value = 'https://schema.org';
DEFINE FIELD data.`@type` ON TABLE course TYPE string ASSERT $value = 'Course';
DEFINE FIELD data.`@id` ON TABLE course TYPE string;
DEFINE FIELD data.identifier ON TABLE course TYPE string;
DEFINE FIELD data.name ON TABLE course TYPE string;
DEFINE FIELD data.description ON TABLE course TYPE string;
DEFINE FIELD data.courseCode ON TABLE course TYPE string;
DEFINE FIELD data.provider ON TABLE course TYPE object;
DEFINE FIELD data.educationalLevel ON TABLE course FLEXIBLE TYPE any;
DEFINE FIELD data.learningResourceType ON TABLE course FLEXIBLE TYPE any;
DEFINE FIELD data.teaches ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.assesses ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.coursePrerequisites ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.educationalCredentialAwarded ON TABLE course FLEXIBLE TYPE any;
DEFINE FIELD data.numberOfCredits ON TABLE course FLEXIBLE TYPE any;
DEFINE FIELD data.syllabusSections ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.hasCourseInstance ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.keywords ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.agennext ON TABLE course TYPE object;
DEFINE FIELD data.agennext.slug ON TABLE course TYPE string;
DEFINE FIELD data.agennext.status ON TABLE course TYPE string ASSERT $value IN ['draft', 'active', 'archived', 'deprecated'];
DEFINE FIELD data.agennext.visibility ON TABLE course TYPE string ASSERT $value IN ['public', 'private', 'enterprise'];
DEFINE FIELD data.agennext.schools ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.agennext.programs ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.agennext.tags ON TABLE course FLEXIBLE TYPE array;
DEFINE FIELD data.agennext.version ON TABLE course TYPE string;
DEFINE FIELD data.dateCreated ON TABLE course TYPE option<string>;
DEFINE FIELD data.dateModified ON TABLE course TYPE option<string>;
DEFINE FIELD data.datePublished ON TABLE course TYPE option<string>;

DEFINE INDEX course_identifier_unique ON TABLE course COLUMNS data.identifier UNIQUE;
DEFINE INDEX course_slug_unique ON TABLE course COLUMNS data.agennext.slug UNIQUE;
DEFINE INDEX course_code_unique ON TABLE course COLUMNS data.courseCode UNIQUE;
DEFINE INDEX course_status_idx ON TABLE course COLUMNS data.agennext.status;

DEFINE TABLE audit_event SCHEMAFULL;
DEFINE FIELD action ON TABLE audit_event TYPE string;
DEFINE FIELD actor ON TABLE audit_event TYPE option<string>;
DEFINE FIELD resource_type ON TABLE audit_event TYPE string;
DEFINE FIELD resource_id ON TABLE audit_event TYPE option<string>;
DEFINE FIELD occurred_at ON TABLE audit_event TYPE string;
DEFINE FIELD metadata ON TABLE audit_event FLEXIBLE TYPE object;
DEFINE INDEX audit_action_idx ON TABLE audit_event COLUMNS action;
DEFINE INDEX audit_resource_idx ON TABLE audit_event COLUMNS resource_type, resource_id;
