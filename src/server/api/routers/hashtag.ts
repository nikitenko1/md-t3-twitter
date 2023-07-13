 
import { createTRPCRouter, publicProcedure } from "../trpc";

export const hashtagRouter = createTRPCRouter({
    getTopHashtags: publicProcedure
    .query(({ ctx, input }) => {
      return ctx.prisma.hashtag.findMany({
        take:5,
        include:{
            tweets:true
        },
        orderBy: {
          tweets:{
            _count:"desc"
          }
        },
      });
    }),

});
