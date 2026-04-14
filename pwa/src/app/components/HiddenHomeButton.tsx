import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const TAP_WINDOW_MS = 600;
const HIDE_AFTER_MS = 3000;

export function HiddenHomeButton() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const tapCount = useRef(0);
  const lastTap = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) return;
    hideTimer.current = setTimeout(() => setVisible(false), HIDE_AFTER_MS);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [visible]);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current > TAP_WINDOW_MS) {
      tapCount.current = 1;
    } else {
      tapCount.current += 1;
    }
    lastTap.current = now;

    if (tapCount.current >= 3) {
      tapCount.current = 0;
      setVisible(true);
    }
  };

  return (
    <>
      <div
        className="absolute top-0 left-0 w-20 h-20 z-50"
        onTouchEnd={handleTap}
        onClick={handleTap}
      />
      <button
        onClick={() => navigate("/")}
        className={`absolute top-4 left-4 z-50 bg-black/60 text-white rounded-full px-4 py-2 text-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        ← Home
      </button>
    </>
  );
}
