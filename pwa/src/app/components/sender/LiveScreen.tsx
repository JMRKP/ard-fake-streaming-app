import { RefObject, useEffect, useRef, useState } from "react";
import { SwitchCamera } from "lucide-react";
import { CounterAnimation, CounterAnimationHandle } from "./CounterAnimation";
import { ResultAnimation } from "./ResultAnimation";
import { ViewCountGraph, ViewCountGraphHandle } from "./ViewCountGraph";

interface LiveScreenProps {
  videoRef: RefObject<HTMLVideoElement>;
  initialSeconds: number;
  onSwitchCamera: () => void;
}

export function LiveScreen({
  videoRef,
  initialSeconds,
  onSwitchCamera,
}: LiveScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ending, setEnding] = useState(false);
  const counterRef = useRef<CounterAnimationHandle>(null);
  const graphRef = useRef<ViewCountGraphHandle>(null);

  useEffect(() => {
    const counter = counterRef.current;
    const graph = graphRef.current;
    if (!counter || !graph) return;

    Promise.all([counter.ready, graph.ready]).then(() => {
      counter.play(initialSeconds);
      graph.play(initialSeconds);
    });
  }, [initialSeconds]);

  const handleCounterEnded = () => {
    setEnding(true);
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        aria-label="User camera feed"
        onPlaying={() => setIsPlaying(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      <ViewCountGraph ref={graphRef} />

      <button
        onClick={onSwitchCamera}
        className="absolute top-36 right-4 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
        title="Kamera wechseln"
      >
        <SwitchCamera className="w-6 h-6" />
      </button>

      <CounterAnimation ref={counterRef} onEnded={handleCounterEnded} />

      {ending && <ResultAnimation />}
    </>
  );
}
