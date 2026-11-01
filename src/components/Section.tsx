import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <div className="mb-10 flex items-baseline gap-3">
          <span className="font-mono text-sm text-accent">{index}</span>
          <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <span className="ml-2 h-px flex-1 bg-line" aria-hidden="true" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}
