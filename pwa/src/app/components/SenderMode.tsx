import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { LIVE_VARIANTS, type LiveVariant } from "shared";
import { BlackScreen } from "./sender/BlackScreen";
import { CountdownScreen } from "./sender/CountdownScreen";
import { LiveScreen } from "./sender/LiveScreen";
import { ResultScreen } from "./sender/ResultScreen";
import { VariantSelect } from "./sender/VariantSelect";
import { STREAM_DURATION_SECONDS } from "./sender/constants";

type Phase = "select" | "black" | "countdown" | "live" | "result";

export function SenderMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phase, setPhase] = useState<Phase>("select");
  const [pendingPhase, setPendingPhase] = useState<"countdown" | "live">("countdown");
  const [initialLiveSeconds, setInitialLiveSeconds] = useState(0);
  const [variant, setVariant] = useState<LiveVariant>(1);

  const variantConfig = LIVE_VARIANTS.find((v) => v.id === variant) ?? LIVE_VARIANTS[0];

  // Preload variant-specific videos once variant is known
  useEffect(() => {
    if (phase === "select") return;
    const videoSrcs = [
      `${import.meta.env.BASE_URL}animated/START-COUNTER-OUT_v04.webm`,
      `${import.meta.env.BASE_URL}animated/Streamer-Counter-OUT_v05b.webm`,
      `${import.meta.env.BASE_URL}animated/${variantConfig.graphFile}`,
      `${import.meta.env.BASE_URL}animated/${variantConfig.resultFile}`,
    ];
    videoSrcs.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = src;
      document.head.appendChild(link);
    });
  }, [phase === "select", variantConfig]);

  useEffect(() => {
    const p = searchParams.get("phase");
    if (!p) return;
    const skip = searchParams.get("skipBlack") === "1";
    const v = Number(searchParams.get("variant") || "1") as LiveVariant;
    if (v >= 1 && v <= 6) setVariant(v);
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

  const handleVariantSelect = (v: LiveVariant) => {
    setVariant(v);
    setInitialLiveSeconds(0);
    setPendingPhase("countdown");
    setPhase("black");
  };

  const resultSrc = `${import.meta.env.BASE_URL}animated/${variantConfig.resultFile}`;

  return (
    <div className="relative h-full bg-zinc-900">
      {phase === "select" && (
        <VariantSelect onSelect={handleVariantSelect} />
      )}
      {phase === "black" && (
        <BlackScreen onComplete={() => setPhase(pendingPhase)} />
      )}
      {phase === "countdown" && (
        <CountdownScreen onComplete={() => setPhase("live")} />
      )}
      {phase === "live" && (
        <LiveScreen
          initialSeconds={initialLiveSeconds}
          variant={variant}
          onEnded={() => setPhase("result")}
        />
      )}
      {phase === "result" && <ResultScreen src={resultSrc} />}
    </div>
  );
}
