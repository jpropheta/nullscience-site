"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ── Reduced motion helper ── */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Particle grid background ── */
function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      speed: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      const spacing = 80;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseX: i * spacing + spacing / 2,
            baseY: j * spacing + spacing / 2,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.3 + 0.05,
            speed: Math.random() * 0.02 + 0.01,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 30;
          p.x = p.baseX - (dx / dist) * force;
          p.y = p.baseY - (dy / dist) * force;
        } else {
          p.x += (p.baseX - p.x) * 0.05;
          p.y += (p.baseY - p.y) * 0.05;
        }

        // Subtle float
        p.y += Math.sin(Date.now() * p.speed * 0.001 + p.baseX) * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 160, ${p.alpha})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (const q of particles) {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100 && d > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 229, 160, ${0.03 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Magnetic button ── */
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
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  }, []);

  const handleLeave = useCallback(() => {
    if (prefersReducedMotion()) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
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

/* ── Main Hero ── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  // Split text into words/chars for animation
  useEffect(() => setReady(true), []);

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Tag line entrance
      tl.fromTo(
        ".hero-tag",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Split headline chars animation
      const headingChars = headingRef.current?.querySelectorAll(".hero-char");
      if (headingChars) {
        tl.fromTo(
          headingChars,
          { opacity: 0, y: 80, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }

      // Subtitle word-by-word
      const subWords = subRef.current?.querySelectorAll(".hero-word");
      if (subWords) {
        tl.fromTo(
          subWords,
          { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.4"
        );
      }

      // Description
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

      // CTAs
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        "-=0.4"
      );

      // Scroll indicator
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );

      // Scroll-linked parallax: fade + push content as user scrolls
      gsap.to(".hero-content", {
        yPercent: 30,
        opacity: 0,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Background glow parallax (moves slower)
      gsap.to(".hero-glow", {
        yPercent: -20,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Scroll indicator morphs on scroll
      gsap.to(".hero-scroll", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [ready] }
  );

  // Split main heading text into individual chars
  const headingLine1 = "A próxima crise do";
  const headingLine2 = "seu time já está";
  const headingHighlight = "escrita.";
  const subtitle = "Nós ajudamos a reescrever o final.";

  const renderChars = (text: string, className = "") =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className={`hero-char inline-block ${className}`}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const renderWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="hero-word inline-block mr-[0.3em]">
        {word}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Depth layer 1: Radial glow (farthest back) */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

      {/* Depth layer 2: Particle mesh background */}
      <ParticleGrid />

      {/* Depth layer 3: Secondary accent glow */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      {/* Main content */}
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Tag line */}
        <div className="hero-tag inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-accent/20 bg-accent/5 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent tracking-wider uppercase">
            Cybersecurity Advisory
          </span>
        </div>

        {/* Main heading with char-by-char animation */}
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
          style={{ perspective: "800px" }}
        >
          {renderChars(headingLine1)}
          <br className="hidden sm:block" />
          {renderChars(headingLine2 + " ")}
          <span className="gradient-text text-glow">
            {renderChars(headingHighlight, "gradient-text")}
          </span>
          <br />
          <span
            ref={subRef}
            className="text-muted text-3xl sm:text-4xl md:text-5xl font-medium mt-2 block"
          >
            {renderWords(subtitle)}
          </span>
        </h1>

        {/* Description */}
        <p className="hero-desc text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed opacity-0">
          Traduzimos risco cibernético em estratégia executiva. Simulações de
          crise, advisory e preparação real para incidentes.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton
            href="#crisislab"
            className="hero-cta px-8 py-3.5 bg-accent text-background font-semibold rounded text-sm tracking-wide hover:bg-accent/90 transition-all duration-300 glow-accent opacity-0"
          >
            Conheça o CrisisLab
          </MagneticButton>
          <MagneticButton
            href="#contato"
            className="hero-cta px-8 py-3.5 border border-border text-foreground rounded text-sm tracking-wide hover:border-accent/40 hover:text-accent transition-all duration-300 opacity-0"
          >
            Fale Conosco
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-muted/50 tracking-widest uppercase">
              scroll
            </span>
            <div className="w-5 h-8 rounded-full border border-muted/30 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-accent/60 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
