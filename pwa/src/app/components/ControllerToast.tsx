import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useControllerEvents } from "../hooks/useControllerEvents";
import { router } from "../routes";

const DOT_COLOR = {
  connected: "bg-green-500",
  connecting: "bg-amber-500",
  error: "bg-red-500",
} as const;

export function ControllerToast() {
  const { status, lastError, lastHello, lastCommand, wsUrl } =
    useControllerEvents();

  useEffect(() => {
    if (!lastHello) return;
    toast(lastHello.message, {
      description: `from ${lastHello.from} · ${new Date(
        lastHello.timestamp,
      ).toLocaleTimeString()}`,
      duration: 3000,
    });
  }, [lastHello]);

  useEffect(() => {
    if (!lastCommand) return;
    const { command } = lastCommand;
    switch (command.action) {
      case "start-countdown":
        router.navigate("/sender?phase=countdown");
        break;
      case "start-live": {
        const at = Math.max(
          0,
          Math.min(180, Math.floor(command.atSeconds)),
        );
        router.navigate(`/sender?phase=live&at=${at}`);
        break;
      }
      case "go-home":
        router.navigate("/");
        break;
    }
    const label =
      command.action === "start-live"
        ? `start-live @ ${command.atSeconds}s`
        : command.action;
    toast(`command: ${label}`, { duration: 2000 });
  }, [lastCommand]);

  return (
    <>
      <div
        className="fixed top-2 left-2 z-50 pointer-events-none select-none rounded-md bg-black/70 text-white text-[10px] font-mono px-2 py-1 leading-tight max-w-[70vw]"
        aria-hidden
      >
        <div className="flex items-center gap-1.5">
          <span className={`inline-block w-2 h-2 rounded-full ${DOT_COLOR[status]}`} />
          <span>{status}</span>
          <span className="opacity-60 truncate">{wsUrl}</span>
        </div>
        {lastError && (
          <div className="text-red-300 truncate">{lastError}</div>
        )}
      </div>
      <Toaster position="top-center" theme="dark" richColors />
    </>
  );
}
