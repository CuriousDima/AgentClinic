export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="h-8 w-32 bg-zinc-100 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-zinc-100 rounded-lg h-20 animate-pulse" />
        ))}
      </div>
      <div className="h-5 w-24 bg-zinc-100 rounded animate-pulse mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-zinc-100 rounded-lg h-12 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
