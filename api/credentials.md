# Credential API Plan

The Credential API issues, verifies, stores, and maps Agent Academy achievements to Open Badges, Verifiable Credentials, SFIA skills, DIDs, and digital wallets.

## Core Endpoints

```text
GET    /api/v1/credential-definitions
POST   /api/v1/credential-definitions
GET    /api/v1/credential-definitions/{id}
PATCH  /api/v1/credential-definitions/{id}

POST   /api/v1/credentials/issue
GET    /api/v1/credentials/{id}
GET    /api/v1/credentials/{id}/status
PATCH  /api/v1/credentials/{id}/status
POST   /api/v1/credentials/verify

POST   /api/v1/presentations/verify

GET    /api/v1/open-badges/classes
POST   /api/v1/open-badges/classes
GET    /api/v1/open-badges/assertions/{id}

GET    /api/v1/sfia/skills
POST   /api/v1/sfia/mappings
GET    /api/v1/sfia/mappings/{id}

POST   /api/v1/wallets/link
GET    /api/v1/wallets/{wallet_id}/credentials
POST   /api/v1/wallets/{wallet_id}/credentials/{credential_id}/deliver

GET    /api/v1/dids/{did}
POST   /api/v1/dids/resolve
```

## Credential Definition

A credential definition is the reusable rule and metadata object.

```json
{
  "id": "credential-definition:agent-engineer",
  "type": "CredentialDefinition",
  "name": "Agent Engineer",
  "credentialTypes": ["VerifiableCredential", "OpenBadgeCredential", "SkillCredential"],
  "badgeClass": "badge-class:agent-engineer",
  "rules": [
    "course:surrealdb-foundations completed",
    "course:claude-as-a-course completed",
    "capstone approved"
  ],
  "sfiaMappings": [
    {
      "framework": "SFIA",
      "frameworkVersion": "9",
      "skillCode": "PROG",
      "level": 3
    }
  ],
  "issuerDid": "did:example:agennext-academy",
  "status": "active"
}
```

## Issuance Request

```json
{
  "credentialDefinitionId": "credential-definition:agent-engineer",
  "subjectDid": "did:example:learner123",
  "holderDid": "did:example:learner123",
  "evidence": [
    "enrollment:abc",
    "submission:capstone-123",
    "review:456"
  ],
  "delivery": {
    "mode": "wallet-link",
    "walletId": "wallet:learner123"
  }
}
```

## Issuance Response

```json
{
  "data": {
    "id": "credential:agent-engineer:learner123",
    "status": "issued",
    "credential": {
      "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
        "https://schema.org"
      ],
      "type": ["VerifiableCredential", "OpenBadgeCredential", "SkillCredential"],
      "issuer": {
        "id": "did:example:agennext-academy",
        "name": "AGenNext Agent Academy"
      },
      "credentialSubject": {
        "id": "did:example:learner123"
      }
    },
    "walletDelivery": {
      "mode": "wallet-link",
      "status": "pending"
    }
  },
  "meta": {
    "version": "v1"
  }
}
```

## Verification Request

```json
{
  "credential": {},
  "policy": {
    "trustedIssuers": ["did:example:agennext-academy"],
    "requireActiveStatus": true,
    "requireSfiaMapping": true
  }
}
```

## Verification Decision

```json
{
  "data": {
    "verified": true,
    "checks": {
      "proof": "passed",
      "issuer": "passed",
      "status": "passed",
      "schema": "passed",
      "policy": "passed"
    }
  }
}
```

## v1 Rule

The first implementation may generate unsigned development credentials for local testing, but production credentials must be signed and DID-bound before public issuance.
