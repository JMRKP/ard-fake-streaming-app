import { useEffect, useState } from "react";
import {
  SOCKET_EVENTS,
  type CommandPayload,
} from "shared";
import { socket, WS_URL } from "../lib/socket";

export type ConnectionStatus = "connecting" | "connected" | "error";

export function useControllerEvents() {
  const [status, setStatus] = useState<ConnectionStatus>(
    socket.connected ? "connected" : "connecting",
  );
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastCommand, setLastCommand] = useState<CommandPayload | null>(null);

  useEffect(() => {
    const onConnect = () => {
      setStatus("connected");
      setLastError(null);
    };
    const onDisconnect = (reason: string) => {
      setStatus("connecting");
      setLastError(`disconnected: ${reason}`);
    };
    const onConnectError = (err: Error) => {
      setStatus("error");
      setLastError(err.message || "connect_error");
    };
    const onCommand = (payload: CommandPayload) => {
      console.log("[command]", payload);
      setLastCommand(payload);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on(SOCKET_EVENTS.COMMAND, onCommand);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off(SOCKET_EVENTS.COMMAND, onCommand);
    };
  }, []);

  return {
    status,
    lastError,
    lastCommand,
    wsUrl: WS_URL,
    connected: status === "connected",
  };
}
