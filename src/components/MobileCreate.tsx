import React from "react";
import { useCreateModal } from "lib/zustand";
import { IoMdAddCircle } from "react-icons/io";

const MobileCreate = () => {
  const { setModal } = useCreateModal();
  return (
    <div className="fixed bottom-16 right-2 z-[99999] ">
      <IoMdAddCircle
        onClick={() => setModal(true)}
        className="cursor-pointer text-6xl text-primary"
      />
    </div>
  );
};

export default MobileCreate;
