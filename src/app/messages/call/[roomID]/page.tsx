"use client";
import React, { useEffect, useState } from "react";
import VideoChat from "../../components/videoChat";

function Call({ params }: { params: { roomID: string } }) {
  sessionStorage.setItem("videoChatRoomId", params.roomID);

  return (
    <div className="w-100">
      <VideoChat />
    </div>
  );
}

export default Call;
