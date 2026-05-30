import { Moon, Sun, Languages, Menu, X } from "lucide-react";
import logo from "@/assets/cybershield-logo.webp";
import { useState } from "react";
import { useI18n, type DictKey } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const links: { key: DictKey; href: string }[] = [
  { key: "nav_home", href: "#home" },
  { key: "nav_about", href: "#about" },
  { key: "nav_sim", href: "#simulator" },
  { key: "nav_aware", href: "#awareness" },
  { key: "nav_training", href: "#training" },
  { key: "nav_report", href: "#report" },
  { key: "nav_quiz", href: "#quiz" },
  { key: "nav_contact", href: "#contact" },
];

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass-strong border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 group">
            <img src={logo} alt="CyberShield" className="w-9 h-9 rounded-lg object-cover ring-1 ring-[var(--cyan-glow)]/40 pulse-glow" />
            <span className="font-display font-bold text-lg tracking-tight">
              Cyber<span className="text-gradient">Shield</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/40 transition-colors"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold glass hover:glow-border transition-all"
              aria-label="Switch language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className={lang === "ta" ? "text-gradient" : ""}>தமிழ்</span>
              <span className="text-muted-foreground">|</span>
              <span className={lang === "en" ? "text-gradient" : ""}>EN</span>
            </button>

            <button
              onClick={toggle}
              className="w-9 h-9 rounded-md glass hover:glow-border flex items-center justify-center transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="hidden sm:inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background text-sm font-semibold glow-hover">
              {t("login")}
            </button>

            <button onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 rounded-md glass flex items-center justify-center">
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border/40 px-4 py-3 grid grid-cols-2 gap-1 fade-up">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/40"
              >
                {t(l.key)}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
