#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="${NAMESPACE:-agent-academy}"
SURREAL_USER="${SURREAL_USER:-root}"
SURREAL_PASS="${SURREAL_PASS:-change-me}"
SURREAL_NS="${SURREAL_NS:-agennext}"
SURREAL_DB="${SURREAL_DB:-academy}"

POD="$(kubectl -n "$NAMESPACE" get pod -l app.kubernetes.io/name=surrealdb -o jsonpath='{.items[0].metadata.name}')"

kubectl -n "$NAMESPACE" cp platform/surreal/ontology-extension.surql "$POD":/tmp/ontology-extension.surql
kubectl -n "$NAMESPACE" cp platform/surreal/ontology-seed.surql "$POD":/tmp/ontology-seed.surql

kubectl -n "$NAMESPACE" exec "$POD" -- surreal sql --conn http://127.0.0.1:8000 --user "$SURREAL_USER" --pass "$SURREAL_PASS" --ns "$SURREAL_NS" --db "$SURREAL_DB" --file /tmp/ontology-extension.surql
kubectl -n "$NAMESPACE" exec "$POD" -- surreal sql --conn http://127.0.0.1:8000 --user "$SURREAL_USER" --pass "$SURREAL_PASS" --ns "$SURREAL_NS" --db "$SURREAL_DB" --file /tmp/ontology-seed.surql

echo "Ontology migration applied."
