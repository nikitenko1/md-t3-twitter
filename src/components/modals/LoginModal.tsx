import React, { useRef } from "react";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import { BsTwitter } from "react-icons/bs";
import { useOnClickOutside } from "usehooks-ts";
import { useLoginModal } from "lib/zustand";
import Modal from "../Modal";

const LoginModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setModal } = useLoginModal();
  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  return (
    <Modal>
      <div
        ref={modalRef}
        className="relative mx-auto h-[200px] w-3/4 space-y-3 rounded-2xl bg-base-100 p-4 sm:w-1/2"
      >
        <IoClose
          className="absolute left-4 top-4 cursor-pointer text-2xl"
          onClick={() => setModal(false)}
        />
        <div className="flex flex-col items-center justify-center gap-y-2">
          <BsTwitter className="text-3xl text-primary" />
          <h1 className="text-3xl font-bold">Login UA You</h1>
          <button
            onClick={() => {
              router.push("/auth/signin");
              setModal(false);
            }}
            className={`px-y mt-4 flex w-full items-center justify-center gap-x-2 
            rounded-full border border-primary py-2 font-semibold  text-neutral`}
          >
            Sign in
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
