import { Link } from "react-router";
import { Video, Eye } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
        <div className="p-8">
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
    </div>
  );
}
