# Agent Academy Kubernetes-Native Platform

Agent Academy is a Kubernetes-native, API-first platform with SurrealDB as the single canonical datastore.

External systems integrate through APIs. They are not part of the platform runtime.

## Platform Scope

```text
Agent Academy Platform
├── API Gateway
├── Identity Service
├── Account Service
├── Organization Service
├── Capability Service
├── Skill Service
├── Technology Service
├── Job Profile Service
├── Learning Path Service
├── Resource Service
├── Artifact Service
├── Evidence Service
├── Assessment Service
├── Credential Service
├── Wallet Service
├── Relationship Service
├── Event Service
├── Audit Service
├── Search Service
└── SurrealDB
```

## Primitives

```text
Identity
Account
Organization
Capability
Skill
Technology
Job Profile
Learning Path
Resource
Artifact
Evidence
Assessment
Credential
Wallet
Relationship
```

## Runtime Rule

```text
Every canonical platform record lives in SurrealDB.
Every domain service exposes REST, OpenAPI, events, health, readiness, and metrics.
Every relationship is modeled as data, not hardcoded application behavior.
```

## CNCF-Native Baseline

| Layer | Tooling |
|---|---|
| Orchestration | Kubernetes |
| Packaging | Helm-style manifests |
| Metrics | Prometheus-compatible `/metrics` endpoints |
| Telemetry | OpenTelemetry environment hooks |
| Dashboards | Grafana-compatible labels and metrics |
| Secrets | Kubernetes Secrets initially |
| Networking | Kubernetes Service + optional Gateway/Ingress supplied by cluster |
| Storage | Kubernetes PVC / StorageClass |

## No External Application Stack

This platform does not deploy Moodle, Mahara, ORCID, IEEE, GitHub, or any other external system.

Those integrations are clients and connectors.

## Release Layout

```text
platform/
├── domain/
├── openapi/
├── surreal/
├── helm/agent-academy/
├── runbooks/
└── scripts/

services/
├── platform-api/
└── credential/

packages/
└── academy-sdk/
```

## MVP Flow

```text
Create identity
  -> connect account
  -> define skills and technologies
  -> define job profile
  -> generate learning path
  -> attach resources
  -> submit artifact
  -> create evidence
  -> assess evidence
  -> issue credential
  -> deliver to wallet
  -> verify credential
```
