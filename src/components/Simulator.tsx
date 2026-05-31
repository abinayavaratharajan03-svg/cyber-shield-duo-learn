import { useMemo, useState } from "react";
import {
  MessageCircle, KeyRound, Link2, Instagram, QrCode, Banknote, AlertOctagon, CheckCircle2, X,
  Truck, Briefcase, Phone, PhoneCall, Smartphone, GraduationCap, ShoppingCart, Tag, Trophy,
  ScreenShare, Download, Mail, Mic, Gamepad2, Send, IndianRupee, Headphones, ShieldAlert, Flag,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

type Category = "Student Scams" | "Banking" | "Social Media" | "Shopping" | "UPI Payments" | "Latest";

type Sim = {
  id: string;
  icon: typeof MessageCircle;
  title: string;
  categories: Category[];
  channel: string; // e.g. WhatsApp, SMS, Call
  popup: string;
  answer: "scam" | "safe";
  redFlags: string[];
  why: string;
  signs: string[];
  nextSteps: string[];
  tip: string;
};

const sims: Sim[] = [
  {
    id: "wa", icon: MessageCircle, title: "Fake WhatsApp Scam", categories: ["Social Media", "Latest"], channel: "WhatsApp",
    popup: "“Hi Mom, I lost my phone. This is my new number. Send ₹15,000 to UPI 9876xxxx@okaxis urgently — class fees due today.”",
    answer: "scam",
    redFlags: ["Unknown number claiming to be family", "Urgency / pressure", "New UPI ID you've never seen"],
    why: "Scammers impersonate family members to trigger panic and rush money transfers before you verify.",
    signs: ["“I lost my phone”", "Different UPI than usual", "Refuses to take a call"],
    nextSteps: ["Call the real person on their old number", "Verify via family group", "Block & report the number on WhatsApp"],
    tip: "Always call the person on their original number before sending money.",
  },
  {
    id: "otp", icon: KeyRound, title: "OTP Scam", categories: ["Banking", "UPI Payments"], channel: "Phone call",
    popup: "“Bank Officer here. A fraud charge of ₹40,000 is being processed on your card. Share the OTP I just sent to REVERSE it.”",
    answer: "scam",
    redFlags: ["Asks for OTP", "Creates fear of money loss", "Pressure to act in seconds"],
    why: "Sharing an OTP authorises the transaction — you are approving the scammer's payment, not reversing one.",
    signs: ["Caller knows partial card info", "Wants OTP / CVV / PIN", "Won't let you hang up"],
    nextSteps: ["Hang up immediately", "Call bank using number on your card", "Report to 1930 (cybercrime helpline)"],
    tip: "Banks NEVER ask for OTP, PIN or CVV. Hang up immediately.",
  },
  {
    id: "kyc", icon: ShieldAlert, title: "Fake Bank KYC Update Scam", categories: ["Banking", "Latest"], channel: "SMS",
    popup: "“Dear Customer, your SBI KYC expires TODAY. Account will be blocked. Update now: sbi-kyc-verify.in/login”",
    answer: "scam",
    redFlags: ["Suspicious lookalike domain", "Threat of account block", "Same-day deadline"],
    why: "Fake KYC pages capture your net-banking credentials and drain the account within minutes.",
    signs: ["URL is not the official bank domain", "Asks for full password / PIN", "Generic greeting"],
    nextSteps: ["Don't click the link", "Open the bank's official app yourself", "Report SMS to 1909"],
    tip: "Real banks never send KYC links. Always update KYC inside the official app or at the branch.",
  },
  {
    id: "delivery", icon: Truck, title: "Fake Delivery Scam", categories: ["Shopping", "Latest"], channel: "SMS",
    popup: "“Your parcel could not be delivered due to wrong address. Reschedule + pay ₹25 here: indpost-redeliver.com”",
    answer: "scam",
    redFlags: ["Tiny payment asked", "Unknown link", "No tracking number you recognise"],
    why: "The ₹25 form harvests full card details which are then used for big purchases.",
    signs: ["Lookalike courier brand", "Asks for full card + CVV", "You weren't expecting a parcel"],
    nextSteps: ["Verify in the courier's official app", "Never pay via random SMS links", "Delete and block sender"],
    tip: "Track parcels only via the official courier app or website.",
  },
  {
    id: "job", icon: Briefcase, title: "Fake Job Offer Scam", categories: ["Student Scams", "Latest"], channel: "Email",
    popup: "“Congratulations! You're selected at TCS. Pay ₹4,999 registration to receive your offer letter and ID card.”",
    answer: "scam",
    redFlags: ["Pay-to-join", "No interview held", "Generic company email"],
    why: "Genuine employers never ask candidates to pay for an offer letter, training kit, or ID card.",
    signs: ["Gmail / Yahoo sender, not company domain", "Urgent payment deadline", "Too-good-to-be-true salary"],
    nextSteps: ["Verify on the company's official careers page", "Search the recruiter on LinkedIn", "Report to cybercrime.gov.in"],
    tip: "If a job asks for money, it's not a job — it's a scam.",
  },
  {
    id: "loanapp", icon: Banknote, title: "Fake Loan App Scam", categories: ["Banking", "Latest"], channel: "App",
    popup: "“Instant ₹50,000 loan. No documents. Just allow Contacts + Gallery + SMS access.”",
    answer: "scam",
    redFlags: ["Asks for contacts/gallery access", "Not on RBI list", "No physical address"],
    why: "These apps blackmail you using your contacts and morphed photos if you delay repayment.",
    signs: ["Massive processing fee", "Very short repayment window", "Abusive recovery agents"],
    nextSteps: ["Uninstall immediately", "File complaint at 1930 & sachet.rbi.org.in", "Inform family before agents call them"],
    tip: "Only use loan apps from RBI-regulated banks/NBFCs.",
  },
  {
    id: "qr", icon: QrCode, title: "QR Code Payment Scam", categories: ["UPI Payments"], channel: "QR",
    popup: "“Scan this QR code to RECEIVE your refund of ₹5,000 instantly.”",
    answer: "scam",
    redFlags: ["QR used to ‘receive’ money", "Asks for UPI PIN", "Pressure to scan quickly"],
    why: "Scanning a QR and entering a PIN always SENDS money — it never receives.",
    signs: ["Receiver insists on QR", "Asks you to type PIN", "Will not accept your UPI ID instead"],
    nextSteps: ["Cancel the request", "Share your UPI ID for incoming", "Report payee in your UPI app"],
    tip: "Scanning a QR can only SEND money. To receive, share your UPI ID.",
  },
  {
    id: "ig", icon: Instagram, title: "Instagram Account Recovery Scam", categories: ["Social Media", "Student Scams"], channel: "DM",
    popup: "“Hey, I'm locked out of Instagram. Please tap the recovery link they sent to your number — I listed you as trusted contact.”",
    answer: "scam",
    redFlags: ["Friend asking to tap a login link", "Account behaving oddly", "Urgent tone"],
    why: "Tapping the link sends YOUR Instagram recovery code to the attacker, locking you out.",
    signs: ["Sudden DM from old friend", "Bad grammar", "Avoids voice/video call"],
    nextSteps: ["Don't tap the link", "Call the friend directly", "Enable 2-factor authentication on Instagram"],
    tip: "Never share login links or recovery codes — not even with friends.",
  },
  {
    id: "telegram", icon: Send, title: "Telegram Investment Scam", categories: ["Latest", "Banking"], channel: "Telegram",
    popup: "“Join VIP Stock Group — guaranteed 30% daily return. Deposit ₹10,000 to start. Limited 5 seats left!”",
    answer: "scam",
    redFlags: ["Guaranteed returns", "Telegram-only ‘mentor’", "Withdrawal blocked after deposit"],
    why: "Fake trading dashboards show fake profits — when you try to withdraw, they demand more ‘tax’.",
    signs: ["Foreign admins", "Screenshots of fake earnings", "Pressure to recruit friends"],
    nextSteps: ["Leave the group", "Don't deposit more to ‘unlock’ funds", "Report to 1930"],
    tip: "SEBI-registered advisors never promise guaranteed returns.",
  },
  {
    id: "upireq", icon: IndianRupee, title: "UPI Payment Request Scam", categories: ["UPI Payments"], channel: "UPI app",
    popup: "“OLX buyer sent a ₹8,000 ‘collect request’ — please approve to receive payment for your fridge.”",
    answer: "scam",
    redFlags: ["‘Collect request’ to receive money", "Asks for UPI PIN", "Buyer refuses to pay first"],
    why: "Approving a collect request DEBITS your account. Receiving money never needs your PIN.",
    signs: ["Says ‘just approve once’", "Won't pay using your UPI ID", "Multiple repeated requests"],
    nextSteps: ["Decline all collect requests", "Insist on direct UPI to your ID", "Block the buyer"],
    tip: "You never enter a PIN to receive money on UPI.",
  },
  {
    id: "care", icon: Headphones, title: "Fake Customer Care Scam", categories: ["Banking", "Shopping"], channel: "Google search",
    popup: "“Paytm Customer Care: 1800-XXX-XXXX. We'll help with your refund — install AnyDesk so we can verify.”",
    answer: "scam",
    redFlags: ["Number found on Google, not the app", "Asks to install screen-share apps", "Asks for OTP"],
    why: "Once on screen-share, the scammer reads your OTP and empties your wallet.",
    signs: ["Pretends to be Paytm/PhonePe/Amazon support", "Asks for ₹1 ‘test’ payment", "Speaks in panic tone"],
    nextSteps: ["Hang up", "Use Help section inside the official app", "Report at 1930"],
    tip: "Find support numbers only inside the official app — not on Google.",
  },
  {
    id: "sim", icon: Smartphone, title: "SIM Card Block Scam", categories: ["Latest"], channel: "Phone call",
    popup: "“Jio executive: Your SIM will be blocked in 2 hours due to KYC. Press 1 and share the code we SMS to verify.”",
    answer: "scam",
    redFlags: ["Threat of disconnection", "Asks you to forward an SMS code", "Pressure to act in 2 hours"],
    why: "The ‘code’ is actually a SIM-swap or eSIM transfer OTP — your number gets ported to the attacker.",
    signs: ["Robotic IVR", "Asks for Aadhaar last 4 digits", "Refers you to a fake link"],
    nextSteps: ["Hang up", "Visit the official telecom store for KYC", "Enable SIM-lock PIN on your phone"],
    tip: "Telecom companies don't block SIMs over a phone call.",
  },
  {
    id: "scholar", icon: GraduationCap, title: "Scholarship Scam for Students", categories: ["Student Scams"], channel: "WhatsApp",
    popup: "“PM Scholarship 2026 — ₹50,000 for 12th students. Pay ₹299 application fee here to confirm seat.”",
    answer: "scam",
    redFlags: ["Application fee for govt scholarship", "Unknown WhatsApp forward", "Spelling errors"],
    why: "Genuine government scholarships are FREE to apply on the National Scholarship Portal.",
    signs: ["Random WhatsApp group", "Fake ministry logo", "Lookalike scholarship.gov.in URL"],
    nextSteps: ["Verify on scholarships.gov.in only", "Ask your school counsellor", "Delete and report the message"],
    tip: "Real government scholarships never charge a fee.",
  },
  {
    id: "shop", icon: ShoppingCart, title: "Online Shopping Scam", categories: ["Shopping", "Latest"], channel: "Instagram ad",
    popup: "“iPhone 15 only ₹14,999 — flash sale, COD not available. Pay full now via this link.”",
    answer: "scam",
    redFlags: ["Price too low", "No COD allowed", "Unknown store"],
    why: "Fake stores collect payment, ship empty boxes (or nothing) and shut down within days.",
    signs: ["No GST / company info", "Only Instagram presence", "Bad reviews / no reviews"],
    nextSteps: ["Don't pay", "Buy only from trusted retailers", "Report the ad to Instagram"],
    tip: "If the price is too good to be true, it usually is.",
  },
  {
    id: "olx", icon: Tag, title: "OLX Buyer Scam", categories: ["Shopping", "UPI Payments"], channel: "OLX chat",
    popup: "“Army officer here, getting transferred. I'll pay full ₹20,000 — just scan this QR / approve this UPI request to confirm.”",
    answer: "scam",
    redFlags: ["Army/police identity", "Wants to ‘test’ with ₹1", "Sends QR or collect request"],
    why: "Every QR scan or PIN approval debits YOUR account. The ‘buyer’ never pays.",
    signs: ["Refuses to call", "Sends fake ID card", "Asks you to scan QR to receive"],
    nextSteps: ["Insist on cash on delivery only", "Never scan QR to receive", "Report on OLX"],
    tip: "Real buyers send money to your UPI ID — they never need you to scan or enter PIN.",
  },
  {
    id: "lottery", icon: Trophy, title: "Lottery Winner Scam", categories: ["Latest"], channel: "Email/SMS",
    popup: "“You won ₹25 Lakh in KBC Lottery! Pay ₹6,500 processing fee to release your prize.”",
    answer: "scam",
    redFlags: ["You never entered a lottery", "Asks fee to release prize", "Foreign or random number"],
    why: "No genuine prize requires you to pay money first. Scammers keep asking for more ‘taxes’.",
    signs: ["Photo of fake cheque", "KBC / Kaun Banega Crorepati branding", "WhatsApp voice notes"],
    nextSteps: ["Block sender", "Never transfer money", "Report at cybercrime.gov.in"],
    tip: "Real winnings never need you to pay anything in advance.",
  },
  {
    id: "screen", icon: ScreenShare, title: "Screen Sharing App Scam", categories: ["Banking", "Latest"], channel: "Phone call",
    popup: "“Please install AnyDesk / TeamViewer so we can fix your refund. Share the 9-digit code shown on screen.”",
    answer: "scam",
    redFlags: ["Asks to install AnyDesk/TeamViewer/QuickSupport", "Wants 9-digit code", "‘Don't close the app’"],
    why: "Sharing the code gives full remote control of your phone — they can read OTPs and transact.",
    signs: ["Pretends to be bank/Amazon/Paytm support", "Stays on call while you install", "Asks to enable accessibility"],
    nextSteps: ["Uninstall the app immediately", "Disconnect internet", "Call your bank to block cards"],
    tip: "Never install remote-screen apps on the request of a caller.",
  },
  {
    id: "apk", icon: Download, title: "Fake APK Download Scam", categories: ["Latest"], channel: "WhatsApp",
    popup: "“Wedding invitation 💌 — tap to view: shaadi-invite.apk”",
    answer: "scam",
    redFlags: ["File ends in .apk", "Unknown sender", "Curious-looking attachment"],
    why: "APKs from outside Play Store can install spyware that steals OTPs, banking and gallery data.",
    signs: ["Wedding / electricity bill / parcel APK", "‘Install from unknown sources’ prompt", "App asks for SMS + Accessibility"],
    nextSteps: ["Don't install", "Delete the file", "Run Play Protect scan"],
    tip: "Never install .apk files received on WhatsApp or SMS.",
  },
  {
    id: "phish", icon: Mail, title: "Phishing Email Scam", categories: ["Banking", "Social Media"], channel: "Email",
    popup: "“Your Google account will be deleted in 24 hours due to unusual activity. Verify here: g00gle-secure.com/login”",
    answer: "scam",
    redFlags: ["Lookalike domain (g00gle)", "Deadline threat", "Asks for password"],
    why: "Phishing pages steal your email password and use it to reset every other linked account.",
    signs: ["Generic greeting", "Suspicious sender address", "URL doesn't match brand"],
    nextSteps: ["Don't click", "Mark as phishing", "Enable 2-step verification"],
    tip: "Open accounts only by typing the official URL or using the official app.",
  },
  {
    id: "aivoice", icon: Mic, title: "AI Voice Call Scam", categories: ["Latest"], channel: "Phone call",
    popup: "(Voice that sounds like your son): “Dad, I'm in an accident, please send ₹30,000 to this UPI immediately.”",
    answer: "scam",
    redFlags: ["Voice sounds slightly off", "Unknown number", "Urgent money request"],
    why: "Scammers clone voices from short Instagram / WhatsApp clips and impersonate family.",
    signs: ["Refuses video call", "Background noise mismatched", "Hangs up if questioned"],
    nextSteps: ["Hang up and call the real person", "Ask a personal question only family knows", "Warn elders at home"],
    tip: "Always verify with a video call or a known personal question before sending money.",
  },
  {
    id: "intern", icon: Briefcase, title: "Fake Internship Scam", categories: ["Student Scams"], channel: "LinkedIn DM",
    popup: "“Selected for paid Google internship 🎉 — ₹25,000/month WFH. Pay ₹1,500 for laptop deposit.”",
    answer: "scam",
    redFlags: ["Pay-to-join internship", "No interview", "Random recruiter profile"],
    why: "Real companies never charge students for laptops or onboarding.",
    signs: ["Personal email instead of company email", "Pressure to pay today", "Vague role description"],
    nextSteps: ["Verify on the company careers page", "Ask your placement cell", "Report the profile on LinkedIn"],
    tip: "If an internship asks for money, walk away.",
  },
  {
    id: "game", icon: Gamepad2, title: "Gaming Top-up Scam", categories: ["Student Scams", "Latest"], channel: "YouTube/Discord",
    popup: "“Free 10,000 UC for BGMI / Free Fire diamonds! Just login with your game ID + password here.”",
    answer: "scam",
    redFlags: ["Asks game login + password", "Promises free in-game currency", "Random fan site"],
    why: "Your game account (and linked email / Google account) gets hijacked and sold.",
    signs: ["Discord DM from stranger", "Sketchy link", "Asks for OTP from email"],
    nextSteps: ["Never share game password", "Change password & enable 2FA", "Top-up only from official store"],
    tip: "Free in-game currency offers are always scams.",
  },
];

const categories: ("All" | Category)[] = ["All", "Student Scams", "Banking", "Social Media", "Shopping", "UPI Payments", "Latest"];

export function Simulator() {
  const { t } = useI18n();
  const [active, setActive] = useState<Sim | null>(null);
  const [result, setResult] = useState<"safe" | "scam" | null>(null);
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? sims : sims.filter((s) => s.categories.includes(filter as Category))),
    [filter],
  );

  const correct = result && active && result === active.answer;

  return (
    <Section id="simulator" eyebrow="Hands-on training" title={t("sim_title")} subtitle={t("sim_sub")}>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => {
          const isActive = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background shadow-[0_0_20px_var(--cyan-glow)]"
                  : "glass hover:glow-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
        <span className="ml-auto self-center text-xs font-mono text-muted-foreground">
          {filtered.length} simulation{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActive(s); setResult(null); }}
            className="text-left glass rounded-2xl p-6 glow-hover group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--neon)]/10 blur-2xl group-hover:bg-[var(--cyan-glow)]/20 transition-colors" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-[var(--cyan-glow)]">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-1 rounded-full glass">
                  {s.channel}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">Realistic popup • Safe or Scam choice</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.categories.slice(0, 2).map((c) => (
                  <span key={c} className="text-[10px] font-mono text-[var(--cyan-glow)]/80 px-2 py-0.5 rounded-full border border-[var(--cyan-glow)]/30">
                    {c}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-[var(--cyan-glow)]">Launch simulation →</span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground font-mono text-sm">
          No simulations in this category yet.
        </div>
      )}

      {active && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto fade-up" onClick={() => setActive(null)}>
          <div className="glass-strong rounded-3xl max-w-lg w-full p-6 relative my-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-border">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--neon)]/20 text-[var(--neon)] flex items-center justify-center">
                <active.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold">{active.title}</div>
                <div className="text-xs text-muted-foreground font-mono">incoming via {active.channel}</div>
              </div>
            </div>

            {/* Realistic message bubble */}
            <div className="rounded-xl bg-background/60 border border-border p-4 text-sm leading-relaxed relative">
              <div className="absolute -top-2 left-4 text-[10px] font-mono text-muted-foreground bg-background px-2">
                {active.channel}
              </div>
              {active.popup}
            </div>

            {!result ? (
              <>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setResult("safe")}
                    className="py-3 rounded-lg glass hover:glow-border font-semibold text-[var(--success)]"
                  >
                    ✓ Safe
                  </button>
                  <button
                    onClick={() => setResult("scam")}
                    className="py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold"
                  >
                    ⚠ Scam
                  </button>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
                  What would you do?
                </p>
              </>
            ) : (
              <div className="mt-5 space-y-4 fade-up">
                {/* Verdict */}
                <div className={`p-4 rounded-xl ${correct ? "bg-[var(--success)]/15 border border-[var(--success)]/40" : "bg-destructive/15 border border-destructive/40"}`}>
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    {correct ? (
                      <><CheckCircle2 className="w-5 h-5 text-[var(--success)]" /> Correct — this {active.answer === "scam" ? "is a scam" : "is safe"}!</>
                    ) : (
                      <><AlertOctagon className="w-5 h-5 text-destructive" /> Careful — this was actually a {active.answer}!</>
                    )}
                  </div>
                </div>

                {/* Red flags */}
                <div className="rounded-xl p-4 border border-destructive/30 bg-destructive/5">
                  <div className="text-xs font-mono uppercase tracking-wider text-destructive mb-2">🚩 Red flags</div>
                  <ul className="space-y-1 text-sm">
                    {active.redFlags.map((r, i) => (
                      <li key={i} className="flex gap-2"><span className="text-destructive">•</span>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Why dangerous */}
                <div className="rounded-xl p-4 glass">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-2">Why this is dangerous</div>
                  <p className="text-sm text-muted-foreground">{active.why}</p>
                </div>

                {/* Signs to notice */}
                <div className="rounded-xl p-4 glass">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-2">Signs to notice</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {active.signs.map((s, i) => (
                      <li key={i} className="flex gap-2"><span className="text-[var(--cyan-glow)]">›</span>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Next steps */}
                <div className="rounded-xl p-4 glass">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-2">What to do next</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {active.nextSteps.map((s, i) => (
                      <li key={i} className="flex gap-2"><span className="text-[var(--success)]">✓</span>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Stay safe tip */}
                <div className="rounded-xl p-4 border border-[var(--cyan-glow)]/40 bg-[var(--cyan-glow)]/5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-1">How to stay safe</div>
                  <p className="text-sm">{active.tip}</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-lg bg-destructive/90 hover:bg-destructive text-destructive-foreground font-semibold text-sm inline-flex items-center justify-center gap-2"
                  >
                    <Flag className="w-4 h-4" /> Report scam
                  </a>
                  <button
                    onClick={() => setResult(null)}
                    className="py-3 rounded-lg glass hover:glow-border font-semibold text-sm"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
