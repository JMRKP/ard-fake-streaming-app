import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eye, MessageCircle } from "lucide-react";

type Phase = "countdown" | "watching";

export function ViewerMode() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("countdown");
  const [countdown, setCountdown] = useState(5);
  const [viewCount, setViewCount] = useState(8432);
  const [watchTime, setWatchTime] = useState(0);

  // Countdown logic
  useEffect(() => {
    if (phase === "countdown" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === "countdown" && countdown === 0) {
      setPhase("watching");
    }
  }, [phase, countdown]);

  // Simulate view count fluctuation
  useEffect(() => {
    if (phase === "watching") {
      const interval = setInterval(() => {
        setViewCount(prev => prev + Math.floor(Math.random() * 200) - 50);
        setWatchTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Mock chat messages
  const mockMessages = [
    "Das ist so cool! 🔥",
    "Wie machst du das?",
    "Mega spannend!",
    "Let's go! 💪",
    "Bester Stream!",
  ];

  return (
    <div className="relative h-full bg-zinc-900 overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-[env(safe-area-inset-top)] px-4 pb-4 bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={() => navigate("/")}
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Countdown Phase */}
        {phase === "countdown" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-cyan-900">
            <div className="text-white text-2xl font-bold mb-4 animate-pulse">
              STREAM STARTET GLEICH
            </div>
            <div className="text-white text-9xl font-black">
              {countdown}
            </div>
          </div>
        )}

        {/* Watching Phase */}
        {phase === "watching" && (
          <>
            {/* Video Placeholder (simulated stream) */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-800 flex items-center justify-center">
              {/* Simulated video content - in real app, this would be a video element */}
              <div className="text-white text-center p-8">
                <div className="text-4xl font-bold mb-4">🎥</div>
                <div className="text-xl opacity-80">
                  Live Stream Vorschau
                </div>
                <div className="text-sm opacity-60 mt-2">
                  (Hier würde ein vorproduziertes Video laufen)
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-20 left-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>

            {/* Streamer Info */}
            <div className="absolute top-32 left-4 z-20 bg-black/60 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
              <span className="font-semibold">@streamer_pro</span>
            </div>

            {/* View Count */}
            <div className="absolute top-48 left-4 z-20 bg-black/60 text-white px-4 py-2 rounded-full">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="font-bold">{formatViewCount(viewCount)}</span>
              </div>
            </div>

            {/* Watch Time */}
            <div className="absolute top-64 left-4 z-20 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {formatTime(watchTime)}
            </div>

            {/* Simulated Chat Messages */}
            <div className="absolute bottom-24 left-4 right-4 z-20 space-y-2">
              {mockMessages.slice(0, 3).map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 text-white px-4 py-2 rounded-2xl text-sm animate-in slide-in-from-bottom"
                  style={{
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  <span className="font-semibold text-blue-400">User{idx + 1}: </span>
                  {msg}
                </div>
              ))}
            </div>

            {/* Chat Input Simulation */}
            <div className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 z-20">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Schreib einen Kommentar..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                  disabled
                />
              </div>
            </div>
          </>
        )}
    </div>
  );
}
