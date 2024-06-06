export const webSocketInitializer = (onMessageReceive: (result: string) => void) => {
  let token = localStorage.getItem("access_token");
  if (token) {
    token = JSON.parse(token);
  }
  const webSocket = new WebSocket(
    `${process.env.NEXT_PUBLIC_SOCKET_BASE_URL}/ws/chat/?token=${token}`
  );

  webSocket.onopen = () => {
    console.log("WebSocket connected");
  };

  webSocket.onmessage = (event) => {
    console.log(event.data);
    onMessageReceive(event.data)
  };

  webSocket.onclose = () => {
    console.log("WebSocket disconnected");
 
  };

  return webSocket;
};
