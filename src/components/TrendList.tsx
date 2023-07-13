import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";
import { v4 } from "uuid";
import TrendComponent from "./TrendComponent";

const TrendList = () => {
  const { data } = api.hashtag.getTopHashtags.useQuery();
  const router = useRouter();

  return (
    <div className="bg-base-250 overflow-hidden rounded-xl border border-gray-300 border-opacity-20">
      <h1 className="p-4 text-2xl font-bold text-neutral">Trends for you </h1>
      {data?.slice(0, 10).map((hashtag) => (
        <TrendComponent hashtag={hashtag} key={v4()} />
      ))}
      <div
        onClick={() => router.push("/trends")}
        className="cursor-pointer p-4 text-primary hover:bg-base-200"
      >
        Show more
      </div>
    </div>
  );
};

export default TrendList;
