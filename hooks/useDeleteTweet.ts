import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";
import { TweetWithUser } from "interface";

const useDeleteTweet = (tweet: TweetWithUser) => {
  const utils = api.useContext();
  const router = useRouter();
  const { q, f, statusId, userId, listId } = router.query;

  const invalidateAllTweetQueries = () => {
    // Invalidate query in the cache with // Always refetch after error or success:
    utils.tweet.getTweets.invalidate();
    utils.tweet.getInfiniteTweets.invalidate();
    if (router.pathname === "/[userId]/[username]") {
      utils.tweet.getUserTweets.invalidate({
        userId: userId as string,
        link: "",
      });
    }
    if (router.pathname === "/status/[statusId]") {
      utils.tweet.getTweetReplies.invalidate({ tweetId: statusId as string });
      utils.tweet.getSingleTweet.invalidate({ tweetId: statusId as string });
    }
    if (router.pathname === "/search") {
      utils.tweet.searchTweets.invalidate({
        term: q as string,
        filtering: f as string,
        limit: 10,
      });
    }
    if (router.pathname === "/list/[userId]/[listId]") {
      utils.list.getListDetails.invalidate({ listId: listId as string });
    }
    if (router.pathname === "/following") {
      utils.tweet.getFollowingInfiniteTweets.invalidate();
    }
  };
  // Cancel any outgoing refetches
  // (so they don't overwrite our optimistic update)
  const optimitizeQueries = () => {
    utils.tweet.getTweets.cancel();
    utils.tweet.getInfiniteTweets.cancel();
    if (router.pathname === "/status/[statusId]") {
      utils.tweet.getTweetReplies.cancel({ tweetId: statusId as string });
      utils.tweet.getSingleTweet.cancel({ tweetId: statusId as string });
    }

    if (router.pathname === "/[userId]/[username]") {
      utils.tweet.getUserTweets.cancel({ userId: userId as string, link: "" });
    }
    // Snapshot the previous value
    const getUserTweets = utils.tweet.getInfiniteUserTweets.getData({
      userId: userId as string,
      link: "",
      limit: 10,
    });
    const getTweets = utils.tweet.getTweets.getData();
    const getInfiniteTweets = utils.tweet.getInfiniteTweets.getData();
    const getTweetReplies = utils.tweet.getTweetReplies.getData({
      tweetId: statusId as string,
    });

    const getSingleTweet = utils.tweet.getSingleTweet.getData({
      tweetId: statusId as string,
    });

    const searchTweets = utils.tweet.searchTweets.getData({
      term: q as string,
      filtering: f as string,
      limit: 10,
    });
    // Optimistically update to the new value
    if (getTweets) {
      utils.tweet.getTweets.setData(_, getTweets);
    }

    if (getInfiniteTweets) {
      utils.tweet.getInfiniteTweets.setData(getInfiniteTweets);
    }

    if (getTweetReplies) {
      utils.tweet.getTweetReplies.setData(getTweetReplies);
    }
    if (getSingleTweet) {
      utils.tweet.getSingleTweet.setData(getSingleTweet);
    }
    if (searchTweets) {
      utils.tweet.searchTweets.setData(searchTweets);
    }
    if (getUserTweets) {
      utils.tweet.searchTweets.setData(getUserTweets);
    }
  };

  const { mutateAsync: deleteTweet } = api.tweet.deleteTweet.useMutation({
    onMutate: () => {
      optimitizeQueries();
    },
    onSettled: () => {
      invalidateAllTweetQueries();
    },
  });

  const handleDeleteTweet = async () => {
    toast.promise(deleteTweet({ tweetId: tweet.id }), {
      success: "Tweet deleted",
      loading: "Deleting tweet",
      error: (err) => "Oops.. something went wrong " + err,
    });
    if (router.pathname === "/status/[statusId]") {
      router.push("/");
    }
  };

  return { handleDeleteTweet };
};

export default useDeleteTweet;
