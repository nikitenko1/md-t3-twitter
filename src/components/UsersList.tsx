import React from "react";
import { v4 } from "uuid";
import PeopleComponent from "./PeopleComponent";
import { UserWithPayloads } from "interface";

const UsersList = ({ users }: { users: UserWithPayloads[] }) => {
  return (
    <div>
      {users.map((user) => (
        <PeopleComponent key={v4()} user={user as UserWithPayloads} />
      ))}
    </div>
  );
};

export default UsersList;
