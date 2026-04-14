import { useEffect, useRef } from "react";
import { CameraFeed, CameraFeedHandle } from "./CameraFeed";
import { CounterAnimation, CounterAnimationHandle } from "./CounterAnimation";
import { ViewCountGraph, ViewCountGraphHandle } from "./ViewCountGraph";

interface LiveScreenProps {
  initialSeconds: number;
  onEnded: () => void;
}

export function LiveScreen({ initialSeconds, onEnded }: LiveScreenProps) {
  const cameraRef = useRef<CameraFeedHandle>(null);
  const counterRef = useRef<CounterAnimationHandle>(null);
  const graphRef = useRef<ViewCountGraphHandle>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    const counter = counterRef.current;
    const graph = graphRef.current;
    if (!camera || !counter || !graph) return;

    Promise.all([camera.ready, counter.ready, graph.ready]).then(() => {
      counter.play(initialSeconds);
      graph.play(initialSeconds);
    });
  }, [initialSeconds]);

  const handleCounterEnded = () => {
    cameraRef.current?.stop();
    onEnded();
  };

  return (
    <>
      <CameraFeed ref={cameraRef} />
      <ViewCountGraph ref={graphRef} />
      <CounterAnimation ref={counterRef} onEnded={handleCounterEnded} />
    </>
  );
}
