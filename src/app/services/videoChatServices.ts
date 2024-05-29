import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNotificationContext } from "@/utils/context/NotificationContext";
import roomIDGenerator from "@/utils/randomIDGenerator";

const getRoomId = () => {
  let roomID = "";
  roomID = sessionStorage.getItem("videoChatRoomId") || roomIDGenerator(5);
  sessionStorage.setItem("videoChatRoomId", roomID);
  return roomID;
};

function useVideoChatServices() {
  const { sendMessage } = useNotificationContext();

  const roomID = getRoomId();
  const exchanger = sessionStorage.getItem("videoChatExchanger");
  if (exchanger) {
    sendMessage({
      event_name: "video_chat_room_id",
      message: { roomID, exchanger },
    });
  }
  let myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
    const serverSecret = process.env
      .NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET as string;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      roomIDGenerator(5),
      roomIDGenerator(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,

      sharedLinks: [
        {
          name: "Conference Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return { myMeeting };
}
export default useVideoChatServices;
// import { ZegoExpressEngine } from "zego-express-engine-webrtc";

// import React, { useRef } from "react";
// import { useUserContext } from "@/utils/context/stateContextProviders";
// import { VideoChatApi } from "@/api/videoChatApi";

// function useVideoChatServices() {
//   const localVideoRef = useRef<HTMLVideoElement | null>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
//   const { user } = useUserContext();
//   const zegoClient = useRef<ZegoExpressEngine | null>(null);

//   const getTokenService= async()=>{
//     const token = await VideoChatApi.getToken();
//     return token
//   }
//   const initializeConnection = async () => {
//     zegoClient.current = new ZegoExpressEngine(
//       Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID),
//       process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET as string
//     );
//   };

//   const startVideoConference = async () => {
//     const token = await VideoChatApi.getToken();
//     console.log('generated token>>>',token)
//     try {
//       const userID = "user_" + user?.user?.last_name;
//       +new Date().getTime();
//       const userName = user?.user?.first_name + " " + user?.user?.last_name;

//       await zegoClient?.current?.loginRoom(
//         "room1",
//         token as string,
//         { userID, userName },
//         { userUpdate: true }
//       );

//       const localStream = await zegoClient.current?.createStream({
//         camera: { video: true, audio: true },
//       });
//       if (localVideoRef.current && localStream) {
//         localVideoRef.current.srcObject = localStream;
//         zegoClient.current?.startPublishingStream("local_stream", localStream);
//       }

//       zegoClient.current?.on(
//         "roomStreamUpdate",
//         async (roomID, updateType, streamList) => {
//           if (updateType === "ADD") {
//             const remoteStream = await zegoClient.current?.startPlayingStream(
//               streamList[0].streamID
//             );
//             if (remoteVideoRef.current && remoteStream) {
//               remoteVideoRef.current.srcObject = remoteStream;
//             }
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Error starting video conference:", error);
//     }
//   };

//   return {
//     localVideoRef,
//     remoteVideoRef,
//     initializeConnection,
//     startVideoConference,
//     zegoClient,
//     getTokenService
//   };
// }

// export default useVideoChatServices;
