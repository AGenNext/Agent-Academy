# SurrealDB Persistence Follow-up

This branch adds a SurrealDB-backed repository for the Platform API.

## Added

- `services/platform-api/src/surreal.ts`
- shared `PlatformRepository` interface in `services/platform-api/src/repository.ts`
- runtime-ready smoke test that creates and reads a unique primitive
- release runbook persistence verification steps

## Required before merge

Update `services/platform-api/src/server.ts` imports so the repository interface comes from `repository.ts` and the SurrealDB adapter comes from `surreal.ts`.

```ts
import { PrimitiveRepository, type PlatformRepository } from "./repository.js";
import { SurrealHttpClient, SurrealPrimitiveRepository, surrealConfigFromEnv } from "./surreal.js";
```

The rest of the server is already async-compatible and calls `await repository.*`.

## Runtime behavior

If `SURREALDB_ENDPOINT`, `SURREALDB_NAMESPACE`, `SURREALDB_DATABASE`, and credentials are present, the Platform API uses SurrealDB.

If not, it falls back to the in-memory repository for local development.
