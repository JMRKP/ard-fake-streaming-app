import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Trophy,
  X,
  SwitchCamera,
  Eye,
} from "lucide-react";

type Phase = "start" | "countdown" | "live" | "result";
type Result = "win" | "lose" | null;

export function SenderMode() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [countdown, setCountdown] = useState(2);
  const [liveTime, setLiveTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [successLevel, setSuccessLevel] = useState(0);
  const [result, setResult] = useState<Result>(null);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">(
    "user",
  );
  const [hasCamera, setHasCamera] = useState(false);

  // Start camera
  useEffect(() => {
    if (phase === "live") {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [phase, cameraFacing]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
      }
    } catch (err) {
      alert("Kamera-Fehler:" + JSON.stringify(err));
      console.error("Kamera-Fehler:", err);
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const switchCamera = () => {
    stopCamera();
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Countdown logic
  useEffect(() => {
    if (phase === "countdown" && countdown > 0 && !isPaused) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === "countdown" && countdown === 0) {
      setPhase("live");
      setLiveTime(0);
      setViewCount(0);
      setSuccessLevel(0);
    }
  }, [phase, countdown, isPaused]);

  // Live timer logic (3 minutes = 180 seconds)
  useEffect(() => {
    if (phase === "live" && liveTime < 180 && !isPaused) {
      const timer = setTimeout(() => {
        setLiveTime(liveTime + 1);
        // Simulate view count increase
        setViewCount((prev) => prev + Math.floor(Math.random() * 500) + 100);
        // Simulate success level (0-100)
        setSuccessLevel((prev) => Math.min(100, prev + Math.random() * 2));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "live" && liveTime >= 180) {
      // End of stream - determine result
      if (successLevel >= 60) {
        setResult("win");
      } else {
        setResult("lose");
      }
      setPhase("result");
      stopCamera();
    }
  }, [phase, liveTime, isPaused, successLevel]);

  const handleStart = () => {
    setPhase("countdown");
    setCountdown(10);
  };

  const handleReset = () => {
    setPhase("start");
    setCountdown(10);
    setLiveTime(0);
    setViewCount(0);
    setSuccessLevel(0);
    setResult(null);
    setIsPaused(false);
    stopCamera();
  };

  const handleFastForward = () => {
    if (phase === "live") {
      setLiveTime(Math.min(180, liveTime + 30));
    }
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm aspect-[9/19.5] bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={() => navigate("/")}
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Film Controls (for shooting) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <div className="flex items-center justify-center gap-2 mb-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleFastForward}
              className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              title="Fast Forward +30s"
            >
              <FastForward className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={triggerWin}
              className="bg-green-600/80 text-white px-3 py-2 rounded-full text-xs hover:bg-green-600 transition-colors"
            >
              <Trophy className="w-4 h-4" />
            </button>
            <button
              onClick={triggerLose}
              className="bg-red-600/80 text-white px-3 py-2 rounded-full text-xs hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Start Phase */}
        {phase === "start" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:opacity-90 transition-opacity"
            >
              Stream Starten
            </button>
          </div>
        )}

        {/* Countdown Phase */}
        {phase === "countdown" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
            <div className="text-white text-2xl font-bold mb-4 animate-pulse">
              DU BIST DRAN
            </div>
            <div className="text-white text-9xl font-black">{countdown}</div>
          </div>
        )}

        {/* Live Phase */}
        {phase === "live" && (
          <>
            {/* Camera Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Camera Switch Button */}
            <button
              onClick={switchCamera}
              className="absolute top-20 right-4 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
            >
              <SwitchCamera className="w-6 h-6" />
            </button>

            {/* Live Indicator */}
            <div className="absolute top-20 left-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>

            {/* View Count */}
            <div className="absolute top-32 left-4 z-20 bg-black/60 text-white px-4 py-2 rounded-full">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="font-bold">{formatViewCount(viewCount)}</span>
              </div>
            </div>

            {/* Success Meter */}
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

            {/* Timer */}
            <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
              <div className="bg-black/60 text-white px-6 py-3 rounded-full text-2xl font-bold">
                {formatTime(liveTime)} / 3:00
              </div>
            </div>
          </>
        )}

        {/* Result Phase */}
        {phase === "result" && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center ${
              result === "win"
                ? "bg-gradient-to-br from-green-900 to-emerald-900"
                : "bg-gradient-to-br from-red-900 to-rose-900"
            }`}
          >
            <div className="text-white text-6xl font-black mb-8">
              {result === "win" ? "YOU WON" : "YOU LOSE"}
            </div>
            {result === "win" && (
              <>
                <Trophy className="w-32 h-32 text-yellow-400 mb-4" />
                <div className="text-white text-3xl font-bold mb-2">
                  {formatViewCount(viewCount)} Zuschauer
                </div>
                <div className="text-white/80 text-lg">
                  Erfolgsrate: {Math.floor(successLevel)}%
                </div>
              </>
            )}
            {result === "lose" && (
              <>
                <X className="w-32 h-32 text-red-400 mb-4" />
                <div className="text-white text-xl mb-2">
                  Zu wenig Zuschauer
                </div>
                <div className="text-white/80 text-lg">
                  Erfolgsrate: {Math.floor(successLevel)}%
                </div>
              </>
            )}
            <button
              onClick={handleReset}
              className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Nochmal versuchen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
