import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import PeopleComponent from "./PeopleComponent";
import { UserWithPayloads } from "interface";
import { api } from "@/utils/api";

const FollowRecommendations = () => {
  const { data } = api.follow.getFollowersRecommendation.useQuery();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-base-250 overflow-hidden rounded-xl border border-gray-300 border-opacity-20">
      <h1 className="p-4 text-2xl font-bold text-neutral">Who to follow</h1>
      {data
        ?.filter((user) => user.id !== session?.user?.id)
        .slice(0, 3)
        .map((user: unknown) => (
          <PeopleComponent
            user={user as unknown as UserWithPayloads}
            key={v4()}
          />
        ))}{" "}
      <div
        onClick={() => router.push("/connect_people")}
        className="cursor-pointer p-4 text-primary hover:bg-base-200"
      >
        Show more
      </div>
    </div>
  );
};

export default FollowRecommendations;
