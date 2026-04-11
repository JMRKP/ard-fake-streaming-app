import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "shared";

const WS_URL = import.meta.env.VITE_WS_URL ?? "http://localhost:8080";

function getWsToken(): string {
  const existing = localStorage.getItem("ws_token");
  if (existing) return existing;
  const entered = window.prompt("Enter WebSocket token:") ?? "";
  if (entered) localStorage.setItem("ws_token", entered);
  return entered;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    query: { role: "controller" },
    auth: { token: getWsToken() },
    transports: ["websocket"],
    autoConnect: true,
  },
);

export function resetWsToken(): void {
  socket.disconnect();
  localStorage.removeItem("ws_token");
  const entered = window.prompt("Enter WebSocket token:") ?? "";
  if (!entered) return;
  localStorage.setItem("ws_token", entered);
  (socket.auth as { token: string }).token = entered;
  socket.connect();
}
