import { RefObject } from "react";
import { SwitchCamera } from "lucide-react";
import { Timer } from "./Timer";

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
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="peakometer-glitch">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.05"
            numOctaves={2}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="0.8s"
              values="0.01 0.05;0.03 0.12;0.005 0.02;0.02 0.08;0.01 0.05"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={Math.min(4 + Math.floor(liveTime / 5) * 4, 30)}
            xChannelSelector="R"
            yChannelSelector="A"
          />
        </filter>
      </svg>

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

      <div className="absolute top-48 left-4 right-4 z-20" style={{ filter: "url(#peakometer-glitch)" }}>
        <div className="bg-black/60 p-3 rounded-2xl">
          <div className="text-white text-xs mb-2">Peak-O-Meter</div>
          <div className="relative">
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${successLevel}%`,
                  background: `linear-gradient(to right, #ef4444, #f59e0b, #22c55e)`,
                }}
              />
            </div>
            <img
              src={`${import.meta.env.BASE_URL}animated/Ikosaeder-Animation.png`}
              alt=""
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none z-40 transition-all duration-500"
              style={{ left: `${successLevel}%` }}
            />
          </div>
          <div className="text-white text-xs mt-1 text-right">
            {Math.floor(successLevel)}%
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
        <Timer seconds={liveTime} />
      </div>
    </>
  );
}
