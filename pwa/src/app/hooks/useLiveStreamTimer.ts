import { useState, useEffect, useCallback, useRef } from "react";
import {
  STREAM_DURATION_SECONDS,
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
  const [successLevel, setSuccessLevel] = useState(0);
  // Ref tracks the latest successLevel so the completion effect gets the final value
  // even though successLevel is not in its dependency array.
  const successLevelRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => {
    setLiveTime(0);
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

  return { liveTime, successLevel, reset, fastForward };
}
