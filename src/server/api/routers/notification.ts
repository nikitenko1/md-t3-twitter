import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const notificationRouter = createTRPCRouter({
  sendNotification: publicProcedure
    .input(
      z.object({
        text: z.string(),
        redirectUrl: z.string(),
        recipientId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const senderId = ctx.session?.user?.id;

      return ctx.prisma.notification.create({
        data: {
          recipient: {
            connect: {
              id: input?.recipientId,
            },
          },
          text: input?.text,
          redirectUrl: input?.redirectUrl,
          sender: {
            connect: {
              id: senderId,
            },
          },
        },
      });
    }),

  getUserNotifications: publicProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;
    return ctx.prisma.notification.findMany({
      where: {
        recipientId: userId,
      },
    });
  }),

  deleteNotification: protectedProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.notification.delete({
        where: {
          id: input?.notificationId,
        },
      });
    }),
});
