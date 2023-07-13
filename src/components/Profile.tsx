import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { api } from "@/utils/api";

const Profile = () => {
  const { data: session } = useSession();
  const { data: user } = api.user.getUser.useQuery({
    userId: session?.user?.id as string,
  });

  return (
    <div className="mt-4 flex items-center gap-x-2">
      <Avatar image={session?.user?.image || ""} width={40} height={40} />
      <div>
        <p className="hidden font-semibold xl:block">{session?.user?.name}</p>
        <p className="hidden text-sm text-gray-500 xl:block">@{user?.handle}</p>
      </div>
    </div>
  );
};

export default Profile;
