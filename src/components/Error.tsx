import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

const Error = () => {
  return (
    <>
      <div
        className="flex h-[calc(100vh-61px)] w-full flex-col
      items-center justify-center"
      >
        <div>
          <LazyLoadImage
            src="/no-results-found.png"
            effect="opacity"
            height={`80%`}
          />
        </div>

        <div className="mt-5">
          <h1 className="text-center font-semibold">Something went wrong!</h1>
          <Link
            href="/"
            className="mt-5 block w-full rounded-md border border-primary px-4 py-2 text-center text-sm 
            font-normal text-primary transition-all hover:bg-stone-950 hover:text-slate-200"
          >
            Return home page
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
