import { Input } from "@/components/ui/input";
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { MdSettingsVoice } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import useMessageStore from "@/stores/messageStore";
import useUserProfileServices from "@/app/services/userProfileServices";
import { Message, NewMessage, User } from "@/utils/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMessageServices from "@/app/services/messageServices";
import { useUserContext } from "@/utils/context/stateContextProviders";
import { HiVideoCamera } from "react-icons/hi2";
import Link from "next/link";
import useVideoChatStore from "@/stores/videoChatStore";
import { useRouter } from "next/navigation";
import useMessageService from "@/app/services/messageServices";

function ChatBox() {
  const [messageInput, setMessageInput] = useState<NewMessage>({
    text: "",
    receiver: 0,
  });
  const { messages, currentExchanger } = useMessageStore();
  const { getSpecificUserDetails } = useUserProfileServices();
  const [exchangerDetails, setexchangerDetails] = useState<User>();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { addMessages, clearMessages } = useMessageStore();
  const { changeExchanger } = useVideoChatStore();
  // const { connectSocket, disconnectSocket } = useMessageServices();
  const { user } = useUserContext();
  const { callNavigator } = useMessageService();

  useEffect(() => {
    if (currentExchanger) {
      getSpecificUserDetails(currentExchanger).then((exchanger) => {
        console.log(exchanger);

        setexchangerDetails(exchanger.user);
      });
    }
  }, [currentExchanger]);

  const messagePostionLeft = "justify-start";
  const messagePostionRight = "justify-end";
  useEffect(() => {
    let token = localStorage.getItem("access_token");
    let roomName = null;
    if (token) {
      token = JSON.parse(token);
    }
    if (user?.user?.id && currentExchanger) {
      roomName = user?.user?.id.toString() + currentExchanger.toString();

      const webSocket = new WebSocket(
        `${process.env.NEXT_PUBLIC_SOCKET_BASE_URL}/ws/chat/${roomName}/?token=${token}`
      );
      webSocket.onopen = () => {
        console.log("WebSocket connected");
      };

      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        let messages = data.message;

        switch (data.event_name) {
          case "new_message":
            console.log("new_message-->>", messages);
            addMessages(messages);
            break;
          case "message_history":
            addMessages(messages);
            break;

          default:
            break;
        }
      };

      webSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      setWs(webSocket);

      return () => {
        webSocket.close();
        clearMessages();
      };
    }
  }, [currentExchanger]);

  const sendMessage = (message: NewMessage) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentExchanger) {
      const newMessage = {
        text: e.target.value,
        receiver: currentExchanger,
      };
      setMessageInput(newMessage);
    }
  };

  const handdleMessageSend = () => {
    messageInput.text &&
      messageInput.receiver !== 0 &&
      sendMessage(messageInput);
  };

  return (
    <div className="w-full h-full">
      {exchangerDetails && (
        <div className="border border-b-0 h-full flex flex-col ">
          <div className="exchanger-details h-16 px-3 w-full flex items-center border-b">
            <div className="chatbox-exchanger-details w-1/2 flex items-center gap-3 ">
              <div className="w-fit ">
                <Avatar className="w-10 h-10">
                  {process.env.NEXT_PUBLIC_BASE_URL && (
                    <AvatarImage
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        exchangerDetails.profile_image
                      }
                    />
                  )}
                  <AvatarFallback>
                    <div className="uppercase w-full h-full flex items-center justify-center text-lg">
                      <p>
                        {" "}
                        {exchangerDetails.first_name &&
                          exchangerDetails.first_name[0]}{" "}
                      </p>{" "}
                      <p>
                        {" "}
                        {exchangerDetails.last_name &&
                          exchangerDetails.last_name[0]}
                      </p>
                    </div>
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="text-xl w-full flex truncate gap-1 capitalize">
                <div>
                  <p>{exchangerDetails.first_name}</p>
                </div>
                <div>
                  <p>{exchangerDetails.last_name}</p>
                </div>
              </div>
              <div></div>
            </div>
            <div className="call-option-wrapper w-1/2  flex justify-end px-3">
              <div className="video-chat-icon w-fit hover:cursor-pointer hover:scale-105 duration-150">
                <HiVideoCamera
                  onClick={() => callNavigator(currentExchanger as number)}
                  className="text-gray-500"
                  size={30}
                />
              </div>
            </div>
          </div>
          <div className="chat-display flex-grow w-full ">
            <div className="w-full h-full p-3 py-5  box-border">
              <ScrollArea className="h-[500px] md:[overflow-anchor:none]">
                <div className="md:[overflow-anchor:auto]">
                  {messages &&
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`chat-bubble  flex items-start gap-2.5 mb-2   ${
                          message.sender == user?.user?.id
                            ? messagePostionRight
                            : messagePostionLeft
                        } `}
                      >
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            `${
                              message.sender == user?.user?.id
                                ? user.user.profile_image
                                : exchangerDetails.profile_image
                            }`
                          }
                          alt="Jese image"
                        />
                        <div className="flex flex-col gap-1 w-full max-w-[320px]">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Bonnie Green
                          </span> */}
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {message.created_time}
                            </span>
                          </div>
                          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <p className="text-sm font-normal text-gray-900 dark:text-white">
                              {" "}
                              {message.text}
                            </p>
                          </div>
                          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {message.status}
                        </span> */}
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="chat-input-wrapper bg-gray-900  h-12 flex items-center border-t">
            <div className="w-1/12"></div>
            <div className="chat-input-box w-11/12 bg-slate-800 rounded-md flex items-center justify-between ">
              <input
                value={messageInput?.text}
                onChange={handleMessageInput}
                type="text"
                className="px-2 bg-slate-800 rounded-md active:border-0 w-11/12 focus-visible:ring-0 outline-none focus:outline-none "
              />
              <div className="w-1/12 flex justify-center">
                <div className="w-fit h-fit ">
                  <Button onClick={handdleMessageSend} variant={"link"}>
                    <LuSendHorizonal
                      className="hover:cursor-pointer hover:scale-150 duration-150 dark:text-gray-400"
                      size={20}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="voice-icon-wrapper  h-full  text-slate-600 flex items-center justify-center w-1/12">
              <MdSettingsVoice size={30} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
