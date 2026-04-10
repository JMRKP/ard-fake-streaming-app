import { formatTime } from "../../utils/formatters";

interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter
          id="timer-glitch"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.7"
            numOctaves={2}
            seed={2}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="0.5s"
              values="0.015 0.7;0.03 1.2;0.01 0.4;0.025 0.9;0.015 0.7"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

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
          filter: "url(#timer-glitch)",
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
        <svg
          className="pointer-events-none absolute inset-0 z-30 h-full w-full mix-blend-screen"
          style={{ opacity: 0.4 }}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <filter id="timer-tv-snow">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.9}
              numOctaves={2}
              seed={1}
            >
              <animate
                attributeName="seed"
                dur="0.15s"
                values="1;4;7;2;9;3;6;8;5"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#timer-tv-snow)" />
        </svg>
      </div>
    </>
  );
}
