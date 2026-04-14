import { LIVE_VARIANTS, type LiveVariant } from "shared";

interface VariantSelectProps {
  onSelect: (variant: LiveVariant) => void;
}

export function VariantSelect({ onSelect }: VariantSelectProps) {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center p-6">
      <h2 className="text-white text-xl font-bold mb-6">Variante wählen</h2>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {LIVE_VARIANTS.map((v) => {
          const resultLabel = v.resultFile
            .replace(/_v\d+\.webm$/, "")
            .replace(/-/g, " ");
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className="flex flex-col items-center gap-1 rounded-2xl bg-zinc-800 p-4 hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              <span className="text-lg font-bold text-white">{v.label}</span>
              <span className="text-xs text-zinc-400">{resultLabel}</span>
              <span className="text-xs text-zinc-500">{v.durationSeconds}s</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
