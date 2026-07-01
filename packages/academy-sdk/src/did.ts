export type Did = `did:${string}:${string}`;

export interface DidVerificationMethod {
  id: string;
  type: string;
  controller: Did;
  publicKeyJwk?: Record<string, unknown>;
  publicKeyMultibase?: string;
}

export interface DidService {
  id: string;
  type: string;
  serviceEndpoint: string | string[] | Record<string, unknown>;
}

export interface DidDocument {
  "@context"?: string | string[];
  id: Did;
  controller?: Did | Did[];
  verificationMethod?: DidVerificationMethod[];
  authentication?: Array<string | DidVerificationMethod>;
  assertionMethod?: Array<string | DidVerificationMethod>;
  keyAgreement?: Array<string | DidVerificationMethod>;
  service?: DidService[];
}

export interface DidResolutionResult {
  didDocument?: DidDocument;
  didResolutionMetadata: Record<string, unknown>;
  didDocumentMetadata: Record<string, unknown>;
}

export interface DidResolver {
  resolve(did: Did): Promise<DidResolutionResult>;
}
