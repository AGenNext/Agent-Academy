# Persistence Hardening Summary

This follow-up hardens the merged Kubernetes-native platform by adding SurrealDB-backed runtime persistence.

## Added

- SurrealDB HTTP client
- SurrealDB primitive repository
- shared repository interface
- SurrealDB-backed runtime entrypoint
- container entrypoint update
- persistence smoke-test updates
- release runbook persistence checks

## Runtime

The production container runs `dist/run-surreal.js`.

If SurrealDB environment variables are present, the API uses SurrealDB.

If they are absent, local development can still use the in-memory repository.
