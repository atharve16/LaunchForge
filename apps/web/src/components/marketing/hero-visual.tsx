import { ArrowUpRight } from 'lucide-react';

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]" aria-label="An abstract launch trajectory graphic">
      <div className="hero-orbit">
        <div className="hero-core"><span>SHIP</span></div>
        <span className="hero-satellite one">idea</span>
        <span className="hero-satellite two">users</span>
        <span className="hero-satellite three">v1.0</span>
      </div>
      <div className="border-line bg-surface/90 absolute right-0 bottom-[8%] flex items-center gap-3 border px-4 py-3 backdrop-blur sm:right-[2%]">
        <span className="bg-accent size-2 rounded-full" />
        <span className="text-muted font-mono text-[10px] tracking-[0.14em] uppercase">Launch sequence / active</span>
        <ArrowUpRight className="text-accent size-4" />
      </div>
    </div>
  );
}
