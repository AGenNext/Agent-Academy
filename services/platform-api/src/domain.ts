import { z } from "zod";

export const PrimitiveKindSchema = z.enum([
  "Identity",
  "Account",
  "Organization",
  "Capability",
  "Skill",
  "Technology",
  "JobProfile",
  "LearningPath",
  "Resource",
  "Artifact",
  "Evidence",
  "Assessment",
  "Credential",
  "Wallet"
]);

export const StatusSchema = z.enum(["draft", "active", "archived", "deprecated", "suspended", "revoked"]);

export const PrimitiveSchema = z.object({
  kind: PrimitiveKindSchema,
  identifier: z.string().min(1),
  name: z.string().optional(),
  description: z.string().optional(),
  status: StatusSchema.default("draft"),
  version: z.string().default("0.1.0"),
  data: z.record(z.unknown()).default({}),
  created_by: z.string().optional(),
  updated_by: z.string().optional()
});

export const PatchPrimitiveSchema = PrimitiveSchema.partial().omit({ kind: true, identifier: true });

export const RelationshipSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  predicate: z.string().min(1),
  source_kind: PrimitiveKindSchema.optional(),
  target_kind: PrimitiveKindSchema.optional(),
  provenance: z.record(z.unknown()).optional(),
  confidence: z.number().min(0).max(1).optional(),
  status: z.enum(["active", "archived", "deprecated"]).default("active")
});

export const PrimitiveCatalog = {
  kinds: PrimitiveKindSchema.options,
  predicates: [
    "owns",
    "belongsTo",
    "teaches",
    "requires",
    "uses",
    "demonstrates",
    "assesses",
    "proves",
    "issues",
    "verifies",
    "mapsTo",
    "alignedTo",
    "dependsOn",
    "derivedFrom",
    "produces",
    "earnedBy",
    "issuedBy",
    "storedIn"
  ]
};

export type PrimitiveKind = z.infer<typeof PrimitiveKindSchema>;
export type Primitive = z.infer<typeof PrimitiveSchema>;
export type PatchPrimitive = z.infer<typeof PatchPrimitiveSchema>;
export type Relationship = z.infer<typeof RelationshipSchema>;
