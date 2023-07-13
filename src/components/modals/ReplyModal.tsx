import React, { useRef } from "react";
import Link from "next/link";
import { useReplyModal, useTweetId } from "lib/zustand";
import { useOnClickOutside } from "usehooks-ts";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import ReactTimeAgo from "react-time-ago";
import Modal from "../Modal";
import Loader from "../Loader";
import Avatar from "../Avatar";
import ReplyForm from "../ReplyForm";
import { TweetWithUser } from "interface";
import { api } from "@/utils/api";

const ReplyModal = () => {
  const { setModal } = useReplyModal();
  const { tweetId } = useTweetId();
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setModal(false);
  });

  const { data: tweetReply, isLoading } = api.tweet.getSingleTweet.useQuery({
    tweetId,
  });

  const now = new Date();
  const msBetweenDates =
    (tweetReply?.createdAt?.getTime() ?? 0) - now.getTime();

  // 👇️ convert ms to hours                  min  sec   ms
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  return (
    <Modal>
      <div
        ref={modalRef}
        className="relative mx-auto max-h-[500px] max-w-xs overflow-y-scroll rounded-2xl bg-base-100 
        p-4 md:max-w-lg"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <IoClose
              className="absolute left-4 top-4 cursor-pointer text-2xl"
              onClick={() => setModal(false)}
            />
            <div className="mt-12 flex items-start gap-x-2 md:gap-x-4">
              <Avatar
                image={tweetReply?.user.image as string}
                width={50}
                height={50}
              />
              <div className="mb-8 flex w-full flex-col">
                <div className="flex items-center gap-x-2">
                  <Link
                    href={`/${tweetReply?.userId}/${tweetReply?.user.name}`}
                    className="cursor-pointer truncate text-base font-semibold hover:underline md:text-lg"
                  >
                    {tweetReply?.user.name}
                  </Link>
                  <p className="truncate text-sm text-gray-400">
                    {hoursBetweenDates > 24 ? (
                      <span>
                        {moment(tweetReply?.createdAt as Date).format("ll")}
                      </span>
                    ) : (
                      <ReactTimeAgo
                        date={tweetReply?.createdAt as Date}
                        locale="en-US"
                      />
                    )}
                  </p>
                </div>
                <p>{tweetReply?.text}</p>
                <p className="mt-4 flex items-center gap-x-2 text-gray-500">
                  Replying to
                  <span className="text-primary">{tweetReply?.user.name}</span>
                </p>
              </div>
            </div>
            <ReplyForm tweet={tweetReply as unknown as TweetWithUser} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default ReplyModal;
