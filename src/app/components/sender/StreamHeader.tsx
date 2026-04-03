import { ArrowLeft } from "lucide-react";

interface StreamHeaderProps {
  onBack: () => void;
}

export function StreamHeader({ onBack }: StreamHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 pt-[env(safe-area-inset-top)] px-4 pb-4 bg-gradient-to-b from-black/80 to-transparent">
      <button
        onClick={onBack}
        className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        title="Zurück"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    </div>
  );
}
