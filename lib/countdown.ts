export type CountdownState = {
  total: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export function getCountdown(targetISO: string): CountdownState {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const total = target - now;

  if (total <= 0) {
    return {
      total: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true
    };
  }

  const totalDays = Math.floor(total / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  return {
    total,
    months,
    days,
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    expired: false
  };
}
