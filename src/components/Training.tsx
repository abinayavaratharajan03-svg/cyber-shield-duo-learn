import { School, GraduationCap, Briefcase, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

const programs = [
  { icon: School, title: "School Workshops", body: "Class 6–12 modules with games, comics & Tamil-medium support.", meta: "200+ schools", price: "Free" },
  { icon: GraduationCap, title: "College Seminars", body: "Bug bounty intro, social-engineering labs, career path talks.", meta: "Half / full day", price: "Sponsored" },
  { icon: Briefcase, title: "Business Awareness", body: "Phishing drills, SOC basics, incident response for SMB teams.", meta: "Monthly cohort", price: "₹4,999/seat" },
];

export function Training() {
  const { t } = useI18n();
  return (
    <Section id="training" eyebrow="Learn the craft" title={t("train_title")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {programs.map((p) => (
          <div key={p.title} className="glass rounded-2xl overflow-hidden glow-hover group">
            <div className="aspect-[4/3] relative grid-bg flex items-center justify-center bg-gradient-to-br from-[var(--neon)]/20 to-[var(--cyan-glow)]/10">
              <p.icon className="w-16 h-16 text-[var(--cyan-glow)] drop-shadow-[0_0_20px_var(--cyan-glow)]" strokeWidth={1.3} />
              <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded bg-background/70">{p.meta}</span>
              <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-[var(--success)]/20 text-[var(--success)]">{p.price}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.body}</p>
              <button className="text-xs font-semibold text-[var(--cyan-glow)] hover:underline">Enroll now →</button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
