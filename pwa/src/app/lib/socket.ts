import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "shared";

export const WS_URL: string =
  import.meta.env.VITE_WS_URL ?? "http://localhost:8080";

console.log("[ws] connecting to", WS_URL);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    query: { role: "pwa" },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  },
);

socket.on("connect", () => {
  console.log("[ws] connect", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("[ws] disconnect", reason);
});

socket.on("connect_error", (err) => {
  console.error("[ws] connect_error", err.message, err);
});

socket.io.on("reconnect_attempt", (n) => {
  console.log("[ws] reconnect_attempt", n);
});

socket.io.on("reconnect_failed", () => {
  console.error("[ws] reconnect_failed");
});
