import { RefObject, useState } from "react";
import { SwitchCamera } from "lucide-react";
import { CounterAnimation } from "./CounterAnimation";

interface LiveScreenProps {
  videoRef: RefObject<HTMLVideoElement>;
  initialSeconds: number;
  onEnded: () => void;
  onSwitchCamera: () => void;
}

export function LiveScreen({
  videoRef,
  initialSeconds,
  onEnded,
  onSwitchCamera,
}: LiveScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        aria-label="User camera feed"
        onPlaying={() => setIsPlaying(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      <button
        onClick={onSwitchCamera}
        className="absolute top-36 right-4 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
        title="Kamera wechseln"
      >
        <SwitchCamera className="w-6 h-6" />
      </button>

      <CounterAnimation initialSeconds={initialSeconds} onEnded={onEnded} />
    </>
  );
}
