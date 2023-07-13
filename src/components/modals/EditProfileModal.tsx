import React, { useRef } from "react";
import Image from "next/legacy/image";
import { useSession } from "next-auth/react";
import { useOnClickOutside } from "usehooks-ts";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { AiFillCamera } from "react-icons/ai";
import { api } from "@/utils/api";
import useMediaUpload from "hooks/useMediaUpload";
import { useEditProfileModal } from "lib/zustand";
import Modal from "../Modal";

type Profile = {
  name: string;
  coverPhoto: string | null;
  image: string;
  bio: string;
  location: string;
  website: string;
};

const EditProfileModal = () => {
  const modalRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const utils = api.useContext();
  let imageUrl: string;
  let coverPhotoUrl: string;

  const {
    onSelectFile: onSelectFileImage,
    preview: imagePreview,
    selectedFile: imageSelectedFile,
    setSelectedFile: setImageSelectedFile,
  } = useMediaUpload();

  const {
    // upload: coverPhotoUpload,
    onSelectFile: onSelectFileCoverPhoto,
    preview: coverPhotoPreview,
    selectedFile: coverPhotoSelectedFile,
    setSelectedFile: setCoverPhotoSelectedFile,
    // mediaUrl:coverPhotoUrl
  } = useMediaUpload();

  const { mutateAsync: editProfile } = api.profile.upsertProfile.useMutation({
    onMutate: () => {
      utils.user.getUserProfile.cancel();
      const optimisticUpdate = utils.user.getUserProfile.getData();
      if (optimisticUpdate) {
        utils.user.getUserProfile.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.user.getUserProfile.invalidate();
    },
  });

  const { data: userProfile } = api.user.getUserProfile.useQuery({
    userId: session?.user?.id as string,
  });
  const { setModal } = useEditProfileModal();

  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Profile>();

  const imageUpload = async () => {
    const formData = new FormData();
    formData.append("file", imageSelectedFile);
    formData.append("upload_preset", "ua-you");
    // formData.append("file", );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_NAME}/${
        imageSelectedFile.type === "video/mp4" ? "video" : "image"
      }/upload`,

      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    imageUrl = res.secure_url;
  };

  const coverPhotoUpload = async () => {
    const formData = new FormData();
    formData.append("file", coverPhotoSelectedFile);
    formData.append("upload_preset", "ua-you");
    // formData.append("file", );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_NAME}/${
        coverPhotoSelectedFile.type === "video/mp4" ? "video" : "image"
      }/upload`,

      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    coverPhotoUrl = res.secure_url;
  };

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    if (imageSelectedFile) {
      await imageUpload();
    }
    if (coverPhotoSelectedFile) {
      await coverPhotoUpload();
    }

    const mutatedData: Profile = {
      ...data,
      image: imageUrl ?? (userProfile?.image as string),
      coverPhoto:
        coverPhotoUrl ?? (userProfile?.profile?.coverPhoto as string) ?? null,
    };

    toast.promise(editProfile(mutatedData), {
      success: "Profile saved",
      loading: "Saving new profile",
      error: (err) => "Oops.. something went wrong " + err,
    });

    setModal(false);
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={modalRef}
        className="mx-auto h-[500px] w-3/4 overflow-y-scroll rounded-2xl bg-base-100 sm:w-1/2"
      >
        <header className="flex items-center justify-between gap-x-1 p-4 xs:gap-x-2 sm:gap-x-4">
          <IoMdClose
            className="cursor-pointer text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl"
            onClick={() => setModal(false)}
          />
          <p
            className="mr-auto whitespace-nowrap text-xs font-semibold
           xs:text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Edit profile
          </p>
          <button
            className="rounded-full bg-black px-2 py-1 text-xs font-semibold
          text-white sm:text-sm md:px-3"
          >
            Save
          </button>
        </header>
        <div className="relative grid h-32 w-full place-items-center bg-gray-200 xs:h-36 sm:h-44 lg:h-48">
          {coverPhotoPreview || userProfile?.profile?.coverPhoto ? (
            <Image
              layout="fill"
              src={
                coverPhotoPreview ??
                (userProfile?.profile?.coverPhoto as string)
              }
              objectFit="cover"
              alt=""
            />
          ) : null}

          <input
            className=""
            id="coverSelect"
            hidden
            type="file"
            onChange={onSelectFileCoverPhoto}
            accept="image/png,  image/jpeg"
          />
          <label
            htmlFor="coverSelect"
            className="transition-allhover:bg-gray-600 z-50 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-gray-500 
            text-xl text-white xs:h-12 xs:w-12 xs:text-3xl"
          >
            <AiFillCamera />
          </label>
        </div>
        <div
          className="relative mx-4 -mt-12 grid h-[60px] w-[60px] place-items-center
        xs:h-[80px] xs:w-[80px] md:h-[100px] md:w-[100px]"
        >
          <input
            className=""
            id="imageSelect"
            hidden
            type="file"
            accept="image/png,  image/jpeg"
            onChange={onSelectFileImage}
          />
          <label
            htmlFor="imageSelect"
            className="z-50 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-gray-700
            text-base text-white transition-all hover:bg-gray-800 xs:h-8 xs:w-8 xs:text-xl"
          >
            <AiFillCamera />
          </label>

          <Image
            className="rounded-full border-2 border-white"
            alt="profile"
            layout="fill"
            objectFit="cover"
            src={imagePreview ?? (userProfile?.image as string)}
          />
        </div>
        <div className="flex flex-col gap-y-6 p-2 md:p-4">
          <input
            className="input-bordered  input-primary input w-full "
            placeholder="Name"
            defaultValue={userProfile?.name as string}
            {...register("name")}
          />
          <input
            className="input-bordered  input-primary input w-full "
            placeholder="Bio"
            defaultValue={userProfile?.profile?.bio as string}
            {...register("bio")}
          />
          <input
            className="input-bordered  input-primary input w-full "
            placeholder="Location"
            defaultValue={userProfile?.profile?.location as string}
            {...register("location")}
          />
          <input
            className="input-bordered  input-primary input w-full "
            placeholder="Website"
            defaultValue={userProfile?.profile?.website as string}
            {...register("website")}
          />
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
