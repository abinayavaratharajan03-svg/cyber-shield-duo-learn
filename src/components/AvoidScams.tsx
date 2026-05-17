import { KeyRound, Link2, ShieldCheck, FileX, LockKeyhole, CreditCard } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

const steps = [
  { icon: KeyRound, title: "Never share OTP", body: "Not with bank, police, courier, or family. Period." },
  { icon: Link2, title: "Verify URLs", body: "Hover before you click. Look for HTTPS and the exact domain." },
  { icon: ShieldCheck, title: "Enable 2FA", body: "Two-factor everywhere — UPI, email, social, banking." },
  { icon: FileX, title: "Avoid unknown APKs", body: "Only install apps from Play Store or App Store." },
  { icon: LockKeyhole, title: "Strong passwords", body: "12+ chars, unique per site. Use a password manager." },
  { icon: CreditCard, title: "Payment verification", body: "Confirm via call before any UPI ‘refund’ or ‘request’." },
];

export function AvoidScams() {
  const { t } = useI18n();
  return (
    <Section id="avoid" eyebrow="Prevention playbook" title={t("avoid_title")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((s, i) => (
          <div key={s.title} className="glass rounded-2xl p-6 glow-hover relative overflow-hidden">
            <span className="absolute top-4 right-4 font-display text-5xl font-bold text-[var(--cyan-glow)]/10">0{i + 1}</span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon)]/30 to-[var(--cyan-glow)]/20 flex items-center justify-center mb-4 text-[var(--cyan-glow)]">
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
