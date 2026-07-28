const proofPoints = [
  ["Drop system", "Merch, Tapstitch POD, and bulk inventory paths are separated so launch copy can stay honest."],
  ["Checkout-ready", "Shopify owns checkout while the landing page focuses on conversion, story, and release timing."],
  ["Launch guardrails", "The storefront remains inert until the required commerce environment variables are present."],
];

const launchSteps = ["Preview the drop", "Open the merch floor", "Route checkout safely", "Fulfill by vendor"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f5f2eb]">
      <section className="relative px-6 py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,.24),transparent_28rem),radial-gradient(circle_at_80%_10%,rgba(124,58,237,.22),transparent_26rem)]" />
        <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="inline-flex rounded-full border border-[#d4af37]/40 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#d4af37]">
              Loyalty Lane drop command
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase tracking-[-0.08em] text-white md:text-8xl">
              Sell the drop before checkout starts.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f5f2eb]/75">
              A sharper landing page for controlled merch releases: clear drop promise, fulfillment context, trust guardrails, and fast routes into the storefront.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="rounded-full bg-[#d4af37] px-6 py-3 font-black uppercase tracking-[0.16em] text-black" href="/merch">
                Open merch drops
              </a>
              <a className="rounded-full border border-[#d4af37]/40 px-6 py-3 font-black uppercase tracking-[0.16em] text-[#d4af37]" href="#launch-system">
                Review launch system
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d4af37]/35 bg-white/[.06] p-5 shadow-2xl shadow-black/50 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-sm font-black uppercase tracking-[0.22em] text-[#d4af37]">Drop board</span>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Ready copy</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {proofPoints.map(([title, copy]) => (
                  <article className="rounded-3xl border border-white/10 bg-white/[.05] p-5" key={title}>
                    <h2 className="text-xl font-black text-white">{title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#f5f2eb]/70">{copy}</p>
                  </article>
                ))}
                <article className="rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-5">
                  <h2 className="text-xl font-black text-[#d4af37]">Primary CTA</h2>
                  <p className="mt-3 text-sm leading-6 text-[#f5f2eb]/75">Move visitors straight to the merch floor with a secondary path for release context.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4" id="launch-system">
        {launchSteps.map((step, index) => (
          <article className="rounded-3xl border border-white/10 bg-white/[.055] p-5" key={step}>
            <span className="text-sm font-black text-[#d4af37]">0{index + 1}</span>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">{step}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
