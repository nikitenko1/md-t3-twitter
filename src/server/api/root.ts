import { exampleRouter } from "@/server/api/routers/example";
import { authRouter } from "@/server/api/routers/auth";
import { bookmarkRouter } from "@/server/api/routers/bookmark";
import { followRouter } from "@/server/api/routers/follow";
import { hashtagRouter } from "@/server/api/routers/hashtag";
import { likeRouter } from "@/server/api/routers/like";
import { listRouter } from "@/server/api/routers/list";
import { notificationRouter } from "@/server/api/routers/notification";
import { voteRouter } from "@/server/api/routers/vote";
import { tweetRouter } from "@/server/api/routers/tweet";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "./routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  bookmark: bookmarkRouter,
  follow: followRouter,
  hashtag: hashtagRouter,
  like: likeRouter,
  list: listRouter,
  notification: notificationRouter,
  profile: profileRouter,
  tweet: tweetRouter,
  vote: voteRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
