import { useRef } from "react";

interface PropsType {
  src: string;
  w: string;
  h: string;
}

const VideoPlayer = ({ src, w, h }: PropsType) => {
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
      onClick={togglePlay}
      className={`${w} ${h} relative`}
    >
      <video
        ref={videoRef}
        controls={false}
        className={`object-cover ${w} ${h}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
