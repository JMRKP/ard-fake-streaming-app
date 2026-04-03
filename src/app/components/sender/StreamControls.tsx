import { Play, Pause, RotateCcw, FastForward, Trophy, X } from "lucide-react";

interface StreamControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onFastForward: () => void;
  onReset: () => void;
  onTriggerWin: () => void;
  onTriggerLose: () => void;
}

export function StreamControls({
  isPaused,
  onTogglePause,
  onFastForward,
  onReset,
  onTriggerWin,
  onTriggerLose,
}: StreamControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/90 to-transparent">
      <div className="flex items-center justify-center gap-2 mb-2">
        <button
          onClick={onTogglePause}
          className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          title={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <Play className="w-4 h-4" />
          ) : (
            <Pause className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={onFastForward}
          className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          title="Fast Forward +30s"
        >
          <FastForward className="w-4 h-4" />
        </button>
        <button
          onClick={onReset}
          className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onTriggerWin}
          className="bg-green-600/80 text-white px-3 py-2 rounded-full text-xs hover:bg-green-600 transition-colors"
          title="Trigger Win"
        >
          <Trophy className="w-4 h-4" />
        </button>
        <button
          onClick={onTriggerLose}
          className="bg-red-600/80 text-white px-3 py-2 rounded-full text-xs hover:bg-red-600 transition-colors"
          title="Trigger Lose"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
