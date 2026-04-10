// Shared types and constants for controller <-> server <-> pwa communication.

export const SOCKET_EVENTS = {
  HELLO: "hello",
  COMMAND: "command",
} as const;

export type ClientRole = "controller" | "pwa";

export type HelloPayload = {
  from: "controller";
  message: string;
  timestamp: number;
};

export type SenderCommand =
  | { action: "start-countdown" }
  | { action: "start-live"; atSeconds: number }
  | { action: "go-home" };

export type CommandPayload = {
  from: "controller";
  command: SenderCommand;
  timestamp: number;
};

export interface ServerToClientEvents {
  [SOCKET_EVENTS.HELLO]: (payload: HelloPayload) => void;
  [SOCKET_EVENTS.COMMAND]: (payload: CommandPayload) => void;
}

export interface ClientToServerEvents {
  [SOCKET_EVENTS.HELLO]: (payload: HelloPayload) => void;
  [SOCKET_EVENTS.COMMAND]: (payload: CommandPayload) => void;
}
