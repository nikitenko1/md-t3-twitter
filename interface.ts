import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

// Prisma.UserGetPayload utility function to create a type that can be used to return all Users and their profiles
export type UserWithPayloads = Prisma.UserGetPayload<{
  include: {
    profile: true;
  };
}>;
// Prisma.LikeGetPayload utility function to create a type that can be used to return all Likes
export type LikesWithPayloads = Prisma.LikeGetPayload<{
  include: {
    user: {
      include: {
        profile: true;
      };
    };
  };
}>;
// Prisma.LikeGetPayload utility function to create a type that can be used to return all Lists
export type ListWithPayloads = Prisma.ListGetPayload<{
  include: {
    creator: {
      include: {
        profile: true;
      };
    };
    followers: {
      include: {
        profile: true;
      };
    };
    members: {
      include: {
        profile: true;
      };
    };
  };
}>;
// Prisma.LikeGetPayload utility function to create a type that can be used to return all Retweets
export type RetweetsWithPayloads = Prisma.TweetGetPayload<{
  include: {
    retweets: {
      include: {
        user: {
          include: {
            profile: true;
          };
        };
      };
    };
  };
}>;
// Prisma.LikeGetPayload utility function to create a type that can be used to return all Bookmarks
export type BookmarksWithPayloads = Prisma.BookmarkGetPayload<{
  include: {
    tweet: {
      include: {
        user: true;
        originalTweet: {
          include: {
            user: true;
          };
        };
        retweet: {
          include: {
            user: true;
            likes: true;
            replies: true;
            retweets: true;
          };
        };
        likes: true;
        replies: true;
        retweets: true;
      };
    };
  };
}>;
// Prisma.LikeGetPayload utility function to create a type that can be used to return all Tweets
export type TweetWithUser = Prisma.TweetGetPayload<{
  include: {
    user: true;

    originalTweet: {
      include: {
        user: true;
      };
    };
    retweet: {
      include: {
        user: true;
      };
    };
    likes: true;
    replies: true;
    poll: {
      include: {
        options: true;
      };
    };
    retweets: {
      include: {
        user: {
          include: {
            profile: true;
          };
        };
      };
    };
  };
}>;
// Prisma.LikeGetPayload utility function to create a type that can be used to return all Options
export type OptionWithPayload = Prisma.OptionGetPayload<{
  include: {
    votes: true;
  };
}>;
