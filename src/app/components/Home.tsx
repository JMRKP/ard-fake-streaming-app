import { Link } from "react-router";
import { Video, Eye } from "lucide-react";

export function Home() {
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
          <Link to="/sender">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity">
              <Video className="w-6 h-6" />
              Sender (Streamer)
            </button>
          </Link>

          <Link to="/viewer">
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity">
              <Eye className="w-6 h-6" />
              Viewer (Zuschauer)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
