import { useState, useEffect, useCallback, useRef } from "react";
import {
  STREAM_DURATION_SECONDS,
  VIEW_COUNT_RANDOM_MAX,
  VIEW_COUNT_RANDOM_MIN,
  SUCCESS_LEVEL_INCREMENT_MAX,
} from "../components/sender/constants";

export function useLiveStreamTimer({
  active,
  isPaused,
  onComplete,
}: {
  active: boolean;
  isPaused: boolean;
  onComplete: (successLevel: number) => void;
}) {
  const [liveTime, setLiveTime] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [successLevel, setSuccessLevel] = useState(0);
  // Ref tracks the latest successLevel so the completion effect gets the final value
  // even though successLevel is not in its dependency array.
  const successLevelRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => {
    setLiveTime(0);
    setViewCount(0);
    setSuccessLevel(0);
    successLevelRef.current = 0;
  }, []);

  const fastForward = useCallback((seconds: number) => {
    setLiveTime((t) => Math.min(STREAM_DURATION_SECONDS, t + seconds));
  }, []);

  useEffect(() => {
    if (!active || isPaused || liveTime >= STREAM_DURATION_SECONDS) return;
    const timer = setTimeout(() => {
      setLiveTime((t) => t + 1);
      setViewCount(
        (prev) =>
          prev +
          Math.floor(
            Math.random() * (VIEW_COUNT_RANDOM_MAX - VIEW_COUNT_RANDOM_MIN),
          ) +
          VIEW_COUNT_RANDOM_MIN,
      );
      setSuccessLevel((prev) => {
        const next = Math.min(
          100,
          prev + Math.random() * SUCCESS_LEVEL_INCREMENT_MAX,
        );
        successLevelRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [active, liveTime, isPaused]);

  useEffect(() => {
    if (active && liveTime >= STREAM_DURATION_SECONDS) {
      onCompleteRef.current(successLevelRef.current);
    }
  }, [active, liveTime]);

  return { liveTime, viewCount, successLevel, reset, fastForward };
}
