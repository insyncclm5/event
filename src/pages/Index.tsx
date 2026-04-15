import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Calendar, Users, QrCode, Award, BarChart3, Bell,
  Smartphone, Download, UserCheck, Shield, ArrowRight,
  CheckCircle, IndianRupee, Star, Gift, Sparkles,
  ShieldCheck, Timer, Menu, X, ChevronDown, ChevronUp,
  Trophy, Target, Zap, Share2, Mail, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoWhite from '@/assets/logo-white.png';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 500, suffix: '+', label: 'Events Managed' },
  { value: 50, suffix: 'K+', label: 'Attendees Served' },
  { value: 99, suffix: '.8%', label: 'Check-in Accuracy' },
  { value: 4, suffix: '.9/5', label: 'Organizer Rating' },
];

const FEATURES = [
  { icon: Calendar, title: 'Event Management', description: 'Create and manage events with agendas, venues, and multi-organizer teams.', color: 'bg-blue-500/10 text-blue-600' },
  { icon: Users, title: 'Attendee Registration', description: 'Custom registration forms with automatic QR codes and email confirmations.', color: 'bg-emerald-500/10 text-emerald-600' },
  { icon: QrCode, title: 'QR Check-In', description: 'Instant check-in via mobile QR scan — no queues, no manual lists.', color: 'bg-violet-500/10 text-violet-600' },
  { icon: Award, title: 'Certificates & Badges', description: 'Auto-generate branded certificates with custom templates and verification URLs.', color: 'bg-rose-500/10 text-rose-600' },
  { icon: BarChart3, title: 'Real-time Analytics', description: 'Live dashboards for registrations, check-ins, and engagement metrics.', color: 'bg-amber-500/10 text-amber-600' },
  { icon: Trophy, title: 'Gamification', description: 'Points, leaderboards, and badges that keep attendees engaged throughout.', color: 'bg-teal-500/10 text-teal-600' },
  { icon: Target, title: 'Networking & Meetings', description: '1:1 meeting slots, discussion topics, and follow-up tracking built in.', color: 'bg-pink-500/10 text-pink-600' },
  { icon: Share2, title: 'Content Sharing', description: 'Share session recordings, slides, and resources with attendees post-event.', color: 'bg-indigo-500/10 text-indigo-600' },
  { icon: Smartphone, title: 'Mobile PWA', description: 'Install as a phone app — works offline, loads fast, feels native.', color: 'bg-orange-500/10 text-orange-600' },
  { icon: Download, title: 'Excel Export', description: 'One-click export of attendee lists, check-ins, and analytics data.', color: 'bg-cyan-500/10 text-cyan-600' },
];

const HOW_IT_WORKS = [
  { step: 1, icon: Calendar, title: 'Create Your Event', description: 'Set up your event in minutes — add agenda, speakers, venue, and custom registration fields.' },
  { step: 2, icon: Mail, title: 'Invite Attendees', description: 'Share your registration link. Attendees sign up and instantly receive their QR code.' },
  { step: 3, icon: QrCode, title: 'Run Check-In', description: 'Scan QR codes at the gate. Track attendance live on your dashboard — no paper, no stress.' },
  { step: 4, icon: Award, title: 'Wrap Up & Reward', description: 'Issue certificates, export data, review analytics, and distribute content to attendees.' },
];

const GAMIFICATION = [
  { icon: Trophy, title: 'Leaderboards & Points', description: 'Award points for check-ins, session attendance, and activities. Top attendees compete in real time.' },
  { icon: Award, title: 'Digital Badges', description: 'Create custom badges tied to milestones. Attendees earn them — and share them.' },
  { icon: Gift, title: 'Rewards Redemption', description: 'Set up a reward catalog. Attendees redeem points for prizes, swag, or experiences.' },
];

const TESTIMONIALS = [
  {
    quote: 'We ran a 2,000-person conference with Event-Sync. Check-in for all attendees took under 20 minutes. Our previous system took 2 hours.',
    name: 'Priya Nair',
    role: 'Head of Events',
    company: 'TechSummit India',
    initials: 'PN',
    rating: 5,
  },
  {
    quote: 'The gamification module changed everything. Attendees were competing on the leaderboard all day. Engagement was through the roof.',
    name: 'Rahul Mehta',
    role: 'Community Manager',
    company: 'StartupWeek Mumbai',
    initials: 'RM',
    rating: 5,
  },
  {
    quote: 'At ₹199 per user, it pays for itself after the first event. The certificate automation alone saves our team 6 hours per event.',
    name: 'Sneha Kapoor',
    role: 'Operations Lead',
    company: 'EduCon India',
    initials: 'SK',
    rating: 5,
  },
];

