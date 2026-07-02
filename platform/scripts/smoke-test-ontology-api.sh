#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:4000}"
STAMP="$(date +%s)"
COURSE="course:smoke-$STAMP"
SKILL="skill:smoke-$STAMP"
PROFILE="profile:smoke-$STAMP"
TERM="term:smoke-$STAMP"

curl -fsS "$BASE_URL/api/v1/ontology" >/dev/null

curl -fsS -X POST "$BASE_URL/api/v1/ontology/terms" \
  -H 'content-type: application/json' \
  -d "{\"identifier\":\"$TERM\",\"layer\":\"competency\",\"name\":\"Smoke Term\",\"status\":\"active\"}" >/dev/null

curl -fsS -X POST "$BASE_URL/api/v1/resources" \
  -H 'content-type: application/json' \
  -d "{\"identifier\":\"$COURSE\",\"kind\":\"Course\",\"name\":\"Smoke Course\",\"version\":\"0.1.0\",\"status\":\"published\",\"visibility\":\"public\"}" >/dev/null

curl -fsS -X POST "$BASE_URL/api/v1/resources" \
  -H 'content-type: application/json' \
  -d "{\"identifier\":\"$SKILL\",\"kind\":\"Skill\",\"name\":\"Smoke Skill\",\"version\":\"0.1.0\",\"status\":\"published\",\"visibility\":\"public\"}" >/dev/null

curl -fsS -X POST "$BASE_URL/api/v1/graph/resources" \
  -H 'content-type: application/json' \
  -d "{\"from\":\"$COURSE\",\"to\":\"$SKILL\",\"predicate\":\"teaches\",\"confidence\":1}" >/dev/null

curl -fsS -X POST "$BASE_URL/api/v1/profiles" \
  -H 'content-type: application/json' \
  -d "{\"identifier\":\"$PROFILE\",\"profileType\":\"LearnerProfile\",\"subject\":\"identity:smoke\",\"name\":\"Smoke Profile\",\"status\":\"active\",\"version\":\"0.1.0\",\"components\":[\"$SKILL\"]}" >/dev/null

curl -fsS "$BASE_URL/api/v1/resources/$COURSE" | grep "$COURSE" >/dev/null
curl -fsS "$BASE_URL/api/v1/graph/resources?resource=$COURSE" | grep "teaches" >/dev/null

echo "Ontology API smoke test passed."
