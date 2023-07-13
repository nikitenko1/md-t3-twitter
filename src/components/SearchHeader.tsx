import React from "react";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import Search from "./Search";
import { v4 } from "uuid";

const links = ["top", "latest", "people", "photos", "videos"];

const SearchHeader = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 border-b border-base-300 bg-base-100/30 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-x-2 p-2">
        <BsArrowLeft
          className="cursor-pointer text-lg md:text-xl"
          onClick={() => router.back()}
        />
        <div className="flex-[.75]">
          <Search placeholder="Search UA You" />
        </div>
      </div>
      <ul className=" flex flex-wrap items-center justify-between">
        {links.map((link: string) => (
          // In Next.js, shallow routing is a technique that allows you to update the URL of a page
          // without reloading the page itself or fetching new data from the server
          <li
            key={v4()}
            onClick={() =>
              router.replace(
                {
                  query: {
                    ...router.query, // list all the queries here
                    f: link,
                  },
                },
                undefined,
                {
                  shallow: true,
                }
              )
            }
            className={`${
              router.query.f === link ? "border-b-4    border-primary" : null
            } cursor-pointer px-2 py-1 text-sm font-semibold capitalize text-gray-500 hover:bg-base-300
             md:px-6 md:py-2 md:text-base`}
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHeader;
