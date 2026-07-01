# Agent Academy MVP Stack

This stack makes Agent Academy runnable as a small self-hosted platform.

## Goal

Provide a deployable MVP where:

```text
Moodle is the external LMS surface.
Mahara is the portfolio surface.
Agent Academy APIs are the system of record.
SurrealDB stores canonical Academy records.
Caddy routes public traffic.
OpenAPI docs expose the API contract.
```

## Components

| Component | Role |
|---|---|
| Caddy | TLS-ready reverse proxy and external routing |
| SurrealDB | canonical data store for Agent Academy services |
| Catalog API | schema.org-aligned Course API |
| Credential API | stub service for credentials, Open Badges, VCs, DID, wallets |
| Swagger UI | API documentation surface |
| Moodle | external LMS surface |
| Mahara | learner portfolio surface |
| MariaDB | Moodle/Mahara relational database |
| Mailpit | local/dev email capture |

## MVP Flow

```text
Learner enters Moodle
  -> Moodle reads course catalog from Agent Academy API
  -> learner launches or completes activity
  -> Agent Academy records course/evidence/credential state
  -> Mahara displays portfolio artifacts
  -> Credential API issues development credential payload
```

## Local Run

```bash
cd stack/compose
cp .env.example .env
docker compose up -d
```

Then open:

| Surface | URL |
|---|---|
| Caddy gateway | http://localhost |
| Catalog API | http://localhost/api/catalog/health |
| Credential API | http://localhost/api/credentials/health |
| API docs | http://localhost/docs |
| Moodle | http://localhost/moodle |
| Mahara | http://localhost/mahara |
| Mailpit | http://localhost/mail |

## Production Notes

- Replace dev credentials before deployment.
- Use real DNS and TLS through Caddy.
- Use managed secrets or sealed secrets.
- Put Moodle and Mahara behind SSO once Agent Identity is ready.
- Replace development credential signing with DID-bound production issuance.

## Stack Rule

The stack is intentionally direct:

```text
Moodle -> Agent Academy APIs
Mahara -> Agent Academy APIs
```

No distribution layer. No middleware. No LMS abstraction in v1.
