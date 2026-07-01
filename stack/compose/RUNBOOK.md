# MVP Stack Runbook

## 1. Start the stack

```bash
cd stack/compose
cp .env.example .env
# edit .env and replace all change-me values
docker compose up -d
```

## 2. Bootstrap SurrealDB

From the repository root:

```bash
SURREAL_PASS=<password-from-env> ./stack/compose/scripts/bootstrap-surreal.sh
```

## 3. Smoke test

```bash
./stack/compose/scripts/smoke-test.sh
```

## 4. Open surfaces

| Surface | Local URL |
|---|---|
| Gateway | http://localhost |
| Catalog API | http://localhost/api/catalog/health |
| Credential API | http://localhost/api/credentials/health |
| API Docs | http://localhost/docs |
| Moodle | http://localhost/moodle |
| Mahara | http://localhost/mahara |
| Mailpit | http://localhost/mail |

## 5. Current MVP status

| Capability | Status |
|---|---|
| Gateway | runnable |
| SurrealDB | runnable |
| Catalog API | implemented in separate service branch / image expected |
| Credential API | minimal MVP stub |
| Moodle | containerized external LMS surface |
| Mahara | containerized portfolio surface |
| API docs | Swagger UI configured |
| Email testing | Mailpit configured |

## 6. Production hardening needed

- Replace all default secrets.
- Publish Catalog and Credential service images.
- Add CI image builds.
- Add real DNS and TLS.
- Add auth and SSO.
- Add backup and restore.
- Add monitoring.
- Replace development credential placeholder with signed DID-bound VC issuance.
- Validate Mahara container image/version before production use.

## 7. Stack principle

Moodle and Mahara are external surfaces.

They integrate directly with Agent Academy APIs.

```text
Moodle -> Agent Academy API
Mahara -> Agent Academy API
```

No middleware or distribution layer in v1.
