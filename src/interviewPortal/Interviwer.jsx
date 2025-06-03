import { useRef, useState, useEffect } from "react";
import socket from "./socket.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CodeEditor from "./codeEditor.jsx";
import axios from 'axios'
import { toast } from "sonner";
import InterviewerScreenRecorder from "./InterviweRecording.jsx";
export default function Interviwer() {
  const localRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const remoteVideoStreamRef = useRef(null);
  const remoteAudioStreamRef = useRef(null);
  const [subpoint, setSubpoints] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { interviweID } = useParams();

  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [remoteStreamReady, setRemoteStreamReady] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Initializing...");
  const [marks, setMarks] = useState({});
  const myPeerConnection = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const skill = queryParams.get('skill');
  //const role=location.state?.role;
  const { intervieweID } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/v1/getData/${skill}`);
        //console.log("dta",response.data.data.subpoints);
        setData(response?.data);

        // setSubpoints(response?.data)
        setSubpoints(response?.data?.data?.subpoints);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  const handleMarksChange = (point, value) => {
    const val = Math.max(0, Math.min(10, Number(value))); // clamp between 0-10
    setMarks((prev) => ({ ...prev, [point]: val }));
  };
  const handleSubmit = async () => {
    //console.log("Submitted Marks:", marks);
    const subtopicMarks = {};

    // Loop through marks and only add entries that have a valid score
    Object.entries(marks).forEach(([subtopic, score]) => {
      if (score !== "" && score !== null && score !== undefined) {
        subtopicMarks[subtopic] = Number(score); // convert score to number if needed
      }
    });
   
    if(Object.keys(subtopicMarks).length === 0){
      toast.error("Fill the data properly");
      return;
      
    }
    console.log("subtopicMarks",subtopicMarks)

    try {
      const response = await axios.post(`http://localhost:8001/api/v1/setData/${skill}`, {
        interviewId: interviweID,
        subtopicMarks
      });
      //console.log("dta",response.data.data.subpoints);
      setData(response?.data);

      // setSubpoints(response?.data)
      //setSubpoints(response?.data?.data?.subpoints);
      toast.success(response?.data?.message);
      console.log(response);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.success(response?.error);
    }

  };

 // console.log("data", subpoint);
  async function createPeerConnection() {
    if (myPeerConnection.current) return;

    myPeerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    myPeerConnection.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("send-candidate", { data: e.candidate, interviewId: interviweID });
      }
    };

    myPeerConnection.current.onconnectionstatechange = () => {
      const state = myPeerConnection.current.connectionState;
      setConnectionStatus(`Connection state: ${state}`);

      if (state === "disconnected" || state === "failed" || state === "closed") {
        setConnectionStatus("Disconnected from remote peer.");
      } else if (state === "connecting") {
        setConnectionStatus("Connecting to remote peer...");
      } else if (state === "connected") {
        setConnectionStatus("Connected with remote peer ✅");
      }
    };

    myPeerConnection.current.ontrack = (event) => {
      const remoteVideoStream = new MediaStream();
      const remoteAudioStream = new MediaStream();

      event.streams[0].getTracks().forEach((track) => {
        if (track.kind === "video") {
          remoteVideoStream.addTrack(track);
        } else if (track.kind === "audio") {
          remoteAudioStream.addTrack(track);
        }
      });

      remoteVideoStreamRef.current = remoteVideoStream;
      remoteAudioStreamRef.current = remoteAudioStream;

      setRemoteStreamReady(true);
    };
  }

  useEffect(() => {
    if (remoteStreamReady) {
      if (remoteVideoRef.current && remoteVideoStreamRef.current) {
        remoteVideoRef.current.srcObject = remoteVideoStreamRef.current;
      }
      if (remoteAudioRef.current && remoteAudioStreamRef.current) {
        remoteAudioRef.current.srcObject = remoteAudioStreamRef.current;
      }
    }
  }, [remoteStreamReady]);

  async function Invite() {
    await createPeerConnection();

    try {
      const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      // Set but hide local video
      if (localRef.current) localRef.current.srcObject = camStream;

      camStream.getTracks().forEach((t) => myPeerConnection.current.addTrack(t, camStream));

      const offer = await myPeerConnection.current.createOffer();
      await myPeerConnection.current.setLocalDescription(offer);

      socket.emit("offer", {
        offer,
        interviweId: interviweID,
      });

      setWaitingForAnswer(true);
    } catch (err) {
      setConnectionStatus("Error accessing camera/mic or during negotiation.");
      console.error("Media/negotiation error:", err);
    }
  }

  useEffect(() => {
    socket.on("offer-msg", async (offer) => {
      setConnectionStatus("Offer received. Setting up...");
      await createPeerConnection();

      await myPeerConnection.current.setRemoteDescription(offer);

      const cam = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (localRef.current) localRef.current.srcObject = cam;
      cam.getTracks().forEach((t) => myPeerConnection.current.addTrack(t, cam));

      const answer = await myPeerConnection.current.createAnswer();
      await myPeerConnection.current.setLocalDescription(answer);

      socket.emit("answer", { answer, interviewId: interviweID });
    });

    socket.on("answer-msg", async (answer) => {
      setWaitingForAnswer(false);
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
    // Listen for fullscreen events from other peers
    socket.on("fullscreen-enter", () => {
      console.log("ABhishek")
      alert("Candidate has entered fullscreen mode.");
    });

    socket.on("fullscreen-exit", () => {
      alert("Candidate has exited fullscreen mode.");
    });

    return () => {
      socket.off("fullscreen-enter");
      socket.off("fullscreen-exit");
    };
  }, []);
  useEffect(() => {
    socket.emit("join", {
      interviewId: interviweID,
      role: "interviwer",
    });
    Invite();
  }, []);

  const handleClick = () => {
    navigate("/Dashboard");

  }

  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-800">
      {/* Left Panel: Code Editor */}
      <div className="flex-[5] border-r border-gray-200 p-6 flex flex-col overflow-hidden">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 overflow-x-hidden border border-gray-100 max-h-[85vh] scrollbar-hide">
          <CodeEditor />
        </div>
      </div>

      {/* Right Panel: Remote Video Feed */}
      <div className="flex-[2] p-6 flex flex-col justify-between">

        {/* Top actions */}


        <div className="grid grid-cols-1 gap-6">
          {/* Remote Camera */}
          <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col items-center border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Candidate</h3>
            {remoteStreamReady ? (
              <video
                ref={remoteVideoRef}
                width={250}
                height={180}
                autoPlay
                playsInline
                className="rounded-lg border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-40 w-full bg-gray-100 rounded-lg border border-gray-300 shadow-sm">
                <div className="loader animate-spin border-t-4 border-blue-500 border-solid rounded-full h-16 w-16"></div>
                <p className="mt-3 text-gray-500">Waiting for candidate to join...</p>
              </div>
            )}
          </div>

          {/* Marking System */}
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 max-h-[300px] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Mark Candidate on {data?.data?.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              {subpoint?.length > 0 ? (
                subpoint.map((point, index) => (
                  <div key={index} className="flex flex-col">
                    <label htmlFor={`point-${index}`} className="text-sm text-gray-700 mb-1">
                      {point}
                    </label>
                    <input
                      type="number"
                      id={`point-${index}`}
                      min={0}
                      max={10}
                      value={marks[point] || ""}
                      onChange={(e) => handleMarksChange(point, e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="0-10"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2">Loading topics...</p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
            >
              Submit Marks
            </button>
          </div>
        </div>

        {/* Remote Audio (Hidden) */}
        <div className="hidden">
          <audio ref={remoteAudioRef} autoPlay controls />
        </div>
        <div className="flex justify-end mt-4 ml-auto mr-auto">
          <button onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            Leave Interview
          </button>
        </div>

        {/* Hidden Local Feed for Media Capture */}
        <video
          ref={localRef}
          autoPlay
          muted
          playsInline
          style={{ display: "none" }}
        />
      </div>
<InterviewerScreenRecorder/>
    </div>
  );

}
