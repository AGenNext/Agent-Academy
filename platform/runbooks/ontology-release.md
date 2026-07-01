# Ontology Release Runbook

## Release assets

- `platform/ontology/academy-ontology.yaml`
- `platform/surreal/ontology-extension.surql`
- `platform/surreal/ontology-seed.surql`
- `platform/openapi/ontology-api.yaml`
- `platform/scripts/apply-ontology.sh`
- `platform/scripts/check-ontology-release.sh`

## Apply to cluster

```bash
export SURREAL_USER='<user>'
export SURREAL_PASS='<password>'
./platform/scripts/apply-ontology.sh
```

## Validate release assets

```bash
./platform/scripts/check-ontology-release.sh
```

## Acceptance criteria

- Ontology is versioned.
- Resource base fields are defined.
- Resource, Profile, OntologyTerm, and ResourceEdge tables exist.
- Seed data creates Course, Skill, Profile, and ontology terms.
- OpenAPI contract exposes ontology, resources, profiles, and graph endpoints.
- CI validates release assets on PR.
