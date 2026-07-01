# Credential Layer

Agent Academy credentials use four complementary standards and models:

```text
SFIA -> Open Badges -> Verifiable Credentials -> Digital Wallets
```

## Positioning

| Layer | Role |
|---|---|
| SFIA | external skills and competency framework |
| Open Badges | learner-facing achievement object |
| Verifiable Credentials | cryptographically verifiable proof format |
| DID | decentralized identifier for issuer, holder, verifier, and wallet subject |
| Digital Wallet | holder-controlled storage, sharing, and presentation surface |

## Standards Anchors

- W3C Verifiable Credentials Data Model v2.0 defines a model for expressing claims by issuers, securing them from tampering, and exchanging them between issuers, holders, and verifiers.
- W3C DID Core defines decentralized identifiers as identifiers that can be resolved to DID documents containing verification material and service endpoints.
- Open Badges 3.0 aligns badge assertions with verifiable credential patterns.
- SFIA provides the external skills framework for mapping academy outcomes to industry-recognized skill definitions and responsibility levels.

## Agent Academy Credential Rule

Agent Academy must not issue only a PDF certificate.

A learner achievement should produce:

1. An internal Academy record.
2. An Open Badge assertion for learner-facing achievement.
3. A Verifiable Credential for portable proof.
4. A DID-bound subject and issuer.
5. A wallet-deliverable credential package.
6. A verifier-facing verification endpoint or presentation flow.

## Roles

| Role | Meaning in Agent Academy |
|---|---|
| Issuer | Agent Academy, a partner institution, or an enterprise academy tenant |
| Holder | learner, instructor, reviewer, or organization wallet owner |
| Subject | learner or organization the credential is about |
| Verifier | employer, partner, university, enterprise admin, marketplace, or public verification page |
| Registry | DID resolver, credential status registry, schema registry, and revocation/status service |
| Wallet | learner-controlled digital wallet holding credentials and presentations |

## DID Usage

Agent Academy should use DIDs for:

- academy issuer identity
- partner issuer identity
- learner holder identity
- credential subject identity
- verifier identity when needed
- wallet binding
- credential status service endpoints

Example DID roles:

```text
did:example:academy       -> Agent Academy issuer
did:example:learner123    -> learner holder / subject
did:example:partner456    -> partner verifier or co-issuer
```

The DID method should remain pluggable. Do not bind the architecture to one DID method in v1.

## Open Badge + VC Relationship

An Open Badge should be representable as or inside a Verifiable Credential.

```text
BadgeClass
   -> achievement definition

AchievementSubject
   -> learner achievement facts

VerifiableCredential
   -> signed proof envelope
```

## SFIA Mapping

Every professional credential should map to one or more SFIA skills.

Minimum SFIA mapping fields:

```json
{
  "framework": "SFIA",
  "frameworkVersion": "9",
  "skillCode": "PROG",
  "skillName": "Programming/software development",
  "level": 3,
  "evidence": ["submission:capstone-123", "review:456"]
}
```

## Credential Object Model

```text
CredentialDefinition
  -> BadgeClass
  -> CredentialSchema
  -> CredentialRule
  -> SFIA Skill Mapping

CredentialIssuance
  -> Subject DID
  -> Issuer DID
  -> Evidence
  -> Open Badge Assertion
  -> Verifiable Credential
  -> Credential Status
  -> Wallet Delivery
```

## Minimum Credential Types

| Credential | Use |
|---|---|
| CourseCompletionCredential | course completion |
| SkillCredential | SFIA-mapped skill demonstration |
| ProjectCredential | project or lab evidence |
| CapstoneCredential | final capstone evidence |
| CertificationCredential | formal Academy certification |
| InstructorCredential | instructor authorization |
| ReviewerCredential | reviewer authorization |
| PartnerCredential | partner delivery authorization |

## Example VC Shape

```json
{
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
    "id": "did:example:learner123",
    "achievement": {
      "type": "Achievement",
      "name": "Agent Engineer",
      "description": "Demonstrated ability to build governed agent workflows."
    },
    "sfia": [
      {
        "framework": "SFIA",
        "frameworkVersion": "9",
        "skillCode": "PROG",
        "level": 3
      }
    ]
  }
}
```

## Wallet Flow

```text
Learner completes course
  -> Assessment Service validates evidence
  -> Certification Service checks credential rules
  -> Credential Service issues Open Badge VC
  -> Credential status entry is created
  -> Wallet delivery link or DIDComm/OID4VC flow is created
  -> Learner stores credential in wallet
  -> Verifier requests proof
  -> Learner presents VC or VP
  -> Verifier checks issuer DID, proof, status, schema, and policy
```

## Wallet Requirements

Agent Academy should support wallet delivery without forcing a single wallet provider.

Minimum wallet capabilities:

- receive credential
- store credential
- present credential
- export credential
- support holder DID
- support credential status checks
- support revocation or suspension status

## API Modules Required

```text
/credential-definitions
/credentials/issue
/credentials/{id}
/credentials/{id}/status
/credentials/verify
/presentations/verify
/wallets/link
/wallets/{id}/credentials
/sfia/skills
/sfia/mappings
/open-badges/classes
/open-badges/assertions
/dids
```

## Design Rule

PDF certificates are views.
Open Badges are achievement objects.
Verifiable Credentials are portable proof.
DIDs bind the issuer, holder, and verifier trust model.
Wallets give the learner control.
