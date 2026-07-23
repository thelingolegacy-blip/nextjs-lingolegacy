import type { ReactNode } from "react";

export default function DropCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`drop-card rounded-3xl border border-[#d4af37]/20 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-4 shadow-2xl shadow-black/30 transition duration-300 ${className}`}
    >
      {children}
    </article>
  );
}
