import { createTRPCRouter, publicProcedure } from "../trpc";

import { schemaEncuesta } from "~/pages/encuesta";

export const encuestaRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const encuestas = await ctx.db.encuesta.findMany();

    return { encuestas };
  }),
  create: publicProcedure
    .input(schemaEncuesta)
    .mutation(async ({ ctx, input }) => {
      console.log(input);

      const encuesta = await ctx.db.encuesta.create({
        data: input,
      });

      return { encuesta };
    }),
});
