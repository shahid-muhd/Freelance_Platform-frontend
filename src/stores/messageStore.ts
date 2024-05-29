import { Message } from "@/utils/types/types";
import { create } from "zustand";

interface MessageStore {
  messages: Message[];
  currentExchanger: number | null;
  addMessages: (messages: Message[]) => void;
  removeMessage: (messageId: string) => void;
  setCurrentExchanger: (exchanger: number | null) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  currentExchanger: null,
  addMessages: (messages) => {
    const currentExchanger = get().currentExchanger;
    set({ messages: [...get().messages, ...messages], currentExchanger });
  },
  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),
  clearMessages: () => set({ messages: [] }),
  setCurrentExchanger: (exchanger) => set({ currentExchanger: exchanger }),
}));

export default useMessageStore;
