import { useState } from "react";

interface ResultScreenProps {
  src: string;
}

export function ResultScreen({ src }: ResultScreenProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <video
        className={`h-full w-full object-contain${ready ? "" : " invisible"}`}
        src={src}
        autoPlay
        playsInline
        muted
        onPlaying={() => setReady(true)}
      />
    </div>
  );
}
