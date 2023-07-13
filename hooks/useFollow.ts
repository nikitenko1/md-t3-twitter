import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useLoginModal } from "lib/zustand";
import { api } from "@/utils/api";

const useFollow = (userId: string) => {
  const utils = api.useContext();
  const router = useRouter();
  const { f, q, userId: _userId, listId } = router.query;
  const { mutateAsync: sendNotification } =
    api.notification.sendNotification.useMutation();
  const { data: session, status } = useSession();

  const invalidateFollowQueries = () => {
    // Invalidate query in the cache with // Always refetch after error or success:
    utils.follow.getFollowersRecommendation.invalidate();
    utils.follow.getSingleFollower.invalidate({
      followingId: userId as string,
    });
    if (router.pathname === "/[userId]/[username]/followers") {
      utils.follow.getUserFollowers.invalidate({ userId: _userId as string });
    }
    if (router.pathname === "/[userId]/[username]/following") {
      utils.follow.getUserFollowing.invalidate({ userId: _userId as string });
    }
    utils.user.getUserProfile.invalidate({ userId: userId as string });
  };
  // Cancel any outgoing refetches
  // (so they don't overwrite our optimistic update)
  const optimizeMutation = () => {
    utils.user.getUserProfile.cancel({ userId: _userId as string });
    utils.follow.getSingleFollower.cancel({
      followingId: userId as string,
    });
    utils.follow.getFollowersRecommendation.cancel();
    if (router.pathname === "/[userId]/[username]/followers") {
      utils.follow.getUserFollowers.cancel({ userId: _userId as string });
    }
    if (router.pathname === "/[userId]/[username]/following") {
      utils.follow.getUserFollowing.cancel({ userId: _userId as string });
    }
    // Snapshot the previous value
    const getUserProfile = utils.user.getUserProfile.getData({
      userId: _userId as string,
    });
    const getSingleFollower = utils.follow.getSingleFollower.getData({
      followingId: userId as string,
    });

    const getFollowersRecommendation =
      utils.follow.getFollowersRecommendation.getData();
    const getUserFollowers = utils.follow.getUserFollowers.getData({
      userId: _userId as string,
    });
    const getUserFollowing = utils.follow.getUserFollowing.getData({
      userId: _userId as string,
    });
    // Optimistically update to the new value
    if (getUserProfile) {
      utils.user.getUserProfile.setData(getUserProfile);
    }

    if (getSingleFollower) {
      utils.follow.getSingleFollower.setData(getSingleFollower);
    }

    if (getFollowersRecommendation) {
      utils.follow.getFollowersRecommendation.setData(
        getFollowersRecommendation
      );
    }
    if (getUserFollowing) {
      utils.follow.getUserFollowing.setData(getUserFollowing);
    }
    if (getUserFollowers) {
      utils.follow.getUserFollowers.setData(getUserFollowers);
    }
  };

  const { mutateAsync: followUser, isLoading: followingUser } =
    api.follow.followUser.useMutation({
      onMutate: () => {
        optimizeMutation();
      },
      onSettled: () => {
        invalidateFollowQueries();
      },
    });

  const { mutateAsync: unfollowUser, isLoading: unfollowingUser } =
    api.follow.unfollowUser.useMutation({
      onMutate: () => {
        optimizeMutation();
      },
      onSettled: () => {
        invalidateFollowQueries();
      },
    });

  const [followed, setFollowed] = useState<boolean>();
  const { setModal: setLoginModal } = useLoginModal();

  const handleFollow = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setFollowed(true);
    if (status !== "authenticated") {
      setLoginModal(true);
    } else {
      await toast.promise(followUser({ followingId: userId }), {
        success: "Following user",
        loading: "Loading...",
        error: (err) => `Oops something went wrong ` + err,
      });
      await sendNotification({
        text: `${session?.user?.name} started following you`,
        redirectUrl: `/${session?.user?.id}/${session?.user?.name}`,
        recipientId: userId,
      });
    }
  };

  const handleUnfollow = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setFollowed(false);
    if (status === "unauthenticated") {
      setLoginModal(true);
    } else {
      await toast.promise(unfollowUser({ followingId: userId }), {
        success: "User unfollowed",
        loading: "Unfollowing user",
        error: (err) => `Oops something went wrong ` + err,
      });
    }
  };

  return {
    handleFollow,
    handleUnfollow,
    followed,
    followingUser,
    unfollowingUser,
  };
};

export default useFollow;
