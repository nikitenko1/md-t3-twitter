import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TrendList from "./TrendList";
import FollowRecommendations from "./FollowRecommendations";
import Search from "./Search";

const Right = () => {
  const router = useRouter();
  const searchPathnames = ["/search", "/explore"];
  const trendsPathnames = ["/explore", "/trends"];
  const followPathnames = ["/connect_people"];
  const { status } = useSession();

  return (
    <div
      className="absolute right-0 top-0 w-72 space-y-4 bg-base-100 
    py-3 pl-[5%] pr-4 first-letter:min-h-[120vh] xl:w-80"
    >
      {searchPathnames.includes(router.pathname) ? null : (
        <Search placeholder="Search Twitter" />
      )}
      {status === "authenticated" ? (
        <>
          {trendsPathnames.includes(router.pathname) ? null : <TrendList />}
          {followPathnames.includes(router.pathname) ? null : (
            <FollowRecommendations />
          )}
        </>
      ) : null}
    </div>
  );
};

export default Right;
