import { useEffect, useRef } from "react";
import { LIVE_VARIANTS, type LiveVariant } from "shared";
import { HiddenHomeButton } from "../HiddenHomeButton";
import { CameraFeed, CameraFeedHandle } from "./CameraFeed";
import { CounterAnimation, CounterAnimationHandle } from "./CounterAnimation";
import { ViewCountGraph, ViewCountGraphHandle } from "./ViewCountGraph";

interface LiveScreenProps {
  initialSeconds: number;
  variant: LiveVariant;
  onEnded: () => void;
}

export function LiveScreen({ initialSeconds, variant, onEnded }: LiveScreenProps) {
  const cameraRef = useRef<CameraFeedHandle>(null);
  const counterRef = useRef<CounterAnimationHandle>(null);
  const graphRef = useRef<ViewCountGraphHandle>(null);

  const config = LIVE_VARIANTS.find((v) => v.id === variant) ?? LIVE_VARIANTS[0];
  const graphSrc = `${import.meta.env.BASE_URL}animated/${config.graphFile}`;

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
      <HiddenHomeButton />
      <CameraFeed ref={cameraRef} />
      <ViewCountGraph ref={graphRef} src={graphSrc} />
      <CounterAnimation ref={counterRef} onEnded={handleCounterEnded} durationSeconds={config.durationSeconds} />
    </>
  );
}
