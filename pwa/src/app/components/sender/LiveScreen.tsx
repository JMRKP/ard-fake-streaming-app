import { RefObject } from "react";
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
  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        aria-label="User camera feed"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <button
        onClick={onSwitchCamera}
        className="absolute top-20 right-4 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
        title="Kamera wechseln"
      >
        <SwitchCamera className="w-6 h-6" />
      </button>

      <PeakOMeter successLevel={successLevel} />

      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
        <Timer seconds={liveTime} />
      </div>
    </>
  );
}
