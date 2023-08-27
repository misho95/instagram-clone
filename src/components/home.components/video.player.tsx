import { useRef, useState } from "react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div
      onMouseEnter={togglePlay}
      onMouseLeave={togglePlay}
      className="w-40 h-40 relative"
    >
      <video ref={videoRef} controls={false}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
