/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  MdOutlineAppRegistration,
  MdOutlineAddCircleOutline,
  MdOutlinePictureAsPdf,
} from 'react-icons/md';

const MotionNavLink = motion.create(NavLink);

function ScrollGradient() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary orb — indigo */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] -top-[20%] -left-[15%] rounded-full blur-[140px]"
        style={{
          y: y1,
          background: 'var(--orb-1)',
        }}
      />
      {/* Secondary orb — violet */}
      <motion.div
        className="absolute w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] top-[20%] -right-[10%] rounded-full blur-[120px]"
        style={{
          y: y2,
          background: 'var(--orb-2)',
        }}
      />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="gradient-mesh pt-20 pb-16 px-4 min-h-screen flex items-center">
      <div className="vignette-frame" />
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-sm text-[var(--fg-muted)] uppercase tracking-wider mb-4"
          style={{ opacity, y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Precision instrument &middot; 4 fields &middot; 3 document formats
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black text-[var(--fg)] leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 25 }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Register people.
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ color: 'var(--accent)' }}
          >
            Generate documents.
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            No subscription.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg text-[var(--fg-muted)] mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          CadastRAR is a precision instrument for recording people &mdash; name, avatar,
          description, tags &mdash; optionally with AI-assisted copy, then exporting to PDF in three
          formats: ID card, certificate, or profile sheet. Free 7-day trial, then one payment of
          €50. Ever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <MotionNavLink
            to="/register"
            className="btn px-8 py-3 text-lg mr-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start free trial
            <FaArrowRightLong className="ml-2 h-5 w-5" />
          </MotionNavLink>
          <MotionNavLink
            to="/about"
            className="btn-ghost px-8 py-3 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            How it works
          </MotionNavLink>
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-20 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Manual record-keeping fails silently
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[var(--fg)]">Spreadsheets don't scale</h3>
            <p className="text-[var(--fg-muted)]">
              Every new entry is a row of fragile data. Avatars as URLs break. Tags are
              comma-separated strings that nobody searches consistently. Copying between sheets
              loses formatting.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-[var(--fg)]">Exporting is manual labor</h3>
            <p className="text-[var(--fg-muted)]">
              Formatting a card or certificate by hand means starting over every time. A single
              template change means re-layout across every file. The work compounds.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          Three steps
        </motion.h2>

        <div className="space-y-4">
          <motion.div
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <MdOutlineAddCircleOutline className="text-4xl text-[var(--accent)] mr-4 flex-shrink-0" />
              <h3 className="text-xl font-semibold text-[var(--fg)]">001 &mdash; Enter</h3>
            </div>
            <p className="text-[var(--fg-muted)]">
              Fill four fields: a name, an avatar URL, a description, and tags. Toggle AI to write
              the 2&ndash;3 sentence bio from a single Gemini call.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <MdOutlineAppRegistration className="text-4xl text-[var(--accent)] mr-4 flex-shrink-0" />
              <h3 className="text-xl font-semibold text-[var(--fg)]">002 &mdash; AI writes</h3>
            </div>
            <p className="text-[var(--fg-muted)]">
              One Gemini prompt. A professional 2&ndash;3 sentence bio in third person, 50&ndash;100
              words. No claims, no fluff.
            </p>
          </motion.div>

          <motion.div
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <MdOutlinePictureAsPdf className="text-4xl text-[var(--accent)] mr-4 flex-shrink-0" />
              <h3 className="text-xl font-semibold text-[var(--fg)]">003 &mdash; Export</h3>
            </div>
            <p className="text-[var(--fg-muted)]">
              One click generates a PDF: ID card, certificate, or profile sheet. Each format is
              purpose-built, not a re-styled template.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Documents() {
  const cards = [
    {
      title: 'ID Card',
      description: 'A compact record with photo, name, and key fields — printed or digital.',
      color: 'bg-[var(--accent)]',
    },
    {
      title: 'Certificate',
      description: 'A formal bordered document suitable for printing on A4 or letter.',
      color: 'bg-[var(--accent)]',
    },
    {
      title: 'Profile Sheet',
      description: 'A detailed layout with avatar, tags, description, and metadata.',
      color: 'bg-[var(--accent)]',
    },
  ];

  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          Three document formats
        </motion.h2>
        <motion.p
          className="text-[var(--fg-muted)] text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Export to PDF in any format, no reformatting needed.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={`w-full h-32 rounded-[var(--radius)] mb-4 ${card.color}`} />
              <h3 className="text-xl font-semibold text-[var(--fg)] mb-2">{card.title}</h3>
              <p className="text-sm text-[var(--fg-muted)]">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FactsStrip() {
  const facts = [
    { label: 'Fields per record', value: '4' },
    { label: 'Document formats', value: '3' },
    { label: 'Payment', value: '€50 one-time' },
    { label: 'Subscription', value: 'None' },
  ];

  return (
    <section className="py-12 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {facts.map((fact) => (
            <div key={fact.label}>
              <div className="text-3xl font-bold text-[var(--accent)] mb-1">{fact.value}</div>
              <div className="text-sm text-[var(--fg-muted)]">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeTrial() {
  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)] text-center">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          Seven days, no card required
        </motion.h2>
        <motion.p
          className="text-[var(--fg-muted)] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Sign up with just an email. No payment information collected until you decide to pay.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MotionNavLink to="/register" className="btn px-8 py-3 text-lg">
            Start free trial
            <FaArrowRightLong className="ml-2 h-5 w-5" />
          </MotionNavLink>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          One price. Forever.
        </motion.h2>
        <motion.p
          className="text-[var(--fg-muted)] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          No recurring fees. No monthly billing. No subscriptions.
        </motion.p>

        <motion.div
          className="bg-[var(--surface)] border-2 border-[var(--accent)] rounded-[var(--radius)] p-8 md:p-12 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs font-bold text-[var(--accent-fg)] bg-[var(--accent)] inline-block px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            One-time
          </p>
          <div className="text-5xl font-black text-[var(--fg)] mb-2">€50</div>
          <p className="text-[var(--fg-muted)] mb-6">
            Lifetime access. Pay once, never billed again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <span className="text-xs text-[var(--fg-muted)] bg-[var(--surface-alt)] px-3 py-1 rounded-full">
              No subscription
            </span>
            <span className="text-xs text-[var(--fg-muted)] bg-[var(--surface-alt)] px-3 py-1 rounded-full">
              No monthly fee
            </span>
            <span className="text-xs text-[var(--fg-muted)] bg-[var(--surface-alt)] px-3 py-1 rounded-full">
              Pay once
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MotionNavLink to="/register" className="btn px-8 py-3 text-lg">
            Get lifetime access
            <FaArrowRightLong className="ml-2 h-5 w-5" />
          </MotionNavLink>
        </motion.div>
      </div>
    </section>
  );
}

