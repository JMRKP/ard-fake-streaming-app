import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Video, Eye, Camera, CameraOff } from "lucide-react";

type CameraPermission = "unknown" | "granted" | "prompt" | "denied";

export function Home() {
  const navigate = useNavigate();
  const [cameraPermission, setCameraPermission] = useState<CameraPermission>("unknown");

  useEffect(() => {
    if (!navigator.permissions) {
      setCameraPermission("prompt");
      return;
    }
    navigator.permissions
      .query({ name: "camera" as PermissionName })
      .then((status) => {
        setCameraPermission(status.state as CameraPermission);
        status.onchange = () => {
          setCameraPermission(status.state as CameraPermission);
        };
      })
      .catch(() => {
        setCameraPermission("prompt");
      });
  }, []);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission("granted");
    } catch {
      setCameraPermission("denied");
    }
  };

  if (cameraPermission === "unknown") {
    return null;
  }

  if (cameraPermission === "denied") {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <div className="text-center space-y-4">
          <CameraOff className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-white text-lg font-bold">Kamera-Zugriff verweigert</p>
          <p className="text-zinc-400 text-sm">
            Bitte erlaube den Kamera-Zugriff in den Einstellungen deines Browsers.
          </p>
        </div>
      </div>
    );
  }

  if (cameraPermission === "prompt") {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <div className="text-center space-y-6 w-full max-w-sm">
          <Camera className="w-16 h-16 text-purple-500 mx-auto" />
          <div>
            <p className="text-white text-xl font-bold mb-2">
              Kamera-Zugriff benötigt
            </p>
            <p className="text-zinc-400 text-sm">
              StreamWin benötigt deine Kamera, um live zu streamen.
            </p>
          </div>
          <button
            onClick={requestCameraAccess}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity w-full"
          >
            Kamera erlauben
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          StreamWin
        </h1>
        <p className="text-zinc-400 text-center mb-8">
          Fake Streaming App
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/sender")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Video className="w-6 h-6" />
            Sender (Streamer)
          </button>

          <button
            onClick={() => navigate("/viewer")}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Eye className="w-6 h-6" />
            Viewer (Zuschauer)
          </button>
        </div>
      </div>
    </div>
  );
}
