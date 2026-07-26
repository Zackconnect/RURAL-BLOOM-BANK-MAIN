import {
  PiggyBank, Wallet, Briefcase, GraduationCap, Baby, Users, Building2, TrendingUp,
  Landmark, Home, Car, Tractor, HeartHandshake, Smartphone, Globe, CreditCard,
  QrCode, Hash, ShieldCheck, HeadphonesIcon, Zap, Award,
} from "lucide-react";

export const bank = {
  name: "St. Margaret Co-operative Savings and Development Society.",
  short: "AKRB",
  tagline: "Banking Made Simple for Everyone",
  phone: "0200938636",
  whatsapp: "233301234567",
  email: "stmargaretcoop.gmail.com",
  address: "Mfensi - Kumasi. P.O. BOX PM 99",
  social: {
    facebook: "#", twitter: "#", instagram: "#", linkedin: "#", youtube: "#",
  },
};

export const stats = [
  { value: 150000, suffix: "+", label: "Happy Customers" },
  { value: 50, suffix: "+", label: "Branches Nationwide" },
  { value: 25, suffix: "+", label: "Years of Service" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

export const whyUs = [
  { icon: ShieldCheck, title: "Trusted Banking", desc: "Fully licensed and regulated. Deposits secured by rigorous risk controls." },
  { icon: Landmark, title: "Secure Transactions", desc: "Bank-grade encryption and 24/7 fraud monitoring on every transfer." },
  { icon: HeadphonesIcon, title: "Fast Customer Support", desc: "Dedicated relationship officers and multi-channel support in your language." },
  { icon: Zap, title: "Innovative Digital Banking", desc: "Mobile, USSD and internet banking that work — even on low bandwidth." },
];

export const savings = [
  { icon: PiggyBank, name: "Regular Savings", rate: "3.5% p.a.", min: "GHS 20", features: ["Free monthly statement", "No hidden fees", "ATM card included"], desc: "A flexible everyday savings account for individuals." },
  { icon: GraduationCap, name: "Youth Savings", rate: "4.0% p.a.", min: "GHS 10", features: ["Ages 13–24", "Free financial literacy", "Bonus at 18"], desc: "Grow with us — designed for students and young adults." },
  { icon: Baby, name: "Children Savings", rate: "4.5% p.a.", min: "GHS 5", features: ["Parent-managed", "Education bonus", "Birthday gifts"], desc: "Start early. Build a future for your children." },
  { icon: Wallet, name: "Salary Account", rate: "3.0% p.a.", min: "GHS 0", features: ["Same-day salary credit", "Overdraft up to 40%", "Free debit card"], desc: "For working professionals with a regular income." },
  { icon: TrendingUp, name: "Fixed Deposit", rate: "12.5% p.a.", min: "GHS 500", features: ["1–24 month tenors", "Auto-rollover", "Loan against deposit"], desc: "Lock in higher returns with our fixed deposit." },
  { icon: Briefcase, name: "Business Savings", rate: "5.5% p.a.", min: "GHS 200", features: ["Multi-signatory", "Payroll support", "Cash pickup"], desc: "Purpose-built for SMEs and cooperatives." },
];

export const loans = [
  { icon: Users, name: "Personal Loan", max: "GHS 100,000", rate: "18% p.a.", requirements: ["Valid ID", "3 months payslip", "Guarantor"], desc: "Fast, flexible cash for life's moments." },
  { icon: Briefcase, name: "Business Loan", max: "GHS 500,000", rate: "22% p.a.", requirements: ["Business registration", "6 months bank statement", "Collateral"], desc: "Working capital and expansion finance for SMEs." },
  { icon: Tractor, name: "Agriculture Loan", max: "GHS 250,000", rate: "16% p.a.", requirements: ["Farm assessment", "Off-taker letter", "Insurance"], desc: "Seasonal and asset finance for farmers." },
  { icon: Home, name: "Mortgage", max: "GHS 1,500,000", rate: "19% p.a.", requirements: ["Property valuation", "Down payment 20%", "Income proof"], desc: "Own your home with terms up to 20 years." },
  { icon: Car, name: "Vehicle Loan", max: "GHS 300,000", rate: "20% p.a.", requirements: ["Vehicle quotation", "Insurance", "Down payment 25%"], desc: "New and used vehicle finance." },
  { icon: GraduationCap, name: "Educational Loan", max: "GHS 150,000", rate: "14% p.a.", requirements: ["Admission letter", "Guarantor", "Fee schedule"], desc: "Invest in tuition, books and living costs." },
];

export const digital = [
  { icon: Globe, name: "Internet Banking", desc: "Full-featured web banking on any device." },
  { icon: Smartphone, name: "Mobile Banking", desc: "Native app for Android and iOS." },
  { icon: Hash, name: "USSD Banking", desc: "Dial *714*555# — no internet required." },
  { icon: Landmark, name: "ATM Services", desc: "500+ ATMs across the country." },
  { icon: CreditCard, name: "Visa Cards", desc: "Debit and prepaid Visa for global payments." },
  { icon: CreditCard, name: "MasterCard", desc: "MasterCard debit and credit options." },
  { icon: QrCode, name: "QR Payments", desc: "Scan-to-pay at thousands of merchants." },
  { icon: Award, name: "Rewards", desc: "Earn points on every card transaction." },
];

export const investments = [
  { icon: Landmark, name: "Treasury Bills", rate: "27.5% p.a.", tenor: "91 / 182 / 364 days", desc: "Government-backed short-term investments." },
  { icon: TrendingUp, name: "Fixed Deposits", rate: "12.5% p.a.", tenor: "1 – 24 months", desc: "Predictable returns with flexible tenors." },
  { icon: Briefcase, name: "Corporate Investments", rate: "Custom", tenor: "3 – 60 months", desc: "Structured investment products for corporates." },
  { icon: HeartHandshake, name: "Retirement Savings", rate: "9.0% p.a.", tenor: "Long-term", desc: "Plan for a comfortable retirement." },
  { icon: Users, name: "Investment Advisory", rate: "—", tenor: "On-going", desc: "One-on-one guidance from our wealth team." },
];

export const testimonials = [
  { name: "Ama Serwaa", role: "SME Owner, Kumasi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80", rating: 5, quote: "St. Margaret Co-operative Savings and Development Society. funded my expansion in under 10 days. The team truly understands small business." },
  { name: "Kwame Boateng", role: "Cocoa Farmer, Ashanti", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&q=80", rating: 5, quote: "Their agriculture loan and mobile banking changed my life. I now farm 40 acres." },
  { name: "Efua Mensah", role: "Teacher, Cape Coast", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=120&h=120&fit=crop&q=80", rating: 5, quote: "My salary account and children's savings are both here. Simple, honest, reliable." },
  { name: "Yaw Owusu", role: "Trader, Tamale", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&q=80", rating: 4, quote: "USSD banking works even in my village. That's what real financial inclusion looks like." },
  { name: "Akosua Nyarko", role: "Nurse, Accra", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&q=80", rating: 5, quote: "The mobile app is beautiful and fast. Transfers land instantly, every time." },
];

export const news = [
  { title: "St. Margaret Co-operative Savings and Development Society. Launches New Mobile App 3.0", date: "18 July 2026", excerpt: "A completely redesigned app with AI insights, budgeting and instant loans.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop" },
  { title: "GHS 20 Million Committed to Youth Agri-Finance", date: "02 July 2026", excerpt: "New program targets 5,000 young farmers with concessional loans and mentorship.", img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop" },
  { title: "AKRB Wins Best Rural Bank of the Year 2026", date: "20 June 2026", excerpt: "Recognized for outstanding community impact and digital transformation.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop" },
];

export const branches = [
  { name: "Head Office, Mfensi - Kumasi", address: "P.O. BOX PM 99, Mfensi - Kumasi", phone: "0200938636", hours: "Mon–Fri 8:30am–4pm • Sat 9am–1pm", region: "Ashanti" },
  { name: "Central Market Branch", address: "Central Market, Kumasi", phone: "0200938636", hours: "Mon–Fri 8:30am–4pm", region: "Ashanti" },
  { name: "Bokankye Branch", address: "Bokankye, Kumasi", phone: "0200938636", hours: "Mon–Fri 8:30am–4pm", region: "Ashanti" },
  { name: "Asuoso Branch", address: "Asuoso, Kumasi", phone: "0200938636", hours: "Mon–Fri 8:30am–4pm", region: "Ashanti" },
  { name: "Adugyama Branch", address: "Adugyama, Kumasi", phone: "0200938636", hours: "Mon–Fri 8:30am–4pm", region: "Ashanti" },
];

export const faqs = [
  { q: "How do I open an account?", a: "Visit any branch with a valid ID (Ghana Card, passport or voter ID) and proof of address, or start online and complete verification at a branch." },
  { q: "What is the minimum balance to open a savings account?", a: "As low as GHS 5 for Children Savings and GHS 20 for Regular Savings. See the Savings page for full details." },
  { q: "How long does a loan application take?", a: "Personal loans typically 48–72 hours after full documentation. Business and mortgage loans 5–10 working days." },
  { q: "Is my money safe with St. Margaret Co-operative Savings and Development Society.?", a: "Yes. We are licensed and supervised by the Bank of Ghana, with strong capital adequacy and rigorous risk controls." },
  { q: "Do you offer mobile banking?", a: "Yes — via our mobile app, USSD *714*555# and full-featured internet banking." },
  { q: "How do I reset my internet banking password?", a: "Click 'Forgot Password' on the login page, or call our 24/7 contact center." },
  { q: "Can I bank in a foreign currency?", a: "Yes, we offer USD, EUR and GBP accounts at selected branches." },
  { q: "What are your working hours?", a: "Monday to Friday 8:30am–4:00pm and Saturday 9:00am–1:00pm at most branches." },
];

export const careers = [
  { title: "Relationship Officer", location: "Kumasi", type: "Full-time", desc: "Grow and manage a portfolio of SME and retail customers." },
  { title: "Credit Analyst", location: "Accra", type: "Full-time", desc: "Assess credit applications and structure lending proposals." },
  { title: "Mobile App Engineer", location: "Accra (Hybrid)", type: "Full-time", desc: "Build features for our React Native mobile banking app." },
  { title: "Branch Manager", location: "Tamale", type: "Full-time", desc: "Lead a full-service branch and its team." },
  { title: "Compliance Officer", location: "Accra", type: "Full-time", desc: "Own AML/KYC operations and regulatory reporting." },
  { title: "Customer Service Representative", location: "Multiple", type: "Full-time", desc: "Deliver exceptional service across phone, chat and branch channels." },
];
