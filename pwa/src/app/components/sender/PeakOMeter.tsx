interface PeakOMeterProps {
  successLevel: number;
}

export function PeakOMeter({ successLevel }: PeakOMeterProps) {
  return (
    <div className="absolute top-48 left-4 right-4 z-20 rounded-2xl bg-black/60 p-3">
      <div className="text-white text-xs mb-2">Peak-O-Meter</div>
      <div className="relative">
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${successLevel}%`,
              background: `linear-gradient(to right, #ef4444, #f59e0b, #22c55e)`,
            }}
          />
        </div>
        <img
          src={`${import.meta.env.BASE_URL}animated/Ikosaeder-Animation.png`}
          alt=""
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none z-40 transition-all duration-500"
          style={{ left: `${successLevel}%` }}
        />
      </div>
      <div className="text-white text-xs mt-1 text-right">
        {Math.floor(successLevel)}%
      </div>
    </div>
  );
}
