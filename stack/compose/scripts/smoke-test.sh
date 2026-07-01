#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost}"

echo "Checking gateway"
curl -fsS "$BASE_URL/health" >/dev/null

echo "Checking Catalog API"
curl -fsS "$BASE_URL/api/catalog/health" >/dev/null
curl -fsS "$BASE_URL/api/catalog/api/v1/courses" >/dev/null

echo "Checking Credential API"
curl -fsS "$BASE_URL/api/credentials/health" >/dev/null
curl -fsS "$BASE_URL/api/credentials/api/v1/credential-definitions" >/dev/null

echo "Checking docs"
curl -fsS "$BASE_URL/docs" >/dev/null

echo "MVP stack smoke test passed."
