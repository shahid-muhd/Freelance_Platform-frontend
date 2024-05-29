"use client";
import useNotificationStore from "@/stores/notificationStore";
import React, { useEffect, useState } from "react";
interface Props {
  children: React.ReactNode;
}
function VideoChatSocketController({ children }: Props) {
  // const { ws, connectNotificationSocket } = useNotificationSocketContext();

  const [input, setInput] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { addNotifications,notifications } = useNotificationStore();
  
  useEffect(() => {
    connectSocket();

    return () => {
      ws && ws.close();
    };
  }, []);



  const connectSocket = () => {
    let token = localStorage.getItem("access_token");
    let socket: WebSocket | null = null;

    // Create WebSocket connection.
    if (token) {
      token = JSON.parse(token);

      socket = new WebSocket(
        `ws://localhost:8000/ws/notifications/?token=${token}`
      );

      // Connection opened
      socket.addEventListener("open", (event) => {
        console.log("Connected to WebSocket");
      });

      // Listen for messages
      socket.addEventListener("message", (event) => {
        const eventData = JSON.parse(event.data)
        console.log(" from noty server ", eventData.message);

        switch (eventData.message?.event_name) {
          case "notification":
            
            addNotifications(eventData.message.message);

            break;

          default:
            break;
        }
      });

      // Listen for errors
      socket.addEventListener("error", (event) => {
        console.error("WebSocket error: ", event);
      });

      // Connection closed
      socket.addEventListener("close", (event) => {
        console.log("WebSocket closed: ", event);
        connectSocket();
      });

      setWs(socket);
    }
  };

  // const sendMessage = () => {


  //   if (ws && ws.readyState === WebSocket.OPEN) {
  //     ws.send(JSON.stringify({ message: "message from client" }));
  //   } else {
  //     console.error("WebSocket is not open");
  //   }
  // };

  return <>{children}</>;
}

export default VideoChatSocketController;
