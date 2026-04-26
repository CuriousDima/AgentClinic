export default function Nav() {
  return (
    <nav className="bg-zinc-800 text-zinc-300 px-6 py-2 text-sm">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-x-6 gap-y-2 py-1">
        <a href="/agents" className="hover:text-white transition-colors">
          Agents
        </a>
        <a href="/ailments" className="hover:text-white transition-colors">
          Ailments
        </a>
        <a href="/therapies" className="hover:text-white transition-colors">
          Therapies
        </a>
        <a href="/therapists" className="hover:text-white transition-colors">
          Therapists
        </a>
        <a href="/appointments" className="hover:text-white transition-colors">
          Appointments
        </a>
        <a href="/dashboard" className="hover:text-white transition-colors">
          Dashboard
        </a>
      </div>
    </nav>
  );
}
