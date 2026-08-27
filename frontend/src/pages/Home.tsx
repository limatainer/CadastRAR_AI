import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import DocumentPreview, { DOC_LABELS, DOC_SIZES, DocFormat } from '@/components/documents';
import { fadeUp, stagger } from '@/lib/motion';

/** Sample record used for the marketing previews. */
const SAMPLE = {
  title: 'Ada Lovelace',
  image: 'https://ui-avatars.com/api/?name=Ada+Lovelace&background=1f4d3f&color=fbf9f5&size=256',
  body: 'Mathematician and writer, chiefly known for her work on the Analytical Engine. She published the first algorithm intended to be carried out by a machine.',
  tags: ['mathematics', 'computing', 'london'],
  createdBy: 'CadastRAR',
  createdAt: { seconds: 1735689600 },
};

/**
 * Fits a document inside a box without distorting it. The three formats have
 * different aspect ratios, so scaling them to a common *width* would leave
 * their captions on three different baselines.
 */
function ScaledDocument({
  format,
  width,
  height,
}: {
  format: DocFormat;
  width: number;
  height?: number;
}) {
  const size = DOC_SIZES[format];
  const scale = height
    ? Math.min(width / size.width, height / size.height)
    : width / size.width;
  return (
    <div
      style={{
        width,
        height: height ?? size.height * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: size.width,
          height: size.height,
          transform: `scale(${scale})`,
          flexShrink: 0,
        }}
      >
        <DocumentPreview format={format} data={SAMPLE} />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="paper-grain section">
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p className="eyebrow" variants={fadeUp}>
            Records &amp; documents
          </motion.p>
          <motion.h1
            className="mt-4 font-display text-5xl font-semibold leading-[1.03] tracking-display text-[var(--fg)] md:text-6xl"
            variants={fadeUp}
          >
            Register a person.
            <br />
            Print the document.
          </motion.h1>
          <motion.p className="measure mt-6 text-lg text-[var(--fg-muted)]" variants={fadeUp}>
            Four fields — name, avatar, description, tags — with an AI-drafted bio if you want
            one. Export as an ID card, a certificate or a profile sheet. Free for seven days,
            then €50 once.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap items-center gap-4" variants={fadeUp}>
            <NavLink to="/register" className="btn px-6 py-3">
              Start free trial
            </NavLink>
            <span className="text-sm text-[var(--fg-subtle)]">No card required</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden justify-self-center lg:block"
          initial={{ opacity: 0, y: 24, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2.5 }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.15 }}
        >
          <div className="rounded-[var(--radius)] border border-[var(--border-hairline)] shadow-[var(--shadow-elevated)]">
            <ScaledDocument format="id" width={460} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Documents() {
  const formats: DocFormat[] = ['id', 'certificate', 'profile'];
  return (
    <section className="section" style={{ background: 'var(--surface-alt)' }}>
      <div className="shell-wide">
        <motion.div
          className="measure"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            Three formats
          </motion.p>
          <motion.h2
            className="mt-3 font-display text-4xl font-semibold tracking-display text-[var(--fg)]"
            variants={fadeUp}
          >
            Every record is already a document
          </motion.h2>
          <motion.p className="mt-4 text-[var(--fg-muted)]" variants={fadeUp}>
            Not a re-styled template three times over. Each format is laid out for what it is.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-10 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {formats.map((format) => (
            <motion.figure key={format} variants={fadeUp}>
              <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--border-hairline)] bg-[var(--surface)] p-4">
                <ScaledDocument format={format} width={300} height={360} />
              </div>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
                {DOC_LABELS[format]}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: '001',
    title: 'Enter',
    body: 'Four fields: a name, an avatar URL, a description and tags.',
  },
  {
    n: '002',
    title: 'AI writes',
    body: 'One Gemini call drafts a 2–3 sentence bio in third person. Optional, and editable.',
  },
  {
    n: '003',
    title: 'Export',
    body: 'One click builds the PDF. What you see on screen is exactly what is printed.',
  },
];

function HowItWorks() {
  return (
    <section className="section">
      <div className="shell">
        <motion.h2
          className="font-display text-4xl font-semibold tracking-display text-[var(--fg)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          How it works
        </motion.h2>

        <motion.ol
          className="mt-12 grid gap-10 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STEPS.map((step) => (
            <motion.li
              key={step.n}
              className="border-t border-[var(--border)] pt-5"
              variants={fadeUp}
            >
              <span className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--fg)]">
                {step.title}
              </h3>
              <p className="mt-2 text-[var(--fg-muted)]">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section" style={{ background: 'var(--surface-alt)' }}>
      <motion.div
        className="shell grid items-center gap-12 md:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={fadeUp}>
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
            One price. Forever.
          </h2>
          <p className="mt-4 text-[var(--fg-muted)]">
            Seven days free, no card. Then a single payment of €50 for unlimited records, all
            three formats and AI-drafted bios. It does not recur.
          </p>
        </motion.div>

        <motion.div
          className="surface-card p-9"
          style={{ borderColor: 'var(--accent)' }}
          variants={fadeUp}
        >
          <p className="eyebrow" style={{ color: 'var(--accent)' }}>
            One-time
          </p>
          <div className="mt-3 font-display text-6xl font-semibold tracking-display text-[var(--fg)]">
            €50
          </div>
          <p className="mt-3 text-[var(--fg-muted)]">Lifetime access. Never billed again.</p>
          <NavLink to="/register" className="btn mt-7 w-full px-6 py-3">
            Start free trial
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
}

const FAQS = [
  {
    question: 'Is this a subscription?',
    answer:
      'No. CadastRAR is a one-time payment of €50. You pay once and own lifetime access.',
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
    question: 'Do I need a credit card for the trial?',
    answer:
      'No. The 7-day trial requires only an email address. No payment information is collected until you choose to pay.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-hairline)]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-lg font-medium text-[var(--fg)]">{question}</span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 text-[var(--fg-muted)] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {open ? <p className="measure pb-5 text-[var(--fg-muted)]">{answer}</p> : null}
    </div>
  );
}

function FAQ() {
  return (
    <section className="section">
      <div className="shell">
        <h2 className="font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
          Questions
        </h2>
        <div className="mt-10">
          {FAQS.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="section section-t">
      <div className="shell text-center">
        <h2 className="font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
          Start with one record
        </h2>
        <p className="measure mx-auto mt-4 text-[var(--fg-muted)]">
          Seven days, no card, no commitment.
        </p>
        <NavLink to="/register" className="btn mt-8 px-8 py-3">
          Create your first record
        </NavLink>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="text-[var(--fg)]">
      <Hero />
      <Documents />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <ClosingCTA />
    </div>
  );
}