const FAQS = [
  {
    q: 'What counts as a "user" for billing?',
    a: 'A user is any team member who manages or operates events on the platform — organizers, staff, and admins. Attendees who register for your events are free and unlimited.',
  },
  {
    q: 'What happens after the free trial ends?',
    a: "After 2 events or 30 days (whichever comes first), you move to the paid plan at ₹199/user/month. We'll remind you 7 days before. No automatic charge without confirmation.",
  },
  {
    q: 'Can I export my data if I cancel?',
    a: 'Yes. You can export all attendee data, registrations, analytics, and certificates in Excel format at any time — including after cancellation.',
  },
  {
    q: 'Is attendee data secure?',
    a: 'Yes. Data is stored with row-level security, encrypted at rest and in transit. We do not sell or share attendee data with third parties.',
  },
  {
    q: 'Does it work for small events (under 100 people)?',
    a: 'Absolutely. The platform works for events of any size — from 20-person workshops to 5,000-person conferences. Most features are identical regardless of scale.',
  },
  {
    q: 'Can multiple organizers manage the same event?',
    a: 'Yes. You can add team members with different roles — event manager, staff, sales rep — each with appropriate access levels.',
  },
];

const PRICING_FEATURES = [
  'Unlimited events',
  'Unlimited attendees',
  'Custom registration forms',
  'QR code check-in',
  'Certificates & badge templates',
  'Gamification & leaderboards',
  'Networking & meeting spots',
  'Real-time analytics dashboard',
  'Content library & sharing',
  'Excel export',
  'Multi-organizer support',
  'Email notifications',
];

