import { Trophy, X } from "lucide-react";
import { formatViewCount } from "../../utils/formatters";

interface ResultScreenProps {
  result: "win" | "lose";
  viewCount: number;
  successLevel: number;
  onReset: () => void;
}

export function ResultScreen({
  result,
  viewCount,
  successLevel,
  onReset,
}: ResultScreenProps) {
  const isWin = result === "win";

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center ${
        isWin
          ? "bg-gradient-to-br from-green-900 to-emerald-900"
          : "bg-gradient-to-br from-red-900 to-rose-900"
      }`}
    >
      <div className="text-white text-6xl font-black mb-8">
        {isWin ? "YOU WON" : "YOU LOSE"}
      </div>

      {isWin ? (
        <>
          <Trophy className="w-32 h-32 text-yellow-400 mb-4" />
          <div className="text-white text-3xl font-bold mb-2">
            {formatViewCount(viewCount)} Zuschauer
          </div>
          <div className="text-white/80 text-lg">
            Erfolgsrate: {Math.floor(successLevel)}%
          </div>
        </>
      ) : (
        <>
          <X className="w-32 h-32 text-red-400 mb-4" />
          <div className="text-white text-xl mb-2">Zu wenig Zuschauer</div>
          <div className="text-white/80 text-lg">
            Erfolgsrate: {Math.floor(successLevel)}%
          </div>
        </>
      )}

      <button
        onClick={onReset}
        className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
        title="Nochmal versuchen"
      >
        Nochmal versuchen
      </button>
    </div>
  );
}
