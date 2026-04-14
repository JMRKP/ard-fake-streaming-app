import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface ViewCountGraphHandle {
  play(seconds: number): void;
  readonly ready: Promise<void>;
}

interface ViewCountGraphProps {
  src: string;
}

export const ViewCountGraph = forwardRef<ViewCountGraphHandle, ViewCountGraphProps>(
  function ViewCountGraph({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
        // Start checking once the ref is attached (after first render)
        requestAnimationFrame(check);
      });
    }

    useImperativeHandle(ref, () => ({
      play(seconds: number) {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = seconds;
        video.play().catch(() => {});
      },
      get ready() {
        return readyPromise.current!;
      },
    }));

    return (
      <div className="absolute top-4 left-4 right-4 z-20">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          onPlaying={() => setIsPlaying(true)}
          className={`w-full h-auto transition-opacity duration-200 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  },
);
