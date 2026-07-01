# OVH VPS Deployment

This runbook deploys the Kubernetes-native Agent Academy platform to the GitHub environment named `ovh`.

## Required GitHub environment

Create or update the GitHub environment:

```text
ovh
```

## Required environment secrets

```text
OVH_HOST
OVH_USER
OVH_SSH_PRIVATE_KEY
SURREAL_USER
SURREAL_PASS
```

## Optional environment secrets / variables

```text
OVH_SSH_PORT
OVH_DEPLOY_DIR
```

Default values:

```text
OVH_SSH_PORT=22
OVH_DEPLOY_DIR=/opt/agent-academy
```

## VPS prerequisites

The OVH VPS must already have:

```text
kubectl
Kubernetes access configured for the deployment user
working default StorageClass
```

## Deploy from GitHub Actions

Run workflow:

```text
Deploy OVH VPS
```

Choose the image tag. Default is:

```text
latest
```

## What the workflow does

```text
checkout repo
prepare SSH key
create remote deploy directory
rsync platform files to VPS
run platform/scripts/deploy-ovh.sh remotely
```

## What the remote deploy script does

```text
bootstrap Kubernetes manifests
initialize SurrealDB schema and seed
set Platform API image
wait for rollout
run smoke test
```

## Boundary

This deploys only Agent Academy platform components.

External systems remain API clients/connectors.
