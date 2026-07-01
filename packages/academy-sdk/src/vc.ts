import type { Did } from "./did.js";

export type CredentialStatusPurpose = "revocation" | "suspension" | "refresh";

export interface CredentialIssuer {
  id: Did | string;
  name?: string;
  url?: string;
}

export interface CredentialStatus {
  id: string;
  type: string;
  statusPurpose?: CredentialStatusPurpose;
  statusListIndex?: string;
  statusListCredential?: string;
}

export interface CredentialEvidence {
  id?: string;
  type: string | string[];
  name?: string;
  description?: string;
  url?: string;
  subject?: string;
  verifier?: string;
}

export interface VerifiableCredential<TSubject = Record<string, unknown>> {
  "@context": string | string[];
  id?: string;
  type: string[];
  issuer: CredentialIssuer | Did | string;
  validFrom?: string;
  validUntil?: string;
  credentialSubject: TSubject;
  credentialStatus?: CredentialStatus;
  credentialSchema?: Array<{ id: string; type: string }> | { id: string; type: string };
  evidence?: CredentialEvidence | CredentialEvidence[];
  proof?: Record<string, unknown> | Record<string, unknown>[];
}

export interface VerifiablePresentation<TCredential = VerifiableCredential> {
  "@context": string | string[];
  id?: string;
  type: string[];
  holder?: Did | string;
  verifiableCredential: TCredential[];
  proof?: Record<string, unknown> | Record<string, unknown>[];
}

export interface VerificationPolicy {
  trustedIssuers?: Array<Did | string>;
  requireActiveStatus?: boolean;
  requireSfiaMapping?: boolean;
  allowedCredentialTypes?: string[];
  acceptedSchemas?: string[];
}

export interface VerificationResult {
  verified: boolean;
  checks: Record<string, "passed" | "failed" | "skipped">;
  errors?: string[];
  warnings?: string[];
}
