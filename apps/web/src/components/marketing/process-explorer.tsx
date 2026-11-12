'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { processStages } from '@/config/content';

export function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const current = processStages[active] ?? processStages[0];

  return (
    <div className="mt-16">
      <div className="process-track grid grid-cols-5 gap-2 sm:gap-5" role="tablist" aria-label="Delivery stages">
        {processStages.map((stage, index) => (
          <button
            key={stage.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="process-dot" data-active={active === index}>
              0{index + 1}
            </span>
            <span className={`font-heading text-xs font-semibold sm:text-sm ${active === index ? 'text-accent' : 'text-muted'}`}>
              {stage.name}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-[.7fr_1.3fr] sm:pt-10" role="tabpanel">
        <div>
          <p className="lf-eyebrow">Stage {active + 1} / 05</p>
          <h3 className="font-heading mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{current.name}</h3>
        </div>
        <div className="flex items-start justify-between gap-8">
          <p className="text-ink-secondary max-w-2xl text-lg leading-8">{current.description}</p>
          <ArrowRight className="text-accent mt-2 hidden size-5 shrink-0 sm:block" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
