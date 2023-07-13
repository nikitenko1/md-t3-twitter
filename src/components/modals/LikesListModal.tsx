import React, { useRef } from "react";
import { v4 } from "uuid";
import { IoMdClose } from "react-icons/io";
import { useLikesModal, useUserLikes } from "lib/zustand";
import { useOnClickOutside } from "usehooks-ts";
import Modal from "../Modal";
import PeopleComponent from "../PeopleComponent";

const LikesListModal = () => {
  const { setModal } = useLikesModal();
  const { likes } = useUserLikes();
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  return (
    <Modal>
      <div
        ref={modalRef}
        className="mx-auto h-[500px] w-3/4 space-y-3 overflow-y-scroll rounded-2xl  bg-base-100 p-4 sm:w-1/2"
      >
        <div className="flex items-center gap-x-8 text-xl font-semibold">
          <IoMdClose
            className="cursor-pointer text-xl"
            onClick={() => setModal(false)}
          />
          <p>Liked by</p>
        </div>
        <div>
          {likes?.map((like) => (
            <PeopleComponent key={v4()} user={like.user} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default LikesListModal;
