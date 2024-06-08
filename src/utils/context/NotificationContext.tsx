"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useNotificationStore from "@/stores/notificationStore";

interface Props {
  children: React.ReactNode;
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "../types/types";
import { useRouter } from "next/navigation";

interface NotificationEvent {
  event_name: string;
  message: string | object;
}

interface NotificationContextType {
  sendMessage: (notification: NotificationEvent) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { addNotifications, notifications } = useNotificationStore();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messageQueue, setMessageQueue] = useState<NotificationEvent[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const connectSocket = () => {
      let token = localStorage.getItem("access_token");
      let socket: WebSocket | null = null;

      if (token) {
        token = JSON.parse(token);

        socket = new WebSocket(
          `${process.env.NEXT_PUBLIC_SOCKET_BASE_URL}/ws/notifications/?token=${token}`
        );

        socket.addEventListener("open", () => {
          setIsConnected(true);
          console.log("Connected to WebSocket");

          messageQueue.forEach((notification) => {
            sendMessage(notification);
          });
          setMessageQueue([]);
        });

        socket.addEventListener("message", (event) => {
          const eventData = JSON.parse(event.data);
          console.log(" from noty server ", eventData.message);

          switch (eventData.message?.event_name) {
            case "notification_history" || "proposal":
              const newNotifications: Notification[] = notifications.concat(
                eventData.message.message
              );
              addNotifications(newNotifications);

              break;
            case "proposal":
              addNotifications(eventData.message.message);

              break;
            case "call":
              eventData.message.message.forEach((message: Notification) => {
                toast({
                  duration: 10000,
                  className: "border border-secondary",
                  title: "Incoming Call",
                  description: message?.title,
                  action: (
                    <ToastAction
                      onClick={() => callNavigator(message.description)}
                      altText="Answer Call"
                    >
                      Answer
                    </ToastAction>
                  ),
                });
              });

            default:
              break;
          }
        });

        socket.addEventListener("error", (event) => {
          console.error("WebSocket error: ", event);
        });

        socket.addEventListener("close", () => {
          console.log("WebSocket closed");
          connectSocket();
        });

        setWs(socket);
      }
    };

    connectSocket();

    return () => {
      ws && ws.close();
    };
  }, []);

  const callNavigator = (roomID: string) => {
    router.push(`/messages/call/${roomID}`);
  };

  const sendMessage = (notification: NotificationEvent) => {
    if (ws && isConnected) {
      ws.send(JSON.stringify(notification));
    } else {
      setMessageQueue((prevQueue) => [...prevQueue, notification]);
    }
  };

  const contextValue: NotificationContextType = {
    sendMessage,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
