import { useEffect, useRef, useState } from "react";
import { SwitchCamera } from "lucide-react";
import { CounterAnimation, CounterAnimationHandle } from "./CounterAnimation";
import { ResultAnimation } from "./ResultAnimation";
import { ViewCountGraph, ViewCountGraphHandle } from "./ViewCountGraph";

interface LiveScreenProps {
  initialSeconds: number;
}

export function LiveScreen({ initialSeconds }: LiveScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ending, setEnding] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">("user");
  const counterRef = useRef<CounterAnimationHandle>(null);
  const graphRef = useRef<ViewCountGraphHandle>(null);

  const startCamera = async (facingMode: "user" | "environment") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
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

  useEffect(() => {
    startCamera(cameraFacing);
    return () => stopCamera();
  }, [cameraFacing]);

  useEffect(() => {
    const counter = counterRef.current;
    const graph = graphRef.current;
    if (!counter || !graph) return;

    Promise.all([counter.ready, graph.ready]).then(() => {
      counter.play(initialSeconds);
      graph.play(initialSeconds);
    });
  }, [initialSeconds]);

  const switchCamera = () => {
    stopCamera();
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleCounterEnded = () => {
    setEnding(true);
    stopCamera();
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
        onClick={switchCamera}
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
