'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { processStages } from '@/config/content';

export function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const current = processStages[active] ?? processStages[0];
  return (
    <div className="border-line bg-surface mt-12 overflow-hidden rounded-3xl border shadow-[var(--shadow-soft)]">
      <div
        className="border-line grid border-b sm:grid-cols-5"
        role="tablist"
        aria-label="Delivery stages"
      >
        {processStages.map((stage, index) => (
          <button
            key={stage.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`border-line relative flex items-center justify-between gap-2 border-b px-5 py-4 text-left text-sm font-semibold transition last:border-0 sm:border-r sm:border-b-0 ${active === index ? 'bg-brand text-white' : 'text-ink-secondary hover:bg-surface-alt'}`}
          >
            <span>
              <span className="mr-2 font-mono text-[10px] opacity-60">0{index + 1}</span>
              {stage.name}
            </span>
            {index < processStages.length - 1 ? (
              <ArrowRight className="size-3.5 opacity-50" />
            ) : null}
          </button>
        ))}
      </div>
      <div className="grid gap-8 p-7 sm:grid-cols-[1fr_2fr] sm:p-10" role="tabpanel">
        <div>
          <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
            Stage {active + 1} of 5
          </p>
          <h3 className="font-heading mt-3 text-3xl font-semibold tracking-[-0.035em]">
            {current.name}
          </h3>
        </div>
        <p className="text-ink-secondary max-w-2xl text-lg leading-8">{current.description}</p>
      </div>
    </div>
  );
}
