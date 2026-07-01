#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="${NAMESPACE:-agent-academy}"
SURREAL_USER="${SURREAL_USER:-root}"
SURREAL_PASS="${SURREAL_PASS:-change-me}"
SURREAL_NS="${SURREAL_NS:-agennext}"
SURREAL_DB="${SURREAL_DB:-academy}"

kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

kubectl -n "$NAMESPACE" create secret generic surrealdb-secret \
  --from-literal=SURREAL_USER="$SURREAL_USER" \
  --from-literal=SURREAL_PASS="$SURREAL_PASS" \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -f platform/helm/agent-academy/templates/namespace.yaml
kubectl apply -f platform/helm/agent-academy/templates/surrealdb.yaml
kubectl apply -f platform/helm/agent-academy/templates/platform-api.yaml
kubectl apply -f platform/helm/agent-academy/templates/networkpolicy.yaml

echo "Waiting for SurrealDB"
kubectl -n "$NAMESPACE" rollout status statefulset/surrealdb --timeout=180s

echo "Waiting for platform API"
kubectl -n "$NAMESPACE" rollout status deployment/platform-api --timeout=180s

echo "Platform bootstrap complete."
echo "Next: run platform/scripts/init-surreal.sh"
