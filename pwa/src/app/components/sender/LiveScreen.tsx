import { RefObject, useState } from "react";
import { SwitchCamera } from "lucide-react";
import { Timer } from "./Timer";
import { PeakOMeter } from "./PeakOMeter";

interface LiveScreenProps {
  videoRef: RefObject<HTMLVideoElement>;
  successLevel: number;
  liveTime: number;
  onSwitchCamera: () => void;
}

export function LiveScreen({
  videoRef,
  successLevel,
  liveTime,
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

      <PeakOMeter successLevel={successLevel} />

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <Timer seconds={liveTime} />
      </div>
    </>
  );
}
