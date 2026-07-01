# Platform API Runtime

The container runs `dist/run-surreal.js`.

That runtime uses SurrealDB when the deployment environment provides the database endpoint, namespace, database name, and credentials.

The original in-memory server remains useful for local development.
