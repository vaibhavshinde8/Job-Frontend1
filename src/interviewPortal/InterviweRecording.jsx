import axiosInstance from "@/axios/axiosConfig";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

export default function InterviewerScreenRecorder() {
  const { interviweID } = useParams(); // Retrieve interviweID from URL params
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  // Automatically start recording when the component mounts
  useEffect(() => {
    startScreenRecording();
  }, []);

  const startScreenRecording = async () => {
    if (!interviweID) {
      console.error("❌ Interview ID is missing.");
      return; // Exit early if interviweID is not available
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...micStream.getTracks(),
      ]);

      recordedChunks.current = [];

      const mediaRecorder = new MediaRecorder(combinedStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Check if recordedChunks.current is defined and has a length
        if (recordedChunks.current && Array.isArray(recordedChunks.current) && recordedChunks.current.length > 0) {
          const blob = new Blob(recordedChunks.current, {
            type: "video/webm",
          });

          const formData = new FormData();
          formData.append("video", blob, `interview-recording-${Date.now()}.webm`);
          formData.append("interviweID", interviweID); // Add interviweID to FormData

          try {
            const res = await axiosInstance.post("/uploadVideo", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (res.status === 200) { // Check if the status is 200 (OK)
              console.log("✅ Video uploaded successfully");
            } else {
              console.error("❌ Upload failed");
            }
          } catch (err) {
            console.error("❌ Error uploading video:", err);
          }
        } else {
          console.error("No data recorded or recordedChunks is undefined.");
        }
      };

      mediaRecorder.start();
      console.log("🎥 Recording started");

      // Auto stop after 1 minute
      setTimeout(() => mediaRecorder.stop(), 60000);

    } catch (err) {
      console.error("Error capturing screen or mic:", err);
      alert("Could not start screen or microphone recording.");
    }
  };

  return (
    <div>
      {/* Optional button to manually start recording */}
      <button
        onClick={startScreenRecording}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hidden"
      >
        Start Interview (and Record Screen)
      </button>
    </div>
  );
}
