import React, { useEffect } from "react";
import Body from "@/components/Body";

import HomeNav from "@/components/HomeNav";
import Loading from "@/components/Loader";
import Head from "next/head";
import { useSession } from "next-auth/react";
import TweetList from "@/components/TweetList";
import useScrollPosition from "hooks/useScrollPosition";
import { TweetWithUser } from "interface";
import { api } from "@/utils/api";
import CreateTweet from "@/components/CreateTweet";

const Home = () => {
  const { status } = useSession();

  const scrollPosition = useScrollPosition();

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    api.tweet.getInfiniteTweets.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        // getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, isFetching, hasNextPage, fetchNextPage]);

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  return (
    <>
      <Head>
        <title>Home | UA You</title>
        <meta name="description" content="Home page from UA You" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <HomeNav />
        {status === "authenticated" ? <CreateTweet /> : null}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <TweetList tweets={tweets as TweetWithUser[]} />
          </>
        )}
        {isFetching && hasNextPage ? (
          <div className="pb-16">
            <Loading />
          </div>
        ) : null}{" "}
        {!hasNextPage && !isFetching ? (
          <p className="pb-16 text-center text-gray-500">End of feed</p>
        ) : null}
      </Body>
    </>
  );
};

export default Home;
