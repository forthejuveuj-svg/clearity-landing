// Demo Page Component
import { useState, useEffect, useRef, useLayoutEffect } from "react";

// ====== Brand ======
const COLORS = {
  primaryA: "#1940A5",
  primaryB: "#244FBF",
};

// ====== Assets ======
const CLOUDS_URL = "/clouds.png";

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

function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
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

// ====== Reveal Animation ======
function useReveal({ once = true, threshold = 0.15 } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold]);

  return { ref, isVisible };
}

function Reveal({ children, delay = 0, className = "" }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ====== Header ======
function Header({ onBack }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Clearity"
            className="h-8 w-auto"
            draggable={false}
          />
          <span className="text-base font-bold tracking-tight">Clearity</span>
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 text-sm text-zinc-700 md:flex">
            <button onClick={onBack} className="hover:text-zinc-900">
              Home
            </button>
            <button onClick={() => { onBack(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-zinc-900">
              About
            </button>
            <button onClick={() => { onBack(); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-zinc-900">
              FAQ
            </button>
            <a
              href="/demo"
              className="hover:text-zinc-900 border-b-2 border-[#1940A5] pb-1 transition"
            >
              Demo
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
          <GradientButton href="https://form.typeform.com/to/pXqr5Phq">
            Join the waitlist
          </GradientButton>
          </div>
        </div>
      </Container>
    </header>
  );
}

// ====== Demo Page ======
export default function DemoPage({ onBack }) {
  return (
    <div className="relative min-h-screen bg-transparent text-zinc-900">
      <GlobalCloudBg />
      <Header onBack={onBack} />
      
      <main className="py-16 sm:py-24">
        <Container>
          <div className="text-center">
            <Reveal delay={50}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6 text-black">
                Welcome to the future of the clear mind and clear thoughts
              </h1>
            </Reveal>
            
            <Reveal delay={100}>
              <p className="mb-12 text-center text-sm text-zinc-600">
                Have questions? Contact us at{" "}
                <a
                  className="font-medium"
                  style={{ color: COLORS.primaryB }}
                  href="mailto:jago@clearity.pro"
                >
                  jago@clearity.pro
                </a>
              </p>
            </Reveal>
            
            <Reveal delay={150}>
              <div className="mx-auto max-w-4xl mb-12">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/I2LIvwIPuyE"
                    title="Clearity Demo"
                    className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={250}>
              <GradientButton
                className="px-8 py-4 text-lg"
                href="https://form.typeform.com/to/pXqr5Phq"
              >
                Join the waitlist
              </GradientButton>
            </Reveal>
          </div>
        </Container>
      </main>
    </div>
  );
}
