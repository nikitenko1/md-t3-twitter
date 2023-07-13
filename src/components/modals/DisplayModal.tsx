import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useDisplayModal } from "lib/zustand";
import Modal from "../Modal";
import BackgroundChanger from "../BackgroundChanger";

const DisplayModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setModal } = useDisplayModal();
  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  return (
    <Modal>
      <div
        ref={modalRef}
        className="mx-auto flex h-[500px] w-3/4 flex-col gap-y-4 overflow-y-scroll rounded-2xl
         bg-base-100 p-4 text-center md:w-1/2"
      >
        <h1 className="text-2xl font-bold">Customize your view</h1>
        <p className="text-gray-500">
          These settings affect all the `UA You` accounts on this browser.
        </p>
        <BackgroundChanger />
      </div>
    </Modal>
  );
};

export default DisplayModal;
