export function formatTime(seconds: number): string {
  const safeSecs = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSecs / 60);
  const secs = safeSecs % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
