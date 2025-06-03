import React, { useEffect, useRef } from 'react';
//import './Audio.css'; // Optional for styling

// Audio Level Visualization Component
const Audio = ({ stream }) => {
    const barRef = useRef(null);
    const audioRef = useRef(null);
  
    useEffect(() => {
      // Create the audio context and analyser
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;  // Size of the frequency data array
      const dataArray = new Uint8Array(analyser.frequencyBinCount);  // Frequency data array
  
      source.connect(analyser);  // Connect audio source to analyser
  
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);  // Get frequency data
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;  // Calculate average level
        const widthPercent = (average / 255) * 100;  // Convert to percentage for the visualizer
  
        // Apply the width to the bar reference
        if (barRef.current) {
          barRef.current.style.width = `${widthPercent}%`;
        }
  
        // Call updateLevel again on the next animation frame for continuous update
        requestAnimationFrame(updateLevel);
      };
  
      // Start the audio level updates
      updateLevel();
  
      // Play the audio through the audio element
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
        audioRef.current.play();
      }
  
      // Clean up the audio context on component unmount
      return () => {
        audioContext.close();
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.srcObject = null;
        }
      };
    }, [stream]);
  
    return (
      <div>
        {/* Audio Element to play the stream */}
      
        
        {/* Audio Level Visualization */}
        <div className="audio-level-container" style={{ height: '10px', background: '#ccc', width: '100%' }}>
          <div ref={barRef} className="audio-bar" style={{ height: '100%', background: '#4caf50' }}></div>
        </div>
      </div>
    );
  };

export default Audio;
