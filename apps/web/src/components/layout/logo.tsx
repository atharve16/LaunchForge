import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="font-heading inline-flex items-center gap-3 font-bold tracking-[-0.03em]"
      aria-label="LaunchForge home"
    >
      <span className="bg-accent text-[#090b10] grid size-9 place-items-center rounded-full shadow-[0_0_20px_rgba(255,113,61,0.25)]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
          <path
            d="M6 17 12 4l6 13-6-3-6 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 14v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-ink text-lg tracking-[-0.04em]">LaunchForge<span className="text-accent">.</span></span>
    </Link>
  );
}
