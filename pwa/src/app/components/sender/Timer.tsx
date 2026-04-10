import { formatTime } from "../../utils/formatters";

interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  return (
    <div
      className="font-diginumbers relative flex w-40 items-center justify-center overflow-hidden rounded-3xl py-2 text-6xl leading-none tracking-[0.08em]"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0600 0%, #0a0200 100%)",
        color: "#fff1c4",
        border: "4px solid rgb(251, 234, 209)",
        textShadow:
          "0 0 2px #ffffff, 0 0 5px #ffe9a8, 0 0 10px #ffc24a, 0 0 20px #ff7a1a, 0 0 34px #ff4500, 0 0 55px rgba(255, 90, 0, 0.75), 0 0 80px rgba(255, 70, 0, 0.45)",
        boxShadow:
          "inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 8px rgba(251, 234, 209, 0.8), 0 0 18px rgba(251, 234, 209, 0.5), 0 0 32px rgba(251, 234, 209, 0.3)",
      }}
    >
      <span className="relative z-10 flex items-center">
        {formatTime(seconds)
          .split("")
          .map((ch, i) => (
            <span
              key={i}
              className="inline-flex justify-center"
              style={{ width: ch === ":" ? "0.30em" : "0.6em" }}
            >
              {ch}
            </span>
          ))}
      </span>
      <div
        className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
