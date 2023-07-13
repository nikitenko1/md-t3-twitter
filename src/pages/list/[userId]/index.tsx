import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useCreateListModal } from "lib/zustand";
import Body from "@/components/Body";
import Loader from "@/components/Loader";
import NavFeed from "@/components/NavFeed";
import { MdPostAdd } from "react-icons/md";
import { ListWithPayloads } from "interface";
import ListComponent from "@/components/ListComponent";
import { v4 } from "uuid";

const ListPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: user } = api.user.getUser.useQuery({
    userId: userId as string,
  });
  const { data: userLists, isLoading } = api.list.getUserLists.useQuery({
    userId: userId as string,
  });
  const { data: session } = useSession();
  const { setModal } = useCreateListModal();

  return (
    <Body>
      <NavFeed
        title={"Lists"}
        subtitle={
          user ? `@${user?.handle ?? user?.name?.trim().toLowerCase()} ` : ""
        }
      >
        {session?.user?.id === userId ? (
          <div
            className="absolute right-4 top-6"
            onClick={() => setModal(true)}
          >
            <MdPostAdd className="cursor-pointer text-2xl" />
          </div>
        ) : null}
      </NavFeed>
      <div className="p-2">
        {user ? (
          <h1 className="p-2 text-2xl font-bold">
            {session?.user?.id === userId ? "Your" : `${user?.name}'s`} Lists
          </h1>
        ) : null}
        {!isLoading ? (
          <>
            {userLists?.length !== 0 ? (
              <div>
                {userLists?.map((list) => (
                  <ListComponent list={list as ListWithPayloads} key={v4()} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No lists</p>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </Body>
  );
};

export default ListPage;
