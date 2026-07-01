import type { Did } from "./did.js";
import type { OpenBadgeAchievement, OpenBadgeClass } from "./openbadges.js";
import type { SfiaEvidenceRequirement, SfiaSkillMapping } from "./sfia.js";
import type { VerifiableCredential, VerificationPolicy, VerificationResult } from "./vc.js";
import type { WalletDeliveryRequest, WalletDeliveryResult } from "./wallet.js";

export type CredentialDefinitionStatus = "draft" | "active" | "archived" | "deprecated";
export type CredentialIssuanceStatus = "requested" | "issued" | "rejected" | "revoked" | "suspended";

export interface CredentialRule {
  id: string;
  type: "course_completion" | "assessment_score" | "review_approval" | "evidence_required" | "sfia_required" | "custom";
  description: string;
  expression?: string;
  required?: boolean;
}

export interface CredentialDefinition {
  id: string;
  type: "CredentialDefinition";
  name: string;
  description: string;
  credentialTypes: string[];
  issuerDid: Did | string;
  badgeClass?: OpenBadgeClass;
  achievement?: OpenBadgeAchievement;
  rules: CredentialRule[];
  sfiaMappings: SfiaSkillMapping[];
  sfiaRequirements?: SfiaEvidenceRequirement[];
  validFor?: string;
  status: CredentialDefinitionStatus;
  version: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CredentialIssuanceRequest {
  credentialDefinitionId: string;
  subjectDid: Did | string;
  holderDid?: Did | string;
  evidence: string[];
  delivery?: Omit<WalletDeliveryRequest, "credentialId">;
  metadata?: Record<string, unknown>;
}

export interface CredentialIssuanceRecord<TSubject = Record<string, unknown>> {
  id: string;
  credentialDefinitionId: string;
  status: CredentialIssuanceStatus;
  subjectDid: Did | string;
  holderDid?: Did | string;
  issuerDid: Did | string;
  credential?: VerifiableCredential<TSubject>;
  evidence: string[];
  walletDelivery?: WalletDeliveryResult;
  issuedAt?: string;
  updatedAt?: string;
  error?: string;
}

export interface CredentialIssuerService {
  issue(request: CredentialIssuanceRequest): Promise<CredentialIssuanceRecord>;
  revoke(credentialId: string, reason?: string): Promise<CredentialIssuanceRecord>;
  suspend(credentialId: string, reason?: string): Promise<CredentialIssuanceRecord>;
}

export interface CredentialVerifierService {
  verifyCredential(credential: VerifiableCredential, policy?: VerificationPolicy): Promise<VerificationResult>;
}
