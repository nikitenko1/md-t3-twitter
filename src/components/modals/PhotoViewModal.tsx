import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Modal from "../Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePhotoView, usePhotoViewModal } from "lib/zustand";

const PhotoViewModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setModal } = usePhotoViewModal();
  const { src, size } = usePhotoView();

  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  return (
    <Modal>
      <div
        ref={modalRef}
        className={`relative mx-auto flex items-center  ${
          size === "medium" ? "h-[200px] w-[200px]" : "h-[400px] w-3/4"
        } `}
      >
        <LazyLoadImage
          src={src}
          effect="opacity"
          height={`80%`}
          className="rounded-2xl object-cover"
        />
      </div>
    </Modal>
  );
};

export default PhotoViewModal;
