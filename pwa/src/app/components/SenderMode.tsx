import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { StartScreen } from "./sender/StartScreen";
import { CountdownScreen } from "./sender/CountdownScreen";
import { LiveScreen } from "./sender/LiveScreen";
import { ResultScreen } from "./sender/ResultScreen";
import { STREAM_DURATION_SECONDS } from "./sender/constants";

type Phase = "start" | "countdown" | "live" | "result";

export function SenderMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [initialLiveSeconds, setInitialLiveSeconds] = useState(0);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">(
    "user",
  );

  // Preload animated PNGs so they're decoded before the live phase
  useEffect(() => {
    const srcs = [
      `${import.meta.env.BASE_URL}animated/Ikosaeder-Animation.png`,
    ];
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload overlay videos so they start instantly
    const videoSrcs = [
      `${import.meta.env.BASE_URL}animated/Counter_v02_H.264.webm`,
      `${import.meta.env.BASE_URL}animated/Streamer-Counter-OUT_v04.webm`,
    ];
    videoSrcs.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    const p = searchParams.get("phase");
    if (!p) return;
    if (p === "countdown") {
      setInitialLiveSeconds(0);
      setPhase("countdown");
    } else if (p === "live") {
      const at = Math.max(
        0,
        Math.min(
          STREAM_DURATION_SECONDS,
          Math.floor(Number(searchParams.get("at") ?? "0")),
        ),
      );
      setInitialLiveSeconds(at);
      setPhase("live");
    }
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (phase === "live") {
      startCamera();
    } else {
      stopCamera();
    }
  }, [phase, cameraFacing]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Kamera-Fehler:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const switchCamera = () => {
    stopCamera();
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleStart = () => setPhase("countdown");

  const handleLiveEnded = () => {
    setPhase("result");
    stopCamera();
  };

  const handleReset = () => {
    setPhase("start");
    setInitialLiveSeconds(0);
    stopCamera();
  };

  return (
    <div className="relative h-full bg-zinc-900">
        {phase === "start" && <StartScreen onStart={handleStart} />}
        {phase === "countdown" && <CountdownScreen onComplete={() => setPhase("live")} />}
        {phase === "live" && (
          <LiveScreen
            videoRef={videoRef}
            initialSeconds={initialLiveSeconds}
            onEnded={handleLiveEnded}
            onSwitchCamera={switchCamera}
          />
        )}
        {phase === "result" && (
          <ResultScreen
            result="win"
            successLevel={100}
            onReset={handleReset}
          />
        )}
    </div>
  );
}
