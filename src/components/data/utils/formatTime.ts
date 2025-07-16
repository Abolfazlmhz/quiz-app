export const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");

  const persian = (str: string) => str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
  return persian(`${m}:${s}`);
};
