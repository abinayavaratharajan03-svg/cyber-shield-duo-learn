import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Simulator } from "@/components/Simulator";
import { Awareness } from "@/components/Awareness";
import { AvoidScams } from "@/components/AvoidScams";
import { Quiz } from "@/components/Quiz";
import { Report } from "@/components/Report";
import { Training } from "@/components/Training";
import { InAction } from "@/components/InAction";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberShield — Think Before You Click | Cyber Awareness Platform" },
      { name: "description", content: "CyberShield: India's bilingual (Tamil & English) cyber security awareness platform. Scam simulator, training, quiz and real-time threat intel." },
      { property: "og:title", content: "CyberShield — Think Before You Click" },
      { property: "og:description", content: "Making cyber safety simple for everyone. Tamil & English." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen bg-background text-foreground relative overflow-x-clip">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Simulator />
            <Awareness />
            <AvoidScams />
            <Quiz />
            <Report />
            <Training />
            <InAction />
            <Contact />
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
