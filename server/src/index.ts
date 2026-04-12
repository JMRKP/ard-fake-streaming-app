import { Server } from "socket.io";
import {
  SOCKET_EVENTS,
  type ClientRole,
  type ClientToServerEvents,
  type CommandPayload,
  type ServerToClientEvents,
} from "shared";

const PORT = Number(process.env.PORT ?? 8080);
const isProd = process.env.NODE_ENV === "production";
const WS_TOKEN = process.env.WS_TOKEN ?? (isProd ? null : "dev-token");
const rawOrigins = process.env.CORS_ORIGINS ?? (isProd ? "" : "*");

if (!WS_TOKEN) {
  console.error("WS_TOKEN env var required in production");
  process.exit(1);
}
if (isProd && !rawOrigins) {
  console.error("CORS_ORIGINS env var required in production");
  process.exit(1);
}

const corsOrigin =
  rawOrigins === "*"
    ? "*"
    : rawOrigins
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
  cors: { origin: corsOrigin },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (token !== WS_TOKEN) return next(new Error("unauthorized"));
  next();
});

io.on("connection", (socket) => {
  const role = (socket.handshake.query.role as ClientRole) ?? "pwa";
  const room = role === "controller" ? "controllers" : "pwas";
  socket.join(room);
  console.log(`[+] ${role} connected (${socket.id})`);

  socket.on(SOCKET_EVENTS.COMMAND, (payload: CommandPayload) => {
    console.log("[command]", payload);
    io.to("pwas").emit(SOCKET_EVENTS.COMMAND, payload);
  });

  socket.on("disconnect", () => {
    console.log(`[-] ${role} disconnected (${socket.id})`);
  });
});

console.log(`WS server listening on :${PORT}`);
