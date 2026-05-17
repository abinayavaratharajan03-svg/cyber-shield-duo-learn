import { Shield, Lock, Zap, ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t, lang } = useI18n();
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />

      {/* floating particles */}
      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className="particle absolute w-1 h-1 rounded-full bg-[var(--cyan-glow)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.4}s`,
            boxShadow: "0 0 8px var(--cyan-glow)",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3 text-[var(--cyan-glow)]" />
              <span>India's #1 Cyber Awareness Platform</span>
            </div>

            <h1 className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("hero_tag").split(" ").map((w, i) => (
                <span key={i} className={i === 1 || i === 2 ? "text-gradient" : ""}>
                  {w}{" "}
                </span>
              ))}
            </h1>

            <p className={`mt-6 text-xl text-foreground/90 font-medium ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("hero_mission")}
            </p>
            <p className={`mt-3 text-base text-muted-foreground max-w-xl ${lang === "ta" ? "font-tamil" : ""}`}>
              {t("hero_sub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#simulator" className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold glow-hover">
                {t("cta_sim")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#awareness" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass font-semibold hover:glow-border transition-all">
                <Zap className="w-4 h-4 text-[var(--cyan-glow)]" />
                {t("cta_learn")}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <Stat n="50K+" l="Users Protected" />
              <Stat n="1.2K" l="Scams Reported" />
              <Stat n="98%" l="Quiz Pass Rate" />
            </div>
          </div>

          {/* Shield illustration */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="shield-ring w-[420px] h-[420px] rounded-full border border-dashed border-[var(--cyan-glow)]/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="shield-ring w-[320px] h-[320px] rounded-full border border-[var(--neon)]/30" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
            </div>

            <div className="relative w-64 h-64 rounded-3xl glass-strong flex items-center justify-center pulse-glow scan-line overflow-hidden">
              <Shield className="w-32 h-32 text-[var(--cyan-glow)]" strokeWidth={1.2} />
              <Lock className="absolute w-10 h-10 text-foreground" strokeWidth={2} />
            </div>

            {/* orbiting badges */}
            <FloatBadge label="OTP Safe" cls="top-8 right-8" />
            <FloatBadge label="2FA" cls="bottom-12 left-4" />
            <FloatBadge label="SSL ✓" cls="top-24 left-2" />
            <FloatBadge label="Verified" cls="bottom-20 right-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-gradient">{n}</div>
      <div>{l}</div>
    </div>
  );
}

function FloatBadge({ label, cls }: { label: string; cls: string }) {
  return (
    <div className={`absolute ${cls} glass px-3 py-1.5 rounded-full text-xs font-mono font-semibold particle`}>
      {label}
    </div>
  );
}
