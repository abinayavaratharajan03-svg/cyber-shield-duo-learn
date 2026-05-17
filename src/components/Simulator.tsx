import { useState } from "react";
import { MessageCircle, KeyRound, Link2, Instagram, QrCode, Banknote, AlertOctagon, CheckCircle2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

type Sim = { id: string; icon: typeof MessageCircle; title: string; popup: string; tip: string };

const sims: Sim[] = [
  { id: "wa", icon: MessageCircle, title: "Fake WhatsApp", popup: "“Hi Mom, I lost my phone. Send ₹15,000 to this new UPI urgently.”", tip: "Always call the person on their original number before sending money." },
  { id: "otp", icon: KeyRound, title: "OTP Scam", popup: "“Bank Officer: Share OTP to reverse the fraudulent ₹40,000 charge.”", tip: "Banks NEVER ask for OTP. Hang up immediately." },
  { id: "link", icon: Link2, title: "Fake Bank Link", popup: "“Your KYC will expire today. Update here: sb1-verify.in/login”", tip: "Check the URL — real banks use their official .com / .in domain only." },
  { id: "ig", icon: Instagram, title: "Instagram Hack", popup: "“Vote for me in this contest — login here to support!”", tip: "Never log in through a third-party link. Use the official app." },
  { id: "qr", icon: QrCode, title: "QR Scam", popup: "“Scan this QR to RECEIVE your refund of ₹5,000.”", tip: "Scanning a QR can only SEND money, never receive it." },
  { id: "loan", icon: Banknote, title: "Loan App", popup: "“Instant ₹50,000 loan, no documents. Just allow contacts access.”", tip: "Unregulated loan apps blackmail using your contacts. Only use RBI-approved apps." },
];

export function Simulator() {
  const { t } = useI18n();
  const [active, setActive] = useState<Sim | null>(null);
  const [result, setResult] = useState<"safe" | "scam" | null>(null);

  return (
    <Section id="simulator" eyebrow="Hands-on training" title={t("sim_title")} subtitle={t("sim_sub")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sims.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActive(s); setResult(null); }}
            className="text-left glass rounded-2xl p-6 glow-hover group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--neon)]/10 blur-2xl group-hover:bg-[var(--cyan-glow)]/20 transition-colors" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 text-[var(--cyan-glow)]">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">Live realistic popup • Safe or Scam choice</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-[var(--cyan-glow)]">Launch simulation →</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 fade-up" onClick={() => setActive(null)}>
          <div className="glass-strong rounded-3xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--neon)]/20 text-[var(--neon)] flex items-center justify-center">
                <active.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold">{active.title}</div>
                <div className="text-xs text-muted-foreground font-mono">incoming message</div>
              </div>
            </div>

            <div className="rounded-xl bg-background/60 border border-border p-4 text-sm leading-relaxed">
              {active.popup}
            </div>

            {!result ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => setResult("safe")} className="py-3 rounded-lg glass hover:glow-border font-semibold text-[var(--success)]">
                  ✓ Safe
                </button>
                <button onClick={() => setResult("scam")} className="py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold">
                  ⚠ Scam
                </button>
              </div>
            ) : (
              <div className={`mt-5 p-4 rounded-xl fade-up ${result === "scam" ? "bg-[var(--success)]/15 border border-[var(--success)]/40" : "bg-destructive/15 border border-destructive/40"}`}>
                <div className="flex items-center gap-2 font-semibold mb-2">
                  {result === "scam" ? <><CheckCircle2 className="w-5 h-5 text-[var(--success)]" /> Correct — that's a scam!</> : <><AlertOctagon className="w-5 h-5 text-destructive" /> Careful — this was a scam!</>}
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Prevention tip:</span> {active.tip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
