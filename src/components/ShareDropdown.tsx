import React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import useBookmark from "hooks/useBookmark";
import { api } from "@/utils/api";
import { IoShareOutline, IoTrash } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-hot-toast";
import { FiBookmark } from "react-icons/fi";

const ShareDropdown = ({ tweetId }: { tweetId: string }) => {
  const {
    createBookmarkLoading,
    handleCreateBookmark,
    handleDeleteBookmark,
    deleteBookmarkLoading,
    bookmarkAddedState,
  } = useBookmark(tweetId);

  const [value, copy] = useCopyToClipboard();
  const { data: bookmarkAdded } = api.bookmark.userAlreadyBookmark.useQuery({
    bookmarkId: tweetId as string,
  });

  return (
    <>
      <div className="dropdown-end dropdown-top dropdown cursor-pointer list-none">
        <li tabIndex={1}>
          <IoShareOutline className="hover:text-primary" />
        </li>
        <ul
          tabIndex={1}
          className="dropdown-content menu rounded-box w-52 bg-base-100 text-sm shadow"
        >
          <li>
            <button
              onClick={() => {
                toast.success("Tweet url copied to clipboard");
                copy(
                  `${
                    process.env.NODE_ENV === "development"
                      ? "localhost:3000"
                      : "ua-you.vercel.app"
                  }/status/${tweetId}`
                );
              }}
              className="flex items-center gap-x-2 rounded-xl p-4 font-bold "
            >
              <IoIosLink />

              <a>Copy url to tweet</a>
            </button>
          </li>
          {bookmarkAdded || bookmarkAddedState ? (
            <li>
              <button
                disabled={createBookmarkLoading || deleteBookmarkLoading}
                onClick={() => handleDeleteBookmark()}
                className="flex items-center gap-x-2 font-bold text-red-500"
              >
                <IoTrash />
                <a className="">Delete Bookmark</a>
              </button>
            </li>
          ) : (
            <li>
              <button
                disabled={createBookmarkLoading || deleteBookmarkLoading}
                onClick={() => handleCreateBookmark(tweetId)}
                className="flex items-center gap-x-2 font-bold "
              >
                <FiBookmark />
                <a>Bookmark</a>
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ShareDropdown;
