#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="${NAMESPACE:-agent-academy}"
LOCAL_PORT="${LOCAL_PORT:-4000}"
IDENTIFIER="skill:smoke-test-$(date +%s)"

kubectl -n "$NAMESPACE" port-forward svc/platform-api "$LOCAL_PORT":80 >/tmp/agent-academy-platform-api-port-forward.log 2>&1 &
PF_PID=$!
trap 'kill $PF_PID >/dev/null 2>&1 || true' EXIT

sleep 3

BASE_URL="http://127.0.0.1:$LOCAL_PORT"

echo "Checking health"
curl -fsS "$BASE_URL/health" >/dev/null

echo "Checking readiness"
curl -fsS "$BASE_URL/ready" >/dev/null

echo "Checking metrics"
curl -fsS "$BASE_URL/metrics" | grep agent_academy_platform_api_up >/dev/null

echo "Checking primitive catalog"
curl -fsS "$BASE_URL/api/v1/primitives/catalog" >/dev/null

echo "Creating primitive in canonical datastore"
curl -fsS -X POST "$BASE_URL/api/v1/primitives" \
  -H 'content-type: application/json' \
  -d "{\"kind\":\"Skill\",\"identifier\":\"$IDENTIFIER\",\"name\":\"Smoke Test Skill\",\"status\":\"active\",\"version\":\"0.1.0\",\"data\":{\"proficiency\":\"basic\"}}" >/dev/null

echo "Reading primitive back through API"
curl -fsS "$BASE_URL/api/v1/primitives/$IDENTIFIER" | grep "$IDENTIFIER" >/dev/null

echo "Listing persisted primitive through query API"
curl -fsS "$BASE_URL/api/v1/primitives?q=Smoke%20Test%20Skill" | grep "$IDENTIFIER" >/dev/null

echo "Platform smoke test passed."
