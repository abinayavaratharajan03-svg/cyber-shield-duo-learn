import { Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/40 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--neon)] to-[var(--cyan-glow)] flex items-center justify-center">
              <Shield className="w-5 h-5 text-background" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg">Cyber<span className="text-gradient">Shield</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">{t("footer_tag")}</p>
        </div>
        <div>
          <div className="font-display font-bold mb-3">Quick links</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-foreground">About</a></li>
            <li><a href="#simulator" className="hover:text-foreground">Simulator</a></li>
            <li><a href="#quiz" className="hover:text-foreground">Quiz</a></li>
            <li><a href="#report" className="hover:text-foreground">Report</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-bold mb-3">Legal</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground">Privacy Policy</a></li>
            <li><a className="hover:text-foreground">Terms & Conditions</a></li>
            <li><a className="hover:text-foreground">Cookie Settings</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CyberShield · Made in Tamil Nadu · All rights reserved
      </div>
    </footer>
  );
}
