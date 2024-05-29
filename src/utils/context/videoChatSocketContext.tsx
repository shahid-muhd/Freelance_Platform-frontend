'use client'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type VideoChatSocketContextType = WebSocket | null;
const VideoChatSocketContext = createContext<VideoChatSocketContextType>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

const VideoChatSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = JSON.parse(token);
    }
    const websocket = new WebSocket(
      `ws://localhost:8000/ws/video_chat/?token=${token}`
    );

    websocket.onopen = () => {
      console.log("signalling socket connected");
    };

    websocket.onerror = (error) => {
      console.error("signalling socket error:", error);
    };

    websocket.onclose = () => {
      console.log("signalling socket closed");
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <VideoChatSocketContext.Provider value={ws} >
      {children}
    </VideoChatSocketContext.Provider>
  );
};

export { VideoChatSocketContext, VideoChatSocketProvider };
