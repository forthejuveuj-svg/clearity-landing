// Clearity Landing Page (React + Tailwind)
// Brand gradient, fixed clouds hero, slider tabs with artwork, scroll-reveal, and "How it works" with edge-bleed laptop.

import { useMemo, useState, useEffect, useRef } from "react";

// ====== Brand ======
const COLORS = {
  primaryA: "#1940A5",
  primaryB: "#244FBF",
};

// ====== Assets (put files in /public) ======
const CLOUDS_URL = "/clouds.png";
const LAPTOP_URL = "/laptop.png";

export default function LandingClearity() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <main>
        <Hero />
        <ProblemsTabs />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-xl"
            style={{
              background: `linear-gradient(90deg, ${COLORS.primaryA}, ${COLORS.primaryB})`,
            }}
            aria-hidden
          />
          <span className="text-base font-bold tracking-tight">Clearity</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-700 md:flex">
          <a className="hover:text-zinc-900" href="#about">
            About
          </a>
          <a className="hover:text-zinc-900" href="#faq">
            FAQ
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <GradientButton href="https://form.typeform.com/to/pXqr5Phq">Join the waitlist</GradientButton>
        </div>
      </Container>
    </header>
  );
}

function GradientButton({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 ${className}`}
      style={{
        background: `linear-gradient(90deg, ${COLORS.primaryA}, ${COLORS.primaryB})`,
      }}
      {...props}
    >
      {children}
    </a>
  );
}

// ====== Reveal ======
function useReveal({ once = true, threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          if (once) obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);
  return { ref, shown };
}

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transform-gpu transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ====== Hero ======
function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[640px] w-full overflow-hidden">
      {/* Clouds */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{ backgroundImage: `url(${CLOUDS_URL})` }}
        aria-hidden
      />
      {/* Soft white overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.86) 18%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.60) 65%, rgba(255,255,255,0.30) 100%)",
        }}
      />

      <Container className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
        <Reveal delay={50}>
          <p
            className="text-sm font-semibold"
            style={{ color: COLORS.primaryB }}
          >
            By ADHD individuals for ADHD community
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1
            className="max-w-[900px] text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
            style={{ color: COLORS.primaryB }}
          >
            Find your Clearity
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="max-w-[720px] text-lg text-zinc-700">
            Organize your mind → Take actions → See results
          </p>
        </Reveal>
        <Reveal delay={350}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <GradientButton href="https://form.typeform.com/to/pXqr5Phq">Join the waitlist</GradientButton>
            <a
              href="#demo"
              className="rounded-full border border-indigo-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
            >
              Watch the Demo
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ====== Problems (Slider with segmented control) ======
function ProblemsTabs() {
  const slides = [
    {
      key: "prod",
      label: "Productivity Illusion",
      quote:
        "I switch between tasks endlessly, never know what counts as progress, and feel unsatisfied with anything I do.",
      rank: "#1 Most Common problem for ADHD Reddit Users",
      panelTitle: "Clearity helps you focus on the most important things",
      panelText:
        "It highlights anxiety points, areas to work on, and hidden connections, turning decisions into actionable tasks and tracking real progress.",
      art: "/illustrations/prod.png",
      artAlt: "Floating sheets illustration",
      panelBg: "linear-gradient(90deg, #1940A5, #244FBF)",
    },
    {
      key: "brain",
      label: "Brain Overload",
      quote:
        "My brain is full of useless thoughts, I can’t focus. Everything feels like chaos.",
      rank: "#2 Most Common problem for ADHD Reddit Users",
      panelTitle: "You talk, Clearity turns your thoughts into a living map.",
      panelText:
        "Scattered thoughts become organized and chaos becomes visible order, so your mind feels lighter and more in control.",
      art: "/illustrations/node.png",
      artAlt: "Node map with leaves",
      panelBg: "#3F6C7C",
    },
    {
      key: "tool",
      label: "Tool Fatigue",
      quote:
        "Instead of helping, productivity apps drain me — I waste energy, switch nonstop, and never stick.",
      rank: "#3 Most Common problem for ADHD Reddit Users",
      panelTitle: "No learning curve: Clearity works the way you already do.",
      panelText:
        "You just chat naturally — no setup, no tabs, no distractions. It works for your brain, not the other way around.",
      art: "/illustrations/people.png",
      artAlt: "Two people with phone illustration",
      panelBg: "#3B87B2",
    },
  ];

  const [index, setIndex] = useState(0);
  const go = (i) => setIndex(Math.max(0, Math.min(slides.length - 1, i)));

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <section
      id="about"
      className="relative -mt-12 bg-gradient-to-b from-white via-sky-50 to-white pb-12 pt-10 sm:pt-14"
    >
      <Container>
        <Reveal>
          <h2 className="text-center font-extrabold tracking-tight text-zinc-900 text-4xl sm:text-6xl">
            ADHD Mental <br className="hidden sm:block" /> Struggles are Real
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-3 text-center text-zinc-600">
            We know because we experience it everyday
          </p>
        </Reveal>

        {/* Segmented control */}
        <div
          className="mx-auto mt-8 max-w-3xl"
          role="tablist"
          aria-label="Problems"
        >
          <div className="rounded-full border border-[#244FBF33] p-1 shadow-sm backdrop-blur bg-white/60">
            <div className="grid grid-cols-3 gap-1">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={index === i}
                  onClick={() => go(i)}
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                    index === i
                      ? "text-white"
                      : "text-[#244FBF] hover:bg-[#F3F6FF]"
                  }`}
                  style={
                    index === i
                      ? {
                          background: `linear-gradient(90deg, ${COLORS.primaryA}, ${COLORS.primaryB})`,
                        }
                      : {}
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative mt-8 overflow-hidden">
          <div
            className="flex w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((b, i) => (
              <div key={b.key} className="w-full shrink-0 px-0">
                <div className="grid items-stretch gap-6 md:grid-cols-[1fr_1.15fr]">
                  {/* Left quote + reddit */}
                  <div className="space-y-5">
                    <Card className="rounded-[28px] bg-white/80 p-6 shadow-[0_1px_0_rgba(0,0,0,.04)] ring-1 ring-zinc-200/60">
                      <p className="text-zinc-800">“{b.quote}”</p>
                    </Card>
                    <Card className="rounded-[28px] bg-[#EAF2F9] p-6 md:p-7 border-2 border-[#244FBF] shadow-[0_6px_18px_rgba(36,79,191,0.12)]">
                      {/* top-left reddit logo */}
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src="/public/reddit.png" /* your PNG path */
                          alt="reddit"
                          className="h-9 md:h-10 lg:h-12 w-auto object-contain shrink-0"
                          draggable={false}
                        />
                      </div>

                      {/* headline */}
                      <div className="text-zinc-900 text-xl md:text-[22px] leading-7 md:leading-8 font-medium [text-decoration:none]">
                        {b.rank}
                      </div>
                    </Card>
                  </div>
                  {/* Right panel: text at left, art at right */}
                  <Reveal delay={i * 40 + 120}>
                    <div
                      className="rounded-[28px] p-8 text-white shadow-md"
                      style={{
                        background: b.panelBg?.startsWith("linear-gradient")
                          ? b.panelBg
                          : undefined,
                        backgroundColor:
                          b.panelBg && !b.panelBg.startsWith("linear-gradient")
                            ? b.panelBg
                            : undefined,
                      }}
                    >
                      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_auto]">
                        {/* TEXT — always on top/left */}
                        <div className="relative z-10">
                          <h3 className="text-2xl font-semibold leading-tight md:max-w-[28ch]">
                            {b.panelTitle}
                          </h3>
                          <p className="mt-4 leading-relaxed opacity-95 md:max-w-[52ch]">
                            {b.panelText}
                          </p>
                        </div>

                        {/* ART — true right column, never under text */}
                        {b.art && (
                          <img
                            src={b.art}
                            alt={b.artAlt || ""}
                            className="hidden h-36 w-auto justify-self-end md:block lg:h-44"
                            draggable={false}
                          />
                        )}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => go(index - 1)}
              className="rounded-full border border-[#244FBF33] px-3 py-2 text-sm text-[#244FBF] disabled:opacity-40"
              disabled={index === 0}
            >
              ← Prev
            </button>
            <button
              onClick={() => go(index + 1)}
              className="rounded-full border border-[#244FBF33] px-3 py-2 text-sm text-[#244FBF] disabled:opacity-40"
              disabled={index === slides.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ====== How It Works ======
function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: "Talk it out",
      text: "Share your messy thoughts – Clearity instantly turns it into a living mind map.",
      result: "Brain fog turns into visible order.",
      align: "left",
    },
    {
      n: 2,
      title: "Keep chatting",
      text: "And switching between ideas – the map updates in real time, showing hidden connections and guiding you.",
      result: "You finally see the bigger picture.",
      align: "right",
    },
    {
      n: 3,
      title: "Lock in clarity",
      text: "When you land on a decision or insight, Clearity saves it as a snapshot and fades the clutter.",
      result: "No overthinking – you know what you decided.",
      align: "left",
    },
    {
      n: 4,
      title: "Move forward",
      text: "Turn snapshots into tasks, track progress, and sync with your calendar.",
      result: "Now you know exactly what you need to do.",
      align: "right",
    },
    {
      n: 5,
      title: "Pick up anytime",
      text: "Search snapshots with a phrase and jump back into the exact map you left off.",
      result: "No lost context — momentum is never broken.",
      align: "left",
    },
  ];

  return (
    <section className="relative mt-8 bg-gradient-to-b from-white via-sky-50 to-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-zinc-800 sm:text-5xl">
            How Clearity Works
          </h2>
        </Reveal>

        <div className="space-y-12">
          {steps.map((s, i) => (
            <Step key={s.n} {...s} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Step({ n, title, text, result, align, delay = 0 }) {
  const LeftText = (
    <Reveal delay={delay}>
      <div className="p-2 sm:p-4">
        <div className="flex items-start gap-6">
          {/* Step number */}
          <div
            className="select-none text-5xl sm:text-6xl font-extrabold leading-none text-zinc-900"
            aria-hidden
          >
            {n}
          </div>
          {/* Divider + copy */}
          <div className="relative pl-6">
            <div
              className="absolute left-0 top-1 h-[90%] w-px bg-zinc-300"
              aria-hidden
            />
            <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
              {title}
            </h3>
            <p className="mt-2 text-zinc-700 max-w-prose">{text}</p>
            <p className="mt-3 italic text-zinc-600">Result: {result}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );

  const RightImage = (
    <Reveal delay={delay + 120}>
      <div className="relative aspect-[16/9] w-full overflow-visible">
        {/* Push image beyond container for edge bleed */}
        <img
          src={LAPTOP_URL}
          alt="Laptop"
          className="absolute right-0 top-1/2 h-auto w-[120%] -translate-y-1/2 drop-shadow-xl md:w-[115%] lg:w-[110%]"
        />
      </div>
    </Reveal>
  );

  return (
    <div className="grid items-center gap-6 sm:gap-10 md:grid-cols-2">
      {align === "left" ? (
        <>
          {LeftText}
          {RightImage}
        </>
      ) : (
        <>
          {RightImage}
          {LeftText}
        </>
      )}
    </div>
  );
}

// ====== FAQ ======
function FAQ() {
  const items = [
    {
      q: "Is Clearity just another productivity app?",
      a: "No. Clearity is designed to reduce anxiety and make your thinking clearer, not just manage tasks.",
    },
    {
      q: "How is it different from ChatGPT?",
      a: "Clearity doesn’t just answer questions — it organizes your thoughts and shows patterns so you can see the bigger picture of your mind.",
    },
    {
      q: "Will it replace my existing apps?",
      a: "No. Clearity works with your flow — it’s a thinking companion, not a replacement for tools you already use.",
    },
    {
      q: "How secure is my personal data?",
      a: "Clearity only stores what’s necessary to map your thoughts — nothing is shared without your control.",
    },
    {
      q: "How quickly will I see results?",
      a: "Almost immediately. Even a short session reduces stress, organizes your thoughts, and helps you get things done.",
    },
    {
      q: "How can I try it?",
      a: "Join the waitlist and get early access to the private beta.",
    },
  ];

  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-white via-sky-50 to-white py-16 sm:py-24"
    >
      <Container>
        <Reveal>
          <h2
            className="text-center text-3xl font-extrabold tracking-tight sm:text-5xl"
            style={{ color: COLORS.primaryB }}
          >
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-2 text-center text-sm text-zinc-600">
            If you have a question that isn’t listed here, shoot us a note at{" "}
            <a
              className="font-medium"
              style={{ color: COLORS.primaryB }}
              href="mailto:jago@clearity.me"
            >
              jago@clearity.me
            </a>
          </p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <Disclosure label={it.q}>{it.a}</Disclosure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ====== Footer ======
function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10 text-sm text-zinc-600">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>© {new Date().getFullYear()} Clearity</div>
        <div className="flex items-center gap-6">
          <a className="hover:text-zinc-900" href="#">
            Privacy
          </a>
          <a className="hover:text-zinc-900" href="#">
            Terms
          </a>
          <GradientButton href="#waitlist" className="text-white">
            Join the waitlist
          </GradientButton>
        </div>
      </Container>
    </footer>
  );
}

/* ------------------ Small UI helpers ------------------ */
function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function RedditLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Alien icon */}
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#FF4500]" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity=".15" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <path
          d="M8 14c1.2 1 2.6 1.5 4 1.5S14.8 15 16 14"
          stroke="#FF4500"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {/* Wordmark (simple, crisp) */}
      <span className="text-[#FF4500] text-[20px] font-extrabold leading-none">
        reddit
      </span>
    </div>
  );
}

function DocGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 opacity-90" aria-hidden>
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        fill="currentColor"
        opacity=".2"
      />
      <rect x="7" y="8" width="10" height="2" rx="1" fill="currentColor" />
      <rect
        x="7"
        y="12"
        width="8"
        height="2"
        rx="1"
        fill="currentColor"
        opacity=".8"
      />
    </svg>
  );
}

function Disclosure({ label, children }) {
  const [open, setOpen] = useState(
    label === "Is Clearity just another productivity app?"
  );
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-[0_1px_0_rgba(0,0,0,.04)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left text-[15px] font-medium text-zinc-900"
        aria-expanded={open}
      >
        {label}
        <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 text-sm">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="mt-3 text-sm text-zinc-700">{children}</div>}
    </div>
  );
}
