import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { CameraFacing } from "shared";
import { SwitchCamera } from "lucide-react";

export interface CameraFeedHandle {
  stop(): void;
  readonly ready: Promise<void>;
}

interface CameraFeedProps {
  initialFacing?: CameraFacing;
}

export const CameraFeed = forwardRef<CameraFeedHandle, CameraFeedProps>(function CameraFeed(
  { initialFacing = "user" },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<CameraFacing>(
    initialFacing,
  );

  const readyPromise = useRef<Promise<void>>();
  if (!readyPromise.current) {
    readyPromise.current = new Promise<void>((resolve) => {
      const check = () => {
        const v = videoRef.current;
        if (v && v.readyState >= 1) {
          resolve();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }

  const startCamera = async (facingMode: "user" | "environment") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error("Kamera-Fehler:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    startCamera(cameraFacing);
    return () => stopCamera();
  }, [cameraFacing]);

  useImperativeHandle(ref, () => ({
    stop() {
      stopCamera();
    },
    get ready() {
      return readyPromise.current!;
    },
  }));

  const switchCamera = () => {
    setIsPlaying(false)
    stopCamera();
    setCameraFacing((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        aria-label="User camera feed"
        onPlaying={() => setIsPlaying(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      <button
        onClick={switchCamera}
        className="absolute top-36 right-4 z-40 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
        title="Kamera wechseln"
      >
        <SwitchCamera className="w-6 h-6" />
      </button>
    </>
  );
});
