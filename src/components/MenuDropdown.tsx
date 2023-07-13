import React from "react";
import { useSession } from "next-auth/react";
import { BiDotsHorizontal } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import useDeleteTweet from "hooks/useDeleteTweet";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { AiOutlinePushpin } from "react-icons/ai";
import { TweetWithUser } from "interface";
import useFollow from "hooks/useFollow";
import usePin from "hooks/usePin";
import { api } from "@/utils/api";

const MenuDropdown = ({ tweet }: { tweet: TweetWithUser }) => {
  const { data: session } = api.auth.getSession.useQuery();
  const { status } = useSession();
  const { handleDeleteTweet } = useDeleteTweet(tweet);

  const {
    handleFollow,
    handleUnfollow,
    followed,
    // alreadyFollowed,
    followingUser,
    unfollowingUser,
  } = useFollow(tweet.user.id);
  const { handlePinTweet, handleUnpin, isPinned } = usePin(tweet.id);

  const isYourTweet = tweet.userId === session?.user?.id;
  //   console.log(isYourTweet);

  const { data: alreadyFollowed } = api.follow.getSingleFollower.useQuery({
    followingId: tweet.user.id as string,
  });
  return (
    <>
      <div className="dropdown-bottom dropdown-end dropdown ">
        <label tabIndex={5} className=" relative  cursor-pointer ">
          <BiDotsHorizontal className="text-xl text-gray-400" />
        </label>

        {isYourTweet ? (
          <ul
            tabIndex={5}
            className="dropdown-content  menu rounded-box absolute top-0 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <button
                onClick={handleDeleteTweet}
                className="flex items-center gap-x-2 font-bold text-red-500"
              >
                <IoTrash />
                <a className="">Delete Tweet</a>
              </button>
            </li>
            {tweet.isPinned ? (
              <li>
                <button
                  className="flex items-center gap-x-2 font-bold "
                  onClick={handleUnpin}
                >
                  <AiOutlinePushpin />
                  <a>Unpin to profile</a>
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="flex items-center gap-x-2 font-bold "
                  onClick={handlePinTweet}
                >
                  <AiOutlinePushpin />
                  <a>Pin to profile</a>
                </button>
              </li>
            )}
          </ul>
        ) : (
          <ul
            tabIndex={0}
            className="dropdown-end dropdown-bottom dropdown-content menu rounded-box absolute top-0 w-52 bg-base-100 p-2 shadow"
          >
            {(alreadyFollowed !== null || followed) &&
            status === "authenticated" ? (
              <li className="">
                <button
                  disabled={followingUser || unfollowingUser}
                  onClick={(e: React.SyntheticEvent) => handleUnfollow(e)}
                  className="flex w-[90%] items-center gap-x-2  whitespace-nowrap   font-bold text-red-500"
                >
                  <RiUserUnfollowLine />
                  <p className="w-full truncate">Unfollow {tweet.user.name}</p>
                </button>
              </li>
            ) : (
              <li className="overflow-hidden">
                <button
                  disabled={followingUser || unfollowingUser}
                  onClick={(e: React.SyntheticEvent) => handleFollow(e)}
                  className="flex w-[90%] items-center gap-x-2 whitespace-nowrap font-bold"
                >
                  <RiUserFollowLine />
                  <p className="w-full truncate ">Follow {tweet.user.name}</p>
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default MenuDropdown;
