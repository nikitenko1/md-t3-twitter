import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Avatar from "./Avatar";
import useFollow from "hooks/useFollow";
import { UserWithPayloads } from "interface";
import { api } from "@/utils/api";

interface IProps {
  user: UserWithPayloads;
}

const PeopleComponent = ({ user }: IProps) => {
  const { data: session, status } = useSession();
  const [unfollowHovered, setUnfollowHovered] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleFollow,
    handleUnfollow,
    followed,
    followingUser,
    unfollowingUser,
  } = useFollow(user.id as string);

  const { data: alreadyFollowed } = api.follow.getSingleFollower.useQuery({
    followingId: user.id as string,
  });

  return (
    <div onClick={() => router.push(`/${user.id}/${user.name}`)}>
      <div
        className="flex cursor-pointer items-start justify-between gap-x-4 px-2 py-6 transition-all
     hover:bg-base-200"
      >
        <Avatar image={user.image || ""} width={40} height={40} />
        <div className="mr-auto truncate ">
          <div className="flex items-center gap-x-1">
            <Link
              className="text-lg font-semibold  hover:underline"
              href={`/${user.id}/${user.name}`}
            >
              {user.name}
            </Link>
            {user?.isVerified ? <GoVerified className="text-primary" /> : null}
          </div>

          {user.handle ? (
            <p className="truncate text-sm text-gray-500">@{user.handle}</p>
          ) : null}
          {router.pathname === "/connect_people" ? (
            <p className="text-sm">{user.profile?.bio}</p>
          ) : null}
        </div>
        {session?.user?.id !== user.id ? (
          <>
            {(alreadyFollowed !== null || followed) &&
            status === "authenticated" ? (
              <button
                disabled={unfollowingUser || followingUser}
                onClick={handleUnfollow}
                onMouseEnter={() => setUnfollowHovered(true)}
                onMouseLeave={() => setUnfollowHovered(false)}
                className={` ${
                  unfollowHovered
                    ? "border-red-600 bg-transparent text-red-600"
                    : null
                } ml-auto  rounded-full  border border-primary bg-primary px-4 py-2 font-semibold text-white`}
              >
                {unfollowHovered ? "Unfollow" : "Following"}
              </button>
            ) : (
              <button
                disabled={unfollowingUser || followingUser}
                onClick={handleFollow}
                className="ml-auto rounded-full bg-primary px-2 py-1 font-semibold text-white md:px-4 md:py-2"
              >
                Follow
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PeopleComponent;
