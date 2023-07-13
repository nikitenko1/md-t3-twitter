import { useMobileDrawer } from "lib/zustand";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { BiBookmark, BiUser } from "react-icons/bi";
import { useOnClickOutside } from "usehooks-ts";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { IoIosListBox, IoMdClose } from "react-icons/io";
import Avatar from "./Avatar";
import { v4 } from "uuid";
import Link from "next/link";
import MoreDropdownSidebar from "./MoreDropdownSidebar";
import { BsTwitter } from "react-icons/bs";

const MobileDrawer = () => {
  const slideIn = {
    hidden: {
      x: "-100vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "linear",
      },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "linear",
      },
    },
  };
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setDrawer, drawer } = useMobileDrawer();

  useOnClickOutside(drawerRef, () => {
    setDrawer(false);
  });

  const { data: session } = useSession();

  const links = [
    {
      name: "Profile",
      link: `/${session?.user?.id}/${session?.user?.name}`,
      hidden: true,
      icon: <BiUser />,
    },
    {
      name: "Bookmarks",
      link: `/bookmarks`,
      hidden: true,
      icon: <BiBookmark />,
    },
    {
      name: "Lists",
      link: `/list/${session?.user?.id}`,
      hidden: true,
      icon: <IoIosListBox />,
    },
  ];
  return (
    <Backdrop>
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        exit="hidden "
        ref={drawerRef}
        className={`fixed left-0 top-0 space-y-4 p-4 transition-all ${
          drawer ? "translate-x-0" : "-translate-x-full"
        } bottom-0 z-[99999] min-h-screen min-w-[75vw] bg-base-100`}
      >
        <header className="flex items-center justify-between">
          <p className="font-semibold">Account info</p>
          <IoMdClose
            className="cursor-pointer"
            onClick={() => setDrawer(false)}
          />
        </header>
        <div>
          <Avatar
            image={session?.user?.image as string}
            width={30}
            height={30}
          />
          <p className="font-semibold">{session?.user?.name}</p>
        </div>
        <ul className="space-y-2">
          {links.map((link) => (
            <li
              key={v4()}
              onClick={() => setDrawer(false)}
              className="rounded-full px-4 py-2 font-semibold transition-all duration-300 
              hover:bg-slate-300"
            >
              <Link href={link?.link}>
                <div className="flex items-center gap-x-4 text-sm xs:text-xl md:text-2xl">
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </div>
              </Link>
            </li>
          ))}
          <li
            key={v4()}
            className="rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-base-300"
          >
            <MoreDropdownSidebar mobile={true} />
          </li>
        </ul>
        <button
          onClick={() => signOut()}
          className={`px-y  mt-4 flex w-full items-center justify-center gap-x-2 rounded-full 
          border border-primary py-2 font-semibold transition-colors hover:bg-slate-50`}
        >
          <>
            <BsTwitter className="text-primary " />
            <span className="">Sign out</span>
          </>
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default MobileDrawer;
