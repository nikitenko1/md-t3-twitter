import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

export const voteRouter = createTRPCRouter({
  voteOption: protectedProcedure
    .input(z.object({ userId: z.string(), optionId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.option.update({
        where: {
          id: input?.optionId,
        },
        data: {
          votes: {
            connect: {
              id: input?.userId,
            },
          },
        },
      });
    }),
});
