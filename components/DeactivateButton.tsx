'use client';

interface DeactivateButtonProps {
  action: (formData: FormData) => Promise<void>;
}

export default function DeactivateButton({ action }: DeactivateButtonProps) {
  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('Deactivate this agent? They will be marked as inactive.')) {
            e.preventDefault();
          }
        }}
        className="border border-zinc-300 text-zinc-500 px-4 py-1.5 rounded text-sm font-medium hover:bg-zinc-100 transition-colors"
      >
        Deactivate
      </button>
    </form>
  );
}
