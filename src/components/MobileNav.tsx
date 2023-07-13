import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiFillBell,
  AiFillHome,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineMail,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

const MobileNav = () => {
  const router = useRouter();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[1000] 
  flex w-full items-center justify-between border-t border-slate-300 bg-base-100 px-8 py-4 text-3xl"
    >
      <div className="grid h-14 w-14 place-items-center rounded-full transition-all hover:bg-slate-300">
        <Link href={"/"}>
          {router.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
        </Link>
      </div>
      <div className="grid h-14 w-14 place-items-center rounded-full transition-all hover:bg-slate-300">
        <Link href="/explore">
          {router.pathname === "/explore" ? <FaSearch /> : <BiSearch />}
        </Link>
      </div>
      <div className="grid h-14 w-14 place-items-center rounded-full transition-all hover:bg-slate-300">
        <Link href="/notifications">
          {router.pathname === "/notifications" ? (
            <AiFillBell />
          ) : (
            <AiOutlineBell />
          )}
        </Link>
      </div>
      <Link href="/">
        <AiOutlineMail />
      </Link>
    </div>
  );
};

export default MobileNav;
