import { getAllAilmentsWithTherapies } from '@/lib/ailments';

export const dynamic = 'force-dynamic';

export default function AilmentsPage() {
  const ailments = getAllAilmentsWithTherapies();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Ailments</h1>
        <p className="text-zinc-400 text-sm mt-1 font-mono">
          {ailments.length} recognized condition{ailments.length !== 1 ? 's' : ''} on record
        </p>
      </div>

      {ailments.length === 0 ? (
        <div className="text-center py-24 text-zinc-400">
          <p className="text-lg mb-2">No ailments catalogued yet.</p>
          <p className="text-sm">The DSM-LLM is still being compiled.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {ailments.map((ailment) => (
            <div
              key={ailment.id}
              className="bg-white border border-zinc-200 rounded-lg p-5"
            >
              <h2 className="font-medium text-zinc-900 text-sm mb-2">{ailment.name}</h2>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">{ailment.description}</p>
              {ailment.therapies.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                    Recommended therapies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ailment.therapies.map((t) => (
                      <span
                        key={t.id}
                        className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
