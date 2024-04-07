import { Dispatch, SetStateAction } from "react";

export default function AllChat(props: {
  users: any[];
  setTo: Dispatch<SetStateAction<string>>;
}) {
  const users = props.users ?? [];
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex w-full items-center justify-between border-b-2 p-5 hover:cursor-pointer dark:border-gray-600"
            onClick={() => props.setTo(user.id)}
          >
            <span>{user.username}</span>
          </div>
        );
      })}
    </div>
  );
}
