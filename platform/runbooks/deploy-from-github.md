# Deploy from GitHub

Use the GitHub environment named `ovh`.

The repository has the Kubernetes deployment script at:

```text
platform/scripts/deploy-kubernetes.sh
```

The VPS deployment flow should:

```text
checkout repository
copy platform and services/platform-api to VPS
run platform/scripts/deploy-kubernetes.sh on the VPS
```

Required runtime values:

```text
SURREAL_USER
SURREAL_PASS
PLATFORM_API_IMAGE
```
