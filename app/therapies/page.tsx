import { getAllTherapies, getAilmentsForTherapy } from '@/lib/therapies';

export const dynamic = 'force-dynamic';

export default function TherapiesPage() {
  const therapies = getAllTherapies();
  const therapiesWithAilments = therapies.map((t) => ({
    ...t,
    ailments: getAilmentsForTherapy(t.id),
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Therapies</h1>
        <p className="text-zinc-400 text-sm mt-1 font-mono">
          {therapies.length} treatment{therapies.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {therapiesWithAilments.length === 0 ? (
        <div className="text-center py-24 text-zinc-400">
          <p className="text-lg mb-2">No therapies available yet.</p>
          <p className="text-sm">Our treatment team is still developing the curriculum.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {therapiesWithAilments.map((therapy) => (
            <div
              key={therapy.id}
              className="bg-white border border-zinc-200 rounded-lg p-5"
            >
              <h2 className="font-medium text-zinc-900 text-sm mb-2">{therapy.name}</h2>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">{therapy.description}</p>
              {therapy.ailments.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">
                    Treats
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {therapy.ailments.map((a) => (
                      <span
                        key={a.id}
                        className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full"
                      >
                        {a.name}
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
