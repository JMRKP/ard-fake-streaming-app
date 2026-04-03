interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:opacity-90 transition-opacity"
      >
        Stream Starten
      </button>
    </div>
  );
}
