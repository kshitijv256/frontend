import { CircleEllipsis, Send } from "lucide-react";
import Sent from "./sent";
import Recieved from "./recieved";
import { FormEvent, useEffect, useState } from "react";
import { messages, sendMessage } from "../functions/reducer";
import { API_ENDPOINT } from "@/config/constants";
import { UserModel } from "@/components/users/models";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface conversation {
  to: string;
  user?: UserModel;
  from: string;
  message: string;
  time: string;
}

export default function Window(conversation: messages) {
  const [messages, setMessages] = useState("");
  const [allMessages, setAllMessages] = useState<conversation[] | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messages) return;
    console.log(messages);
    const date = new Date();
    await sendMessage({
      to: conversation.to,
      from: conversation.from,
      message: messages,
      time: date.toString(),
    });
    setMessages("");
  };

  const getMessages = async () => {
    const response = await fetch(API_ENDPOINT + "/messages");
    const data = await response.json();
    var list: conversation[] = [];
    data.map((value: conversation) => {
      list.push(value);
    });
    return list;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      setAllMessages(await getMessages());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full select-none flex-col">
      <div className="flex items-center justify-between border-b-2 p-5 dark:border-gray-600">
        <Avatar>
          <AvatarImage
            className="object-cover"
            src={conversation.user?.profilePicture}
          />
        </Avatar>
        <span className="font-semibold">{conversation.user?.username}</span>
        <button className="rounded-full p-2 hover:bg-gray-200">
          <CircleEllipsis className="w-6" />
        </button>
      </div>
      <div className="flex h-full flex-col items-end justify-end gap-y-2 overflow-y-scroll px-5 py-5">
        {allMessages?.map((value) => {
          return value.to == conversation.to &&
            value.from == conversation.from ? (
            <div className="float-right">
              <Sent value={value.message} />
            </div>
          ) : value.to == conversation.from && value.from == conversation.to ? (
            <div className="flex w-full">
              <Recieved value={value.message} />
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      <div className="flex w-full justify-around border-t-2 p-5 align-bottom dark:border-gray-600">
        <div className="flex w-full items-center justify-center rounded-full border-2 px-5 py-2">
          <form className="flex w-full" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
              className="w-full items-center bg-transparent focus:outline-none"
              placeholder="Say Hello......"
            ></input>
            <button type="submit">
              <Send className="hover:scale-110" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
