import { buildServer } from "./server2.js";
import { PrimitiveRepository, type PlatformRepository } from "./repository.js";
import { SurrealHttpClient, SurrealPrimitiveRepository, surrealConfigFromEnv } from "./surreal.js";

function repositoryFromEnv(): PlatformRepository {
  const config = surrealConfigFromEnv();
  if (!config) return new PrimitiveRepository();
  return new SurrealPrimitiveRepository(new SurrealHttpClient(config));
}

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? "0.0.0.0";

buildServer(repositoryFromEnv()).listen({ port, host }).catch((error) => {
  console.error(error);
  process.exit(1);
});
