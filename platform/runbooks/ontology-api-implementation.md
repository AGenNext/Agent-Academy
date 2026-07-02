# Ontology API Implementation

## Added runtime endpoints

```text
GET  /api/v1/ontology
GET  /api/v1/ontology/terms
POST /api/v1/ontology/terms
GET  /api/v1/resources
POST /api/v1/resources
GET  /api/v1/resources/{identifier}
GET  /api/v1/profiles
POST /api/v1/profiles
GET  /api/v1/graph/resources
POST /api/v1/graph/resources
```

## Smoke test

Start Platform API locally, then run:

```bash
BASE_URL=http://127.0.0.1:4000 ./platform/scripts/smoke-test-ontology-api.sh
```

## CI

The Platform API workflow now runs tests before build.

## Release acceptance

- Ontology metadata returns successfully.
- Ontology terms can be created and listed.
- Resources can be created and read.
- Profiles can be created.
- Resource graph edges can be created and listed.
- Route tests cover the end-to-end ontology API flow.
