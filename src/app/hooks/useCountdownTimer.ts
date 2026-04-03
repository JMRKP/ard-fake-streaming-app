import { useState, useEffect, useCallback, useRef } from "react";
import { INITIAL_COUNTDOWN } from "../components/sender/constants";

export function useCountdownTimer({
  active,
  isPaused,
  onComplete,
}: {
  active: boolean;
  isPaused: boolean;
  onComplete: () => void;
}) {
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => setCountdown(INITIAL_COUNTDOWN), []);

  useEffect(() => {
    if (!active || isPaused || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [active, countdown, isPaused]);

  useEffect(() => {
    if (active && countdown === 0) {
      onCompleteRef.current();
    }
  }, [active, countdown]);

  return { countdown, reset };
}
