import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  SOCKET_EVENTS,
  type CommandPayload,
  type SenderCommand,
} from "shared";
import { socket, resetWsToken } from "./lib/socket";
import "./index.css";

type LogEntry = { id: string; label: string; timestamp: number };
type SocketStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "unauthorized";

const STATUS_DOT: Record<SocketStatus, string> = {
  connecting: "bg-yellow-500",
  connected: "bg-green-500",
  disconnected: "bg-zinc-500",
  unauthorized: "bg-red-500",
};

function App() {
  const [status, setStatus] = useState<SocketStatus>(
    socket.connected ? "connected" : "connecting",
  );
  const [sentLog, setSentLog] = useState<LogEntry[]>([]);
  const [liveAt, setLiveAt] = useState(0);
  const [skipBlack, setSkipBlack] = useState(false);

  const connected = status === "connected";

  useEffect(() => {
    const onConnect = () => setStatus("connected");
    const onDisconnect = () => setStatus("disconnected");
    const onConnectError = (err: Error) => {
      setStatus(err.message === "unauthorized" ? "unauthorized" : "connecting");
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, []);

  const pushLog = (label: string, timestamp: number) => {
    setSentLog((prev) =>
      [{ id: `${timestamp}-${Math.random()}`, label, timestamp }, ...prev].slice(
        0,
        5,
      ),
    );
  };

  const sendCommand = (command: SenderCommand) => {
    const payload: CommandPayload = {
      from: "controller",
      command,
      timestamp: Date.now(),
    };
    socket.emit(SOCKET_EVENTS.COMMAND, payload);
    const label =
      command.action === "start-live"
        ? `start-live @ ${command.atSeconds}s`
        : command.action;
    pushLog(label, payload.timestamp);
  };

  const btn =
    "rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:cursor-not-allowed py-3 px-4 font-medium transition-colors";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-6 gap-6">
      <header className="w-full max-w-md flex items-center justify-between">
        <h1 className="text-xl font-semibold">Controller</h1>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${STATUS_DOT[status]}`}
            />
            {status}
          </div>
          <button
            type="button"
            onClick={resetWsToken}
            className="text-zinc-400 underline underline-offset-2 hover:text-zinc-100 transition-colors text-xs"
          >
            Reset token
          </button>
        </div>
      </header>

      <section className="w-full max-w-md flex flex-col gap-3">
        <h2 className="text-sm uppercase tracking-wide text-zinc-400">
          Sender control
        </h2>

        <label className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 cursor-pointer">
          <span className="text-sm">Skip black screen</span>
          <input
            type="checkbox"
            checked={skipBlack}
            onChange={(e) => setSkipBlack(e.target.checked)}
            className="w-5 h-5 accent-indigo-500"
          />
        </label>

        <button
          type="button"
          onClick={() => sendCommand({ action: "start-countdown", skipBlack })}
          disabled={!connected}
          className={btn}
        >
          Start countdown
        </button>

        <div className="flex flex-col gap-2 rounded-xl bg-zinc-900 p-4">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="live-at">Start live at</label>
            <span className="font-mono tabular-nums">{liveAt}s</span>
          </div>
          <input
            id="live-at"
            type="range"
            min={0}
            max={180}
            step={1}
            value={liveAt}
            onChange={(e) => setLiveAt(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <button
            type="button"
            onClick={() =>
              sendCommand({ action: "start-live", atSeconds: liveAt, skipBlack })
            }
            disabled={!connected}
            className={btn}
          >
            Start live @ {liveAt}s
          </button>
        </div>

        <button
          type="button"
          onClick={() => sendCommand({ action: "go-home" })}
          disabled={!connected}
          className={btn}
        >
          Go home
        </button>
      </section>

      <section className="w-full max-w-md">
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-2">
          Last sent
        </h2>
        {sentLog.length === 0 ? (
          <p className="text-zinc-500 text-sm">Nothing sent yet.</p>
        ) : (
          <ul className="space-y-1 text-sm font-mono">
            {sentLog.map((entry) => (
              <li
                key={entry.id}
                className="bg-zinc-900 rounded px-3 py-2 flex justify-between gap-2"
              >
                <span>{entry.label}</span>
                <span className="text-zinc-500">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
