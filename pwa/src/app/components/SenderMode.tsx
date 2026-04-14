import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { BlackScreen } from "./sender/BlackScreen";
import { CountdownScreen } from "./sender/CountdownScreen";
import { LiveScreen } from "./sender/LiveScreen";
import { ResultScreen } from "./sender/ResultScreen";
import { STREAM_DURATION_SECONDS } from "./sender/constants";

type Phase = "black" | "countdown" | "live" | "result";

export function SenderMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phase, setPhase] = useState<Phase>("black");
  const [pendingPhase, setPendingPhase] = useState<"countdown" | "live">("countdown");
  const [initialLiveSeconds, setInitialLiveSeconds] = useState(0);

  // Preload overlay videos so they start instantly
  useEffect(() => {
    const videoSrcs = [
      `${import.meta.env.BASE_URL}animated/START-COUNTER-OUT_v04.webm`,
      `${import.meta.env.BASE_URL}animated/Streamer-Counter-OUT_v05b.webm`,
      `${import.meta.env.BASE_URL}animated/Barometer_G1_v05.webm`,
      `${import.meta.env.BASE_URL}animated/WON_v04.webm`,
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
    const skip = searchParams.get("skipBlack") === "1";
    if (p === "countdown") {
      setInitialLiveSeconds(0);
      setPendingPhase("countdown");
      setPhase(skip ? "countdown" : "black");
    } else if (p === "live") {
      const at = Math.max(
        0,
        Math.min(
          STREAM_DURATION_SECONDS,
          Math.floor(Number(searchParams.get("at") ?? "0")),
        ),
      );
      setInitialLiveSeconds(at);
      setPendingPhase("live");
      setPhase(skip ? "live" : "black");
    }
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <div className="relative h-full bg-zinc-900">
      {phase === "black" && (
        <BlackScreen onComplete={() => setPhase(pendingPhase)} />
      )}
      {phase === "countdown" && (
        <CountdownScreen onComplete={() => setPhase("live")} />
      )}
      {phase === "live" && (
        <LiveScreen
          initialSeconds={initialLiveSeconds}
          onEnded={() => setPhase("result")}
        />
      )}
      {phase === "result" && <ResultScreen />}
    </div>
  );
}
