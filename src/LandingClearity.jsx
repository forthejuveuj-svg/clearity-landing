// Clearity Landing Page (React + Tailwind)
// Global clouds background, slider tabs with artwork (bundled), scroll-reveal, and "How it works" with edge-bleed laptop.

import { useState, useEffect, useRef, useLayoutEffect } from "react";

// ====== Brand ======
const COLORS = {
  primaryA: "#1940A5",
  primaryB: "#244FBF",
};

// ====== Assets ======
// from /public (served at site root)
const CLOUDS_URL = "/clouds.png";
const LAPTOP_URL = "/laptop.png";
// bundle-safe URLs (put images in src/assets/illustrations/)
const artProd = new URL("./assets/illustrations/prod.png", import.meta.url)
  .href;
const artNode = new URL("./assets/illustrations/node.png", import.meta.url)
  .href;
const artPeople = new URL("./assets/illustrations/people.png", import.meta.url)
  .href;
// bundle-safe laptop images (put files in src/assets/laptops/)
const lap1 = new URL("./assets/laptops/1.png", import.meta.url).href;
const lap2 = new URL("./assets/laptops/2.png", import.meta.url).href;
const lap3 = new URL("./assets/laptops/3.png", import.meta.url).href;
const lap4 = new URL("./assets/laptops/4.png", import.meta.url).href;
const lap5 = new URL("./assets/laptops/5.png", import.meta.url).href;
const steps = [
  {
    n: 1,
    title: "Talk it out",
    text: "Share your messy thoughts – Clearity instantly turns it into a living mind map.",
    result: "Brain fog turns into visible order.",
    align: "left",
    img: lap1,
    imgAlt: "Laptop with voice input",
  },
  {
    n: 2,
    title: "Keep chatting",
    text: "And switching between ideas – the map updates in real time, showing hidden connections and guiding you.",
    result: "You finally see the bigger picture.",
    align: "right",
    img: lap2,
    imgAlt: "Laptop with live map",
  },
  {
    n: 3,
    title: "Lock in clarity",
    text: "When you land on a decision or insight, Clearity saves it as a snapshot and fades the mess.",
    result: "No overthinking – you know what you decided.",
    align: "left",
    img: lap3,
    imgAlt: "Laptop snapshot view",
  },
  {
    n: 4,
    title: "Move forward",
    text: "Turn snapshots into tasks, track progress, and sync with your calendar.",
    result: "Now you know exactly what you need to do.",
    align: "right",
    img: lap4,
    imgAlt: "Laptop with tasks",
  },
  {
    n: 5,
    title: "Pick up anytime",
    text: "Search snapshots with a phrase and jump back into the exact map you left off.",
    result: "No lost context — momentum is never broken.",
    align: "left",
    img: lap5,
    imgAlt: "Laptop search",
  },
];

// reddit logo — use your own hosted PNG if you prefer
const REDDIT_LOGO =
  "https://s.iimg.su/s/29/gM2b2O7x2wifoZDQycnBz7it37RlnDDDHYYLndNe.png";

