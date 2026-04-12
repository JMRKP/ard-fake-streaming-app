// Shared types and constants for controller <-> server <-> pwa communication.

export const SOCKET_EVENTS = {
  COMMAND: "command",
} as const;

export type ClientRole = "controller" | "pwa";

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
  [SOCKET_EVENTS.COMMAND]: (payload: CommandPayload) => void;
}

export interface ClientToServerEvents {
  [SOCKET_EVENTS.COMMAND]: (payload: CommandPayload) => void;
}
