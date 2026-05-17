import { useState } from "react";
import { Award, Brain, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

const questions = [
  { q: "Your bank texts: 'Click here to update KYC: sbi-update.xyz/login'", a: "scam" },
  { q: "Friend's WhatsApp DP changes & asks for ₹5000 urgently.", a: "scam" },
  { q: "Amazon order page shows https://www.amazon.in/orders", a: "safe" },
  { q: "Unknown caller: 'You won a lottery, pay GST first.'", a: "scam" },
  { q: "App downloaded via Google Play Store with 4.5★ rating.", a: "safe" },
];

export function Quiz() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const done = idx >= questions.length;

  const answer = (a: "safe" | "scam") => {
    if (feedback) return;
    const correct = a === questions[idx].a;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      setIdx((i) => i + 1);
    }, 900);
  };

  const reset = () => { setIdx(0); setScore(0); setFeedback(null); };
  const pct = (idx / questions.length) * 100;

  return (
    <Section id="quiz" eyebrow="Test yourself" title={t("quiz_title")} subtitle={t("quiz_sub")}>
      <div className="glass-strong rounded-3xl p-8 max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--neon)]/20 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Brain className="w-4 h-4" /> Question {Math.min(idx + 1, questions.length)}/{questions.length}</div>
            <div className="flex items-center gap-2 font-mono"><Sparkles className="w-4 h-4 text-[var(--cyan-glow)]" /> {score} pts</div>
          </div>
          <div className="h-1.5 rounded-full bg-background/60 mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] transition-all" style={{ width: `${done ? 100 : pct}%` }} />
          </div>

          {!done ? (
            <>
              <div className="min-h-[120px] flex items-center justify-center text-center">
                <p className="font-display text-2xl font-bold leading-snug">{questions[idx].q}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button onClick={() => answer("safe")} disabled={!!feedback} className="py-4 rounded-xl glass hover:glow-border font-semibold text-[var(--success)] text-lg disabled:opacity-50">
                  ✓ Safe
                </button>
                <button onClick={() => answer("scam")} disabled={!!feedback} className="py-4 rounded-xl glass hover:glow-border font-semibold text-destructive text-lg disabled:opacity-50">
                  ⚠ Scam
                </button>
              </div>
              {feedback && (
                <div className={`mt-4 text-center font-semibold flex items-center justify-center gap-2 fade-up ${feedback === "correct" ? "text-[var(--success)]" : "text-destructive"}`}>
                  {feedback === "correct" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  {feedback === "correct" ? "Spot on!" : "Stay sharper next time."}
                </div>
              )}
            </>
          ) : (
            <div className="text-center fade-up">
              <Award className="w-16 h-16 text-[var(--cyan-glow)] mx-auto mb-3 pulse-glow rounded-full p-2" />
              <h3 className="font-display text-3xl font-bold mb-2">You scored {score}/{questions.length}</h3>
              <p className="text-muted-foreground mb-6">{score >= 4 ? "Cyber Sentinel badge unlocked 🛡️" : "Keep training to earn the Sentinel badge."}</p>
              <button onClick={reset} className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold glow-hover">
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
