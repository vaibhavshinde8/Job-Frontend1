import React, { forwardRef } from 'react';

const Video = forwardRef((props, ref) => (
  <div className="p-4">
    <video
      ref={ref} // Forward the ref to the video element
      width="600"
      height="400"
      autoPlay
      playsInline
      muted
      className={props.className}
    />
  </div>
));

export default Video;
