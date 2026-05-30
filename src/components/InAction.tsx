import { MapPin, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";
import img1 from "@/assets/gallery-kulithalai-1.jpg";
import img2 from "@/assets/gallery-college-1.jpg";
import img3 from "@/assets/gallery-community-1.jpg";

type GalleryItem = {
  image: string;
  school: string;
  date: string;
  description: string;
};

const items: GalleryItem[] = [
  {
    image: img1,
    school: "Government Higher Secondary School – Kulithalai",
    date: "June 2026",
    description:
      "Cyber safety awareness session for students covering OTP scams, WhatsApp scams and password safety.",
  },
  {
    image: img2,
    school: "Bharathidasan Arts & Science College",
    date: "May 2026",
    description:
      "Hands-on workshop on phishing detection, secure browsing and social engineering defence for final-year students.",
  },
  {
    image: img3,
    school: "Kulithalai Community Hall",
    date: "April 2026",
    description:
      "Public seminar for parents and senior citizens on UPI fraud, fake call centres and digital arrest scams.",
  },
];

export function InAction() {
  const { lang } = useI18n();
  return (
    <Section
      id="in-action"
      eyebrow={lang === "ta" ? "களப்பணி" : "On the ground"}
      title={lang === "ta" ? "CyberShield செயல்பாட்டில்" : "CyberShield in Action"}
      subtitle={
        lang === "ta"
          ? "எங்கள் கடந்த விழிப்புணர்வு அமர்வுகளிலிருந்து புகைப்படங்கள்."
          : "Photos from our past awareness sessions across Tamil Nadu."
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <article
            key={it.school + it.date}
            className="glass rounded-2xl overflow-hidden glow-hover group transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={it.image}
                alt={`CyberShield session at ${it.school}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-background/70 text-[var(--cyan-glow)] border border-[var(--cyan-glow)]/30">
                <Calendar className="w-3 h-3" />
                {it.date}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-base leading-snug mb-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-[var(--cyan-glow)] shrink-0" />
                <span>{it.school}</span>
              </h3>
              <p className="text-sm text-muted-foreground">{it.description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
