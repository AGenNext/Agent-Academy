export type SfiaFramework = "SFIA";

export interface SfiaSkill {
  framework: SfiaFramework;
  frameworkVersion: string;
  skillCode: string;
  skillName: string;
  category?: string;
  subcategory?: string;
  description?: string;
  url?: string;
}

export interface SfiaSkillMapping {
  framework: SfiaFramework;
  frameworkVersion: string;
  skillCode: string;
  skillName?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  evidence?: string[];
  notes?: string;
}

export interface SfiaEvidenceRequirement {
  skillCode: string;
  minLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  requiredEvidenceTypes: Array<"course" | "lab" | "project" | "capstone" | "review" | "work_experience">;
}
