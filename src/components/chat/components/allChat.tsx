import { Avatar } from "@/components/ui/avatar";
import { UserModel } from "@/components/users/models";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Dispatch, SetStateAction } from "react";

export default function AllChat(props: {
  users: UserModel[];
  setTo: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
}) {
  const handleCLick = (user: UserModel) => {
    props.setUser(user);
    props.setTo(user.id);
  };
  const users = props.users ?? [];
  return (
    <div>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex w-full items-center gap-2 border-b-2 p-5 hover:cursor-pointer dark:border-gray-600"
            onClick={() => handleCLick(user)}
          >
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={user?.profilePicture}
              />
            </Avatar>
            <span>{user.username}</span>
          </div>
        );
      })}
    </div>
  );
}
