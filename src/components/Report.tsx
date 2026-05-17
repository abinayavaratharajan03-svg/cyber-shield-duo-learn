import { Upload, Globe, Phone, MessageSquare, Lock, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

const channels = [
  { icon: Upload, label: "Upload screenshot" },
  { icon: Globe, label: "Report fake website" },
  { icon: Phone, label: "Submit scam number" },
  { icon: MessageSquare, label: "Suspicious message" },
];

export function Report() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return (
    <Section id="report" eyebrow="Help others stay safe" title={t("report_title")} subtitle={t("report_sub")}>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4">
          {channels.map((c) => (
            <button key={c.label} className="glass rounded-2xl p-6 glow-hover text-left">
              <div className="w-11 h-11 rounded-xl bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] flex items-center justify-center mb-3">
                <c.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold">{c.label}</div>
              <div className="text-xs text-muted-foreground mt-1">Anonymous & encrypted</div>
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="glass-strong rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Lock className="w-3 h-3" /> End-to-end encrypted submission</div>
          <input className="w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] transition-colors" placeholder="Scam type (e.g. UPI / Phishing / Job)" />
          <input className="w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)]" placeholder="Phone / URL / Handle involved" />
          <textarea rows={4} className="w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] resize-none" placeholder="Describe what happened…" />
          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold inline-flex items-center justify-center gap-2 glow-hover">
            <Send className="w-4 h-4" /> {sent ? "Report received — thank you" : "Submit secure report"}
          </button>
        </form>
      </div>
    </Section>
  );
}
