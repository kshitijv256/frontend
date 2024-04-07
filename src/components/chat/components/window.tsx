import { CircleEllipsis, Send } from "lucide-react";
import Sent from "./sent";
import Recieved from "./recieved";
import { FormEvent, useEffect, useState } from "react";
import { messages, sendMessage } from "../functions/reducer";

export default function Window(conversation: messages) {
  const [messages, setMessages] = useState("");
  const [allMessages, setAllMessages] = useState<messages[] | null>(null);

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
    const response = await fetch(
      `http://localhost:5000/messages?to=${conversation.to}&from=${conversation.from}`,
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    setTimeout(async () => {
      await getMessages();
    }, 2000);
  }, []);

  return (
    <div className="flex h-full w-full select-none flex-col">
      <div className="flex items-center justify-between border-b-2 p-5 dark:border-gray-600">
        <span>User Name</span>
        <button className="rounded-full p-2 hover:bg-gray-200">
          <CircleEllipsis className="w-6" />
        </button>
      </div>
      <div className="flex h-full flex-col justify-end overflow-y-scroll px-5 py-5">
        <div className="flex">
          <Recieved value="hey" />
        </div>
        <div>
          <Sent value="hello" />
        </div>
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
