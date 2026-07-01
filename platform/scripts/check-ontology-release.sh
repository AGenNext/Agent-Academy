#!/usr/bin/env bash
set -euo pipefail

test -f platform/ontology/academy-ontology.yaml
test -f platform/surreal/ontology-extension.surql
test -f platform/surreal/ontology-seed.surql
test -f platform/openapi/ontology-api.yaml

grep -q "release-candidate" platform/ontology/academy-ontology.yaml
grep -q "DEFINE TABLE resource" platform/surreal/ontology-extension.surql
grep -q "DEFINE TABLE profile" platform/surreal/ontology-extension.surql
grep -q "Open Badges" platform/ontology/academy-ontology.yaml || grep -q "openBadges" platform/ontology/academy-ontology.yaml

echo "Ontology release checks passed."
