import React, { useEffect, useRef, useState } from 'react';
import Video from './Video.jsx';
import Audio from './Audio.jsx';
import { setMediaStream as MediaStream } from './mediaStreamStore.js';
import { useLocation, useParams } from 'react-router-dom';
import socket from './socket.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const MediaAccessPage = () => {
  const { user, data } = useSelector(store => store.auth);
  const navigate=useNavigate()
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [accessStatus, setAccessStatus] = useState('idle');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const skill = queryParams.get('skill'); 
  //const role=location.state?.role;
  const {intervieweID}=useParams()
  const interviewId=intervieweID
  console.log(interviewId);
  const handleGrantAccess = () => {
    console.log('Attempting to get user media...');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log('Media stream successfully obtained');
        setAccessStatus('granted');
        MediaStream(stream);
        setMediaStream(stream);
      })
      .catch((err) => {
        console.error('Media access denied:', err);
        setAccessStatus('denied');
      });
  };

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      console.log('Setting stream to video element...');
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((err) => {
        console.error('Error playing video:', err);
      });

      const element = document.documentElement;
      if (element.requestFullscreen) element.requestFullscreen();
      if (screen.orientation?.lock) {
        screen.orientation.lock('portrait').catch((err) => {
          console.warn('Orientation lock failed:', err);
        });
      }
    }
  }, [mediaStream]);
  

  const handleJoin = () => {
    console.log(user);
      socket.emit('join',({interviewId,user}));
      if(user=="User"){
       navigate(`/candidate/${interviewId}`)
      }
      else{
        //navigate(`/interviwer/${interviewId}`)
        navigate(`/interviwer/${interviewId}?skill=${encodeURIComponent(skill)}`)

      }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to the Media Access Page</h2>
          <p className="text-gray-600">Please grant access to your camera and microphone to continue.</p>
        </div>
  
        {/* Grant Access Button */}
        {accessStatus !== 'granted' && (
          <div className="flex justify-center">
            <button
              onClick={handleGrantAccess}
              className={`w-full py-2 rounded-md font-medium transition-colors ${
                accessStatus === 'denied'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={accessStatus === 'denied'}
            >
              {accessStatus === 'denied' ? 'Access Denied' : 'Grant Access'}
            </button>
          </div>
        )}
  
        {/* Video and Audio Display */}
        {accessStatus === 'granted' && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <Video
              ref={videoRef}
              className="w-full rounded-lg border border-gray-300 shadow-sm"
              playsInline
              autoPlay
              muted
            />
            {mediaStream && <Audio stream={mediaStream} />}
  
            <button
              onClick={handleJoin}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold shadow-md transition"
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default MediaAccessPage;
