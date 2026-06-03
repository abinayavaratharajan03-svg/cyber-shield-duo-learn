import { useEffect, useMemo, useState } from "react";
import {
  MessageCircle, KeyRound, Instagram, QrCode, Banknote, AlertOctagon, CheckCircle2, X,
  Truck, Briefcase, Phone, Smartphone, GraduationCap, ShoppingCart, Tag, Trophy,
  ScreenShare, Download, Mail, Mic, Gamepad2, Send, IndianRupee, Headphones, ShieldAlert, Flag,
  Heart, Bitcoin, Home, Wallet, Share2, RotateCcw, Sparkles, Infinity as InfinityIcon,
  Award, Target, Zap, BookOpen,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";

type Category = "Student Scams" | "Banking" | "Social Media" | "Shopping" | "UPI Payments" | "Latest";

type Sim = {
  id: string;
  icon: typeof MessageCircle;
  title: string;
  categories: Category[];
  channel: string;
  popup: string;
  answer: "scam" | "safe";
  redFlags: string[];
  why: string;
  tip: string;
};

const bank: Sim[] = [
  { id: "wa", icon: MessageCircle, title: "Fake WhatsApp Family Emergency", categories: ["Social Media", "Latest"], channel: "WhatsApp",
    popup: "“Hi Mom, I lost my phone. This is my new number. Send ₹15,000 to UPI 9876xxxx@okaxis urgently — class fees due today.”",
    answer: "scam", redFlags: ["Unknown number claiming to be family", "Urgency / pressure", "New UPI ID"],
    why: "Scammers impersonate family to trigger panic and rush transfers.", tip: "Always call the real person on their old number first." },
  { id: "otp", icon: KeyRound, title: "OTP Reversal Scam", categories: ["Banking", "UPI Payments"], channel: "Phone call",
    popup: "“Bank Officer here. A fraud charge of ₹40,000 is being processed. Share the OTP to REVERSE it.”",
    answer: "scam", redFlags: ["Asks for OTP", "Creates fear", "Pressure to act in seconds"],
    why: "Sharing OTP authorises the scammer's payment — never reverses one.", tip: "Banks never ask for OTP, PIN or CVV." },
  { id: "kyc", icon: ShieldAlert, title: "Fake Bank KYC Update", categories: ["Banking", "Latest"], channel: "SMS",
    popup: "“Dear Customer, your SBI KYC expires TODAY. Update now: sbi-kyc-verify.in/login”",
    answer: "scam", redFlags: ["Lookalike domain", "Account-block threat", "Same-day deadline"],
    why: "Fake KYC pages capture your net-banking credentials.", tip: "Update KYC only inside the bank's official app or branch." },
  { id: "delivery", icon: Truck, title: "Fake Delivery Payment Link", categories: ["Shopping", "Latest"], channel: "SMS",
    popup: "“Your parcel could not be delivered. Reschedule + pay ₹25: indpost-redeliver.com”",
    answer: "scam", redFlags: ["Tiny payment asked", "Unknown link", "No tracking number"],
    why: "The ₹25 form harvests full card details for big purchases.", tip: "Track parcels only via the official courier app." },
  { id: "job", icon: Briefcase, title: "Fake Job Offer", categories: ["Student Scams", "Latest"], channel: "Email",
    popup: "“Congratulations! You're selected at TCS. Pay ₹4,999 registration to receive your offer letter.”",
    answer: "scam", redFlags: ["Pay-to-join", "No interview", "Generic email"],
    why: "Real employers never ask candidates to pay for an offer letter.", tip: "If a job asks for money, it's a scam." },
  { id: "loanapp", icon: Banknote, title: "Predatory Loan App", categories: ["Banking", "Latest"], channel: "App",
    popup: "“Instant ₹50,000 loan. No documents. Just allow Contacts + Gallery + SMS access.”",
    answer: "scam", redFlags: ["Demands contacts/gallery", "Not on RBI list", "No address"],
    why: "These apps blackmail you using your contacts and morphed photos.", tip: "Use only RBI-regulated lenders." },
  { id: "qr", icon: QrCode, title: "QR Code Refund Scam", categories: ["UPI Payments"], channel: "QR",
    popup: "“Scan this QR to RECEIVE your refund of ₹5,000 instantly.”",
    answer: "scam", redFlags: ["QR to ‘receive’ money", "Asks for UPI PIN", "Rush to scan"],
    why: "Scanning + PIN always SENDS money, never receives.", tip: "To receive money, share your UPI ID — never scan." },
  { id: "ig", icon: Instagram, title: "Instagram Recovery Scam", categories: ["Social Media", "Student Scams"], channel: "DM",
    popup: "“I'm locked out of Insta. Tap the recovery link they sent to your number — I listed you as trusted contact.”",
    answer: "scam", redFlags: ["Friend asks to tap a login link", "Urgent tone", "Avoids voice call"],
    why: "Tapping forwards your Instagram code to the attacker.", tip: "Never share login links or recovery codes." },
  { id: "telegram", icon: Send, title: "Telegram Investment Scam", categories: ["Latest", "Banking"], channel: "Telegram",
    popup: "“VIP Stock Group — guaranteed 30% daily return. Deposit ₹10,000 to start. 5 seats left!”",
    answer: "scam", redFlags: ["Guaranteed returns", "Telegram-only mentor", "Withdrawal blocked"],
    why: "Fake dashboards show fake profits; withdrawals demand more ‘tax’.", tip: "SEBI-registered advisors never promise guaranteed returns." },
  { id: "upireq", icon: IndianRupee, title: "UPI Collect Request Scam", categories: ["UPI Payments"], channel: "UPI app",
    popup: "“OLX buyer sent a ₹8,000 collect request — please approve to receive payment for your fridge.”",
    answer: "scam", redFlags: ["Collect request to ‘receive’", "Asks for PIN", "Refuses to pay first"],
    why: "Approving a collect request DEBITS your account.", tip: "You never enter a PIN to receive money on UPI." },
  { id: "care", icon: Headphones, title: "Fake Customer Care", categories: ["Banking", "Shopping"], channel: "Google search",
    popup: "“Paytm Customer Care: We'll help your refund — install AnyDesk so we can verify.”",
    answer: "scam", redFlags: ["Number from Google", "Asks for screen-share", "Asks for OTP"],
    why: "Screen-share lets the scammer read OTPs and empty your wallet.", tip: "Find support numbers inside the official app — not on Google." },
  { id: "sim", icon: Smartphone, title: "SIM Block / SIM-swap Scam", categories: ["Latest"], channel: "Phone call",
    popup: "“Jio: Your SIM will be blocked in 2 hours due to KYC. Press 1 and share the SMS code.”",
    answer: "scam", redFlags: ["Threat of disconnection", "Forward an SMS code", "Hard 2-hour deadline"],
    why: "The code is a SIM-swap OTP — your number gets ported.", tip: "Telecoms don't block SIMs over a phone call." },
  { id: "scholar", icon: GraduationCap, title: "Fake Scholarship Scam", categories: ["Student Scams"], channel: "WhatsApp",
    popup: "“PM Scholarship 2026 — ₹50,000. Pay ₹299 application fee here to confirm seat.”",
    answer: "scam", redFlags: ["Fee for govt scholarship", "WhatsApp forward", "Spelling errors"],
    why: "Real govt scholarships are free on the National Scholarship Portal.", tip: "Verify on scholarships.gov.in only." },
  { id: "shop", icon: ShoppingCart, title: "Too-Good Online Shopping", categories: ["Shopping", "Latest"], channel: "Instagram ad",
    popup: "“iPhone 15 only ₹14,999 — flash sale, COD not available. Pay full now via this link.”",
    answer: "scam", redFlags: ["Price too low", "No COD", "Unknown store"],
    why: "Fake stores collect payment and ship empty boxes.", tip: "If a price is too good to be true, it usually is." },
  { id: "olx", icon: Tag, title: "OLX Army Officer Scam", categories: ["Shopping", "UPI Payments"], channel: "OLX chat",
    popup: "“Army officer, getting transferred. I'll pay ₹20,000 — just scan this QR to confirm.”",
    answer: "scam", redFlags: ["Army/police identity", "Wants to ‘test’ with ₹1", "Sends QR"],
    why: "Every scan/PIN approval debits YOUR account.", tip: "Real buyers send money to your UPI ID — they never need you to scan." },
  { id: "lottery", icon: Trophy, title: "KBC Lottery Winner Scam", categories: ["Latest"], channel: "Email/SMS",
    popup: "“You won ₹25 Lakh in KBC Lottery! Pay ₹6,500 processing fee to release prize.”",
    answer: "scam", redFlags: ["You never entered", "Fee to release prize", "Random sender"],
    why: "No real prize requires you to pay first.", tip: "Real winnings never need an advance payment." },
  { id: "screen", icon: ScreenShare, title: "AnyDesk / Screen-Share Scam", categories: ["Banking", "Latest"], channel: "Phone call",
    popup: "“Install AnyDesk so we can fix your refund. Share the 9-digit code on screen.”",
    answer: "scam", redFlags: ["Wants AnyDesk/TeamViewer", "9-digit code", "‘Don't close the app’"],
    why: "Sharing the code gives full remote control of your phone.", tip: "Never install remote-screen apps on a caller's request." },
  { id: "apk", icon: Download, title: "Fake APK Wedding Invite", categories: ["Latest"], channel: "WhatsApp",
    popup: "“Wedding invitation 💌 — tap to view: shaadi-invite.apk”",
    answer: "scam", redFlags: [".apk file", "Unknown sender", "Curious attachment"],
    why: "APKs outside Play Store install spyware that steals OTPs and banking data.", tip: "Never install .apk files received on WhatsApp or SMS." },
  { id: "phish", icon: Mail, title: "Google Account Phishing", categories: ["Banking", "Social Media"], channel: "Email",
    popup: "“Your Google account will be deleted in 24 hours. Verify here: g00gle-secure.com/login”",
    answer: "scam", redFlags: ["Lookalike domain", "Deadline threat", "Asks for password"],
    why: "Phishing pages steal your email password — every linked account is then at risk.", tip: "Open accounts only by typing the official URL or using the official app." },
  { id: "aivoice", icon: Mic, title: "AI Voice Cloning Scam", categories: ["Latest"], channel: "Phone call",
    popup: "(Voice that sounds like your son): “Dad, I'm in an accident, send ₹30,000 to this UPI now.”",
    answer: "scam", redFlags: ["Voice slightly off", "Unknown number", "Urgent money"],
    why: "Scammers clone voices from short Insta/WhatsApp clips.", tip: "Verify with a video call or a personal-only question." },
  { id: "intern", icon: Briefcase, title: "Fake Paid Internship", categories: ["Student Scams"], channel: "LinkedIn DM",
    popup: "“Selected for paid Google internship 🎉 — ₹25,000/month WFH. Pay ₹1,500 laptop deposit.”",
    answer: "scam", redFlags: ["Pay-to-join internship", "No interview", "Random recruiter"],
    why: "Real companies never charge interns for laptops or onboarding.", tip: "If an internship asks for money, walk away." },
  { id: "game", icon: Gamepad2, title: "Free BGMI UC / Diamonds Scam", categories: ["Student Scams", "Latest"], channel: "YouTube/Discord",
    popup: "“Free 10,000 UC for BGMI / Free Fire! Just login with your game ID + password here.”",
    answer: "scam", redFlags: ["Asks game password", "Promises free currency", "Fan site"],
    why: "Your game account and linked Google account get hijacked.", tip: "Free in-game currency offers are always scams." },
  { id: "romance", icon: Heart, title: "Romance / Dating Scam", categories: ["Social Media", "Latest"], channel: "Dating app",
    popup: "“I love you, but I'm stuck at customs. Send ₹40,000 to clear my parcel — I'll repay double when I land.”",
    answer: "scam", redFlags: ["Never met in person", "Always in crisis", "Asks for money"],
    why: "Romance scammers build trust for weeks before draining victims.", tip: "Never send money to someone you've only met online." },
  { id: "crypto", icon: Bitcoin, title: "Crypto Doubling Scam", categories: ["Banking", "Latest"], channel: "Telegram",
    popup: "“Send 0.05 BTC to this wallet and Elon's bot will return 0.10 BTC in 10 minutes!”",
    answer: "scam", redFlags: ["Celebrity giveaway", "Guaranteed doubling", "Crypto only"],
    why: "Crypto sent is irreversible — nothing comes back.", tip: "No real exchange or celebrity ‘doubles’ your crypto." },
  { id: "rent", icon: Home, title: "Rental Deposit Scam", categories: ["Shopping", "UPI Payments"], channel: "OLX/99acres",
    popup: "“I'm a Navy officer, can't show flat in person. Pay ₹15,000 token via UPI to block the 2BHK.”",
    answer: "scam", redFlags: ["Can't visit property", "Defence identity", "Token before visit"],
    why: "There is no flat — token vanishes once paid.", tip: "Never pay a deposit before physically seeing the property." },
  { id: "police", icon: Phone, title: "Fake Police Verification Call", categories: ["Latest"], channel: "Phone call",
    popup: "“CBI Inspector here. Your Aadhaar is linked to a drug parcel. Pay ₹50,000 bond or face arrest in 2 hours.”",
    answer: "scam", redFlags: ["Threat of arrest", "Demand money via UPI", "Won't let you hang up"],
    why: "Real police never collect fines via UPI or video call.", tip: "Hang up. Call 1930 to report digital-arrest scams." },
  { id: "refund", icon: Wallet, title: "Fake Amazon Refund", categories: ["Shopping", "Banking"], channel: "SMS",
    popup: "“Amazon: Refund of ₹2,499 failed. Click to update bank details: amzn-refund-claim.in”",
    answer: "scam", redFlags: ["Random refund you didn't request", "Lookalike URL", "Asks bank details"],
    why: "The form steals your card and net-banking credentials.", tip: "Check refunds inside the official Amazon app only." },
  { id: "playstore", icon: Download, title: "App from Play Store (Top dev)", categories: ["Banking"], channel: "Play Store",
    popup: "Installing the official SBI YONO app from Google Play Store (publisher: State Bank of India, 4.3★, 100M+ downloads).",
    answer: "safe", redFlags: [],
    why: "Apps from verified publishers on Play Store are generally safe.", tip: "Always check the publisher name and download count." },
  { id: "https", icon: ShieldAlert, title: "Typing bank URL yourself", categories: ["Banking"], channel: "Browser",
    popup: "You open the browser and type https://www.onlinesbi.sbi yourself, then log in.",
    answer: "safe", redFlags: [],
    why: "Typing the official URL yourself avoids phishing links.", tip: "Bookmark official bank URLs for safe access." },
  { id: "directupi", icon: IndianRupee, title: "Friend asks for your UPI ID", categories: ["UPI Payments"], channel: "WhatsApp",
    popup: "Your classmate: “Send me your UPI ID, I'll transfer ₹500 for the trip.” You share your UPI ID only.",
    answer: "safe", redFlags: [],
    why: "Sharing only your UPI ID can never debit your account.", tip: "Sharing a UPI ID is safe. Sharing a PIN is not." },
  { id: "branch", icon: ShieldAlert, title: "Visit branch for KYC", categories: ["Banking"], channel: "In-person",
    popup: "The bank emails: “Please visit your home branch with PAN + Aadhaar to update KYC at your convenience.”",
    answer: "safe", redFlags: [],
    why: "In-branch KYC with original documents is the safest path.", tip: "Branch KYC is the gold standard." },
  { id: "famcall", icon: Phone, title: "Verifying with a callback", categories: ["Social Media"], channel: "Phone call",
    popup: "Your daughter texts asking for ₹5,000. You call her usual number — she answers and confirms it.",
    answer: "safe", redFlags: [],
    why: "Verification via the known number defeats impersonation.", tip: "A 30-second callback prevents most family scams." },
  { id: "elec", icon: Zap, title: "Electricity Bill Disconnection SMS", categories: ["Latest"], channel: "SMS",
    popup: "“Dear consumer, your electricity will be disconnected tonight 9:30 PM as last month bill not updated. Contact officer: 8910xxxxxx”",
    answer: "scam", redFlags: ["Personal mobile number", "Night deadline", "No consumer number quoted"],
    why: "‘Officer’ asks you to install AnyDesk and drains the account.", tip: "Pay bills only on your discom's official app/site." },
  { id: "fbmarket", icon: ShoppingCart, title: "Facebook Marketplace Advance", categories: ["Shopping"], channel: "Messenger",
    popup: "“I'll buy the bike. Sending advance via UPI link — click to confirm receipt.”",
    answer: "scam", redFlags: ["Sends a ‘receive’ link", "Refuses to meet", "Pushes urgency"],
    why: "The link is a collect request that debits your account.", tip: "On marketplaces, prefer cash on pickup." },
  { id: "courierbomb", icon: Truck, title: "FedEx Drug Parcel Call", categories: ["Latest"], channel: "Phone call",
    popup: "“FedEx: A parcel in your name with drugs is held. Transfer to Mumbai Cyber Cell on this WhatsApp video call.”",
    answer: "scam", redFlags: ["‘Digital arrest’", "Video call to ‘police’", "Demands fund transfer for ‘verification’"],
    why: "Classic digital-arrest scam — there is no parcel and no investigation.", tip: "End the call. Real agencies never investigate over WhatsApp." },
  { id: "instafollow", icon: Instagram, title: "Insta ‘Earn ₹500 per like’", categories: ["Student Scams", "Social Media"], channel: "Telegram",
    popup: "“Like 10 YouTube videos = ₹500. Send screenshot, get paid. After 3 tasks, deposit ₹2,000 for ‘premium tasks’.”",
    answer: "scam", redFlags: ["Small payouts first", "Then asks deposit", "Telegram-only"],
    why: "Task scams pay small amounts to build trust, then steal big deposits.", tip: "Any job that needs a deposit is a scam." },
  { id: "matrim", icon: Heart, title: "Matrimonial Site NRI Scam", categories: ["Social Media", "Latest"], channel: "Matrimony chat",
    popup: "“NRI doctor in London. I'll send you a gift hamper — pay ₹35,000 customs to receive it.”",
    answer: "scam", redFlags: ["Never video calls", "Sends ‘gift’", "Customs fee demanded"],
    why: "There is no parcel; the ‘customs officer’ is the scammer's partner.", tip: "Never pay customs on unsolicited gifts." },
  { id: "upgrade", icon: Smartphone, title: "Free 5G SIM Upgrade", categories: ["Latest"], channel: "Phone call",
    popup: "“Airtel: free 5G upgrade. Forward the SMS code we just sent to 121 to activate.”",
    answer: "scam", redFlags: ["Forward a code", "Free upgrade", "Hurry"],
    why: "Forwarding ports your number to the scammer's eSIM.", tip: "Real SIM upgrades happen via the official app or store, never by forwarding codes." },
  { id: "psd", icon: KeyRound, title: "‘Reset your Insta password’ email", categories: ["Social Media"], channel: "Email",
    popup: "“Someone tried to log in from Russia. If it wasn't you, secure your account: instagram.com (real URL).”",
    answer: "safe", redFlags: [],
    why: "Real security emails from Instagram link to instagram.com.", tip: "Always check the URL before clicking — but real alerts do exist." },
  { id: "fastag", icon: QrCode, title: "Free FASTag Recharge QR", categories: ["UPI Payments", "Latest"], channel: "WhatsApp",
    popup: "“Govt is giving free ₹1,000 FASTag recharge. Scan this QR and enter PIN to claim.”",
    answer: "scam", redFlags: ["Govt ‘freebie’", "QR + PIN to ‘receive’", "Forwarded message"],
    why: "Scanning + PIN debits your account.", tip: "Recharge FASTag only on the official bank/NHAI app." },
  { id: "evisa", icon: Mail, title: "Fake Visa / Passport Site", categories: ["Latest"], channel: "Google ad",
    popup: "“Indian passport tatkal slot booking. Pay ₹2,499 for premium slot: passport-india-online.in”",
    answer: "scam", redFlags: ["Premium fee", "Lookalike domain", "Promises a slot"],
    why: "Only passportindia.gov.in is official — others sell nothing.", tip: "For govt services, use only *.gov.in domains." },
  { id: "edu", icon: GraduationCap, title: "Fake College Admission Counsellor", categories: ["Student Scams"], channel: "Phone call",
    popup: "“We have a management quota seat at top Chennai college — pay ₹2 lakh donation via UPI today to block it.”",
    answer: "scam", redFlags: ["UPI donation", "Today-only deadline", "Unverified counsellor"],
    why: "Real colleges issue receipts and never collect lakhs via UPI to a personal account.", tip: "Verify admissions on the official college website." },
  { id: "youtube", icon: Briefcase, title: "YouTube Like-and-Subscribe Job", categories: ["Student Scams", "Latest"], channel: "WhatsApp",
    popup: "“Work from home — ₹3,000/day. Like and subscribe 30 channels, send screenshots, then invest ₹5,000 for VIP tasks.”",
    answer: "scam", redFlags: ["Invest after small payout", "Telegram VIP group", "Foreign numbers"],
    why: "Same task-scam pattern: small payouts then big theft.", tip: "A real job never asks you to invest money." },
  { id: "freegift", icon: Sparkles, title: "Free Amazon Gift Card Spin", categories: ["Shopping"], channel: "WhatsApp",
    popup: "“Spin the wheel and win a free ₹10,000 Amazon Gift Card. Share with 20 friends to claim.”",
    answer: "scam", redFlags: ["Forward to 20", "‘Free’ gift card", "No official URL"],
    why: "These pages harvest personal data and install spyware.", tip: "Real brand giveaways are on the brand's verified channels." },
  { id: "donate", icon: Heart, title: "Fake Disaster Donation Link", categories: ["Latest"], channel: "WhatsApp",
    popup: "“Donate for Chennai flood victims via this UPI ID: helpchennai@upi (personal account).”",
    answer: "scam", redFlags: ["Personal UPI for charity", "WhatsApp forward", "No NGO 80G receipt"],
    why: "Personal UPI IDs collect money with no transparency.", tip: "Donate only to verified NGOs that issue 80G receipts." },
  { id: "ipo", icon: Trophy, title: "Allotment Guaranteed IPO Scam", categories: ["Banking", "Latest"], channel: "WhatsApp",
    popup: "“Guaranteed allotment in upcoming IPO via our broker. Pay ₹25,000 to block 100 shares.”",
    answer: "scam", redFlags: ["Guaranteed IPO allotment", "Broker on WhatsApp", "Pre-payment"],
    why: "IPO allotment is via lottery on SEBI-regulated brokers only.", tip: "Apply for IPO only through your own bank/Zerodha/Groww account." },
  { id: "minrec", icon: Send, title: "Mining App ‘Daily Earnings’", categories: ["Latest"], channel: "Telegram",
    popup: "“Install our crypto mining app. Earn ₹2,000/day passively. Refer 5 friends to unlock withdrawal.”",
    answer: "scam", redFlags: ["Referral required to withdraw", "Passive income promise", "APK install"],
    why: "It's a Ponzi — withdrawals stop once recruitment slows.", tip: "If withdrawal needs referrals, it's a Ponzi." },
  { id: "loanagent", icon: Banknote, title: "Loan Agent Asking Processing Fee", categories: ["Banking"], channel: "Phone call",
    popup: "“Pre-approved ₹5 lakh personal loan. Just pay ₹4,999 processing fee in advance to release the amount.”",
    answer: "scam", redFlags: ["Advance fee for loan", "No documentation", "Cold call"],
    why: "Real lenders deduct processing fees from disbursal, never collect upfront via UPI.", tip: "Never pay any fee in advance for a loan." },
  { id: "petrol", icon: QrCode, title: "Petrol Pump QR Swap", categories: ["UPI Payments"], channel: "QR",
    popup: "At a petrol pump, a sticker QR is pasted over the original. You're asked to scan it for payment.",
    answer: "scam", redFlags: ["Sticker QR over original", "Receiver name doesn't match", "No GST bill"],
    why: "Scammers paste their QR on top of merchant QRs to redirect payments.", tip: "Confirm the receiver name in your UPI app before paying." },
  { id: "metro", icon: Tag, title: "Free Metro Card Top-up Site", categories: ["Latest"], channel: "Google search",
    popup: "“Chennai Metro: free ₹100 top-up. Enter card number + OTP to claim: chennai-metro-bonus.in”",
    answer: "scam", redFlags: ["‘Free’ top-up", "Asks OTP", "Lookalike URL"],
    why: "Form harvests card + OTP for fraudulent purchases.", tip: "Top-up only on the official Chennai Metro app." },
  { id: "deepfake", icon: Mic, title: "Deepfake CEO Video Call", categories: ["Latest", "Banking"], channel: "Zoom call",
    popup: "Your ‘CEO’ joins a Zoom call and asks you to urgently wire ₹5 lakh to a new vendor.",
    answer: "scam", redFlags: ["Unusual urgency from CEO", "New vendor", "Video looks slightly stiff"],
    why: "Deepfake video + AI voice can mimic executives perfectly.", tip: "Verify large transfers via a known phone number, not the same channel." },
  { id: "appstoreapk", icon: Download, title: "‘Install our bank app from this link’", categories: ["Banking"], channel: "SMS",
    popup: "“HDFC: Install our updated app from this link: hdfc-secure-update.apk”",
    answer: "scam", redFlags: ["APK link", "Bank ‘update’ outside Play Store", "Urgency"],
    why: "Banking trojans hidden inside fake APKs.", tip: "Install bank apps only from Play Store / App Store." },
  { id: "verifyupi", icon: IndianRupee, title: "Paying merchant by typing UPI ID", categories: ["UPI Payments"], channel: "UPI app",
    popup: "You enter the shop's UPI ID, confirm the receiver name matches the shop, then pay ₹250.",
    answer: "safe", redFlags: [],
    why: "Verifying the receiver name is the right habit.", tip: "Always verify the receiver name before tapping Pay." },
];

type SuperCat = {
  id: string;
  title: string;
  tagline: string;
  examples: string[];
  icon: typeof Target;
  accent: string;
  match: (s: Sim) => boolean;
};

const SUPER_CATEGORIES: SuperCat[] = [
  {
    id: "student",
    title: "Student Scams",
    tagline: "internships, scholarships, gaming, fake jobs",
    examples: ["Fake internships", "Scholarship traps", "Free gaming UC", "Fake job offers"],
    icon: GraduationCap,
    accent: "from-emerald-400 to-cyan-400",
    match: (s) =>
      s.categories.includes("Student Scams") ||
      ["game", "intern", "scholar", "edu", "youtube", "instafollow", "job"].includes(s.id),
  },
  {
    id: "banking",
    title: "Banking & UPI Scams",
    tagline: "OTP, KYC, QR, UPI, refunds",
    examples: ["OTP reversal", "Fake KYC update", "QR code traps", "UPI collect requests", "Refund scams"],
    icon: Banknote,
    accent: "from-amber-400 to-rose-400",
    match: (s) =>
      s.categories.includes("Banking") ||
      s.categories.includes("UPI Payments") ||
      ["loanagent", "loanapp", "ipo", "crypto", "refund"].includes(s.id),
  },
  {
    id: "social",
    title: "Social Media Scams",
    tagline: "WhatsApp, Instagram, Telegram, romance",
    examples: ["WhatsApp impersonation", "Instagram recovery", "Telegram investment", "Romance scams"],
    icon: MessageCircle,
    accent: "from-pink-400 to-violet-400",
    match: (s) =>
      s.categories.includes("Social Media") ||
      ["wa", "ig", "telegram", "romance", "matrim", "psd"].includes(s.id),
  },
  {
    id: "advanced",
    title: "Advanced Threats",
    tagline: "AI voice, deepfake, SIM swap, phishing",
    examples: ["AI voice cloning", "Deepfake CEO calls", "SIM swap attacks", "Phishing pages"],
    icon: ShieldAlert,
    accent: "from-cyan-400 to-indigo-500",
    match: (s) =>
      ["aivoice", "deepfake", "sim", "upgrade", "phish", "screen", "apk", "appstoreapk", "courierbomb", "police"].includes(s.id),
  },
];

type Mode = { id: string; label: string; tagline: string; count: number | "infinite"; icon: typeof Target };
const MODES: Mode[] = [
  { id: "quick", label: "Quick Check", tagline: "5 questions", count: 5, icon: Zap },
  { id: "aware", label: "Awareness Challenge", tagline: "10 questions", count: 10, icon: Target },
  { id: "expert", label: "Cyber Expert", tagline: "20 questions", count: 20, icon: Award },
  { id: "unlimited", label: "Unlimited Practice", tagline: "Endless mode", count: "infinite", icon: InfinityIcon },
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Stage = "idle" | "intro" | "mode" | "playing" | "done";
type Answered = { sim: Sim; chose: "safe" | "scam"; correct: boolean };

function achievementFor(score: number) {
  if (score >= 300) return { name: "Scam Spotter Pro", emoji: "🏆" };
  if (score >= 200) return { name: "Cyber Guardian", emoji: "🥇" };
  if (score >= 100) return { name: "Smart Clicker", emoji: "🥈" };
  if (score >= 50) return { name: "Cyber Beginner", emoji: "🥉" };
  return { name: "Keep practicing", emoji: "🌱" };
}

export function Simulator() {
  const { t } = useI18n();
  const [stage, setStage] = useState<Stage>("idle");
  const [mode, setMode] = useState<Mode | null>(null);
  const [activeCat, setActiveCat] = useState<SuperCat | null>(null);
  const [queue, setQueue] = useState<Sim[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [reveal, setReveal] = useState<"safe" | "scam" | null>(null);
  const [reviewing, setReviewing] = useState(false);

  const openCategory = (c: SuperCat) => { setActiveCat(c); setStage("intro"); };

  const startQuiz = (m: Mode) => {
    if (!activeCat) return;
    const pool = bank.filter(activeCat.match);
    const source = pool.length >= 3 ? pool : bank;
    const shuffled = shuffle(source);
    const initial = m.count === "infinite"
      ? shuffled.slice(0, Math.min(10, shuffled.length))
      : shuffled.slice(0, Math.min(m.count, shuffled.length));
    setMode(m);
    setQueue(initial);
    setIdx(0);
    setAnswers([]);
    setReveal(null);
    setStage("playing");
  };

  // top up queue for unlimited mode (keep within category when possible)
  useEffect(() => {
    if (stage !== "playing" || !mode || mode.count !== "infinite" || !activeCat) return;
    if (queue.length - idx <= 3) {
      setQueue((q) => {
        const seen = new Set(q.map((s) => s.id));
        const pool = bank.filter(activeCat.match);
        const fresh = shuffle(pool.filter((s) => !seen.has(s.id)));
        if (fresh.length) return [...q, ...fresh.slice(0, 8)];
        // recycle pool if exhausted
        return [...q, ...shuffle(pool).slice(0, 8)];
      });
    }
  }, [idx, queue.length, stage, mode, activeCat]);

  const current = queue[idx];
  const correctCount = answers.filter((a) => a.correct).length;
  const wrong = answers.filter((a) => !a.correct).length;
  const score = correctCount * 10;
  const totalForPct = mode?.count === "infinite" ? answers.length : (mode?.count ?? 0);
  const pct = totalForPct ? Math.round((correctCount / totalForPct) * 100) : 0;
  const progress = mode?.count === "infinite"
    ? Math.min(100, (answers.length / 20) * 100)
    : totalForPct ? ((idx + (reveal ? 1 : 0)) / totalForPct) * 100 : 0;

  const choose = (c: "safe" | "scam") => {
    if (reveal || !current) return;
    setReveal(c);
    setAnswers((a) => [...a, { sim: current, chose: c, correct: c === current.answer }]);
  };

  const next = () => {
    setReveal(null);
    const nextIdx = idx + 1;
    if (mode?.count !== "infinite" && nextIdx >= (mode?.count ?? 0)) { setStage("done"); return; }
    setIdx(nextIdx);
  };

  const finish = () => setStage("done");

  const resetAll = () => {
    setStage("idle"); setMode(null); setActiveCat(null); setQueue([]); setIdx(0);
    setAnswers([]); setReveal(null); setReviewing(false);
  };

  const retry = () => { if (mode) { setReviewing(false); startQuiz(mode); } };

  const share = async () => {
    const a = achievementFor(score);
    const text = `I scored ${score} pts (${pct}%) on the CyberShield Scam Simulator and earned the ${a.name} ${a.emoji} badge. Test yourself: ${typeof window !== "undefined" ? window.location.origin : ""}/#simulator`;
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ title: "CyberShield Quiz", text });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        alert("Score copied to clipboard!");
      }
    } catch {/* user cancelled */}
  };

  const closeModal = () => resetAll();

  return (
    <Section id="simulator" eyebrow="Cyber awareness game" title={t("sim_title")} subtitle={t("sim_sub")}>
      {/* 4 BIG CATEGORY CARDS */}
      <div className="grid sm:grid-cols-2 gap-5">
        {SUPER_CATEGORIES.map((c) => {
          const Icon = c.icon;
          const count = bank.filter(c.match).length;
          return (
            <button
              key={c.id}
              onClick={() => openCategory(c)}
              className="text-left glass rounded-3xl p-6 sm:p-8 glow-hover group relative overflow-hidden min-h-[220px]"
            >
              <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${c.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.accent} flex items-center justify-center text-background shadow-[0_0_30px_var(--cyan-glow)]`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-1 rounded-full glass">
                    {count}+ scenarios
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.tagline}</p>
                <ul className="flex flex-wrap gap-1.5 mb-5">
                  {c.examples.map((e) => (
                    <li key={e} className="text-[10px] font-mono text-[var(--cyan-glow)]/90 px-2 py-1 rounded-full border border-[var(--cyan-glow)]/30">
                      {e}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-mono text-[var(--cyan-glow)] group-hover:gap-2 transition-all">
                  Start quiz →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* INTRO SCREEN */}
      {stage === "intro" && activeCat && (() => {
        const total = bank.filter(activeCat.match).length || bank.length;
        const difficulty = activeCat.id === "advanced" ? "Advanced" : activeCat.id === "banking" ? "Intermediate" : "Beginner → Intermediate";
        const estMin = Math.max(3, Math.round(total * 0.4));
        const learnings = [
          "How scammers manipulate victims",
          "How to identify phishing attempts",
          "How to avoid OTP scams",
          "How to spot fake job offers",
          "How to identify QR scams",
          "How to stay safe online",
        ];
        return (
          <div className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto animate-fade-in" onClick={closeModal}>
            <div className="glass-strong rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative my-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-border">
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--cyan-glow)] mb-3">
                  <ShieldAlert className="w-3 h-3" /> {activeCat.title}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  Welcome to <span className="text-[var(--cyan-glow)]">CyberShield Scam Simulator</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
                  This simulator helps you identify real-world cyber scams using realistic scenarios. Read each situation carefully and decide whether it is <span className="text-[var(--success)] font-semibold">Safe</span> or a <span className="text-destructive font-semibold">Scam</span>. Learn from mistakes and improve your cyber awareness.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="glass rounded-xl p-3 text-center">
                  <Target className="w-4 h-4 text-[var(--cyan-glow)] mx-auto mb-1" />
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">Scenarios</div>
                  <div className="font-display font-bold text-lg">{total}+</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <Zap className="w-4 h-4 text-[var(--cyan-glow)] mx-auto mb-1" />
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">Difficulty</div>
                  <div className="font-display font-bold text-xs leading-tight pt-1">{difficulty}</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <Sparkles className="w-4 h-4 text-[var(--cyan-glow)] mx-auto mb-1" />
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">Est. time</div>
                  <div className="font-display font-bold text-lg">~{estMin} min</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <Award className="w-4 h-4 text-[var(--cyan-glow)] mx-auto mb-1" />
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">Reward</div>
                  <div className="font-display font-bold text-lg">+10 pts</div>
                </div>
              </div>

              <div className="glass rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-3">
                  <BookOpen className="w-4 h-4" /> What you will learn
                </div>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                  {learnings.map((l) => (
                    <li key={l} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)] mt-0.5 shrink-0" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-4 mb-6 border border-[var(--cyan-glow)]/40 bg-gradient-to-r from-[var(--neon)]/10 to-[var(--cyan-glow)]/10">
                <div className="flex gap-3">
                  <AlertOctagon className="w-5 h-5 text-[var(--cyan-glow)] shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-sm">
                    <span className="font-semibold text-[var(--cyan-glow)]">Remember:</span> Cyber criminals create urgency and fear. Always verify before taking action.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStage("mode")}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-display font-bold text-lg glow-hover inline-flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" /> Start Simulation
              </button>
              <p className="text-center text-[10px] font-mono text-muted-foreground mt-3 uppercase tracking-wider">
                Next: pick how many questions you want to face
              </p>
            </div>
          </div>
        );
      })()}

      {/* MODE PICKER */}
      {stage === "mode" && activeCat && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto animate-fade-in" onClick={closeModal}>
          <div className="glass-strong rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative my-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-border">
              <X className="w-4 h-4" />
            </button>
            <div className="text-center mb-6">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--cyan-glow)] mb-2">{activeCat.title}</div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">Pick your challenge</h3>
              <p className="text-sm text-muted-foreground mt-2">Random questions pulled live from this category.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <button key={m.id} onClick={() => startQuiz(m)} className="glass rounded-2xl p-5 text-left glow-hover group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[var(--neon)]/20 text-[var(--neon)] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-display font-bold">{m.label}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{m.tagline}</div>
                    <div className="mt-3 text-[10px] font-mono text-[var(--cyan-glow)] opacity-0 group-hover:opacity-100 transition">Start →</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ PLAYING */}
      {stage === "playing" && current && mode && (
        <div className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-strong rounded-3xl max-w-xl w-full p-6 relative my-8">
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-border">
              <X className="w-4 h-4" />
            </button>

            {/* Progress + stats */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                <span>
                  {mode.count === "infinite"
                    ? <>Q{answers.length + (reveal ? 0 : 1)} • Unlimited</>
                    : <>Q{Math.min(idx + 1, mode.count)}/{mode.count} • {mode.label}</>}
                </span>
                <span className="text-[var(--cyan-glow)]">{score} pts • {pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-background/60 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex gap-4 mt-2 text-[11px] font-mono">
                <span className="text-[var(--success)]">✓ {correctCount} correct</span>
                <span className="text-destructive">✗ {wrong} wrong</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--neon)]/20 text-[var(--neon)] flex items-center justify-center">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold">{current.title}</div>
                <div className="text-xs text-muted-foreground font-mono">incoming via {current.channel}</div>
              </div>
            </div>

            <div className="rounded-xl bg-background/60 border border-border p-4 text-sm leading-relaxed relative">
              <div className="absolute -top-2 left-4 text-[10px] font-mono text-muted-foreground bg-background px-2">
                {current.channel}
              </div>
              {current.popup}
            </div>

            {!reveal ? (
              <>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button onClick={() => choose("safe")} className="py-3 rounded-lg glass hover:glow-border font-semibold text-[var(--success)]">✓ Safe</button>
                  <button onClick={() => choose("scam")} className="py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold">⚠ Scam</button>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground font-mono">Tap your verdict — instant reveal.</p>
              </>
            ) : (
              <div className="mt-5 space-y-3 animate-fade-in" key={current.id}>
                <div
                  className={`p-4 rounded-xl animate-scale-in ${
                    reveal === current.answer
                      ? "bg-[var(--success)]/15 border border-[var(--success)]/40 shadow-[0_0_30px_-5px_var(--success)]"
                      : "bg-destructive/15 border border-destructive/40 shadow-[0_0_30px_-5px_hsl(var(--destructive))]"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    {reveal === current.answer ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[var(--success)] animate-pulse" />
                        <span className="text-[var(--success)]">✓ Correct!</span>
                        <span className="ml-auto text-xs font-mono">+10 pts</span>
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-5 h-5 text-destructive animate-pulse" />
                        <span className="text-destructive">❌ Wrong</span>
                        <span className="ml-auto text-xs font-mono opacity-70">actually {current.answer}</span>
                      </>
                    )}
                  </div>
                </div>

                {current.redFlags.length > 0 && (
                  <div className="rounded-xl p-4 border border-destructive/30 bg-destructive/5">
                    <div className="text-xs font-mono uppercase tracking-wider text-destructive mb-2">🚩 Red flags</div>
                    <ul className="space-y-1 text-sm">
                      {current.redFlags.map((r, i) => (
                        <li key={i} className="flex gap-2"><span className="text-destructive">•</span>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-xl p-4 glass">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-1">
                    {reveal === current.answer ? "Why this matters" : "Why this is dangerous"}
                  </div>
                  <p className="text-sm text-muted-foreground">{current.why}</p>
                </div>

                <div className="rounded-xl p-4 border border-[var(--cyan-glow)]/40 bg-[var(--cyan-glow)]/5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--cyan-glow)] mb-1">Prevention tip</div>
                  <p className="text-sm">{current.tip}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {mode.count === "infinite" ? (
                    <>
                      <button onClick={finish} className="py-3 rounded-lg glass hover:glow-border font-semibold text-sm">Finish Quiz</button>
                      <button onClick={next} className="py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold text-sm">Next Question →</button>
                    </>
                  ) : (
                    <button onClick={next} className="col-span-2 py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold text-sm">
                      {idx + 1 >= (mode.count as number) ? "See Results →" : "Next Question →"}
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* RESULTS */}
      {stage === "done" && mode && (() => {
        const ach = achievementFor(score);
        const mistakes = answers.filter((a) => !a.correct);
        const maxScore = mode.count === "infinite" ? answers.length * 10 : (mode.count as number) * 10;
        const isChampion = pct >= 90;
        const isExcellent = pct >= 80 && !isChampion;
        return (
          <div className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md flex items-start sm:items-center justify-center p-4 overflow-y-auto animate-fade-in" onClick={closeModal}>
            <div className="glass-strong rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative my-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center hover:glow-border">
                <X className="w-4 h-4" />
              </button>

              {!reviewing ? (
                <>
                  {(isChampion || isExcellent) && (
                    <div className={`mb-5 p-4 rounded-2xl text-center animate-scale-in ${
                      isChampion
                        ? "bg-gradient-to-r from-[var(--neon)]/20 to-[var(--cyan-glow)]/20 border border-[var(--cyan-glow)]/50 shadow-[0_0_50px_-10px_var(--cyan-glow)]"
                        : "bg-[var(--success)]/15 border border-[var(--success)]/40 shadow-[0_0_40px_-10px_var(--success)]"
                    }`}>
                      <div className="text-3xl mb-1">{isChampion ? "🔥" : "🎉"}</div>
                      <div className="font-display text-xl font-bold">
                        {isChampion ? "CyberShield Champion" : "Excellent Work!"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isChampion ? "Your cyber awareness level is outstanding." : "You can identify most online scams."}
                      </p>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-scale-in">{ach.emoji}</div>
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--cyan-glow)]">Achievement unlocked</div>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold mt-1 text-[var(--cyan-glow)]">{ach.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{activeCat?.title} • {mode.label}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Score</div>
                      <div className="text-2xl font-display font-bold text-[var(--cyan-glow)]">{score}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">/ {maxScore}</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Accuracy</div>
                      <div className="text-2xl font-display font-bold">{pct}%</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Correct</div>
                      <div className="text-2xl font-display font-bold text-[var(--success)]">{correctCount}</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Wrong</div>
                      <div className="text-2xl font-display font-bold text-destructive">{wrong}</div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 text-[10px] font-mono">
                    {[
                      { pts: 50, name: "🥉 Cyber Beginner" },
                      { pts: 100, name: "🥈 Smart Clicker" },
                      { pts: 200, name: "🥇 Cyber Guardian" },
                      { pts: 300, name: "🏆 Scam Spotter Pro" },
                    ].map((b) => (
                      <div key={b.pts} className={`px-3 py-2 rounded-lg border ${score >= b.pts ? "border-[var(--cyan-glow)]/60 text-[var(--cyan-glow)] bg-[var(--cyan-glow)]/5" : "border-border text-muted-foreground opacity-60"}`}>
                        {b.pts}+ pts — {b.name}
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mt-6">
                    <button onClick={retry} className="py-3 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--cyan-glow)] text-background font-semibold inline-flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Retry quiz
                    </button>
                    <button onClick={() => setReviewing(true)} disabled={!mistakes.length} className="py-3 rounded-lg glass hover:glow-border font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50">
                      <BookOpen className="w-4 h-4" /> Review mistakes ({mistakes.length})
                    </button>
                    <button onClick={() => startQuiz(MODES[3])} className="py-3 rounded-lg glass hover:glow-border font-semibold inline-flex items-center justify-center gap-2">
                      <InfinityIcon className="w-4 h-4" /> Practice more
                    </button>
                    <button onClick={share} className="py-3 rounded-lg glass hover:glow-border font-semibold inline-flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Share score
                    </button>
                  </div>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full py-3 rounded-lg bg-destructive/90 hover:bg-destructive text-destructive-foreground font-semibold text-sm inline-flex items-center justify-center gap-2"
                  >
                    <Flag className="w-4 h-4" /> Report a real scam
                  </a>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setReviewing(false)} className="w-8 h-8 rounded-full glass hover:glow-border flex items-center justify-center">←</button>
                    <h3 className="font-display text-2xl font-bold">Review mistakes</h3>
                  </div>
                  {mistakes.length === 0 ? (
                    <p className="text-muted-foreground">Flawless run — nothing to review!</p>
                  ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                      {mistakes.map((m, i) => (
                        <div key={i} className="glass rounded-xl p-4">
                          <div className="flex items-center gap-2 font-semibold mb-1">
                            <m.sim.icon className="w-4 h-4 text-[var(--cyan-glow)]" />{m.sim.title}
                            <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full border border-destructive/40 text-destructive">
                              You said {m.chose} • Actually {m.sim.answer}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{m.sim.popup}</p>
                          <p className="text-xs"><span className="text-[var(--cyan-glow)] font-mono">Tip:</span> {m.sim.tip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })()}
    </Section>
  );
}
