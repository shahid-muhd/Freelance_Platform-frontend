import { ExchangerPrimitive, Message } from "@/utils/types/types";
import { create } from "zustand";

interface VideoChatStore {
  roomId: string;
  exchanger: number | null;
  changeRoomId: (roomId: string) => void;
  changeExchanger: (exchanger: number) => void;
}

const useVideoChatStore = create<VideoChatStore>((set, get) => ({
  roomId: "",
  exchanger: null,
  changeRoomId: (roomId) => {
    set({ roomId: roomId });
  },
  changeExchanger: (exchanger) => {
    set({ exchanger: exchanger });
  },
}));

export default useVideoChatStore;
