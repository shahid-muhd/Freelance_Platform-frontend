"use client";
import React, { useEffect } from "react";
import UsersList from "./components/usersList";
import ChatBox from "./components/chatBox";
import useMessageServices from "../services/messageServices";
import { MessageContextProvider } from "@/utils/context/stateContextProviders";
import useMessageStore from "@/stores/messageStore";

function Chat() {
  const { getExchangers } = useMessageServices();
  const {currentExchanger}=useMessageStore()

  useEffect(() => {
    getExchangers();
  }, []);

  return (
    <div className="flex w-full sm:pb-5 h-svh">
      <div className="user-list-wrapper w-full sm:w-5/12  sm:px-5">
        {/* <Button onClick={handleSendMessage} >send message</Button> */}
        <UsersList />
      </div>

      <div className="chat-frame-wrapper sticky  top-20 hidden w-full h-[90%] sm:block  sm:px-5 ">
      {currentExchanger ?  <ChatBox />: <div>Select exchanger to chat</div> }
      </div>
    </div>
  );
}

export default Chat;
