"use client";

const lanes = [
  ["Assets", "Hero plates, reward symbols, merch tiles, and story-world art now share one production rail."],
  ["Animation + sound", "CSS glow, card lift, burst feedback, and user-triggered Web Audio chimes are ready for studio QA."],
  ["UI/UX", "Primary shopping paths stay first while release proof, safety notes, and studio context remain easy to scan."],
  ["Monetizing", "Merch drops, sponsor slots, cosmetic bundles, and lead capture stay separate from gameplay outcomes."],
];

function track(name: string, data: Record<string, unknown> = {}) {
  try {
    const va = (window as typeof window & { va?: (event: string, payload: unknown) => void }).va;
    va?.("event", { name, data });
  } catch {}
}

function burst() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let index = 0; index < 18; index += 1) {
    const dot = document.createElement("i");
    dot.className = "studio-asset-particle";
    dot.style.left = `${42 + Math.random() * 16}%`;
    dot.style.top = `${46 + Math.random() * 12}%`;
    dot.style.color = index % 2 ? "#56efff" : "#f7c84b";
    document.body.append(dot);
    requestAnimationFrame(() => {
      dot.style.transform = `translate(${Math.random() * 260 - 130}px, ${Math.random() * -170 - 24}px) scale(.16)`;
      dot.style.opacity = "0";
    });
    window.setTimeout(() => dot.remove(), 940);
  }
  track("studio_asset_burst");
}

function playChime() {
  const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextConstructor = audioWindow.AudioContext || audioWindow.webkitAudioContext;
  if (!AudioContextConstructor) return;
  const context = new AudioContextConstructor();
  [392, 523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 2 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    const start = context.currentTime + index * 0.08;
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.26);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.3);
  });
  window.setTimeout(() => context.close(), 1000);
  track("studio_chime_tested");
}

export function StudioProductionConsole() {
  return (
    <section className="studio-production-console mx-auto max-w-6xl px-5 pb-20 md:px-6" id="studio-production-assets">
      <div className="rounded-[2rem] border border-[#f7c84b]/35 bg-white/[.075] p-5 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-[#f7c84b]/45 bg-black/35 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f7c84b]">
              Studio build production layer
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black uppercase tracking-[-0.07em] text-white md:text-7xl">
              Assets, motion, sound, CSS, and monetization lanes.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#fff9e8]/74">
              The storefront now exposes a studio-grade production console for asset polish, user-triggered sound cues, motion-safe interaction feedback, and monetization-ready routes before checkout opens.
            </p>
          </div>
          <div className="rounded-3xl border border-[#56efff]/30 bg-black/35 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#cfc3a2]">Release status</p>
            <p className="mt-2 text-2xl font-black text-[#56efff]">Ready pass</p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {lanes.map(([title, copy]) => (
            <article className="rounded-3xl border border-white/10 bg-black/30 p-5" key={title}>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#f7c84b]">{title}</span>
              <p className="mt-3 text-sm leading-6 text-[#fff9e8]/72">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button className="rounded-full bg-[#f7c84b] px-6 py-3 font-black uppercase tracking-[0.14em] text-black" onClick={playChime} type="button">
            Test studio chime
          </button>
          <button className="rounded-full border border-[#56efff]/35 bg-white/[.04] px-6 py-3 font-black uppercase tracking-[0.14em] text-[#56efff]" onClick={burst} type="button">
            Trigger asset burst
          </button>
          <a className="rounded-full border border-white/15 bg-white/[.04] px-6 py-3 font-black uppercase tracking-[0.14em] text-white" href="mailto:hello@thelingolegacy.com?subject=Loyalty%20Lane%20studio%20asset%20request">
            Request asset package
          </a>
        </div>
      </div>
    </section>
  );
}
