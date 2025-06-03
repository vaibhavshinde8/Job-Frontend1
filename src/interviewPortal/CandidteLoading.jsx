import { useRef, useState, useEffect } from "react";
import socket from "./socket.js";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "./codeEditor.jsx";

export default function Candidate() {
  const localRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const remoteAudioStreamRef = useRef(null);
const navigate=useNavigate();
  const { interviweID } = useParams();

  const [connectionStatus, setConnectionStatus] = useState("Initializing...");
  const [connection, setConnection] = useState(false);
  const [remoteStreamReady, setRemoteStreamReady] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

  const myPeerConnection = useRef(null);

  async function createPeerConnection() {
    if (myPeerConnection.current) return;

    myPeerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    myPeerConnection.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("send-candidate", {
          data: e.candidate,
          interviewId: interviweID,
        });
      }
    };

    myPeerConnection.current.onconnectionstatechange = () => {
      const state = myPeerConnection.current.connectionState;
      setConnectionStatus(`Connection state: ${state}`);

      if (state === "disconnected" || state === "failed" || state === "closed") {
        setDisconnected(true);
        setLoading(true);
        alert("Interviewer disconnected. Please wait...");
        setConnection(false);
      } else if (state === "connecting") {
        setConnectionStatus("Connecting to remote peer...");
        setLoading(true);
      } else if (state === "connected") {
        setConnectionStatus("Connected with remote peer ✅");
        setConnection(true);
        setDisconnected(false);
        setLoading(false);
      }
    };

    myPeerConnection.current.ontrack = (event) => {
      setRemoteStreamReady(true);
      const remoteAudioStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        if (track.kind === "audio") {
          remoteAudioStream.addTrack(track);
        }
      });
      remoteAudioStreamRef.current = remoteAudioStream;
    };
  }

  useEffect(() => {
    if (remoteStreamReady) {
      if (remoteAudioRef.current && remoteAudioStreamRef.current) {
        remoteAudioRef.current.srcObject = remoteAudioStreamRef.current;
      }
    }
  }, [remoteStreamReady]);

  async function Invite() {
    await createPeerConnection();
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localRef.current.srcObject = camStream;

      camStream.getTracks().forEach((t) => myPeerConnection.current.addTrack(t, camStream));

      const offer = await myPeerConnection.current.createOffer();
      await myPeerConnection.current.setLocalDescription(offer);

      socket.emit("offer", {
        offer,
        interviweId: interviweID,
      });
    } catch (err) {
      setConnectionStatus("Error accessing camera/mic or during negotiation.");
      console.error("Media/negotiation error:", err);
    }
  }

  useEffect(() => {
    socket.on("offer-msg", async (offer) => {
      setConnectionStatus("Offer received. Setting up...");
      await createPeerConnection();

      const cam = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localRef.current.srcObject = cam;
      cam.getTracks().forEach((t) => myPeerConnection.current.addTrack(t, cam));

      await myPeerConnection.current.setRemoteDescription(offer);
      const answer = await myPeerConnection.current.createAnswer();
      await myPeerConnection.current.setLocalDescription(answer);

      socket.emit("answer", { answer, interviewId: interviweID });
    });

    socket.on("answer-msg", async (answer) => {
      setConnectionStatus("Answer received. Connecting...");
      await myPeerConnection.current.setRemoteDescription(answer);
    });

    socket.on("receive-candidate", (candidate) => {
      myPeerConnection.current.addIceCandidate(candidate);
    });

    return () => {
      socket.off("offer-msg");
      socket.off("answer-msg");
      socket.off("receive-candidate");
    };
  }, []);

  useEffect(() => {
    socket.emit("join", {
      interviewId: interviweID,
      role: "interviwer",
    });
    Invite();

    document.addEventListener("fullscreenchange", handleFullscreenExit);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
    };
  }, []);

  const handleFullscreenExit = () => {
    if (!document.fullscreenElement) {
      socket.emit("fullscreen-exit", {
        interviewId: interviweID,
        timestamp: new Date().toISOString(),
      });
      alert("Exiting fullscreen is not allowed during the interview.");
      setShowFullscreenPrompt(true);
    }
  };

  const requestFullscreen = () => {
    const elem = document.documentElement;

    const sendEnterMsg = () => {
      socket.emit("fullscreen-enter", {
        interviewId: interviweID,
        timestamp: new Date().toISOString(),
      });
      setShowFullscreenPrompt(false);
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(sendEnterMsg).catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
      sendEnterMsg();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
      sendEnterMsg();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
      sendEnterMsg();
    }
  };

  const handleClick=()=>{
    navigate("/");
     
   }
  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-800">
      {/* Fullscreen Overlay Prompt */}
      {showFullscreenPrompt && (
        <div className="absolute inset-0  bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <button
            onClick={requestFullscreen}
            className=" text-white px-6 py-3 rounded-lg border-1 border-white font-semibold text-lg shadow-xl "
          >
            Enter Fullscreen to Start Interview
          </button>
        </div>
      )}

      {/* Left Panel: Code Editor */}
      <div className="flex-[5]   border-r border-gray-200 p-6 flex flex-col overflow-hidden">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 overflow-x-hidden border border-gray-100 max-h-[85vh] scrollbar-hide">
          <CodeEditor />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-[2] p-6 w-  flex flex-col justify-between">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Your Camera</h3>
            <video
              ref={localRef}
              width={250}
              height={180}
              autoPlay
              playsInline
              muted
              className="rounded-lg border border-gray-300 shadow-sm"
            />
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            {loading && <p>Waiting for interviewer to connect...</p>}
            {!loading && connection && <p>Connected to interviewer ✅</p>}
            {!connection && !loading && <p>{connectionStatus}</p>}
          </div>
        </div>
         <div className="flex  mb-28 ml-auto mr-auto">
          <button onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            Leave Interview
          </button>
        </div>

        <div className="hidden">
          <audio ref={remoteAudioRef} autoPlay controls />
        </div>
      </div>
    </div>
  );
}
