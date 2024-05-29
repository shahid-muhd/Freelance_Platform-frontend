import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useRef, useState } from "react";

function useVideoChatSignalingServices(sendSignals: (message: any) => void) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  let localStream: MediaStream | null = null;
  let remoteStream: MediaStream | null = null;
  let peer: RTCPeerConnection | null = null;
  //   const [peer, setPeer] = useState<RTCPeerConnection | null>(null);
  const { toast } = useToast();
  console.log(peer);



  const connectMediaDevices = async () => {
    const constraints = {
      video: true,
      audio: { echoCancellation: true },
    };
    remoteStream = new MediaStream();

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (localVideoRef.current) {
          localStream = stream;
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        toast({
          description: "Error accessing media devices.",
        });
        console.log(error);
      });
  };

  const initializePeerConnection = () => {
    peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    localStream?.getTracks().forEach((track) => {
      peer?.addTrack(track, localStream as MediaStream);
    });

    peer.addEventListener("signalingstatechange", (event) => {
      console.log(event);

      console.log(peer?.signalingState);
    });

    peer.addEventListener("icecandidate", (e) => {
      if (e.candidate) {
        console.log("ICE Candidate:", e.candidate);
        const signal = {
          type: "iceCandidates",
          content: e.candidate,
        };
        sendSignals(signal);
      }
    });

    peer.addEventListener("track", (e) => {
      console.log("received remote track");
      console.log(e);

      e.streams[0].getTracks().forEach((track) => {
        remoteStream?.addTrack(track);
      });
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });
    console.log(peer);
    
    createOffer();
  };

  const createOffer = async () => {
    try {
      const offer = await peer?.createOffer();
      peer?.setLocalDescription(offer);

      const signal = {
        type: "offer",
        content: offer,
      };
      sendSignals(signal);
    } catch (error) {
      console.log("offer creation err >>>", error);
    }
  };
  return {
    localVideoRef,
    remoteVideoRef,
    connectMediaDevices,
    initializePeerConnection,
  };
}

export default useVideoChatSignalingServices;
