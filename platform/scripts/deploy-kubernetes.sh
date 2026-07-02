#!/usr/bin/env bash
set -euo pipefail

chmod +x platform/scripts/*.sh

./platform/scripts/bootstrap.sh
./platform/scripts/init-surreal.sh

if [ -f platform/scripts/apply-ontology.sh ]; then
  ./platform/scripts/apply-ontology.sh
fi

if [ -n "${PLATFORM_API_IMAGE:-}" ]; then
  kubectl -n agent-academy set image deployment/platform-api platform-api="$PLATFORM_API_IMAGE"
fi

kubectl -n agent-academy rollout status statefulset/surrealdb --timeout=180s
kubectl -n agent-academy rollout status deployment/platform-api --timeout=180s

./platform/scripts/smoke-test.sh

if [ -f platform/scripts/smoke-test-ontology-api.sh ]; then
  kubectl -n agent-academy port-forward svc/platform-api 4000:80 >/tmp/agent-academy-ontology-port-forward.log 2>&1 &
  PF_PID=$!
  trap 'kill $PF_PID >/dev/null 2>&1 || true' EXIT
  sleep 3
  BASE_URL=http://127.0.0.1:4000 ./platform/scripts/smoke-test-ontology-api.sh
fi

echo "Kubernetes deployment complete."
