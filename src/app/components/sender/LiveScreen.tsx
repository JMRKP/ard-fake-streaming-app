import { RefObject } from "react";
import { Eye, SwitchCamera } from "lucide-react";
import { formatTime, formatViewCount } from "../../utils/formatters";

interface LiveScreenProps {
  videoRef: RefObject<HTMLVideoElement>;
  viewCount: number;
  successLevel: number;
  liveTime: number;
  onSwitchCamera: () => void;
}

export function LiveScreen({
  videoRef,
  viewCount,
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

      <div className="absolute top-20 left-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        LIVE
      </div>

      <div className="absolute top-32 left-4 z-20 bg-black/60 text-white px-4 py-2 rounded-full">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span className="font-bold">{formatViewCount(viewCount)}</span>
        </div>
      </div>

      <div className="absolute top-48 left-4 right-4 z-20">
        <div className="bg-black/60 p-3 rounded-2xl">
          <div className="text-white text-xs mb-2">Peak-O-Meter</div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${successLevel}%`,
                background: `linear-gradient(to right, #ef4444, #f59e0b, #22c55e)`,
              }}
            />
          </div>
          <div className="text-white text-xs mt-1 text-right">
            {Math.floor(successLevel)}%
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
        <div className="bg-black/60 text-white px-6 py-3 rounded-full text-2xl font-bold">
          {formatTime(liveTime)} / 3:00
        </div>
      </div>
    </>
  );
}
