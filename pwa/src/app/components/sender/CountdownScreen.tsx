import { useState } from "react";

const counterSrc = `${import.meta.env.BASE_URL}animated/Counter_v02_H.264.webm`;

interface CountdownScreenProps {
  onComplete: () => void;
}

export function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <video
        className={`h-full w-full object-contain transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        src={counterSrc}
        autoPlay
        muted
        playsInline
        onPlaying={() => setIsPlaying(true)}
        onEnded={onComplete}
      />
    </div>
  );
}
