#!/usr/bin/env bash
set -euo pipefail

if ! command -v kubectl >/dev/null 2>&1; then
  echo "kubectl is required on the OVH VPS before deployment."
  exit 1
fi

chmod +x platform/scripts/*.sh

./platform/scripts/bootstrap.sh
./platform/scripts/init-surreal.sh

if [ -n "${PLATFORM_API_IMAGE:-}" ]; then
  kubectl -n agent-academy set image deployment/platform-api platform-api="$PLATFORM_API_IMAGE"
  kubectl -n agent-academy rollout status deployment/platform-api --timeout=180s
fi

./platform/scripts/smoke-test.sh

echo "OVH VPS deployment complete."
