import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { OptionWithPayload } from "interface";
import { useLoginModal } from "lib/zustand";
import { api } from "@/utils/api";

interface IProps {
  option: OptionWithPayload;
  totalVotes: number;
}

const VoteComponent = ({ option, totalVotes }: IProps) => {
  const { setModal: setLoginModal } = useLoginModal();
  const utils = api.useContext();
  const router = useRouter();
  const { statusId } = router.query;
  const { data: session, status } = useSession();

  const { mutateAsync: votePoll } = api.vote.voteOption.useMutation({
    onMutate: () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      utils.tweet.getInfiniteTweets.cancel();
      // Snapshot the previous value
      const optimisticUpdate = utils.tweet.getInfiniteTweets.getData();
      if (optimisticUpdate) {
        // Optimistically update to the new value
        utils.tweet.getInfiniteTweets.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      if (router.pathname === "") {
        // Invalidate query in the cache with // Always refetch after error or success:
        utils.tweet.getInfiniteTweets.invalidate();
      } else if (router.pathname === "/status/[statusId]") {
        utils.tweet.getSingleTweet.invalidate({ tweetId: statusId as string });
      }
    },
  });

  const handleVote = async () => {
    if (status === "authenticated") {
      await toast.promise(
        votePoll({ userId: session?.user?.id as string, optionId: option.id }),
        {
          loading: "Voting poll",
          success: "Poll voted",
          error: (err) => `Oops something went wrong ${err}`,
        }
      );
    } else {
      setLoginModal(true);
    }
  };

  const votePercentage = (option.votes.length / totalVotes || 0) * 100;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleVote();
      }}
      className="w-full cursor-pointer gap-x-3 rounded-md  border border-gray-600 p-2 text-sm font-normal"
    >
      <p className="overflow-x-auto">{option?.text}</p>
      <div
        style={{ width: `${votePercentage}%` }}
        className={`flex min-h-min items-center justify-between rounded-md bg-blue-400  px-2 text-sm text-neutral transition-all duration-100 ease-linear `}
      >
        {votePercentage >= 10 ? <p>{votePercentage.toFixed(0)}%</p> : null}
      </div>
    </div>
  );
};

export default VoteComponent;
