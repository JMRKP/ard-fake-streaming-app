// Shared types and constants for controller <-> server <-> pwa communication.

export const SOCKET_EVENTS = {
  COMMAND: "command",
} as const;

export type ClientRole = "controller" | "pwa";

export type LiveVariant = 1 | 2 | 3 | 4 | 5 | 6;

export interface LiveVariantConfig {
  id: LiveVariant;
  label: string;
  graphFile: string;
  resultFile: string;
  durationSeconds: number;
}

export const LIVE_VARIANTS: LiveVariantConfig[] = [
  { id: 1, label: "G1", graphFile: "Barometer_G1_v09.webm", resultFile: "WON_30_v06.webm", durationSeconds: 180 },
  { id: 2, label: "G2", graphFile: "Barometer_G2_v09.webm", resultFile: "LOST-OUT_A_v06.webm", durationSeconds: 170 },
  { id: 3, label: "G3", graphFile: "Barometer_G3_v09.webm", resultFile: "LOST-OUT_A_v06.webm", durationSeconds: 170 },
  { id: 4, label: "G4a", graphFile: "Barometer_G4_v09.webm", resultFile: "WON_300_v06.webm", durationSeconds: 180 },
  { id: 5, label: "G4b", graphFile: "Barometer_G4_v09.webm", resultFile: "WON_30000_v06.webm", durationSeconds: 180 },
  { id: 6, label: "G5", graphFile: "Barometer_G5_v09.webm", resultFile: "WON_3000_v06.webm", durationSeconds: 180 },
];

export type SenderCommand =
  | { action: "start-countdown"; skipBlack?: boolean; variant?: LiveVariant }
  | { action: "start-live"; atSeconds: number; skipBlack?: boolean; variant?: LiveVariant }
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
