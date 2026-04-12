import { useState } from "react";

export function ResultScreen() {
  const [ready, setReady] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <video
        className={`h-full w-full object-contain${ready ? "" : " invisible"}`}
        src={`${import.meta.env.BASE_URL}animated/WON_v04.webm`}
        autoPlay
        playsInline
        muted
        onPlaying={() => setReady(true)}
      />
    </div>
  );
}
