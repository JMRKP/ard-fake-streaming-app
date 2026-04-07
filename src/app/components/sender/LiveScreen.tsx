import { RefObject, useRef, useEffect, useState } from "react";
import { Eye, SwitchCamera, Play, Pause } from "lucide-react";
import { formatTime, formatViewCount } from "../../utils/formatters";

const movSrc = `${import.meta.env.BASE_URL}animated/movie-hevc.mov`;
const webmSrc = `${import.meta.env.BASE_URL}animated/movie-webm.webm`;
const OVERLAY_SIZE = 192; // w-48 = 12rem = 192px

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
  const overlayRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const bounce = useRef({ x: 0, y: 0, dx: 1.5, dy: 1.2 });

  // DVD screensaver bounce
  useEffect(() => {
    let raf: number;
    const step = () => {
      const container = wrapperRef.current?.parentElement;
      if (!container) { raf = requestAnimationFrame(step); return; }
      const b = bounce.current;
      const maxX = container.clientWidth - OVERLAY_SIZE;
      const maxY = container.clientHeight - OVERLAY_SIZE;

      b.x += b.dx;
      b.y += b.dy;
      if (b.x <= 0 || b.x >= maxX) b.dx *= -1;
      if (b.y <= 0 || b.y >= maxY) b.dy *= -1;
      b.x = Math.max(0, Math.min(b.x, maxX));
      b.y = Math.max(0, Math.min(b.y, maxY));

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${b.x}px, ${b.y}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const togglePlayPause = () => {
    const vid = overlayRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="camera-glitch">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.05"
            numOctaves={1}
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
            scale={22}
            xChannelSelector="R"
            yChannelSelector="G"
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
        style={{ filter: "url(#camera-glitch)" }}
      />

      <div
        ref={wrapperRef}
        className="absolute top-0 left-0 z-10 w-48 h-48"
        style={{ willChange: "transform" }}
      >
        <video
          ref={overlayRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover rounded-lg"
          onClick={togglePlayPause}
        >
          <source src={movSrc} type='video/mp4; codecs="hvc1"' />
          <source src={webmSrc} type="video/webm" />
        </video>
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity rounded-lg"
        >
          {isPlaying ? <Pause className="w-10 h-10 text-white" /> : <Play className="w-10 h-10 text-white" />}
        </button>
      </div>

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
          <div className="relative">
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 glitch-bar"
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

      <img
        src={`${import.meta.env.BASE_URL}animated/Nagrasyster_encoded_frame.png`}
        alt=""
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      />

      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
        <div className="bg-black/60 text-white px-6 py-3 rounded-full text-2xl font-bold">
          {formatTime(liveTime)} / 3:00
        </div>
      </div>
    </>
  );
}
