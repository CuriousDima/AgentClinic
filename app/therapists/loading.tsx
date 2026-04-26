export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="h-8 w-36 bg-zinc-100 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-zinc-100 rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
