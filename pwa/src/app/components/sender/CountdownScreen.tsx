import { useRef, useState } from "react";

const counterSrc = `${import.meta.env.BASE_URL}animated/START-COUNTER-OUT_v04.webm`;

interface CountdownScreenProps {
  onComplete: () => void;
}

const STREAM_DURATION_SECONDS = 8

export function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasFiredRef = useRef(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (hasFiredRef.current) return;
    if (video.currentTime >= STREAM_DURATION_SECONDS) {
      hasFiredRef.current = true;
      onComplete();
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <video
        className={`h-full w-full scale-[0.8] object-contain transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        src={counterSrc}
        autoPlay
        muted
        playsInline
        onPlaying={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}
