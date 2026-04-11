import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export type SocketStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "unauthorized";

export function useSocketStatus(): SocketStatus {
  const [status, setStatus] = useState<SocketStatus>(
    socket.connected ? "connected" : "connecting",
  );

  useEffect(() => {
    const onConnect = () => setStatus("connected");
    const onDisconnect = () => setStatus("disconnected");
    const onConnectError = (err: Error) => {
      console.log("[err.message]:", err.message);
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

  return status;
}
