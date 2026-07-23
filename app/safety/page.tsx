export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-[#f5f2eb]">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-[#d4af37]/30 bg-[#111] p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">Studio guardrails</p>
        <h1 className="mt-3 text-4xl font-black uppercase text-white">Safety precautions</h1>
        <ul className="mt-6 grid gap-3 leading-8 text-[#f5f2eb]/75">
          <li>Secrets stay server-side in environment variables; no fallback secrets are allowed.</li>
          <li>State-changing API routes reject cross-origin POST requests and cap cart quantities.</li>
          <li>Security headers deny framing, restrict resource origins, and enforce HTTPS.</li>
          <li>AI crawler blocks in robots.txt are advisory; use Vercel Firewall only after traffic is measured as a cost driver.</li>
          <li>Hidden UI is not a security boundary; restricted data must never be rendered into the DOM.</li>
        </ul>
        <a className="mt-8 inline-block text-[#d4af37]" href="/">Back home</a>
      </section>
    </main>
  );
}
