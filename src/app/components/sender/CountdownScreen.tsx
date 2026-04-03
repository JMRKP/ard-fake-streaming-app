interface CountdownScreenProps {
  countdown: number;
}

export function CountdownScreen({ countdown }: CountdownScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="text-white text-2xl font-bold mb-4 animate-pulse">
        DU BIST DRAN
      </div>
      <div className="text-white text-9xl font-black">{countdown}</div>
    </div>
  );
}
