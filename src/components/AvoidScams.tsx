import { useState } from "react";
import {
  KeyRound,
  Link2,
  ShieldCheck,
  FileX,
  LockKeyhole,
  CreditCard,
  X,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

interface CardDetail {
  icon: React.ElementType;
  title: string;
  body: string;
  explanation: string;
  whyImportant: string;
  realExample: string;
  commonMistakes: string[];
  checklist: string[];
  quickTips: string[];
}

const cardDetails: CardDetail[] = [
  {
    icon: KeyRound,
    title: "Never Share OTP",
    body: "Not with bank, police, courier, or family. Period.",
    explanation:
      "Banks, UPI apps, delivery services, and government agencies never ask for OTP over phone calls, WhatsApp, or SMS. An OTP (One-Time Password) is the final security gate to your accounts. Once shared, scammers can drain your bank account, make unauthorized purchases, or take over your digital identity within seconds.",
    whyImportant:
      "Your OTP is a digital key. Sharing it is like handing over the keys to your house to a stranger. Scammers use urgency and fear to bypass your natural caution. In 2024, OTP-related scams accounted for over 40% of all digital fraud in India, with victims losing anywhere from a few thousand to several lakhs within minutes.",
    realExample:
      "A Mumbai resident received a call from someone claiming to be from their bank's fraud department. The caller said there was suspicious activity and asked for the OTP just sent to 'block the transaction.' The victim shared the OTP. Within 5 minutes, ₹87,000 was transferred out of their account. The caller was a scammer using caller ID spoofing.",
    commonMistakes: [
      "Thinking bank officials legitimately ask for OTPs",
      "Sharing OTP with 'delivery agents' for package verification",
      "Entering OTP on websites sent via unknown links",
      "Giving OTP to family members who claim an 'emergency'",
    ],
    checklist: [
      "Never share OTP with anyone, ever",
      "Verify caller identity by hanging up and calling back on official numbers",
      "Contact your bank directly using the number on your card",
      "Report suspicious calls to your bank and cybercrime portal",
    ],
    quickTips: [
      "Treat OTPs like cash — never hand them over",
      "Banks will never ask for OTP over call/chat",
      "If someone is rushing you, it's probably a scam",
    ],
  },
  {
    icon: Link2,
    title: "Verify URLs",
    body: "Hover before you click. Look for HTTPS and the exact domain.",
    explanation:
      "Phishing links are designed to look exactly like real websites. Scammers register domains like 'paytm-secure.com' or 'amazon-verify.in' to trick you into entering credentials. Always check the full URL, look for HTTPS, and watch for subtle misspellings or extra characters in the domain name.",
    whyImportant:
      "One wrong click can install malware, steal your passwords, or compromise your entire device. Fake login pages are visually identical to real ones and can capture your username, password, and even 2FA codes in real-time. URL verification is your first line of defense against the vast majority of phishing attacks.",
    realExample:
      "A college student received an email about an 'Amazon order issue' with a link to 'amaz0n-support.in'. The page looked exactly like Amazon. They entered their login and card details. Within hours, multiple unauthorized transactions were made, and their Amazon account was used to purchase gift cards.",
    commonMistakes: [
      "Clicking links from unsolicited emails without checking",
      "Trusting URLs just because the page looks professional",
      "Ignoring subtle spelling differences in domain names",
      "Not checking for the padlock icon and HTTPS",
    ],
    checklist: [
      "Hover over links to preview the actual URL before clicking",
      "Type important URLs manually instead of clicking from messages",
      "Look for HTTPS and the correct domain spelling",
      "Use a browser extension that warns about known phishing sites",
    ],
    quickTips: [
      "When in doubt, don't click — go to the site directly",
      "Watch for 'paytm-money.com' vs 'paytm.com' — subtle differences matter",
      "Bookmark your banking sites and only use those bookmarks",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Enable 2FA",
    body: "Two-factor everywhere — UPI, email, social, banking.",
    explanation:
      "Two-Factor Authentication (2FA) adds a second layer of security beyond your password. Even if a scammer gets your password through a data breach or phishing, they cannot access your account without the second factor — usually a code from an authenticator app or a hardware security key.",
    whyImportant:
      "Passwords alone are no longer enough. Millions of passwords are leaked daily in data breaches. With 2FA enabled, your accounts remain secure even if your password is compromised. It's one of the most effective ways to prevent unauthorized access and is recommended by cybersecurity experts worldwide.",
    realExample:
      "A user's Facebook password was leaked in a data breach. Hackers tried logging in from another country. Because the user had enabled 2FA with an authenticator app, the hackers were blocked even with the correct password. Without 2FA, their account would have been taken over and used to scam their friends list.",
    commonMistakes: [
      "Using SMS-based 2FA instead of authenticator apps (SIM swap risk)",
      "Not enabling 2FA on email accounts (the master key to everything)",
      "Ignoring 2FA setup prompts from apps and services",
      "Not saving backup codes in a secure location",
    ],
    checklist: [
      "Enable app-based 2FA on all financial accounts",
      "Set up 2FA on your primary email account first",
      "Use an authenticator app like Google Authenticator or Authy",
      "Download and securely store backup recovery codes",
    ],
    quickTips: [
      "Authenticator apps are safer than SMS-based codes",
      "Your email is the master key — protect it with 2FA first",
      "Hardware keys like YubiKey offer the strongest protection",
    ],
  },
  {
    icon: FileX,
    title: "Avoid Unknown APKs",
    body: "Only install apps from Play Store or App Store.",
    explanation:
      "APK files from unknown sources can contain malware, spyware, ransomware, or banking trojans designed to steal your data. These malicious apps often mimic popular services like banking apps, games, or 'free' versions of paid software. Once installed, they can read your messages, capture your screen, and log your keystrokes.",
    whyImportant:
      "Sideloading apps bypasses the security checks that Google and Apple perform. In recent years, 'FakeApp' malware has surged in India, with scammers distributing malicious APKs through WhatsApp groups, Telegram channels, and SMS links. These apps can empty bank accounts, steal identity documents, and encrypt your phone for ransom.",
    realExample:
      "A user wanted to download a modified version of a popular game and found an APK online. After installation, the app requested accessibility permissions. Within days, the user's bank account was emptied through unauthorized UPI transactions. The app contained a banking trojan that intercepted all OTP messages.",
    commonMistakes: [
      "Installing APKs from WhatsApp or Telegram 'friends'",
      "Downloading 'cracked' or 'modded' versions of paid apps",
      "Granting unnecessary permissions during installation",
      "Not checking the app publisher name and review count",
    ],
    checklist: [
      "Only install apps from official Play Store or App Store",
      "Check app reviews, ratings, and download count before installing",
      "Verify the developer name matches the official company",
      "Never grant accessibility permissions to unknown apps",
    ],
    quickTips: [
      "If an app isn't on the Play Store, there's usually a reason",
      "'Free premium' apps are almost always malware in disguise",
      "Turn off 'Install from Unknown Sources' in your phone settings",
    ],
  },
  {
    icon: LockKeyhole,
    title: "Strong Passwords",
    body: "12+ chars, unique per site. Use a password manager.",
    explanation:
      "Weak passwords like '123456', 'password', or your birthdate can be cracked in seconds. Scammers use automated tools that try millions of password combinations per second. Using the same password across multiple sites means that if one site is breached, all your accounts are at risk.",
    whyImportant:
      "A strong, unique password for every account is the foundation of digital security. Password managers generate and store complex passwords so you don't have to remember them. Without unique passwords, a single data breach at a minor website can lead to your email, bank, and social media accounts all being compromised.",
    realExample:
      "A user reused the same password for their email, shopping, and banking accounts. When a small e-commerce site was breached, scammers obtained their credentials. They tried the same email-password combination on major banking sites and gained access, transferring out lakhs of rupees before the user noticed.",
    commonMistakes: [
      "Using the same password for multiple accounts",
      "Using personal information like birthdays or pet names",
      "Storing passwords in unencrypted notes or spreadsheets",
      "Not changing passwords after a known data breach",
    ],
    checklist: [
      "Use a password manager like Bitwarden, 1Password, or Dashlane",
      "Generate 16+ character random passwords for each account",
      "Enable password breach alerts in your browser or manager",
      "Change passwords immediately if a service reports a breach",
    ],
    quickTips: [
      "A password manager is the best cybersecurity investment you can make",
      "Use passphrases with 4+ random words for memorability",
      "Enable biometric unlock on your password manager for convenience",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Verification",
    body: "Confirm via call before any UPI 'refund' or 'request'.",
    explanation:
      "UPI scams often involve fake 'refund' requests where scammers ask you to 'approve a refund' through UPI, but the request actually transfers money TO them. 'Request money' scams are equally common — you receive a payment request disguised as a reward or refund. Always verify every payment transaction before entering your UPI PIN.",
    whyImportant:
      "UPI transactions are instant and usually irreversible. Once you enter your PIN, the money is gone. Scammers exploit trust by pretending to be customer service, delivery agents, or even friends. The golden rule is: you only enter your UPI PIN when YOU are sending money to someone you know and trust, never for 'receiving' money.",
    realExample:
      "A victim received a call from someone claiming to be from an e-commerce site, saying their recent order failed and a refund would be processed. The scammer sent a UPI 'collect request' for ₹5,000, claiming it was 'for verification' and would be refunded immediately. The victim entered their PIN to 'approve the refund' and lost ₹5,000 instantly.",
    commonMistakes: [
      "Entering UPI PIN to 'receive' money or refunds",
      "Approving collect requests from unknown numbers",
      "Not reading the full transaction details before confirming",
      "Trusting QR codes shared by strangers for payments",
    ],
    checklist: [
      "Only enter UPI PIN when YOU are actively sending money",
      "Reject all UPI collect requests from unknown sources",
      "Verify refund claims by contacting the company directly",
      "Double-check the recipient name before every transaction",
    ],
    quickTips: [
      "You NEVER need to enter a PIN to receive money — that's a scam",
      "Scan QR codes, don't let others scan YOUR QR to 'send' you money",
      "Always read the full amount and recipient name before confirming",
    ],
  },
];

export function AvoidScams() {
  const { t } = useI18n();
  const [activeCard, setActiveCard] = useState<CardDetail | null>(null);

  const openCard = (detail: CardDetail) => {
    setActiveCard(detail);
    document.body.style.overflow = "hidden";
  };

  const closeCard = () => {
    setActiveCard(null);
    document.body.style.overflow = "";
  };

  return (
    <Section id="avoid" eyebrow="Prevention playbook" title={t("avoid_title")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cardDetails.map((s, i) => (
          <button
            key={s.title}
            onClick={() => openCard(s)}
            className="glass rounded-2xl p-6 glow-hover relative overflow-hidden text-left cursor-pointer group"
          >
            <span className="absolute top-4 right-4 font-display text-5xl font-bold text-[var(--cyan-glow)]/10 group-hover:text-[var(--cyan-glow)]/20 transition-colors">
              0{i + 1}
            </span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon)]/30 to-[var(--cyan-glow)]/20 flex items-center justify-center mb-4 text-[var(--cyan-glow)] group-hover:from-[var(--neon)]/50 group-hover:to-[var(--cyan-glow)]/40 transition-all">
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 group-hover:text-[var(--cyan-glow)] transition-colors">
              {s.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{s.body}</p>
            <div className="flex items-center gap-1 text-xs font-medium text-[var(--cyan-glow)] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Learn more</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeCard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCard();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl border border-[var(--cyan-glow)]/30 shadow-[0_0_60px_-15px_var(--cyan-glow)] animate-scale-in">
            {/* Header */}
            <div className="sticky top-0 z-10 glass-strong border-b border-[var(--cyan-glow)]/20 px-6 py-5 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon)]/30 to-[var(--cyan-glow)]/20 flex items-center justify-center text-[var(--cyan-glow)]">
                  <activeCard.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {activeCard.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{activeCard.body}</p>
                </div>
              </div>
              <button
                onClick={closeCard}
                className="w-10 h-10 rounded-full bg-[var(--cyan-glow)]/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[var(--cyan-glow)]/20 transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Explanation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[var(--cyan-glow)]" />
                  <h4 className="font-display font-bold text-lg">What You Need to Know</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {activeCard.explanation}
                </p>
              </div>

              {/* Why Important */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
                  <h4 className="font-display font-bold text-lg">Why This Matters</h4>
                </div>
                <div className="pl-7 p-4 rounded-2xl bg-[var(--warning)]/5 border border-[var(--warning)]/20">
                  <p className="text-muted-foreground leading-relaxed">
                    {activeCard.whyImportant}
                  </p>
                </div>
              </div>

              {/* Real Example */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[var(--destructive)]" />
                  <h4 className="font-display font-bold text-lg">Real World Example</h4>
                </div>
                <div className="pl-7 p-4 rounded-2xl bg-[var(--destructive)]/5 border border-[var(--destructive)]/20">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{activeCard.realExample}"
                  </p>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
                  <h4 className="font-display font-bold text-lg">Common Mistakes to Avoid</h4>
                </div>
                <ul className="pl-7 space-y-2">
                  {activeCard.commonMistakes.map((mistake, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-5 h-5 rounded-full bg-[var(--destructive)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-[var(--destructive)]" />
                      </span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                  <h4 className="font-display font-bold text-lg">Safety Checklist</h4>
                </div>
                <div className="pl-7 p-4 rounded-2xl bg-[var(--success)]/5 border border-[var(--success)]/20">
                  <ul className="space-y-3">
                    {activeCard.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[var(--success)]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-[var(--success)]" />
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[var(--neon)]" />
                  <h4 className="font-display font-bold text-lg">Quick Cyber Safety Tips</h4>
                </div>
                <div className="grid gap-3 pl-7">
                  {activeCard.quickTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--neon)]/5 to-transparent border border-[var(--neon)]/10"
                    >
                      <span className="w-6 h-6 rounded-full bg-[var(--cyan-glow)]/20 flex items-center justify-center shrink-0 text-xs font-bold text-[var(--cyan-glow)]">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 z-10 glass-strong border-t border-[var(--cyan-glow)]/20 px-6 py-5 rounded-b-3xl flex justify-center">
              <button
                onClick={closeCard}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-white shadow-[0_0_30px_-5px_var(--cyan-glow)] hover:shadow-[0_0_50px_-5px_var(--cyan-glow)] hover:scale-105 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
