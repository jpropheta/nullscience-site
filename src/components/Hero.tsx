"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Magnetic button with spring physics ── */
function MagneticButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (prefersReducedMotion()) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  /* Cursor-tracking ambient glow */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(glow, {
        left: e.clientX,
        top: e.clientY,
        duration: 1.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;

      const tl = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.32, 0.72, 0, 1)" },
      });

      /* Badge entrance — scale + blur up */
      tl.fromTo(
        ".hero-tag",
        { opacity: 0, y: 30, scale: 0.9, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          delay: 0.3,
        }
      );

      /* Headline characters — 3D flip in with blur */
      const chars = headingRef.current?.querySelectorAll(".hero-char");
      if (chars) {
        tl.fromTo(
          chars,
          { opacity: 0, y: 120, rotateX: -90, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.015,
            ease: "back.out(1.2)",
          },
          "-=0.4"
        );
      }

      /* Subtitle — word-by-word blur-up reveal */
      const words = subRef.current?.querySelectorAll(".hero-word");
      if (words) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 40,
            clipPath: "inset(100% 0 0 0)",
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.05,
          },
          "-=0.6"
        );
      }

      /* Description — fade blur up */
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
        "-=0.4"
      );

      /* CTA buttons — spring scale in */
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20, scale: 0.92, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.5)",
        },
        "-=0.5"
      );

      /* Scroll indicator */
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );

      /* ── Mesh orbs — slow ambient drift ── */
      gsap.to(".hero-orb-1", {
        yPercent: -8,
        xPercent: 5,
        scale: 1.1,
        ease: "none",
        duration: 20,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-orb-2", {
        yPercent: 6,
        xPercent: -8,
        scale: 0.9,
        ease: "none",
        duration: 25,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-orb-3", {
        yPercent: -5,
        xPercent: -4,
        scale: 1.05,
        ease: "none",
        duration: 18,
        repeat: -1,
        yoyo: true,
      });

      /* ── Scroll-driven parallax ── */

      /* Content: moves up, fades, slightly shrinks */
      gsap.to(".hero-content", {
        yPercent: 40,
        opacity: 0,
        scale: 0.92,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      /* Depth layers at different parallax speeds */
      gsap.to(".hero-depth-1", {
        yPercent: -15,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-depth-2", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(".hero-depth-3", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      /* Scroll indicator fades out first */
      gsap.to(".hero-scroll", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "12% top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [ready] }
  );

  /* Text content */
  const headingLine1 = "A próxima crise";
  const headingLine2 = "do seu time já está";
  const headingHighlight = "escrita.";
  const subtitle = "Nós ajudamos a reescrever o final.";

  const renderChars = (text: string, className = "") =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className={`hero-char inline-block ${className}`}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? " " : char}
      </span>
    ));

  const renderWords = (text: string) =>
    text.split(" ").map((word, i, arr) => (
      <span key={i}>
        <span className="hero-word inline-block">{word}</span>
        {i < arr.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Mesh gradient orbs — cinematic depth layers ── */}
      <div
        className="hero-orb-1 hero-depth-1 mesh-orb mesh-orb-primary"
        style={{ width: "1400px", height: "1400px", top: "-20%", left: "-15%" }}
      />
      <div
        className="hero-orb-2 hero-depth-2 mesh-orb mesh-orb-secondary"
        style={{ width: "800px", height: "800px", top: "10%", right: "-10%" }}
      />
      <div
        className="hero-orb-3 hero-depth-1 mesh-orb mesh-orb-tertiary"
        style={{ width: "600px", height: "600px", bottom: "5%", left: "20%" }}
      />

      {/* ── Grid pattern ── */}
      <div className="hero-depth-3 absolute inset-0 grid-bg pointer-events-none opacity-60" />

      {/* ── Cursor-tracking glow ── */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 55%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          left: "-600px",
          top: "-600px",
        }}
      />

      {/* ── Main content ── */}
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow Tag */}
        <div className="hero-tag eyebrow-tag mb-14 opacity-0">
          <span className="eyebrow-dot" />
          <span>Cybersecurity Advisory</span>
        </div>

        {/* Main headline — massive, dramatic */}
        <h1
          ref={headingRef}
          className="font-bold leading-[1.02] tracking-[-0.04em] mb-10"
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
            perspective: "1200px",
          }}
        >
          {renderChars(headingLine1)}
          <br />
          {renderChars(headingLine2 + " ")}
          <br className="sm:hidden" />
          <span className="text-glow">
            {renderChars(headingHighlight, "gradient-text")}
          </span>
        </h1>

        {/* Subtitle */}
        <span
          ref={subRef}
          className="block text-muted font-light tracking-[-0.01em] mb-12"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.875rem)" }}
        >
          {renderWords(subtitle)}
        </span>

        {/* Description */}
        <p className="hero-desc text-base md:text-lg text-muted/50 max-w-lg mx-auto mb-16 leading-relaxed opacity-0">
          Traduzimos risco cibernético em estratégia executiva.
          Simulações de crise, advisory e preparação real
          para incidentes.
        </p>

        {/* CTA Buttons — button-in-button architecture */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton href="#crisislab" className="hero-cta btn-primary opacity-0 glow-md">
            <span>Conheça o CrisisLab</span>
            <span className="btn-arrow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 13L13 1M13 1H4M13 1V10" />
              </svg>
            </span>
          </MagneticButton>
          <MagneticButton href="#contato" className="hero-cta btn-secondary opacity-0">
            Fale Conosco
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] font-mono text-muted/30 tracking-[0.35em] uppercase">
            scroll
          </span>
          <div
            className="w-px h-12 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,229,160,0.5), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
