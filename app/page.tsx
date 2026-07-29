const proofPoints = [
  ["Drop system", "Merch, Tapstitch POD, and bulk inventory paths are separated so launch copy can stay honest."],
  ["Checkout-ready", "Shopify owns checkout while the landing page focuses on conversion, story, and release timing."],
  ["Launch guardrails", "The storefront remains inert until the required commerce environment variables are present."],
];

const launchSteps = ["Preview the drop", "Open the merch floor", "Route checkout safely", "Fulfill by vendor"];

const studioMetrics = [
  ["Studio UI", "v2"],
  ["Framework", "Next 16"],
  ["Design stack", "Tailwind 4"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-[#fff9e8]">
      <section className="relative px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto grid min-h-[82vh] max-w-6xl items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <p className="inline-flex rounded-full border border-[#f7c84b]/45 bg-black/35 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#f7c84b] shadow-[0_0_34px_rgba(247,200,75,.16)] backdrop-blur">
              Loyalty Lane studio storefront
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase tracking-[-0.08em] text-white md:text-8xl">
              Drop command for the merch floor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#fff9e8]/76">
              A Studio UI v2 storefront surface for controlled releases: premium product framing, trust-forward copy, vendor routing, and fast conversion paths before checkout opens.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="rounded-full bg-[#f7c84b] px-6 py-3 font-black uppercase tracking-[0.16em] text-black shadow-[0_18px_44px_rgba(247,200,75,.2)] transition hover:-translate-y-0.5 hover:saturate-125" href="/merch">
                Open merch drops
              </a>
              <a className="rounded-full border border-[#56efff]/35 bg-white/[.04] px-6 py-3 font-black uppercase tracking-[0.16em] text-[#56efff] transition hover:-translate-y-0.5 hover:border-[#f7c84b]/60" href="#launch-system">
                Review launch system
              </a>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {studioMetrics.map(([label, value]) => (
                <div className="rounded-3xl border border-white/10 bg-white/[.055] p-4 backdrop-blur" key={label}>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#cfc3a2]">{label}</p>
                  <p className="mt-2 text-xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#f7c84b]/35 bg-white/[.075] p-5 shadow-2xl shadow-black/60 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-sm font-black uppercase tracking-[0.22em] text-[#f7c84b]">Release board</span>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Ready copy</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {proofPoints.map(([title, copy]) => (
                  <article className="rounded-3xl border border-white/10 bg-white/[.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,.26)]" key={title}>
                    <h2 className="text-xl font-black text-white">{title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#fff9e8]/72">{copy}</p>
                  </article>
                ))}
                <article className="rounded-3xl border border-[#f7c84b]/35 bg-[#f7c84b]/10 p-5 shadow-[0_22px_70px_rgba(247,200,75,.09)]">
                  <h2 className="text-xl font-black text-[#f7c84b]">Primary CTA</h2>
                  <p className="mt-3 text-sm leading-6 text-[#fff9e8]/75">Move visitors straight to the merch floor with a secondary path for release context.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 sm:grid-cols-2 md:px-6 lg:grid-cols-4" id="launch-system">
        {launchSteps.map((step, index) => (
          <article className="rounded-3xl border border-white/10 bg-white/[.065] p-5 shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur" key={step}>
            <span className="text-sm font-black text-[#56efff]">0{index + 1}</span>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">{step}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
