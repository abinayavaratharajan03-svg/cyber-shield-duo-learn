import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--cyan-glow)] mb-3">
              <span className="w-8 h-px bg-[var(--cyan-glow)]" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
