const counterSrc = `${import.meta.env.BASE_URL}animated/Counter_v02_H.264.webm`;

interface CountdownScreenProps {
  onComplete: () => void;
}

export function CountdownScreen({ onComplete }: CountdownScreenProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
      <video
        className="h-full w-full object-contain"
        src={counterSrc}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
      />
    </div>
  );
}
