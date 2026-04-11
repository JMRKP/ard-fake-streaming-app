import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "shared";

const WS_URL = import.meta.env.VITE_WS_URL ?? "http://localhost:8080";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    query: { role: "controller" },
    transports: ["websocket"],
    autoConnect: true,
  },
);
