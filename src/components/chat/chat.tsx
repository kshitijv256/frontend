import { useAuthProvider } from "@/providers/authProvider";
import AllChat from "./components/allChat";
import Window from "./components/window";
import { MessageSquareDiffIcon } from "lucide-react";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserModel } from "../users/models";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [to, setTo] = useState("");
  const [userState, setUserState] = useState<UserModel | undefined>();
  // const [username,setUserName]=useState("");
  // const to = "1";
  const user = useAuthProvider();
  console.log("user", user);

  const getAllUsers = async () => {
    const response = await axios.get(API_ENDPOINT + "/allusers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
    });
    const data = response.data;
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex h-full w-full max-w-2xl flex-col border-r-2 bg-gray-100 dark:border-gray-600 dark:bg-gray-900">
        <div className="flex w-full items-center justify-between border-b-2 p-5 dark:border-gray-600">
          <span>All Chats</span>
          <button className="rounded-full p-2 hover:bg-gray-200">
            <MessageSquareDiffIcon />
          </button>
        </div>
        <AllChat users={users} setTo={setTo} setUser={setUserState} />
      </div>
      <div className="flex h-[90vh] w-full bg-gray-100 dark:bg-gray-900">
        <Window
          to={to}
          from={user.user?.id ?? ""}
          user={userState}
          message={""}
        />
      </div>
    </div>
  );
}
