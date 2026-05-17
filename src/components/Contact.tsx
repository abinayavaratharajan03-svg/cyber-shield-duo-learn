import { Mail, MessageCircle, Instagram, Linkedin, Phone, MapPin, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

const channels = [
  { icon: Mail, label: "Email", value: "hello@cybershield.in" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210" },
  { icon: Phone, label: "Helpline", value: "1800-CYBER-IN" },
  { icon: MapPin, label: "Office", value: "Tidel Park, Chennai" },
];

export function Contact() {
  const { t } = useI18n();
  return (
    <Section id="contact" eyebrow="Get in touch" title={t("contact_title")}>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {channels.map((c) => (
            <div key={c.label} className="glass rounded-xl p-4 flex items-center gap-4 glow-hover">
              <div className="w-11 h-11 rounded-lg bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] flex items-center justify-center">
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                <div className="font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <a className="w-11 h-11 rounded-lg glass flex items-center justify-center hover:glow-border" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a className="w-11 h-11 rounded-lg glass flex items-center justify-center hover:glow-border" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            <a className="w-11 h-11 rounded-lg glass flex items-center justify-center hover:glow-border" aria-label="WhatsApp"><MessageCircle className="w-5 h-5" /></a>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-3 glass-strong rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)]" placeholder="Your name" />
            <input className="bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)]" placeholder="Email" type="email" />
          </div>
          <input className="w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)]" placeholder="Subject" />
          <textarea rows={5} className="w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] resize-none" placeholder="How can we help?" />
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold inline-flex items-center justify-center gap-2 glow-hover">
            <Send className="w-4 h-4" /> Send message
          </button>
        </form>
      </div>
    </Section>
  );
}
