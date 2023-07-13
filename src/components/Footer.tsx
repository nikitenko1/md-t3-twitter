import React from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";

const Footer = () => {
  const phone = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-primary p-4 text-center text-white">
      {phone ? (
        <h1 className="text-2xl font-bold">Sign in to see what's happening</h1>
      ) : (
        <button
          onClick={() => router.push("/auth/signin")}
          className="rounded-full border border-white px-8 py-1 font-semibold"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Footer;
