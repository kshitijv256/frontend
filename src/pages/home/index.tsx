import { useAuthProvider } from "@/providers/authProvider";
import UnverifiedEmailAlert from "./UnverifiedEmailAlert";
import { CreatePost } from "./CreatePost";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";

const Home = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthProvider();

  const getAllUsers = async () => {
    const response = await axios.get(API_ENDPOINT + "/allusers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
    });
    const data = response.data;
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      {user && !user.isEmailVerified && <UnverifiedEmailAlert />}
      <div className="grid h-full grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 hidden rounded-l-md  md:block">
          <p className="pl-2 pt-2 text-xl font-bold text-amber-500">
            Active Users
          </p>
          <div className="flex flex-col gap-4 p-4 text-lg text-black">
            {users.map((user) => (
              <div key={user.id}>{user.username}</div>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <CreatePost />
          <Posts />
        </div>
        <div className="col-span-1 hidden rounded-r-md md:block"></div>
      </div>
    </div>
  );
};

export default Home;
