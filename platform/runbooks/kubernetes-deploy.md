# Kubernetes Deployment

## Deploy command on the VPS

```bash
export SURREAL_USER='<from environment>'
export SURREAL_PASS='<from environment>'
export PLATFORM_API_IMAGE='ghcr.io/agennext/agent-academy-platform-api:latest'
./platform/scripts/deploy-kubernetes.sh
```

## What it does

- Applies Kubernetes platform manifests.
- Initializes SurrealDB.
- Applies ontology migration when present.
- Updates the Platform API image when `PLATFORM_API_IMAGE` is set.
- Waits for SurrealDB and Platform API rollout.
- Runs platform smoke tests.
- Runs ontology API smoke tests when present.

## Expected namespace

```text
agent-academy
```

## Acceptance

```bash
kubectl -n agent-academy get pods
kubectl -n agent-academy get svc
kubectl -n agent-academy get pvc
```
