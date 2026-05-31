import { useState } from "react";
import { School, GraduationCap, Briefcase, Clock, Languages, MonitorSmartphone, ShieldAlert, Brain, MessagesSquare, CheckCircle2, Phone, Mail, CalendarPlus, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useServerFn } from "@tanstack/react-start";
import { submitBooking } from "@/lib/cybershield.functions";

type Program = {
  icon: typeof School;
  title: string;
  body: string;
  meta: string;
  badge: "Free" | "Sponsored" | "Paid";
  description: string;
  whatHappens: string[];
  topics: string[];
  audience: string;
  duration: string;
  mode: string;
};

const programs: Program[] = [
  {
    icon: School,
    title: "School Workshops",
    body: "Class 6–12 modules with games, comics & Tamil-medium support.",
    meta: "200+ schools",
    badge: "Free",
    description:
      "Interactive 60–90 minute awareness workshops for school students delivered in Tamil and English with real scam stories, comics, and live demos.",
    whatHappens: [
      "Live walkthrough of real OTP, WhatsApp & gaming scams",
      "Comic-strip storytelling that students remember",
      "Hands-on demo: how a phishing link actually works",
      "Tamil-medium explanations + English vocabulary",
    ],
    topics: [
      "OTP & UPI fraud",
      "WhatsApp & Instagram scams",
      "Password & screen-lock hygiene",
      "Cyberbullying & reporting",
      "Safe gaming & app downloads",
    ],
    audience: "Students Class 6 to 12 (any board)",
    duration: "60–90 minutes per session",
    mode: "Offline (preferred) / Online",
  },
  {
    icon: GraduationCap,
    title: "College Seminars",
    body: "Bug bounty intro, social-engineering labs, career path talks.",
    meta: "Half / full day",
    badge: "Sponsored",
    description:
      "Half-day or full-day seminars for engineering, arts & science colleges that mix cyber awareness with cybersecurity career guidance.",
    whatHappens: [
      "Social-engineering live demo with student volunteers",
      "Bug-bounty & ethical-hacking career roadmap",
      "Resume + LinkedIn review for cyber roles",
      "Open Q&A with the trainer",
    ],
    topics: [
      "Phishing & social engineering",
      "Account takeover & 2FA",
      "Public Wi-Fi & VPN basics",
      "Bug bounty platforms (HackerOne, Bugcrowd)",
      "Careers in SOC, GRC, pentesting",
    ],
    audience: "UG & PG college students, faculty",
    duration: "Half day (3 hrs) or Full day (6 hrs)",
    mode: "Offline / Online",
  },
  {
    icon: Briefcase,
    title: "Business Awareness",
    body: "Phishing drills, SOC basics, incident response for SMB teams.",
    meta: "Monthly cohort",
    badge: "Paid",
    description:
      "Practical cyber awareness for small & medium business teams — phishing drills, basic SOC concepts, and an incident-response playbook tailored to your company.",
    whatHappens: [
      "Custom phishing simulation against your team",
      "Walkthrough of last week's real attacks on Indian SMBs",
      "Incident-response tabletop exercise",
      "Take-home checklist for owners & admins",
    ],
    topics: [
      "Business email compromise (BEC)",
      "Ransomware readiness",
      "Endpoint & password manager hygiene",
      "Data backup & recovery",
      "Basic SOC & log monitoring",
    ],
    audience: "Founders, ops teams, HR, finance, IT admins",
    duration: "Half day (3 hrs)",
    mode: "Offline / Online",
  },
];

