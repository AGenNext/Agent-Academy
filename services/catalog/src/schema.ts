import { z } from "zod";

export const JsonLdId = z.string().min(1);
export const UrlString = z.string().url();
export const IsoDateTime = z.string().datetime({ offset: true });

export const OrganizationSchema = z.object({
  "@type": z.literal("Organization"),
  "@id": JsonLdId.optional(),
  name: z.string().min(1),
  url: UrlString.optional()
});

export const PersonSchema = z.object({
  "@type": z.literal("Person"),
  "@id": JsonLdId.optional(),
  name: z.string().min(1),
  url: UrlString.optional()
});

export const DefinedTermSchema = z.object({
  "@type": z.literal("DefinedTerm"),
  "@id": JsonLdId.optional(),
  name: z.string().min(1),
  termCode: z.string().optional(),
  inDefinedTermSet: z.string().optional(),
  url: UrlString.optional()
});

export const AlignmentObjectSchema = z.object({
  "@type": z.literal("AlignmentObject"),
  alignmentType: z.string().min(1),
  targetName: z.string().min(1),
  targetUrl: UrlString.optional(),
  targetDescription: z.string().optional(),
  educationalFramework: z.string().optional()
});

export const EducationalOccupationalCredentialSchema = z.object({
  "@type": z.literal("EducationalOccupationalCredential"),
  "@id": JsonLdId.optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  credentialCategory: z.string().optional(),
  recognizedBy: OrganizationSchema.optional(),
  url: UrlString.optional()
});

export const MonetaryAmountSchema = z.object({
  "@type": z.literal("MonetaryAmount"),
  currency: z.string().min(3).max(3),
  value: z.number().nonnegative()
});

export const OfferSchema = z.object({
  "@type": z.literal("Offer"),
  price: z.union([z.number().nonnegative(), z.string()]).optional(),
  priceCurrency: z.string().min(3).max(3).optional(),
  availability: z.string().optional(),
  url: UrlString.optional()
});

export const SyllabusSchema = z.object({
  "@type": z.literal("Syllabus"),
  "@id": JsonLdId.optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  position: z.number().int().positive().optional(),
  timeRequired: z.string().optional(),
  teaches: z.array(z.union([z.string(), DefinedTermSchema])).optional(),
  assesses: z.array(z.union([z.string(), DefinedTermSchema])).optional()
});

export const CourseInstanceSchema = z.object({
  "@type": z.literal("CourseInstance"),
  "@id": JsonLdId.optional(),
  name: z.string().optional(),
  courseMode: z.union([z.string(), z.array(z.string())]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.union([z.string(), z.object({ "@type": z.string(), name: z.string().optional(), url: UrlString.optional() })]).optional(),
  instructor: z.union([PersonSchema, OrganizationSchema, z.array(z.union([PersonSchema, OrganizationSchema]))]).optional(),
  offers: z.union([OfferSchema, z.array(OfferSchema)]).optional()
});

export const CourseSchema = z.object({
  "@context": z.literal("https://schema.org").default("https://schema.org"),
  "@type": z.literal("Course"),
  "@id": JsonLdId,
  identifier: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  alternateName: z.string().optional(),
  courseCode: z.string().min(1),
  url: UrlString.optional(),
  provider: OrganizationSchema,
  creator: z.union([PersonSchema, OrganizationSchema]).optional(),
  author: z.union([PersonSchema, OrganizationSchema, z.array(z.union([PersonSchema, OrganizationSchema]))]).optional(),
  maintainer: z.union([PersonSchema, OrganizationSchema]).optional(),
  inLanguage: z.string().default("en"),
  availableLanguage: z.array(z.string()).optional(),
  educationalLevel: z.union([z.string(), DefinedTermSchema]),
  learningResourceType: z.union([z.string(), DefinedTermSchema]).default("Course"),
  educationalUse: z.array(z.union([z.string(), DefinedTermSchema])).optional(),
  teaches: z.array(z.union([z.string(), DefinedTermSchema])).min(1),
  assesses: z.array(z.union([z.string(), DefinedTermSchema])).optional(),
  competencyRequired: z.array(z.union([z.string(), DefinedTermSchema])).optional(),
  coursePrerequisites: z.array(z.union([z.string(), AlignmentObjectSchema, z.object({ "@type": z.literal("Course"), "@id": JsonLdId, name: z.string().optional() })])).optional(),
  educationalCredentialAwarded: z.union([z.string(), UrlString, EducationalOccupationalCredentialSchema]).optional(),
  occupationalCredentialAwarded: z.union([z.string(), UrlString, EducationalOccupationalCredentialSchema]).optional(),
  numberOfCredits: z.union([z.number().int().nonnegative(), z.object({ "@type": z.literal("StructuredValue"), value: z.number(), unitText: z.string().optional() })]).optional(),
  syllabusSections: z.array(SyllabusSchema).optional(),
  hasCourseInstance: z.array(CourseInstanceSchema).optional(),
  about: z.array(z.union([z.string(), DefinedTermSchema])).optional(),
  keywords: z.array(z.string()).optional(),
  isAccessibleForFree: z.boolean().optional(),
  offers: z.union([OfferSchema, z.array(OfferSchema)]).optional(),
  license: z.string().optional(),
  creativeWorkStatus: z.enum(["Draft", "Published", "Archived", "Deprecated"]).default("Draft"),
  dateCreated: z.string().optional(),
  dateModified: z.string().optional(),
  datePublished: z.string().optional(),
  totalHistoricalEnrollment: z.number().int().nonnegative().optional(),
  agennext: z.object({
    slug: z.string().min(1),
    status: z.enum(["draft", "active", "archived", "deprecated"]),
    visibility: z.enum(["public", "private", "enterprise"]),
    schools: z.array(z.string()).default([]),
    programs: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    version: z.string().default("0.1.0")
  })
});

export const CreateCourseSchema = CourseSchema.omit({ dateCreated: true, dateModified: true }).extend({
  datePublished: z.string().optional()
});

export const PatchCourseSchema = CourseSchema.partial().omit({ "@context": true, "@type": true, "@id": true, identifier: true });

export type Course = z.infer<typeof CourseSchema>;
export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type PatchCourseInput = z.infer<typeof PatchCourseSchema>;