// ====== match left column height hook ======
function useMatchHeight() {
  const leftRef = useRef(null);
  const [minH, setMinH] = useState(0);

  useLayoutEffect(() => {
    if (!leftRef.current) return;
    const el = leftRef.current;

    const update = () => setMinH(el.offsetHeight || 0);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    // also listen to window resize (fonts/layout)
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return { leftRef, minH };
}

// ====== Global Clouds Background ======
function GlobalCloudBg() {
  return (
    <>
      {/* Clouds image behind the whole app */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${CLOUDS_URL})` }}
        aria-hidden
      />
      {/* Soft white overlay to match Figma */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.86) 18%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.60) 65%, rgba(255,255,255,0.30) 100%)",
        }}
        aria-hidden
      />
    </>
  );
}

export default function LandingClearity() {
  return (
    <div className="relative min-h-screen bg-transparent text-zinc-900">
      <GlobalCloudBg />
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
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          {/* <div
            className="h-8 w-8 rounded-xl"
            style={{
              background: `linear-gradient(90deg, ${COLORS.primaryA}, ${COLORS.primaryB})`,
            }}
            aria-hidden
          /> */}
          <img
            src="/logo.png" // or "/logo.png"
            alt="Clearity"
            className="h-8 w-auto" // tweak size here
            draggable={false}
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
          <GradientButton href="https://form.typeform.com/to/pXqr5Phq">
            Join the waitlist
          </GradientButton>
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
    <section className="relative h-[90vh] min-h-[640px] w-full">
      <Container className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
        <Reveal delay={50}>
          <p
            className="text-base sm:text-lg md:text-xl font-semibold"
            style={{ color: COLORS.primaryB }}
          >
            By ADHD individuals for ADHD community
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1
            className="max-w-[1100px] text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight"
            style={{ color: COLORS.primaryB }}
          >
            Find your Clearity
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="max-w-[820px] text-lg sm:text-xl md:text-2xl text-zinc-700">
            Organize your mind → Take actions → See results
          </p>
        </Reveal>
        <Reveal delay={350}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <GradientButton
              className="px-6 py-3 text-base"
              href="https://form.typeform.com/to/pXqr5Phq"
            >
              Join the waitlist
            </GradientButton>
            
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
        "It shows what’s important, breaks it into doable steps, and tracks your progress—so you stop spinning in circles and finally move forward.",
      art: artProd,
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
      art: artNode,
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
      art: artPeople,
      artAlt: "Two people with phone illustration",
      panelBg: "#3B87B2",
    },
  ];

  const [index, setIndex] = useState(0);
  const go = (i) => setIndex(Math.max(0, Math.min(slides.length - 1, i)));

  // Active tab color matches the panel color
  const currentBg = slides[index]?.panelBg;
  const activeStyle = currentBg?.startsWith("linear-gradient")
    ? { background: currentBg }
    : currentBg
    ? { backgroundColor: currentBg }
    : {
        background: `linear-gradient(90deg, ${COLORS.primaryA}, ${COLORS.primaryB})`,
      };

  // ONE height matcher for the visible slide
  const { leftRef, minH } = useMatchHeight();

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
    <section id="about" className="relative -mt-12 pb-12 pt-10 sm:pt-14">
      <Container>
        <Reveal>
          <h2 className="text-center text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
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
              {slides.map((s, i) => {
                const isActive = index === i;
                return (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => go(i)}
                    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "text-white"
                        : "text-[#244FBF] hover:bg-[#F3F6FF]"
                    }`}
                    style={isActive ? activeStyle : undefined}
                  >
                    {s.label}
                  </button>
                );
              })}
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
                {/* equal-height row */}
                <div className="grid items-stretch content-stretch gap-6 md:grid-cols-[1fr_1.15fr]">
                  {/* LEFT: quote + reddit */}
                  <div className="flex h-full flex-col gap-5">
                    <Card className="rounded-[28px] bg-white/80 p-6 shadow-[0_1px_0_rgba(0,0,0,.04)] ring-1 ring-zinc-200/60">
                      <p className="text-zinc-800">“{b.quote}”</p>
                    </Card>

                    <Card className="rounded-[28px] bg-[#EAF2F9] p-6 md:p-7 border-2 border-[#244FBF] shadow-[0_6px_18px_rgba(36,79,191,0.12)]">
                      <div className="mb-3 flex items-center gap-3">
                        <img
                          src={REDDIT_LOGO}
                          alt="reddit"
                          className="h-9 w-auto shrink-0 object-contain md:h-10 lg:h-12"
                          draggable={false}
                        />
                      </div>
                      <div className="text-zinc-900 text-xl md:text-[22px] leading-7 md:leading-8 font-medium">
                        {b.rank}
                      </div>
                    </Card>
                  </div>

                  {/* RIGHT: blue panel */}
                  <div className="h-full">
                    <Reveal delay={i * 40 + 120} className="h-full">
                      <div
                        className="flex h-full rounded-[28px] p-8 text-white shadow-md md:p-10 lg:p-12"
                        style={{
                          background: b.panelBg?.startsWith("linear-gradient")
                            ? b.panelBg
                            : undefined,
                          backgroundColor:
                            b.panelBg &&
                            !b.panelBg.startsWith("linear-gradient")
                              ? b.panelBg
                              : undefined,
                        }}
                      >
                        <div className="grid h-full w-full grid-cols-[1fr_minmax(170px,175px)] items-center gap-6">
                          {/* TEXT */}
                          <div className="relative z-10 self-start">
                            <h3 className="text-2xl md:text-3xl font-semibold leading-tight md:max-w-[28ch]">
                              {b.panelTitle}
                            </h3>
                            <p className="mt-4 leading-relaxed opacity-95 md:max-w-[52ch]">
                              {b.panelText}
                            </p>
                          </div>
                          {/* ART pinned right */}
                          {b.art && (
                            <img
                              src={b.art}
                              alt={b.artAlt || ""}
                              className="justify-self-end self-end h-[140px] w-[200px] md:h-[180px] lg:h-[220px]"
                              draggable={false}
                            />
                          )}
                        </div>
                      </div>
                    </Reveal>
                  </div>
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
  return (
    <section className="relative mt-8 py-16 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="mb-16 sm:mb-20 text-center text-3xl font-extrabold tracking-tight text-zinc-800 sm:text-5xl">
            How Clearity Works
          </h2>
        </Reveal>

        <div className="mt-12 sm:mt-16 space-y-12">
          {steps.map((s, i) => (
            <Step key={s.n} {...s} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Step({ n, title, text, result, align, img, imgAlt, delay = 0 }) {
  const LeftText = (
    <Reveal delay={delay}>
      <div className="p-2 sm:p-4">
        <div className="flex items-start gap-6">
          {/* Step number */}
          <div
            className="select-none text-6xl sm:text-8xl font-extrabold leading-none text-zinc-900"
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
            <h3 className="text-6xl sm:text-5xl font-semibold text-zinc-900">
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
      <div
        className={[
          "relative overflow-visible",
          align === "left"
            ? "mr-[-12vw] md:mr-[-16vw] lg:mr-[-20vw]"
            : "ml-[-12vw] md:ml-[-16vw] lg:ml-[-20vw]",
          "h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px]",
        ].join(" ")}
      >
        <img
          src={img || LAPTOP_URL} // <- per-step image, falls back to global
          alt={imgAlt || "Laptop"}
          draggable={false}
          className="absolute top-1/2 -translate-y-1/2 select-none drop-shadow-xl
                   h-[160%] md:h-[100%] lg:h-[150%] w-auto pointer-events-none"
          style={align === "left" ? { right: "-7%" } : { left: "-7%" }}
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
    <section id="faq" className="py-16 sm:py-24">
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
          <GradientButton
            href="https://form.typeform.com/to/pXqr5Phq"
            className="text-white"
          >
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
