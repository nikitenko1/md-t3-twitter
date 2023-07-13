import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "usehooks-ts";
import { BsTwitter } from "react-icons/bs";
import { FaGithubAlt } from "react-icons/fa";
import { env } from "process";
import Image from "next/legacy/image";

const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, []);

  const tablet = useMediaQuery("(min-width:1024px)");

  return (
    <main>
      <div
        className={`${
          !tablet ? "items-center justify-center" : null
        } flex min-h-screen  w-full gap-x-8 overflow-y-hidden text-neutral `}
      >
        {tablet ? (
          <div className="relative flex min-h-screen w-2/3 items-center justify-center">
            <Image
              src={"/twitter-banner.png"}
              objectFit="cover"
              layout="fill"
              alt="auth"
            />
            <BsTwitter className="absolute text-[300px] text-white" />
          </div>
        ) : null}

        <div
          className={`px-2 py-6 ${
            tablet ? null : "flex flex-col items-center"
          }`}
        >
          <BsTwitter className="text-5xl text-primary" />
          {tablet ? (
            <h1 className="mt-12 text-6xl font-black">
              See what's happening now{" "}
            </h1>
          ) : (
            <h1 className="mt-12 max-w-xs text-2xl font-black sm:text-4xl">
              See what's happening in the world right now{" "}
            </h1>
          )}
          <p className="mt-12 text-2xl font-black sm:text-4xl">
            Join UA You today.
          </p>
          <div className="mt-8 flex flex-col items-center space-y-4">
            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: env.NEXTAUTH_URL,
                })
              }
              className={`${
                tablet ? null : "mx-auto"
              } flex w-3/4 items-center justify-center gap-x-2 whitespace-nowrap rounded-full
              border border-base-300 px-4 py-2 text-base font-semibold 
              transition-all duration-100 ease-in-out hover:bg-base-200 sm:text-lg`}
            >
              <BsTwitter className="text-primary" />
              <p>Sign in with Twitter</p>
            </button>
            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: env.NEXTAUTH_URL,
                })
              }
              className={`${
                tablet ? null : "mx-auto"
              } flex w-3/4  items-center justify-center gap-x-2 whitespace-nowrap rounded-full
              border border-base-300 px-4 py-2 text-base font-semibold
              transition-all duration-100 ease-in-out hover:bg-base-200 sm:text-lg`}
            >
              <FaGithubAlt className="text-blue-700" />
              <p>Sign in with Github</p>
            </button>
            <p className="w-3/4 text-center text-sm text-gray-500 md:text-start">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </p>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen  items-center justify-center">
        <div className="relative mx-auto h-72 w-3/4 sm:h-96 md:w-1/2">
          <LazyLoadImage src={"/auth-bg.jpg"} className="object-fill" />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
