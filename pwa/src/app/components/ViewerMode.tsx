import { useState } from "react";
import { HiddenHomeButton } from "./HiddenHomeButton";

export function ViewerMode() {
  const [ready, setReady] = useState(false);
  const src = `${import.meta.env.BASE_URL}animated/viewer-wait-screen_v09.webm`;

  return (
    <div className="relative h-full bg-black overflow-hidden">
      <HiddenHomeButton />
      <video
        className={`absolute inset-0 h-full w-full object-cover${ready ? "" : " invisible"}`}
        src={src}
        autoPlay
        playsInline
        muted
        loop
        onPlaying={() => setReady(true)}
      />
    </div>
  );
}
