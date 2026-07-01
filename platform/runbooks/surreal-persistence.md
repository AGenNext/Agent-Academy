# SurrealDB Persistence Runbook

## Status

The platform now has a SurrealDB-backed repository implementation for primitive and relationship persistence.

## Files

- `services/platform-api/src/surreal.ts`
- `services/platform-api/src/repository.ts`
- `services/platform-api/src/server2.ts`
- `platform/scripts/smoke-test.sh`
- `platform/runbooks/release.md`

## Important integration note

`server2.ts` is the SurrealDB-backed server variant with the correct imports and async repository calls.

Before final merge, either:

1. Replace `services/platform-api/src/server.ts` with `server2.ts`, or
2. Rename `server2.ts` to `server.ts`.

The connector blocked the direct full-file update of `server.ts`, so the corrected server was committed as `server2.ts`.

## Runtime behavior

When these environment variables are present, the Platform API uses SurrealDB:

```text
SURREALDB_ENDPOINT
SURREALDB_NAMESPACE
SURREALDB_DATABASE
SURREAL_USER or SURREALDB_USERNAME
SURREAL_PASS or SURREALDB_PASSWORD
```

Without them, it falls back to the in-memory repository for local development.

## Verification

Run:

```bash
./platform/scripts/smoke-test.sh
```

The smoke test creates a unique Skill primitive and reads it back through the API query path.
