import {  CircleEllipsis, Send } from "lucide-react";
import Sent from "./sent";
import Recieved from "./recieved";
import { useState } from "react";
import { sendMessage } from "../functions/reducer";


interface conversation{
    to:string | undefined;
    from:string | undefined;
}


export default function Window(conversation:conversation){
    const [messages,setMessages]=useState("");

    const handleSubmit=async (e:HTMLFormElement)=>{
        e.preventDefault();
        if(!messages) return;
        await sendMessage({to:conversation.to,from:conversation.from,message:messages});
        setMessages("");
    }
    
    return(
        <div className="flex w-full h-full flex-col select-none">
            <div className="p-5 border-b-2 dark:border-gray-600 justify-between flex items-center"><span>User Name</span><button className="p-2 hover:bg-gray-200 rounded-full"><CircleEllipsis className="w-6"/></button></div>
            <div className="flex flex-col h-full px-5 py-5 overflow-y-scroll justify-end">
                <div className="flex">
                    <Recieved value="hey"/>
                </div>
                <div>
                    <Sent value="hello"/>
                </div>
            </div>
            <div className="flex w-full align-bottom p-5 justify-around border-t-2 dark:border-gray-600">
                <div className="rounded-full w-full border-2 px-5 py-2 justify-center items-center flex"><form className="w-full flex" onSubmit={()=>handleSubmit}><input className="bg-transparent items-center focus:outline-none w-full" placeholder="Say Hello......"></input><button type="submit"><Send className="hover:scale-110"/></button></form></div>
            </div>
        </div>
    );
}