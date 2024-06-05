import { messageExchangerApi } from "@/api/messageExchangerApi";
import { useToast } from "@/components/ui/use-toast";
import useExchangerStore from "@/stores/chatExchangerStore";
import useMessageStore from "@/stores/messageStore";
import { useSubscriptionContext } from "@/utils/context/stateContextProviders";
import roomIDGenerator from "@/utils/randomIDGenerator";
import { ExchangerPrimitive, Message, NewMessage } from "@/utils/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useMessageService = () => {
  const { addMessages } = useMessageStore();
  // const [ws, setWs] = useState<WebSocket | null>(null);
  let ws: WebSocket | null = null;
  const router = useRouter();
  const { subscription } = useSubscriptionContext();
  const { addExchangers } = useExchangerStore();
  const { getAllExchangers } = messageExchangerApi;
  const { toast } = useToast();
  const connectSocket = () => {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = JSON.parse(token);
    }
    const webSocket = new WebSocket(
      `ws://localhost:8000/ws/chat/?token=${token}`
    ); // Replace 'your-backend-url' with your actual WebSocket URL

    webSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    webSocket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
    };

    webSocket.onclose = () => {
      console.log("WebSocket disconnected");
      // You may want to handle reconnection logic here
    };
    ws = webSocket;
  };

  const disconnectSocket = () => {
    ws?.close();
  };
  const sendMessage = (message: NewMessage) => {
    if (ws !== null) {
      const newMessage = JSON.stringify({ content: message });
      ws.send(newMessage);
    } else {
      console.log("not connected");
    }
  };

  const getExchangers = () => {
    getAllExchangers().then((exchangers) => {
      const exchangerDetails = JSON.parse(exchangers as string);
      exchangerDetails &&
        addExchangers(exchangerDetails as ExchangerPrimitive[]);
    });
  };

  const callNavigator = (exchanger: number) => {
    if (subscription?.package_name !== "delux") {
      return toast({
        description:
          "This feature is available exclusively for our Deluxe Subscription members. Upgrade now to enjoy video calls and many other premium benefits!",
      });
    }
    if (exchanger) {
      const roomID = roomIDGenerator(5);
      sessionStorage.setItem("videoChatExchanger", exchanger.toString());
      sessionStorage.setItem("videoChatRoomId", roomID);
      router.push(`/messages/call/${roomID}`);
    }
  };
  return {
    connectSocket,
    sendMessage,
    getExchangers,
    disconnectSocket,
    callNavigator,
  };
};

export default useMessageService;