export function Training() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<Program | null>(null);
  const [bookingFor, setBookingFor] = useState<Program | null>(null);

  return (
    <Section id="training" eyebrow="Learn the craft" title={t("train_title")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((p) => (
          <button
            key={p.title}
            onClick={() => setSelected(p)}
            className="text-left glass rounded-2xl overflow-hidden glow-hover group focus:outline-none focus:ring-2 focus:ring-[var(--cyan-glow)]"
          >
            <div className="aspect-[4/3] relative grid-bg flex items-center justify-center bg-gradient-to-br from-[var(--neon)]/20 to-[var(--cyan-glow)]/10">
              <p.icon className="w-16 h-16 text-[var(--cyan-glow)] drop-shadow-[0_0_20px_var(--cyan-glow)]" strokeWidth={1.3} />
              <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded bg-background/70">{p.meta}</span>
              <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded ${
                p.badge === "Free"
                  ? "bg-[var(--success)]/20 text-[var(--success)]"
                  : p.badge === "Sponsored"
                  ? "bg-[var(--cyan-glow)]/20 text-[var(--cyan-glow)]"
                  : "bg-[var(--neon)]/20 text-[var(--neon)]"
              }`}>
                {p.badge}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.body}</p>
              <span className="text-xs font-semibold text-[var(--cyan-glow)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View session details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <ProgramDialog
        program={selected}
        onClose={() => setSelected(null)}
        onBook={(p) => {
          setSelected(null);
          setBookingFor(p);
        }}
      />
      <BookingDialog program={bookingFor} onClose={() => setBookingFor(null)} />
    </Section>
  );
}

function ProgramDialog({
  program,
  onClose,
  onBook,
}: {
  program: Program | null;
  onClose: () => void;
  onBook: (p: Program) => void;
}) {
  if (!program) return null;
  const Icon = program.icon;

  return (
    <Dialog open={!!program} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl glass-strong border-[var(--cyan-glow)]/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-xl bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-mono px-2 py-1 rounded ${
              program.badge === "Free"
                ? "bg-[var(--success)]/20 text-[var(--success)]"
                : program.badge === "Sponsored"
                ? "bg-[var(--cyan-glow)]/20 text-[var(--cyan-glow)]"
                : "bg-[var(--neon)]/20 text-[var(--neon)]"
            }`}>{program.badge}</span>
          </div>
          <DialogTitle className="font-display text-2xl">{program.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">{program.description}</DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <Meta icon={Clock} label="Duration" value={program.duration} />
          <Meta icon={Languages} label="Language" value="Tamil + English" />
          <Meta icon={MonitorSmartphone} label="Mode" value={program.mode} />
          <Meta icon={ShieldAlert} label="Audience" value={program.audience} />
        </div>

        <div className="space-y-4">
          <Block title="What happens during the session">
            <ul className="space-y-1.5">
              {program.whatHappens.map((w) => (
                <li key={w} className="flex gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[var(--cyan-glow)] shrink-0 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Topics covered">
            <div className="flex flex-wrap gap-2">
              {program.topics.map((tp) => (
                <span key={tp} className="text-xs px-2.5 py-1 rounded-full glass border border-[var(--cyan-glow)]/20">{tp}</span>
              ))}
            </div>
          </Block>
          <div className="grid sm:grid-cols-3 gap-2">
            <Pill icon={ShieldAlert} label="Real scam examples" />
            <Pill icon={Brain} label="Interactive quiz" />
            <Pill icon={MessagesSquare} label="Q&A session" />
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-border/40">
          <p className="text-sm text-muted-foreground mb-3">Interested in hosting this session?</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => onBook(program)}
              className="py-3 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-bold inline-flex items-center justify-center gap-2 glow-hover"
            >
              <CalendarPlus className="w-4 h-4" /> Book Awareness Session
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="py-3 rounded-xl glass border border-[var(--cyan-glow)]/30 text-[var(--cyan-glow)] font-semibold inline-flex items-center justify-center gap-2 glow-hover"
            >
              <Mail className="w-4 h-4" /> Contact CyberShield
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-semibold text-sm truncate">{value}</div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-[var(--cyan-glow)] font-mono mb-2">{title}</h4>
      {children}
    </div>
  );
}

function Pill({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
      <Icon className="w-4 h-4 text-[var(--cyan-glow)]" />
      <span className="font-medium">{label}</span>
    </div>
  );
}

function BookingDialog({ program, onClose }: { program: Program | null; onClose: () => void }) {
  const book = useServerFn(submitBooking);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    institution: "",
    phone: "",
    email: "",
    num_students: "",
    preferred_date: "",
    message: "",
  });

  if (!program) return null;

  const reset = () => {
    setForm({ full_name: "", institution: "", phone: "", email: "", num_students: "", preferred_date: "", message: "" });
    setDone(false);
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await book({
        data: {
          program: program.title,
          full_name: form.full_name,
          institution: form.institution,
          phone: form.phone,
          email: form.email,
          num_students: form.num_students ? Number(form.num_students) : null,
          preferred_date: form.preferred_date || null,
          message: form.message || null,
        },
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={!!program}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setTimeout(reset, 300);
        }
      }}
    >
      <DialogContent className="max-w-xl glass-strong border-[var(--cyan-glow)]/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book Awareness Session</DialogTitle>
          <DialogDescription>
            {program.title} — fill in your details and we'll get back within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="text-center py-8">
            <div className="mx-auto w-14 h-14 rounded-full bg-[var(--success)]/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Thank you for contacting CyberShield.</h3>
            <p className="text-muted-foreground">We'll get back to you soon.</p>
            <button
              onClick={() => { onClose(); setTimeout(reset, 300); }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[var(--cyan-glow)]/15 text-[var(--cyan-glow)] font-semibold border border-[var(--cyan-glow)]/30"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3 mt-2">
            <Field label="Full Name" required value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} placeholder="Your full name" />
            <Field label="School / College Name" required value={form.institution} onChange={(v) => setForm({ ...form, institution: v })} placeholder="Institution name" />
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Phone Number" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 ..." />
              <Field label="Email" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Number of Students" type="number" value={form.num_students} onChange={(v) => setForm({ ...form, num_students: v })} placeholder="e.g. 120" />
              <Field label="Preferred Session Date" type="date" value={form.preferred_date} onChange={(v) => setForm({ ...form, preferred_date: v })} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Anything else we should know?"
                className="mt-1 w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] focus:shadow-[0_0_0_3px_hsl(var(--cyan-glow)/0.15)] resize-none transition"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-bold inline-flex items-center justify-center gap-2 glow-hover disabled:opacity-60"
            >
              <CalendarPlus className="w-4 h-4" /> {submitting ? "Submitting..." : "Book Awareness Session"}
            </button>

            <div className="flex items-center justify-center gap-4 pt-3 text-xs text-muted-foreground">
              <a href="tel:+919629661715" className="inline-flex items-center gap-1 hover:text-[var(--cyan-glow)]">
                <Phone className="w-3.5 h-3.5" /> 9629661715
              </a>
              <span>•</span>
              <a href="mailto:cybershield0323@gmail.com" className="inline-flex items-center gap-1 hover:text-[var(--cyan-glow)]">
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-background/60 rounded-lg px-4 py-3 border border-border focus:outline-none focus:border-[var(--cyan-glow)] focus:shadow-[0_0_0_3px_hsl(var(--cyan-glow)/0.15)] transition"
      />
    </div>
  );
}
