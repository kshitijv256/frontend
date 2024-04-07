import { UserModel } from "@/components/users/models";

const UsersList = (props: { users?: UserModel[] }) => {
  return (
    <div>
      {props.users?.map((user) => {
        return (
          <div key={user.id} className="flex w-full flex-col gap-2">
            <UserCard user={user} />
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;

const UserCard = (props: { user: UserModel }) => {
  return (
    <div className="flex items-center gap-2 rounded-sm p-2 shadow-sm">
      <p>{props.user.username}</p>
    </div>
  );
};
