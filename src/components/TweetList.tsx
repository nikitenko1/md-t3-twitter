import React from "react";
import { TweetWithUser } from "interface";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";
import { v4 } from "uuid";
import TweetComponent from "./TweetComponent";

const TweetList = ({ tweets }: { tweets: TweetWithUser[] }) => {
  const router = useRouter();
  const phone = useMediaQuery("(min-width:768px)");

  return (
    <div
      className={`w-full ${
        router.pathname !== "/" ? (phone ? null : "pb-16") : null
      } `}
    >
      {router.pathname === "/[userId]/[username]" ? (
        <>
          {tweets
            .filter((tweet) => tweet.isPinned === true)
            .map((tweet) => (
              <TweetComponent tweet={tweet as TweetWithUser} key={v4()} />
            ))}
          {tweets
            .filter((tweet) => tweet.isPinned === false)
            .map((tweet) => (
              <TweetComponent tweet={tweet as TweetWithUser} key={v4()} />
            ))}
        </>
      ) : (
        <>
          {tweets?.map((tweet) => (
            <TweetComponent tweet={tweet as TweetWithUser} key={v4()} />
          ))}
        </>
      )}
    </div>
  );
};

export default TweetList;