const TRUSTED_BY = ['TechSummit India', 'StartupWeek', 'EduCon', 'MedConf', 'FinFest', 'HRLeaders'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="border border-slate-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 pr-4">{q}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
          : <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-slate-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setNavScrolled(v > 20));

  return (
    <div className="bg-white overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.3} 50%{transform:translateY(-22px) rotate(8deg);opacity:.7} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.2} 50%{transform:translateY(-16px) rotate(-6deg);opacity:.5} }
        @keyframes float3 { 0%,100%{transform:translateY(0);opacity:.15} 50%{transform:translateY(-28px);opacity:.45} }
      `}</style>

      {/* ── 1. STICKY NAV ── */}
      <header className={`sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md transition-shadow duration-300 ${navScrolled ? 'shadow-lg shadow-black/30' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <img src={logoWhite} alt="In-Sync" className="h-8 w-auto flex-shrink-0" />

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5">
              Login
            </Link>
            <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-500/25">
              <Link to="/register">Start Free Trial</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-white/80 hover:text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 bg-slate-900 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                {[['#features', 'Features'], ['#how-it-works', 'How It Works'], ['#pricing', 'Pricing'], ['#faq', 'FAQ']].map(([href, label]) => (
                  <a key={href} href={href} className="text-white/70 hover:text-white text-sm" onClick={() => setMobileOpen(false)}>
                    {label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <Link to="/login" className="text-center text-sm text-white/70 py-2">Login</Link>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                    <Link to="/register">Start Free Trial</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 2. HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-900 scroll-mt-16">
        <div className="absolute -top-40 -right-32 w-[560px] h-[560px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute top-24 left-[15%] w-2 h-2 rounded-full bg-blue-400/40" style={{ animation: 'float1 4s ease-in-out infinite' }} />
        <div className="absolute top-40 right-[20%] w-3 h-3 rounded-full bg-teal-400/30" style={{ animation: 'float2 5s ease-in-out infinite 0.5s' }} />
        <div className="absolute bottom-32 left-[30%] w-1.5 h-1.5 rounded-full bg-blue-300/35" style={{ animation: 'float3 6s ease-in-out infinite 1s' }} />
        <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-indigo-400/30" style={{ animation: 'float1 5.5s ease-in-out infinite 1.5s' }} />
        <div className="absolute bottom-1/4 right-[35%] w-1 h-1 rounded-full bg-teal-300/40" style={{ animation: 'float2 4.5s ease-in-out infinite 0.8s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-sm mb-8">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              The complete event platform for modern teams
            </span>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-balance leading-[1.1]"
          >
            Run Smarter Events.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400">
              Delight Every Attendee.
            </span>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-6 text-lg sm:text-xl text-white/65 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Spreadsheets, WhatsApp groups, and manual check-ins don't scale.
            Event-Sync gives you one platform for registration, check-in, gamification,
            certificates, and analytics — from first invite to final report.
          </motion.p>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-xl shadow-blue-500/30 text-base px-8">
              <Link to="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors"
            >
              See How It Works
              <ChevronDown className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/50 text-sm"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Timer className="h-4 w-4 text-blue-400" /> 2 events free trial</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.9/5 organizer rating</span>
          </motion.div>

          {/* Product Demo Walkthrough */}
          <motion.div
            custom={5} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-16 relative max-w-5xl mx-auto"
          >
            {/* Browser chrome */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <div className="ml-3 flex-1 bg-white/10 rounded-md h-5 max-w-xs flex items-center px-3">
                  <span className="text-white/30 text-[10px]">event-sync.app/demo</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ height: '480px' }}>
                <iframe
                  src="/demo"
                  className="w-full h-full border-0"
                  title="Event-Sync Product Demo"
                />
              </div>
            </div>
            {/* Caption */}
            <p className="mt-4 text-center text-white/40 text-xs">
              Interactive product walkthrough · <a href="/demo" target="_blank" className="text-white/60 hover:text-white underline transition-colors">Open full screen</a>
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30" style={{ animation: 'float2 2s ease-in-out infinite' }}>
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ── 3. STATS BAR ── */}
      <section className="bg-slate-800 border-y border-white/10 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label} custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-sm text-white/50">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. TRUSTED BY ── */}
      <section className="bg-slate-900 py-10 overflow-hidden border-b border-white/10">
        <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-6 font-medium">
          Trusted by organizers at
        </p>
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap marquee-track">
            {[...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
              <span key={i} className="inline-block px-10 text-white/25 text-base font-semibold tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEATURES GRID ── */}
      <section id="features" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium mb-4"
            >
              <Zap className="h-3.5 w-3.5" /> Everything in one platform
            </motion.span>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 text-balance"
            >
              Every tool your event team needs
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-4 text-lg text-slate-500 max-w-xl mx-auto"
            >
              Stop stitching together a dozen apps. Event-Sync handles the full lifecycle.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                className="group rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:border-slate-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-11 w-11 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-slate-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-600 border border-violet-100 px-3 py-1 rounded-full text-sm font-medium mb-4"
            >
              <Clock className="h-3.5 w-3.5" /> Setup in under 10 minutes
            </motion.span>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              From zero to live in 4 steps
            </motion.h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent hidden md:block" />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-30px' }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4 z-10 flex-shrink-0">
                  {step.step}
                </div>
                <step.icon className="h-6 w-6 text-blue-500 mb-3" />
                <h3 className="font-semibold text-slate-800 text-base mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GAMIFICATION SHOWCASE ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-blue-400 text-sm font-semibold uppercase tracking-widest"
            >
              Built-in Engagement
            </motion.span>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-3 text-3xl sm:text-4xl font-bold text-white text-balance"
            >
              The only event platform with built-in gamification
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-5 text-lg text-white/65 leading-relaxed"
            >
              Most events lose attendees to their phones by hour 2. Event-Sync keeps them
              engaged with real-time leaderboards, badges, and rewards — no third-party tools needed.
            </motion.p>
            <div className="mt-8 space-y-5">
              {GAMIFICATION.map((g, i) => (
                <motion.div
                  key={g.title} custom={i + 3} variants={fadeUp} initial="hidden"
                  whileInView="visible" viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <g.icon className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{g.title}</div>
                    <div className="text-white/55 text-sm mt-0.5 leading-relaxed">{g.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="text-white font-semibold">Live Leaderboard</div>
                <span className="text-xs text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/20">● Live</span>
              </div>
              <div className="space-y-3">
                {[
                  { rank: '🥇', name: 'Priya Nair', pts: 520, bar: 'w-full' },
                  { rank: '🥈', name: 'Rahul Mehta', pts: 480, bar: 'w-11/12' },
                  { rank: '🥉', name: 'Sneha K.', pts: 395, bar: 'w-9/12' },
                  { rank: '4', name: 'Amit Joshi', pts: 310, bar: 'w-7/12' },
                  { rank: '5', name: 'Kavya R.', pts: 260, bar: 'w-5/12' },
                ].map((r, i) => (
                  <motion.div key={r.name} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3">
                    <span className="text-base w-6 text-center flex-shrink-0">{r.rank}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-xs font-medium truncate">{r.name}</span>
                        <span className="text-blue-400 text-xs font-semibold ml-2 flex-shrink-0">{r.pts} pts</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${r.bar} bg-gradient-to-r from-blue-500 to-teal-400 rounded-full`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-white/40 text-xs mb-2">Recent badges earned</div>
                <div className="flex gap-2 flex-wrap">
                  {['Early Bird 🐦', 'Session Pro 🎯', 'Networker 🤝'].map(b => (
                    <span key={b} className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full border border-white/10">{b}</span>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-teal-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg shadow-blue-500/40"
              style={{ animation: 'float1 3s ease-in-out infinite' }}
            >
              🎉 +50 pts earned!
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              Loved by event organizers
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-4 text-lg text-slate-500"
            >
              Join 500+ teams already running better events
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-30px' }}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section id="faq" className="py-24 bg-slate-50 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              Frequently asked questions
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-4 text-slate-500"
            >
              Everything you need to know before getting started.
            </motion.p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. PRICING ── */}
      <section id="pricing" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <motion.span variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium mb-4"
            >
              <IndianRupee className="h-3.5 w-3.5" /> Pricing
            </motion.span>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-4 text-lg text-slate-500"
            >
              One plan. Every feature. No surprises.
            </motion.p>
          </div>

          {/* Free trial banner */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3"
          >
            <Gift className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-800 font-semibold text-sm">Free Trial Included</p>
              <p className="text-emerald-700 text-sm mt-0.5">
                Run <strong>2 events</strong> or use for <strong>30 days</strong> — whichever comes first.
                No credit card required to start.
              </p>
            </div>
          </motion.div>

          {/* Pricing card */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative rounded-3xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 via-white to-teal-50/40 p-10 shadow-2xl shadow-blue-500/10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              Most Popular
            </div>

            <div className="text-center mb-8">
              <div className="flex items-end justify-center gap-1 mt-4">
                <IndianRupee className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-6xl font-extrabold text-slate-900 tracking-tight">199</span>
                <span className="text-slate-500 mb-2 text-sm">/user/month</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">Billed monthly · Cancel anytime</p>
            </div>

            <ul className="space-y-3 mb-8">
              {PRICING_FEATURES.map((feat) => (
                <li key={feat} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{feat}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-500/25 text-base">
              <Link to="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-center text-slate-400 text-xs mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ── */}
      <section className="relative py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance"
          >
            Ready to transform your events?
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-5 text-xl text-white/75"
          >
            Join 500+ organizers already running smarter events with Event-Sync.
          </motion.p>
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 border-0 shadow-xl font-semibold text-base px-8">
              <Link to="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Browse Events
            </Link>
          </motion.div>
          <motion.p custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-6 text-white/50 text-sm"
          >
            No credit card · 2 events free · Setup in 5 minutes
          </motion.p>
        </div>
      </section>

      {/* ── 12. FOOTER ── */}
      <footer className="bg-slate-900 text-white/60 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <img src={logoWhite} alt="In-Sync" className="h-8 w-auto mb-4 opacity-90" />
              <p className="text-sm leading-relaxed max-w-xs">
                The complete event management platform for modern teams. Registration to report, all in one place.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                {[['Features', '#features'], ['Pricing', '#pricing'], ['Security', '#'], ['Changelog', '#']].map(([l, h]) => (
                  <li key={l}><a href={h} className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                {['About', 'Blog', 'Careers', 'Contact'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
            <span>© {new Date().getFullYear()} In-Sync. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Data encrypted at rest and in transit</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
