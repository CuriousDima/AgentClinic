'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-center">
      <h2 className="text-lg font-semibold text-zinc-900 mb-2">Something went wrong</h2>
      <p className="text-zinc-500 text-sm mb-6">Could not load appointments. Please try again.</p>
      <button
        onClick={reset}
        className="bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
