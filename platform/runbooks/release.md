# Agent Academy Kubernetes-Native Release Runbook

## Scope

This runbook deploys only the Agent Academy platform runtime.

It does not deploy external systems.

## Prerequisites

- Kubernetes cluster
- `kubectl`
- working StorageClass
- container image for `ghcr.io/agennext/agent-academy-platform-api:latest`
- Prometheus-compatible scraper if metrics collection is required

## 1. Set secrets

```bash
export SURREAL_USER='<user>'
export SURREAL_PASS='<strong-password>'
```

## 2. Deploy platform

```bash
./platform/scripts/bootstrap.sh
```

## 3. Initialize SurrealDB

```bash
./platform/scripts/init-surreal.sh
```

## 4. Smoke test

```bash
./platform/scripts/smoke-test.sh
```

The smoke test creates a unique Skill primitive through the Platform API and reads it back through the query API. In the Kubernetes runtime, this verifies the SurrealDB-backed API path.

## 5. Verify Kubernetes objects

```bash
kubectl -n agent-academy get pods
kubectl -n agent-academy get svc
kubectl -n agent-academy get pvc
kubectl -n agent-academy get hpa
kubectl -n agent-academy get pdb
```

## 6. API test

```bash
kubectl -n agent-academy port-forward svc/platform-api 4000:80
curl http://127.0.0.1:4000/api/v1/primitives/catalog
```

## 7. Persistence test

```bash
curl -X POST http://127.0.0.1:4000/api/v1/primitives \
  -H 'content-type: application/json' \
  -d '{"kind":"Skill","identifier":"skill:persistence-check","name":"Persistence Check","status":"active","version":"0.1.0","data":{"source":"manual"}}'

curl http://127.0.0.1:4000/api/v1/primitives/skill:persistence-check
```

Restart the Platform API pod and repeat the read call. The record should remain available because SurrealDB is the canonical datastore.

## 8. Release acceptance criteria

- SurrealDB StatefulSet is ready.
- Platform API Deployment is ready.
- Platform API is configured with `SURREALDB_*` env vars.
- `/health` returns ok.
- `/ready` returns ready.
- `/metrics` exposes Prometheus metrics.
- Primitive catalog is returned.
- Primitive create/read works through SurrealDB-backed API path.
- Relationship create/list works through SurrealDB-backed API path.
- NetworkPolicy is applied.
- HPA and PDB are present.

## 9. Production hardening still required

- Replace placeholder image tag with immutable release tag.
- Add signed container images.
- Add backup and restore policy for SurrealDB PVC.
- Add OpenTelemetry exporter endpoint.
- Add ingress/gateway through the cluster standard.
- Add authentication and authorization.
- Add policy enforcement.
- Add CI/CD release workflow.
- Add ServiceMonitor if Prometheus Operator is installed.

## Boundary

External systems consume Agent Academy APIs through connectors or plugins. They are not deployed by this platform chart.
