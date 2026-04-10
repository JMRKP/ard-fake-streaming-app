import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { StartScreen } from "./sender/StartScreen";
import { CountdownScreen } from "./sender/CountdownScreen";
import { LiveScreen } from "./sender/LiveScreen";
import { ResultScreen } from "./sender/ResultScreen";
import { useLiveStreamTimer } from "../hooks/useLiveStreamTimer";
import { WIN_THRESHOLD } from "./sender/constants";

type Phase = "start" | "countdown" | "live" | "result";
type Result = "win" | "lose" | null;

export function SenderMode() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [isPaused, setIsPaused] = useState(false);
  const [result, setResult] = useState<Result>(null);
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
    ];
    videoSrcs.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  const {
    liveTime,
    successLevel,
    reset: resetLiveTimer,
    fastForward,
  } = useLiveStreamTimer({
      active: phase === "live",
      isPaused,
      onComplete: (finalSuccessLevel) => {
        setResult(finalSuccessLevel >= WIN_THRESHOLD ? "win" : "lose");
        setPhase("result");
        stopCamera();
      },
    });

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

  const handleReset = () => {
    setPhase("start");
    setResult(null);
    setIsPaused(false);
    stopCamera();
    resetLiveTimer();
  };

  const handleFastForward = () => {
    if (phase === "live") fastForward(30);
  };

  const triggerWin = () => {
    setResult("win");
    setPhase("result");
    stopCamera();
  };

  const triggerLose = () => {
    setResult("lose");
    setPhase("result");
    stopCamera();
  };

  return (
    <div className="relative h-full bg-zinc-900">
        {phase === "start" && <StartScreen onStart={handleStart} />}
        {phase === "countdown" && <CountdownScreen onComplete={() => setPhase("live")} />}
        {phase === "live" && (
          <LiveScreen
            videoRef={videoRef}
            successLevel={successLevel}
            liveTime={liveTime}
            onSwitchCamera={switchCamera}
          />
        )}
        {phase === "result" && result && (
          <ResultScreen
            result={result}
            successLevel={successLevel}
            onReset={handleReset}
          />
        )}
    </div>
  );
}
