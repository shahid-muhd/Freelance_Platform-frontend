"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import useVideoChatServices from "@/app/services/videoChatServices";

function VideoChat() {
  const { myMeeting } = useVideoChatServices();

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("videoChatRoomId");
      sessionStorage.removeItem("videoChatExchanger");
    };
  }, []);

  return (
    <div className="w-full h-[85vh] ">
      <div
        className="myCallContainer  w-full h-full text-secondary-foreground"
        ref={myMeeting}
      ></div>
      {/* <div className="streaming-frame w-full h-full  relative">
        <div className="remote-stream px-2  w-full h-[85vh]">
          <video
            autoPlay
            ref={remoteVideoRef}
            className="w-full h-[85vh] object-cover  border  "
          ></video>
        </div>
        <div className="self-stream-wrapper  w-fit h-fit  absolute right-2 bottom-0">
          <video
            autoPlay
            ref={localVideoRef}
            className="w-72 h-40 object-cover   rounded-lg "
          ></video>
        </div>
      </div> */}
    </div>
  );
}

export default VideoChat;
