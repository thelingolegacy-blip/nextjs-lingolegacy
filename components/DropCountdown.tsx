"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now();
  if (!Number.isFinite(difference) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function DropCountdown({
  targetDate,
  dropName,
}: {
  targetDate: string;
  dropName: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#d4af37]/40 bg-black/75 p-6 text-center shadow-2xl shadow-[#d4af37]/10">
      <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">Next Limited Drop</span>
      <h2 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">{dropName}</h2>
      <div className="mt-6 grid grid-cols-4 gap-3 text-[#f5f2eb]">
        {[
          ["Days", timeLeft.days],
          ["Hours", timeLeft.hours],
          ["Mins", timeLeft.minutes],
          ["Secs", timeLeft.seconds],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[#d4af37]/20 bg-[#111] p-3">
            <span className="block text-3xl font-black text-[#d4af37]">{value}</span>
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[#f5f2eb]/70">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
