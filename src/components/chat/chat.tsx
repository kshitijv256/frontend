import { useAuthProvider } from "@/providers/authProvider";
import AllChat from "./components/allChat";
import Window from "./components/window";
import { MessageSquareDiffIcon } from "lucide-react";

export default function Chat() {
  const to = "1";
  const user = useAuthProvider();
  console.log("user", user);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-screen w-full max-w-2xl flex-col border-r-2 bg-gray-100 dark:border-gray-600 dark:bg-gray-900">
        <div className="flex w-full items-center justify-between border-b-2 p-5 dark:border-gray-600">
          <span>All Chats</span>
          <button className="rounded-full p-2 hover:bg-gray-200">
            <MessageSquareDiffIcon />
          </button>
        </div>
        <AllChat />
      </div>
      <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900">
        <Window to={to} from={user.user?.id ?? ""} message={""} />
      </div>
    </div>
  );
}
