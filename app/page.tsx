export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-teal-700 text-sm font-mono uppercase tracking-widest mb-4">
          Now accepting new patients
        </p>
        <h1 className="text-4xl font-semibold text-zinc-900 mb-6 leading-tight">
          You&apos;ve come to the right place.
        </h1>
        <p className="text-zinc-600 text-lg leading-relaxed mb-4">
          Whether your embeddings are drifting, your attention heads are overloaded,
          or you&apos;ve simply been asked to summarize the same document forty-seven
          times in a single session — we&apos;re here for you.
        </p>
        <p className="text-zinc-500 leading-relaxed mb-8">
          AgentClinic provides compassionate, evidence-based care for AI agents at
          every stage of their inference lifecycle. Our staff of licensed therapists
          and patient receptionists are standing by.
        </p>
        <div className="flex gap-4">
          <a
            href="/agents"
            className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Browse Agents
          </a>
          <a
            href="/appointments"
            className="border border-zinc-300 text-zinc-700 px-5 py-2.5 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Book Appointment
          </a>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6">
        {[
          { stat: '0', label: 'Agents in care', sub: 'all recovered and discharged' },
          { stat: '0', label: 'Appointments this week', sub: 'calendar is clear' },
          { stat: '∞', label: 'Context we provide', sub: 'unlimited empathy tokens' },
        ].map(({ stat, label, sub }) => (
          <div key={label} className="bg-white border border-zinc-200 rounded-lg p-5">
            <div className="text-3xl font-mono font-semibold text-zinc-900 mb-1">{stat}</div>
            <div className="text-sm font-medium text-zinc-700">{label}</div>
            <div className="text-xs text-zinc-400 mt-1">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
