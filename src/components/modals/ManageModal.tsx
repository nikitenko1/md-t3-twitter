import { api } from "@/utils/api";
import { useDebouncedPeople, useManageModal } from "lib/zustand";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/legacy/image";
import Loader from "../Loader";
import { v4 } from "uuid";
import { UserWithPayloads } from "interface";
import SearchPeople from "../SearchPeople";
import ListMember from "../ListMember";

const ManageModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { listId } = useRouter().query;
  const { setModal, modal } = useManageModal();

  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  const slide = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      x: "100vw",
      opacity: 0,
    },
  };

  const [link, setLink] = useState("members");

  const { data: list } = api.list.getListMembers.useQuery({
    listId: listId as string,
  });

  const { name } = useDebouncedPeople();

  const { data: debouncedUserSuggestions, isLoading: searchLoading } =
    api.list.searchUserSuggestions.useQuery({
      listId: listId as string,
      name,
    });

  const { data: userSuggestions } = api.list.getUserSuggestions.useQuery({
    listId: listId as string,
  });

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      <motion.div
        variants={slide}
        initial="hidden"
        animate={modal ? "visible" : "hidden"}
        exit="exit"
        className="absolute z-[999] h-full  w-full space-y-4  bg-base-100 p-4"
      >
        <div className="flex items-center  gap-x-8 text-xl font-semibold">
          <IoArrowBack
            className="cursor-pointer text-xl"
            onClick={() => setModal(false)}
          />
          <p>Manage members</p>
        </div>
        <ul className="flex items-center justify-around text-lg font-semibold">
          <li
            onClick={() => setLink("members")}
            className={`cursor-pointer ${
              link === "members" ? "border-b-4 border-primary" : null
            }`}
          >
            Members
          </li>
          <li
            onClick={() => setLink("suggestions")}
            className={`cursor-pointer  ${
              link === "suggestions" ? "border-b-4 border-primary" : null
            }`}
          >
            Suggestions
          </li>
        </ul>
        {link === "members" ? (
          <>
            {list?.members.length !== 0 ? (
              <div>
                {list?.members?.map((member) => (
                  <ListMember member={member} key={v4()} />
                ))}
              </div>
            ) : (
              <div className="flex h-[90%] flex-col items-center justify-center gap-y-4">
                <Image
                  objectFit="cover"
                  src={"/no-lists.png"}
                  width={400}
                  height={250}
                  alt=""
                />
                <h1 className="text-4xl font-bold">This List is Lonely</h1>
                <p className="text-gray-500">
                  People added to this List will show up here.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <SearchPeople />
            <div>
              {name === "" ? (
                <div>
                  {userSuggestions?.map((user) => (
                    <ListMember key={v4()} member={user as UserWithPayloads} />
                  ))}
                </div>
              ) : (
                <>
                  {searchLoading ? (
                    <Loader />
                  ) : (
                    <div>
                      {debouncedUserSuggestions?.map((user) => (
                        <ListMember
                          key={v4()}
                          member={user as UserWithPayloads}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ManageModal;
