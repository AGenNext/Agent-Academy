import Fastify from "fastify";
import cors from "@fastify/cors";

export function buildServer() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });

  app.get("/health", async () => ({
    status: "ok",
    service: "agent-academy-credential"
  }));

  app.get("/api/v1/credential-definitions", async (request) => ({
    data: [
      {
        id: "credential-definition:agent-engineer",
        type: "CredentialDefinition",
        name: "Agent Engineer",
        description: "Development credential definition for the Agent Academy MVP.",
        status: "active",
        version: "0.1.0",
        skillMappings: [
          {
            framework: "SFIA",
            frameworkVersion: "9",
            skillCode: "PROG",
            level: 3
          }
        ]
      }
    ],
    meta: { request_id: request.id, version: "v1" }
  }));

  app.post("/api/v1/credentials/issue", async (request, reply) => {
    return reply.status(201).send({
      data: {
        id: "credential:demo-agent-engineer",
        status: "issued-development-only",
        credentialDefinitionId: "credential-definition:agent-engineer",
        note: "MVP placeholder. Production issuance must use DID-bound verifiable credentials."
      },
      meta: { request_id: request.id, version: "v1" }
    });
  });

  app.post("/api/v1/credentials/verify", async (request) => ({
    data: {
      verified: false,
      status: "development-placeholder",
      checks: {
        proof: "skipped",
        issuer: "skipped",
        status: "skipped"
      }
    },
    meta: { request_id: request.id, version: "v1" }
  }));

  app.post("/api/v1/wallets/link", async (request, reply) => {
    return reply.status(201).send({
      data: {
        walletId: "wallet:development",
        status: "linked-development-only"
      },
      meta: { request_id: request.id, version: "v1" }
    });
  });

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 4002);
  const host = process.env.HOST ?? "0.0.0.0";
  buildServer().listen({ port, host }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
