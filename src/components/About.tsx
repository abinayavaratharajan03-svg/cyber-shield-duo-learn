import { Eye, Target, AlertTriangle, MapPin } from "lucide-react";
import { useI18n, type DictKey } from "@/lib/i18n";
import { Section } from "./Section";

export function About() {
  const { t } = useI18n();
  const items: { icon: typeof Eye; tk: DictKey; dk: DictKey; tint: string }[] = [
    { icon: Eye, tk: "vision_t", dk: "vision_d", tint: "var(--cyan-glow)" },
    { icon: Target, tk: "mission_t", dk: "mission_d", tint: "var(--neon)" },
    { icon: AlertTriangle, tk: "why_t", dk: "why_d", tint: "var(--warning)" },
    { icon: MapPin, tk: "tn_t", dk: "tn_d", tint: "var(--success)" },
  ];
  return (
    <Section id="about" eyebrow="Who we are" title={t("about_title")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it) => (
          <div key={it.tk} className="glass rounded-2xl p-6 glow-hover group">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `color-mix(in oklab, ${it.tint} 20%, transparent)`, color: it.tint }}
            >
              <it.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{t(it.tk)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(it.dk)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
