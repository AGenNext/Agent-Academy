# OVH Deploy Summary

The platform can now be deployed from GitHub Actions using the `Deploy OVH VPS` manual workflow.

The workflow targets the GitHub environment named `ovh`, uploads the platform deployment bundle to the VPS, runs the Kubernetes bootstrap, initializes SurrealDB, updates the Platform API image, and executes the smoke test.
