import { Mic, Truck, Newspaper, ShieldAlert, TrendingUp, Activity } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

const alerts = [
  { icon: Mic, tag: "AI VOICE", title: "Deepfake voice scams up 340%", body: "Scammers clone family voices using 3-sec audio from Instagram." },
  { icon: Truck, tag: "DELIVERY", title: "Fake courier OTP requests", body: '"Address not clear, share OTP to redeliver" — never share OTP with delivery agents.' },
  { icon: Newspaper, tag: "NEWS", title: "Chennai woman loses ₹8L to job scam", body: "Work-from-home Telegram task scam. Verify before paying any 'registration fee'." },
  { icon: ShieldAlert, tag: "TREND", title: "Digital arrest scam in Coimbatore", body: "Fake CBI calls demanding payment to 'clear charges'. Police never arrest over video call." },
];

const bars = [
  { label: "UPI Fraud", v: 82, color: "var(--neon)" },
  { label: "OTP Scams", v: 76, color: "var(--cyan-glow)" },
  { label: "Fake Jobs", v: 61, color: "var(--warning)" },
  { label: "Loan Apps", v: 54, color: "var(--success)" },
  { label: "QR Tricks", v: 43, color: "var(--neon)" },
];

export function Awareness() {
  const { t } = useI18n();
  return (
    <Section id="awareness" eyebrow="Live intel" title={t("aware_title")} subtitle={t("aware_sub")}>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
          {alerts.map((a) => (
            <div key={a.title} className="glass rounded-2xl p-5 glow-hover">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded bg-[var(--neon)]/15 text-[var(--neon)]">{a.tag}</span>
                <a.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-display font-bold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-[var(--cyan-glow)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Top scams · TN</span>
          </div>
          <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
            Threat Index
            <TrendingUp className="w-4 h-4 text-[var(--success)]" />
          </h3>
          <div className="space-y-4">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">{b.label}</span>
                  <span className="font-mono text-muted-foreground">{b.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-background/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${b.v}%`, background: `linear-gradient(90deg, ${b.color}, var(--cyan-glow))`, boxShadow: `0 0 12px ${b.color}` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[var(--cyan-glow)]/20 blur-3xl" />
        </div>
      </div>
    </Section>
  );
}
