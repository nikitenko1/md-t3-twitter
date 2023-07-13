import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Modal from "../Modal";
import CreateTweet from "../CreateTweet";
import { useCreateModal } from "lib/zustand";

const CreateModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setModal } = useCreateModal();

  useOnClickOutside(modalRef, () => {
    setModal(false);
  });
  return (
    <Modal>
      <div
        ref={modalRef}
        className="relative mx-auto max-h-[500px] max-w-xs overflow-y-scroll rounded-2xl bg-base-100 p-4 md:max-w-lg"
      >
        <CreateTweet />
      </div>
    </Modal>
  );
};

export default CreateModal;
