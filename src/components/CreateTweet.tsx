import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RiCloseLine, RiEarthFill } from "react-icons/ri";
import usePolling from "hooks/usePolling";
import { api } from "@/utils/api";
import { useCreateModal, useDisableTweet, useOpenPolling } from "lib/zustand";
import Avatar from "./Avatar";
import MediaTools from "./MediaTools";
import PollingSection from "./PollingSection";

const CreateTweet = () => {
  const { data: session } = useSession();
  const utils = api.useContext();

  const { isDisabled } = useDisableTweet();
  const { isOpen: isPollingOpen, setIsOpen: setPollingOpen } = useOpenPolling();

  const { setModal } = useCreateModal();
  const { choices } = usePolling();

  const { mutateAsync: createPoll } = api.tweet.createPoll.useMutation({
    onMutate: () => {
      utils.tweet.getInfiniteTweets.cancel();
      const optimisticUpdate = utils.tweet.getInfiniteTweets.getData();
      if (optimisticUpdate) {
        // setQueryData(queryKey, newData)
        utils.tweet.getInfiniteTweets.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.tweet.getInfiniteTweets.invalidate();
    },
  });

  const { mutateAsync: createTweet } = api.tweet.createTweet.useMutation({
    onMutate: () => {
      utils.tweet.getInfiniteTweets.cancel();
      const optimisticUpdate = utils.tweet.getInfiniteTweets.getData();
      if (optimisticUpdate) {
        // setQueryData(queryKey, newData)
        utils.tweet.getInfiniteTweets.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.tweet.getInfiniteTweets.invalidate();
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>();
  const [text, setText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setModal(false);
    setText("");
    if (isPollingOpen) {
      const hashtags = text
        .split(" ")
        .filter((word) => word.startsWith("#"))
        .map((word) => word.slice(1));

      const options = choices?.map((choice) => choice.choice);

      await toast.promise(createPoll({ text, options, hashtags }), {
        success: "Poll created",
        loading: "Creating poll",
        error: (err) => "Oops.. something went wrong " + err,
      });

      setPollingOpen(false);
    } else {
      let mediaUrl = null;
      const hashtags = text
        .split(" ")
        .filter((word) => word.startsWith("#"))
        .map((word) => word.slice(1));

      //upload image
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "ua-you");
        // formData.append("file", );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_NAME}/${
            selectedFile.type === "video/mp4" ? "video" : "image"
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());

        mediaUrl = res.secure_url;
      }
      toast.promise(createTweet({ text, mediaUrl, hashtags }), {
        success: "Tweet created",
        loading: "Creating tweet",
        error: (err) => "Oops.. something went wrong " + err,
      });
      setSelectedFile(undefined);
    }
    textRef!.current!.value = "";
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // https://allegra9.medium.com/add-emoji-picker-to-your-react-chat-app-30d8cbe8d9a6
  const onEmojiSelect = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  const onSelectFile = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // using the first image instead of multiple
    setSelectedFile(e.currentTarget.files[0]);
  };

  return (
    <div className="mt-4 flex items-start gap-x-4 border-b border-base-300 p-2">
      <Link
        href={`/${session?.user?.id}/${session?.user?.name}`}
        className="cursor-pointer"
      >
        <Avatar image={session?.user?.image || ""} width={40} height={40} />
      </Link>
      <form className="flex-1 space-y-3" onSubmit={handleSubmit}>
        <textarea
          cols={50}
          value={text}
          ref={textRef}
          onChange={(e) => setText(e.target.value)}
          placeholder={isPollingOpen ? "Ask a question" : "What's happening"}
          className={`w-full resize-none overflow-hidden bg-transparent text-neutral outline-none
           placeholder:text-gray-600 md:text-xl`}
        />
        {isPollingOpen ? <PollingSection /> : null}

        {selectedFile && (
          <>
            {selectedFile.type === "video/mp4" ? (
              <div className="relative">
                <video controls className="relative h-full w-full rounded-2xl">
                  <source src={preview} type="video/mp4"></source>
                </video>
                {/* place-items-center to place grid items on the center of their grid areas */}
                <div
                  onClick={() => setSelectedFile(undefined)}
                  className="absolute right-4 top-4 grid h-8 w-8  cursor-pointer place-items-center
                   rounded-full bg-[#00000083] text-xl text-white"
                >
                  <RiCloseLine />
                </div>
              </div>
            ) : (
              <div className="relative">
                <LazyLoadImage src={preview} effect="opacity" />

                {/* place-items-center to place grid items on the center of their grid areas */}
                <div
                  onClick={() => setSelectedFile(undefined)}
                  className="absolute right-4 top-4 grid h-8 w-8 cursor-pointer place-items-center
                   rounded-full bg-[#00000083] text-xl text-white"
                >
                  <RiCloseLine />
                </div>
              </div>
            )}
          </>
        )}
        <div className=" flex items-center gap-x-2 text-sm font-semibold text-primary md:text-base">
          <RiEarthFill className="text-xl" />
          <p>Everyone can reply</p>
        </div>
        <div className="flex w-full items-center border-t border-base-300 py-2">
          <MediaTools
            onEmojiSelect={onEmojiSelect}
            onSelectFile={onSelectFile}
            selectedFile={selectedFile}
          />
          <div className="flex-[0.4]">
            <button
              type="submit"
              disabled={
                !isPollingOpen ? text === "" : text === "" || isDisabled
              }
              className={`w-full rounded-full bg-primary px-2 py-1 font-semibold text-white md:px-4 md:py-2 
              ${
                (!isPollingOpen ? text === "" : text === "" || isDisabled)
                  ? "bg-blue-400"
                  : null
              }`}
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
