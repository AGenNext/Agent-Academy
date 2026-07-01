# Import Fix Note

Before merging the SurrealDB persistence follow-up, update the first imports in `server.ts`:

```ts
import { PrimitiveRepository, type PlatformRepository } from "./repository.js";
import { SurrealHttpClient, SurrealPrimitiveRepository, surrealConfigFromEnv } from "./surreal.js";
```

This moves `PlatformRepository` to its canonical source in `repository.ts`.
