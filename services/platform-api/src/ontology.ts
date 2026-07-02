import { z } from "zod";

export const ResourceStatusSchema = z.enum(["draft", "review", "approved", "published", "active", "deprecated", "archived", "revoked"]);
export const VisibilitySchema = z.enum(["private", "organization", "public", "restricted"]);

export const ResourceSchema = z.object({
  identifier: z.string().min(1),
  kind: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  version: z.string().default("0.1.0"),
  status: ResourceStatusSchema.default("draft"),
  owner: z.string().optional(),
  tenantId: z.string().optional(),
  workspaceId: z.string().optional(),
  visibility: VisibilitySchema.default("private"),
  language: z.string().optional(),
  tags: z.array(z.string()).default([]),
  labels: z.record(z.unknown()).default({}),
  provenance: z.record(z.unknown()).default({}),
  trustScore: z.number().min(0).max(1).optional(),
  data: z.record(z.unknown()).default({}),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional()
});

export const ProfileSchema = z.object({
  identifier: z.string().min(1),
  profileType: z.enum(["LearnerProfile", "InstructorProfile", "OrganizationProfile", "JobProfile", "CourseProfile", "SkillProfile", "CredentialProfile"]),
  subject: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  status: ResourceStatusSchema.default("draft"),
  version: z.string().default("0.1.0"),
  components: z.array(z.string()).default([]),
  data: z.record(z.unknown()).default({})
});

export const OntologyTermSchema = z.object({
  identifier: z.string().min(1),
  layer: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["draft", "active", "deprecated", "archived"]).default("active"),
  mappings: z.array(z.string()).default([]),
  data: z.record(z.unknown()).default({})
});

export const ResourceEdgeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  predicate: z.string().min(1),
  provenance: z.record(z.unknown()).default({}),
  confidence: z.number().min(0).max(1).optional()
});

export type Resource = z.infer<typeof ResourceSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type OntologyTerm = z.infer<typeof OntologyTermSchema>;
export type ResourceEdge = z.infer<typeof ResourceEdgeSchema>;
