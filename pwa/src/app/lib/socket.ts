import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "shared";

export const WS_URL: string =
  import.meta.env.VITE_WS_URL ?? "http://localhost:8080";

function getWsToken(): string {
  const existing = localStorage.getItem("ws_token");
  if (existing) return existing;
  const entered = window.prompt("Enter WebSocket token:") ?? "";
  if (entered) localStorage.setItem("ws_token", entered);
  return entered;
}

console.log("[ws] connecting to", WS_URL);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    query: { role: "pwa" },
    auth: { token: getWsToken() },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
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

socket.on("connect", () => {
  console.log("[ws] connect", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("[ws] disconnect", reason);
});

socket.on("connect_error", (err) => {
  console.error("[ws] connect_error", err.message, err);
  if (err.message === "unauthorized") {
    socket.disconnect();
  }
});

socket.io.on("reconnect_attempt", (n) => {
  console.log("[ws] reconnect_attempt", n);
});

socket.io.on("reconnect_failed", () => {
  console.error("[ws] reconnect_failed");
});
