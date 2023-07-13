import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import { useRetweetsModal, useUserRetweets } from "lib/zustand";
import Modal from "../Modal";
import PeopleComponent from "../PeopleComponent";
import { UserWithPayloads } from "interface";

const RetweetsListModal = () => {
  const { setModal } = useRetweetsModal();
  const { retweets } = useUserRetweets();
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setModal(false);
  });
  return (
    <Modal>
      <div
        ref={modalRef}
        className="mx-auto h-[500px] w-3/4 space-y-3 overflow-y-scroll rounded-2xl bg-base-100 p-4 sm:w-1/2"
      >
        <div className="flex items-center gap-x-8 text-xl font-semibold">
          <IoMdClose
            className="cursor-pointer text-xl"
            onClick={() => setModal(false)}
          />
          <p>Retweeted by</p>
        </div>
        <div>
          {retweets?.map((retweet) => (
            <PeopleComponent
              key={v4()}
              user={retweet.user as UserWithPayloads}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default RetweetsListModal;
