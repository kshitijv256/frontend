import { useAuthProvider } from "@/providers/authProvider";
import AllChat from "./components/allChat";
import Window from "./components/window";
import { MessageSquareDiffIcon } from "lucide-react";

export default function Chat(to:any){
    const user=useAuthProvider();

    return(
        <div className="w-full flex justify-center items-center h-screen">
            <div className="max-w-2xl flex w-full h-screen bg-gray-100 dark:border-gray-600 dark:bg-gray-900 border-r-2 flex-col">
                <div className="w-full border-b-2 flex p-5 dark:border-gray-600 justify-between items-center"><span>All Chats</span><button className="rounded-full hover:bg-gray-200 p-2"><MessageSquareDiffIcon/></button></div>
                <AllChat/>
            </div>
            <div className="w-full flex h-screen bg-gray-100 dark:bg-gray-900">
                <Window to={to.value} from={user.user?.id}/>
            </div>
        </div>
    );
}