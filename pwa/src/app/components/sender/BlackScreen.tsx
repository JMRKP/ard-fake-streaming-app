import { useEffect } from "react";

const BLACK_SCREEN_DURATION_MS = 10_000;

interface BlackScreenProps {
  onComplete: () => void;
}

export function BlackScreen({ onComplete }: BlackScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, BLACK_SCREEN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return <div className="absolute inset-0 bg-black" />;
}
