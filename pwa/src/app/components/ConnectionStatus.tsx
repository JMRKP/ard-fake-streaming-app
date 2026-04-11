import { useSocketStatus, type SocketStatus } from "../hooks/useSocketStatus";
import { resetWsToken } from "../lib/socket";

const LABELS: Record<SocketStatus, string> = {
  connecting: "verbinde…",
  connected: "verbunden",
  disconnected: "getrennt",
  unauthorized: "nicht autorisiert",
};

const DOT_COLORS: Record<SocketStatus, string> = {
  connecting: "bg-yellow-500",
  connected: "bg-green-500",
  disconnected: "bg-zinc-500",
  unauthorized: "bg-red-500",
};

export function ConnectionStatus() {
  const status = useSocketStatus();
  return (
    <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block w-2 h-2 rounded-full ${DOT_COLORS[status]}`}
        />
        <span>{LABELS[status]}</span>
      </div>
      <button
        type="button"
        onClick={resetWsToken}
        className="underline underline-offset-2 hover:text-white transition-colors"
      >
        Token ändern
      </button>
    </div>
  );
}