function AiPlaceholder() {
  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          AI assistance
        </motion.h2>
        <motion.p
          className="text-[var(--fg-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Currently: one Gemini call writes your 2&ndash;3 sentence bio. More capabilities &mdash;
          TBD.
        </motion.p>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-[var(--border-hairline)] pb-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left py-4"
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-[var(--fg)]">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[var(--fg-muted)]"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <p className="text-[var(--fg-muted)] pb-2">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

function FAQ() {
  const items = [
    {
      question: 'Is this a subscription?',
      answer: 'No. CadastRAR is a one-time payment of €50. You pay once and own lifetime access.',
    },
    {
      question: 'What is included in the €50?',
      answer:
        'Unlimited records, all three PDF formats (ID card, certificate, profile sheet), AI-written bios, and lifetime updates.',
    },
    {
      question: "What happens if I don't pay?",
      answer:
        "After 7 days your trial expires. You can still view and search existing records, but you can't create or edit new ones. Pay €50 once to restore full access.",
    },
    {
      question: 'Can I cancel?',
      answer: 'There is nothing to cancel. You made one payment. It does not recur.',
    },
    {
      question: 'Do I need a credit card for the trial?',
      answer:
        'No. The 7-day trial requires only an email address. No payment information is collected until you choose to pay.',
    },
  ];

  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          Questions
        </motion.h2>

        <div className="space-y-2">
          {items.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 px-4 border-t border-[var(--border-hairline)] text-center">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[var(--fg)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          Ready to get organized?
        </motion.h2>
        <motion.p
          className="text-[var(--fg-muted)] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Start your free 7-day trial. No card required. Pay €50 once if you want to keep going.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MotionNavLink to="/register" className="btn px-8 py-3 text-lg">
            Start free trial
            <FaArrowRightLong className="ml-2 h-5 w-5" />
          </MotionNavLink>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="noise-overlay bg-[var(--bg)] text-[var(--fg)]">
      <ScrollGradient />
      <Hero />
      <Problem />
      <HowItWorks />
      <Documents />
      <FactsStrip />
      <FreeTrial />
      <Pricing />
      <AiPlaceholder />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
