import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { STREAM_DURATION_SECONDS } from "./constants";

export interface CounterAnimationHandle {
  play(seconds: number): void;
  readonly ready: Promise<void>;
}

interface CounterAnimationProps {
  onEnded: () => void;
}

export const CounterAnimation = forwardRef<
  CounterAnimationHandle,
  CounterAnimationProps
>(function CounterAnimation({ onEnded }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasFiredOnEnded = useRef(false);

  const readyPromise = useRef<Promise<void>>();
  if (!readyPromise.current) {
    readyPromise.current = new Promise<void>((resolve) => {
      const check = () => {
        const v = videoRef.current;
        if (v && v.readyState >= 1) {
          resolve();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }

  useImperativeHandle(ref, () => ({
    play(seconds: number) {
      const video = videoRef.current;
      if (!video) return;
      hasFiredOnEnded.current = false;
      video.currentTime = seconds;
      video.play().catch(() => {});
    },
    get ready() {
      return readyPromise.current!;
    },
  }));

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || hasFiredOnEnded.current) return;
    if (video.currentTime >= STREAM_DURATION_SECONDS) {
      hasFiredOnEnded.current = true;
      onEnded();
    }
  };

  return (
    <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center">
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}animated/Streamer-Counter-OUT_v05b.webm`}
        muted
        playsInline
        preload="auto"
        onPlaying={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        className={`w-64 h-auto transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
});
