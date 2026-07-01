#!/usr/bin/env bash
set -euo pipefail

SURREAL_URL="${SURREAL_URL:-http://localhost:8000}"
SURREAL_USER="${SURREAL_USER:-root}"
SURREAL_PASS="${SURREAL_PASS:-change-me}"
SURREAL_NS="${SURREAL_NS:-agennext}"
SURREAL_DB="${SURREAL_DB:-academy}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
SCHEMA_FILE="$ROOT_DIR/services/catalog/surreal/schema.surql"
SEED_FILE="$ROOT_DIR/services/catalog/surreal/seed.surql"

if ! command -v surreal >/dev/null 2>&1; then
  echo "surreal CLI is required to run this bootstrap script."
  exit 1
fi

echo "Applying Agent Academy Catalog schema to $SURREAL_URL ns=$SURREAL_NS db=$SURREAL_DB"
surreal sql --conn "$SURREAL_URL" --user "$SURREAL_USER" --pass "$SURREAL_PASS" --ns "$SURREAL_NS" --db "$SURREAL_DB" --file "$SCHEMA_FILE"

echo "Applying seed data"
surreal sql --conn "$SURREAL_URL" --user "$SURREAL_USER" --pass "$SURREAL_PASS" --ns "$SURREAL_NS" --db "$SURREAL_DB" --file "$SEED_FILE"

echo "SurrealDB bootstrap complete."
