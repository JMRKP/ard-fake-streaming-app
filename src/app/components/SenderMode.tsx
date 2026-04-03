import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { StreamHeader } from "./sender/StreamHeader";
import { StreamControls } from "./sender/StreamControls";
import { StartScreen } from "./sender/StartScreen";
import { CountdownScreen } from "./sender/CountdownScreen";
import { LiveScreen } from "./sender/LiveScreen";
import { ResultScreen } from "./sender/ResultScreen";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
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

  const { countdown, reset: resetCountdown } = useCountdownTimer({
    active: phase === "countdown",
    isPaused,
    onComplete: () => setPhase("live"),
  });

  const {
    liveTime,
    viewCount,
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
      const message =
        err instanceof DOMException ? err.message : "Unbekannter Fehler";
      console.error("Kamera-Fehler:", err);
      alert(`Kamera-Fehler: ${message}`);
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
    resetCountdown();
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
    <div className="relative w-full h-dvh bg-zinc-900 overflow-hidden">
      <StreamHeader onBack={() => navigate("/")} />

        {(phase === "countdown" || phase === "live") && (
          <StreamControls
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
            onFastForward={handleFastForward}
            onReset={handleReset}
            onTriggerWin={triggerWin}
            onTriggerLose={triggerLose}
          />
        )}

        {phase === "start" && <StartScreen onStart={handleStart} />}
        {phase === "countdown" && <CountdownScreen countdown={countdown} />}
        {phase === "live" && (
          <LiveScreen
            videoRef={videoRef}
            viewCount={viewCount}
            successLevel={successLevel}
            liveTime={liveTime}
            onSwitchCamera={switchCamera}
          />
        )}
        {phase === "result" && result && (
          <ResultScreen
            result={result}
            viewCount={viewCount}
            successLevel={successLevel}
            onReset={handleReset}
          />
        )}
    </div>
  );
}
