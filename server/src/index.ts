import { Server } from "socket.io";
import {
  SOCKET_EVENTS,
  type ClientRole,
  type ClientToServerEvents,
  type CommandPayload,
  type HelloPayload,
  type ServerToClientEvents,
} from "shared";

const PORT = Number(process.env.PORT ?? 8080);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const role = (socket.handshake.query.role as ClientRole) ?? "pwa";
  const room = role === "controller" ? "controllers" : "pwas";
  socket.join(room);
  console.log(`[+] ${role} connected (${socket.id})`);

  socket.on(SOCKET_EVENTS.HELLO, (payload: HelloPayload) => {
    console.log("[hello]", payload);
    io.to("pwas").emit(SOCKET_EVENTS.HELLO, payload);
  });

  socket.on(SOCKET_EVENTS.COMMAND, (payload: CommandPayload) => {
    console.log("[command]", payload);
    io.to("pwas").emit(SOCKET_EVENTS.COMMAND, payload);
  });

  socket.on("disconnect", () => {
    console.log(`[-] ${role} disconnected (${socket.id})`);
  });
});

console.log(`WS server listening on :${PORT}`);
