# Academy SDK

Shared TypeScript contracts for Agent Academy services and external clients.

The SDK starts with the credential layer because credentials must remain portable across Moodle, Mahara, wallets, employers, partners, universities, and public verifiers.

## Credential Stack

```text
SFIA -> Open Badges -> Verifiable Credentials -> DID -> Digital Wallets
```

## Modules

| Module | Purpose |
|---|---|
| `credentials.ts` | credential definitions, issuance, verification, status |
| `sfia.ts` | SFIA skill and mapping types |
| `openbadges.ts` | Open Badge class and assertion contracts |
| `vc.ts` | W3C Verifiable Credential and presentation contracts |
| `wallet.ts` | wallet linking and delivery contracts |
| `did.ts` | DID and DID document contracts |
| `index.ts` | public exports |

## Design Rule

The SDK defines contracts. It does not hard-code one issuer, DID method, wallet vendor, LMS, or portfolio system.

## Usage Direction

Services should import SDK types and build domain logic on top:

```ts
import type { CredentialDefinition, CredentialIssuanceRequest } from "@agennext/academy-sdk";
```

External clients should consume API responses that match these contracts.
