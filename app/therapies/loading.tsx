export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="h-8 w-32 bg-zinc-100 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-zinc-100 rounded-lg h-32 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
