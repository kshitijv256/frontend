import { create } from "zustand";

export interface conversation{
    messages:[];
    
}

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation:any) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages:any) => set({ messages }),
}));

export default useConversation;