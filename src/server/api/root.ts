import { createTRPCRouter } from "~/server/api/trpc";
import { encuestaRouter } from "./routers/encuesta";
import { projectRouter } from "./routers/project";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  encuesta: encuestaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
