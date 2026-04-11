import { useEffect, useRef, useState } from "react";

interface CounterAnimationProps {
  initialSeconds: number;
  onEnded: () => void;
}

export function CounterAnimation({
  initialSeconds,
  onEnded,
}: CounterAnimationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = () => {
      try {
        video.currentTime = initialSeconds;
      } catch {
        // ignore — will retry once metadata is loaded
      }
      video.play().catch(() => {});
    };

    if (video.readyState >= 1) {
      
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
      return () => video.removeEventListener("loadedmetadata", start);
    }
  }, [initialSeconds]);

  return (
    <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center">
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}animated/Streamer-Counter-OUT_v04.webm`}
        muted
        playsInline
        preload="auto"
        onPlaying={() => setIsPlaying(true)}
        onEnded={onEnded}
        className={`w-64 h-auto transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
