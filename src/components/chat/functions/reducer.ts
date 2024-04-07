import { UserModel } from "@/components/users/models";
import { API_ENDPOINT } from "@/config/constants";

export interface messages {
  to: string;
  from: string;
  message: string;
  user?: UserModel;
  time?: string;
}

export const sendMessage = async (conversation: messages) => {
  console.log("called");
  await fetch(API_ENDPOINT + "/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: conversation.to,
      from: conversation.from,
      message: conversation.message,
      time: conversation.time,
    }),
  });
};
