import { CalendarPlus, CameraOff } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

export function InAction() {
  const { lang } = useI18n();
  return (
    <Section
      id="in-action"
      eyebrow={lang === "ta" ? "களப்பணி" : "On the ground"}
      title={lang === "ta" ? "CyberShield செயல்பாட்டில்" : "CyberShield in Action"}
      subtitle={
        lang === "ta"
          ? "விரைவில் வரும் விழிப்புணர்வு அமர்வுகளிலிருந்து நிஜப் புகைப்படங்கள்."
          : "Real photos from upcoming awareness sessions."
      }
    >
      <div className="glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center glow-hover border border-[var(--cyan-glow)]/20">
        <div className="mx-auto w-16 h-16 rounded-full bg-[var(--cyan-glow)]/10 flex items-center justify-center mb-6">
          <CameraOff className="w-8 h-8 text-[var(--cyan-glow)]" />
        </div>
        <h3 className="font-display font-bold text-xl md:text-2xl mb-4">
          {lang === "ta"
            ? "CyberShield விழிப்புணர்வு அமர்வுகள் விரைவில்"
            : "CyberShield awareness sessions coming soon."}
        </h3>
        <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {lang === "ta"
            ? "எங்கள் வரவிருக்கும் பள்ளி மற்றும் கல்லூரி விழிப்புணர்வு நிகழ்ச்சிகளின் நிஜப் புகைப்படங்களை இங்கே பகிர்வோம்."
            : "We'll be sharing real photos from our upcoming school and college awareness programs here."}
        </p>
        <a
          href="mailto:Cybershield0323@gmail.com?subject=Book%20Awareness%20Session"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] font-semibold border border-[var(--cyan-glow)]/30 hover:bg-[var(--cyan-glow)]/25 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <CalendarPlus className="w-5 h-5" />
          {lang === "ta"
            ? "விழிப்புணர்வு அமர்வை முன்பதிவு செய்யுங்கள்"
            : "Book an Awareness Session"}
        </a>
      </div>
    </Section>
  );
}
