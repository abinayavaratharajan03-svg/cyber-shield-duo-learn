import { Mail, MessageCircle, Instagram, Phone, MapPin, Send, User, Shield } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/cybershield-logo.webp";

const PHONE = "9629661715";
const WA_NUMBER = "919629661715";
const EMAIL = "Cybershield0323@gmail.com";
const INSTA = "cybershield03";

const details = [
  { icon: User, label: "Founder", value: "Abinaya — Founder & Security Trainer" },
  { icon: Phone, label: "Phone", value: PHONE, href: `tel:+91${PHONE}` },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Instagram, label: "Instagram", value: `@${INSTA}`, href: `https://instagram.com/${INSTA}` },
  { icon: MapPin, label: "Location", value: "Kulithalai, Tamil Nadu, India" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("CyberShield enquiry from " + form.name)}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[oklch(0.18_0.05_250)]/40 to-background" />
      <div className="absolute inset-0 -z-10 opacity-30 [background:radial-gradient(circle_at_20%_30%,var(--cyan-glow)/15,transparent_45%),radial-gradient(circle_at_80%_70%,var(--neon)/15,transparent_45%)]" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--cyan-glow)] mb-3">
            <span className="w-8 h-px bg-[var(--cyan-glow)]" />
            Communication Center
            <span className="w-8 h-px bg-[var(--cyan-glow)]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            CyberShield <span className="text-gradient">Communication Center</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Need cyber awareness training, workshops, or collaboration? Reach out to CyberShield.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="glass-strong rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--cyan-glow)]/10 blur-3xl" />
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="CyberShield logo"
                className="w-20 h-20 rounded-2xl object-cover ring-1 ring-[var(--cyan-glow)]/40 shadow-[0_0_30px_hsl(var(--cyan-glow)/0.35)]"
              />
              <div>
                <div className="font-display font-bold text-2xl">CyberShield</div>
                <div className="text-xs uppercase tracking-widest text-[var(--cyan-glow)]">Secure · Defend · Protect</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Need cyber awareness training, workshops, or collaboration? Reach out to CyberShield.
            </p>

            <div className="space-y-3 mb-6">
              {details.map((d) => {
                const Inner = (
                  <div className="glass rounded-xl p-4 flex items-center gap-4 glow-hover transition">
                    <div className="w-11 h-11 rounded-lg bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] flex items-center justify-center shrink-0">
                      <d.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{d.label}</div>
                      <div className="font-semibold truncate">{d.value}</div>
                    </div>
                  </div>
                );
                return d.href ? (
                  <a key={d.label} href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {Inner}
                  </a>
                ) : (
                  <div key={d.label}>{Inner}</div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold glow-hover"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold glow-hover"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
              <a
                href={`https://instagram.com/${INSTA}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white font-semibold glow-hover"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 sm:p-10 space-y-4 relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[var(--neon)]/10 blur-3xl" />
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-[var(--cyan-glow)]" />
              <h3 className="font-display font-bold text-2xl">Send a Message</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">We typically respond within 24 hours.</p>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] focus:shadow-[0_0_0_3px_hsl(var(--cyan-glow)/0.15)] transition"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] focus:shadow-[0_0_0_3px_hsl(var(--cyan-glow)/0.15)] transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] focus:shadow-[0_0_0_3px_hsl(var(--cyan-glow)/0.15)] resize-none transition"
                placeholder="Tell us about your training, workshop, or collaboration needs..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-bold inline-flex items-center justify-center gap-2 glow-hover"
            >
              <Send className="w-4 h-4" /> {sent ? "Opening your email..." : "Submit Message"}
            </button>

            <div className="pt-4 text-center text-xs text-muted-foreground border-t border-border/40">
              Protecting People from Digital Threats
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
