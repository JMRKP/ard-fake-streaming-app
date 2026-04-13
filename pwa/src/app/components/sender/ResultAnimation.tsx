import { useEffect, useState } from "react";

export function ResultAnimation() {
  const [ready, setReady] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBackdrop(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showBackdrop && (
        <div className="absolute inset-0 z-30 bg-black" />
      )}
      <div className="absolute inset-0 z-40 flex items-center justify-center">
        <video
          className={`h-full w-full object-contain${ready ? "" : " invisible"}`}
          src={`${import.meta.env.BASE_URL}animated/WON_v04.webm`}
          autoPlay
          playsInline
          muted
          onPlaying={() => setReady(true)}
        />
      </div>
    </>
  );
}
