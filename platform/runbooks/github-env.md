# GitHub Environment

Deployment uses the GitHub environment named `ovh`.

Keep server access values in GitHub environment secrets.

The manual deploy workflow reads the OVH host, user, SSH key, SurrealDB user, and SurrealDB password from that environment.

The optional deploy directory can be set as an environment variable. If omitted, the workflow uses `/opt/agent-academy`.
