import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";
import { useLoginModal } from "lib/zustand";

const useBookmark = (tweetId?: string) => {
  const utils = api.useContext();
  const router = useRouter();
  const { setModal: setLoginModal } = useLoginModal();

  const { status } = useSession();
  const { data: bookmarks, isLoading } =
    api.bookmark.getUserBookmarks.useQuery();

  const optimizeMutation = () => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    utils.bookmark.getUserBookmarks.cancel();
    utils.bookmark.userAlreadyBookmark.cancel({
      bookmarkId: tweetId as string,
    });
    utils.follow.getSingleFollower.cancel();
    // Snapshot the previous value
    const getUserBookmarks = utils.bookmark.getUserBookmarks.getData();
    const userAlreadyBookmark = utils.bookmark.userAlreadyBookmark.getData({
      bookmarkId: tweetId as string,
    });
    // Optimistically update to the new value
    if (getUserBookmarks) {
      utils.bookmark.getUserBookmarks.setData(getUserBookmarks);
    }
    if (userAlreadyBookmark) {
      utils.bookmark.userAlreadyBookmark.setData(userAlreadyBookmark);
    }
  };

  const { mutateAsync: createBookmark, isLoading: createBookmarkLoading } =
    api.bookmark.createBookmark.useMutation({
      onMutate: () => {
        optimizeMutation();
      },
      onSettled: () => {
        utils.bookmark.getUserBookmarks.invalidate();
      },
    });

  const { mutateAsync: deleteBookmark, isLoading: deleteBookmarkLoading } =
    api.bookmark.deleteBookmark.useMutation({
      onMutate: () => {
        optimizeMutation();
      },
      onSettled: () => {
        utils.bookmark.getUserBookmarks.invalidate();
      },
    });

  const [bookmarkAddedState, setAddBookmark] = useState(false);

  const handleCreateBookmark = async (tweetId: string) => {
    if (status === "authenticated") {
      setAddBookmark(true);

      await toast.promise(createBookmark({ tweetId: tweetId as string }), {
        success: "Bookmark created",
        loading: "Creating  bookmark",
        error: (err) => "Oops something went wrong " + err,
      });
      router.push(`/bookmarks`);
    } else {
      setLoginModal(true);
    }
  };

  const handleDeleteBookmark = async () => {
    if (status === "authenticated") {
      setAddBookmark(false);

      await toast.promise(deleteBookmark({ tweetId: tweetId as string }), {
        success: "Bookmark deleted",
        loading: "Deleting bookmark",
        error: (err) => "Oops something went wrong " + err,
      });
    } else {
      setLoginModal(true);
    }
  };

  return {
    isLoading,
    createBookmarkLoading,
    deleteBookmarkLoading,
    bookmarks,
    handleCreateBookmark,
    bookmarkAddedState,
    handleDeleteBookmark,
  };
};

export default useBookmark;
