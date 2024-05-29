import { ExchangerPrimitive, Message } from "@/utils/types/types";
import { create } from "zustand";

interface MessageStore {
  exchangers: ExchangerPrimitive[];
  addExchangers: (exchangers: ExchangerPrimitive[]) => void;
  removeExchanger: (exchangersId: number) => void;
}

const useExchangerStore = create<MessageStore>((set, get) => ({
  exchangers: [],

  addExchangers: (exchangers) => {
    set({ exchangers });
  },
  removeExchanger: (exchangersId) =>
    set((state) => ({
      exchangers: state.exchangers.filter(
        (exchanger) => exchanger.id !== exchangersId
      ),
    })),
}));

export default useExchangerStore;
