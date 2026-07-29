import {
  PiggyBank, Wallet, Briefcase, GraduationCap, Baby, Users, Building2, TrendingUp,
  Landmark, Home, Car, Tractor, HeartHandshake, Smartphone, Globe, CreditCard,
  QrCode, Hash, ShieldCheck, HeadphonesIcon, Zap, Award,
} from "lucide-react";
import testimonialAvatar from "@/assets/cocoa.jpg";
import amaSerwaaAvatar from "@/assets/ama-serwaa.jpg";
import yawOwusuAvatar from "@/assets/yaw-owusu.jpg";
import akosuaAvatar from "@/assets/akosua-nyarko.jpg";
import efuaAvatar from "@/assets/efua-mensah.jpg";

export const bank = {
  name: "St. Margaret Co-operative Savings and Development Society.",
  shortName: "St. Margaret Co-operative",
  subtitle: "Savings & Development Society.",
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
  { value: 6, suffix: "+", label: "Branches Nationwide" },
  { value: 3, suffix: "+", label: "Years of Service" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

export const whyUs = [
  { icon: ShieldCheck, title: "Trusted Banking", desc: "Fully licensed and regulated. Deposits secured by rigorous risk controls." },
  { icon: Landmark, title: "Secure Transactions", desc: "Bank-grade encryption and 24/7 fraud monitoring on every transfer." },
  { icon: HeadphonesIcon, title: "Fast Customer Support", desc: "Dedicated relationship officers and multi-channel support in your language." },
  { icon: Zap, title: "Innovative Digital Banking", desc: "Mobile and USSD banking that work — even on low bandwidth." },
];

export const missionVisionValues = {
  mission: {
    title: "Our Mission",
    desc: "To provide affordable financial services and improve the socio-economic well-being of our members through savings mobilization, responsible lending, and community development initiatives.",
    icon: HeartHandshake,
  },
  vision: {
    title: "Our Vision",
    desc: "To be a leading cooperative institution in Ashanti Region promoting financial inclusion, empowerment, and sustainable development.",
    icon: Award,
  },
  values: {
    title: "Our Core Values",
    desc: "Integrity, Accountability, Service, Teamwork, Innovation, and Member-Centric.",
    icon: TrendingUp,
  },
};

export const savings = [
  { icon: PiggyBank, name: "Regular Savings", rate: "3.5% p.a.", min: "GHS 20", fee: "GHS 20", features: ["Free monthly statement", "ATM card included", "Entrance fee applied"], desc: "A flexible everyday savings account for individuals." },
  { icon: GraduationCap, name: "Youth Savings", rate: "4.0% p.a.", min: "GHS 10", fee: "GHS 20", features: ["Ages 13–24", "Free financial literacy", "Bonus at 18"], desc: "Grow with us — designed for students and young adults." },
  { icon: Baby, name: "Children Savings", rate: "4.5% p.a.", min: "GHS 5", fee: "GHS 20", features: ["Parent-managed", "Education bonus", "Birthday gifts"], desc: "Start early. Build a future for your children." },
  { icon: Wallet, name: "Salary Account", rate: "3.0% p.a.", min: "GHS 0", fee: "GHS 20", features: ["Same-day salary credit", "Overdraft up to 40%", "Free debit card"], desc: "For working professionals with a regular income." },
  { icon: TrendingUp, name: "Fixed Deposit", rate: "12.5% p.a.", min: "GHS 500", fee: "GHS 20", features: ["1–24 month tenors", "Auto-rollover", "Loan against deposit"], desc: "Lock in higher returns with our fixed deposit." },
  { icon: Briefcase, name: "Business Savings", rate: "5.5% p.a.", min: "GHS 200", fee: "GHS 20", features: ["Multi-signatory", "Payroll support", "Cash pickup"], desc: "Purpose-built for SMEs and cooperatives." },
];

export const loans = [
  { icon: Users, name: "Susu Loans", max: "GHS 5,000", rate: "18% p.a.", requirements: ["Susu group membership", "ID"], desc: "Small, short-term loans for rotating savings members." },
  { icon: PiggyBank, name: "Savings Loans", max: "GHS 50,000", rate: "16% p.a.", requirements: ["Linked savings account", "Minimum balance"], desc: "Loans secured against your savings or fixed deposits." },
  { icon: Users, name: "Group Loans", max: "GHS 100,000", rate: "17% p.a.", requirements: ["Group registration", "Group guarantors"], desc: "Lending to registered groups and cooperatives for joint activities." },
  { icon: Tractor, name: "Agric Loans", max: "GHS 250,000", rate: "14% p.a.", requirements: ["Farm plan", "Harvest schedule", "Insurance recommended"], desc: "Seasonal and input finance tailored for farmers and agribusiness." },
  { icon: ShieldCheck, name: "Emergency Loans", max: "GHS 10,000", rate: "20% p.a.", requirements: ["ID", "Account history"], desc: "Quick access to funds for urgent household or health needs." },
  { icon: HeartHandshake, name: "Funeral Loans", max: "GHS 15,000", rate: "15% p.a.", requirements: ["ID", "Proof of relation"], desc: "Short-term support to cover funeral and related expenses." },
];

export const digital = [
  { icon: Smartphone, name: "Mobile Banking", desc: "Native app for Android and iOS." },
  { icon: Hash, name: "USSD Banking", desc: "Dial *889*905# for balance enquiry and quick banking services without internet." },
];

export const investments = [
  { icon: TrendingUp, name: "Fixed Deposits", rate: "12.5% p.a.", tenor: "1 – 24 months", desc: "Predictable returns with flexible tenors." },
  { icon: TrendingUp, name: "Shares", rate: "Market-based", tenor: "Flexible", desc: "Invest in local share opportunities to grow ownership and return potential." },
  { icon: Briefcase, name: "Corporate Investments", rate: "Custom", tenor: "3 – 60 months", desc: "Structured investment products for corporates." },
  { icon: HeartHandshake, name: "Retirement Savings", rate: "9.0% p.a.", tenor: "Long-term", desc: "Plan for a comfortable retirement." },
  { icon: Users, name: "Investment Advisory", rate: "—", tenor: "On-going", desc: "One-on-one guidance from our wealth team." },
];

export const testimonials = [
  { name: "Ama Serwaa", role: "SME Owner, Kumasi", avatar: amaSerwaaAvatar, rating: 5, quote: "St. Margaret Co-operative Savings and Development Society. funded my expansion in under 10 days. The team truly understands small business." },
  { name: "Kwame Boateng", role: "Cocoa Farmer, Ashanti", avatar: testimonialAvatar, rating: 5, quote: "Their agriculture loan and mobile banking changed my life. I now farm 40 acres." },
  { name: "Efua Mensah", role: "Teacher, Cape Coast", avatar: efuaAvatar, rating: 5, quote: "My salary account and children's savings are both here. Simple, honest, reliable." },
  { name: "Yaw Owusu", role: "Trader, Tamale", avatar: yawOwusuAvatar, rating: 4, quote: "USSD banking works even in my village. That's what real financial inclusion looks like." },
  { name: "Akosua Nyarko", role: "Nurse, Accra", avatar: akosuaAvatar, rating: 5, quote: "The mobile app is beautiful and fast. Transfers land instantly, every time." },
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
  { q: "Do you offer mobile banking?", a: "Yes — via our mobile app and USSD *889*905#. No internet banking is provided." },
  { q: "How do I access USSD banking?", a: "Dial *889*905# from any phone to check balance, transfer funds and buy airtime." },
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

export const gallery = [
  { name: "Kwaku Mensah", role: "Executive Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
  { name: "Ama Ofori", role: "Head of Operations", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },
  { name: "Kofi Asante", role: "Finance Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop" },
  { name: "Esi Boateng", role: "Customer Relations Officer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop" },
  { name: "Kwesi Osei", role: "Credit Officer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
  { name: "Abena Kuma", role: "Digital Banking Specialist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },
  { name: "Yaw Oppong", role: "Loan Officer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop" },
  { name: "Nadia Owusu", role: "Compliance Officer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop" },
  { name: "Marcus Adjei", role: "IT Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
];
