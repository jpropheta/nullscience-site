"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.15 }
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Parallax on scroll
      gsap.to(".hero-content", {
        yPercent: 30,
        opacity: 0,
        scale: 0.95,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Orbs drift
      gsap.to(".hero-orb-1", {
        yPercent: -10,
        xPercent: 6,
        ease: "sine.inOut",
        duration: 22,
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-orb-2", {
        yPercent: 8,
        xPercent: -5,
        ease: "sine.inOut",
        duration: 28,
        repeat: -1,
        yoyo: true,
      });

      // Scroll indicator fades out
      gsap.to(".hero-scroll-indicator", {
        opacity: 0,
        y: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cursor glow — use transform for GPU compositing
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orbs */}
      <div
        className="hero-orb-1 absolute rounded-full pointer-events-none"
        style={{
          width: 1200,
          height: 1200,
          top: "-25%",
          left: "-20%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="hero-orb-2 absolute rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 800,
          bottom: "-10%",
          right: "-15%",
          background:
            "radial-gradient(circle, rgba(0,184,212,0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 55%)",
          filter: "blur(40px)",
          left: -250,
          top: -250,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="hero-eyebrow eyebrow mb-8 opacity-0">
          <span className="eyebrow-dot" />
          <span>Cybersecurity Advisory</span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.04] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
        >
          <span className="hero-line block opacity-0">A próxima crise</span>
          <span className="hero-line block opacity-0">
            do seu time já está
          </span>
          <span className="hero-line block opacity-0">
            <span className="gradient-text text-glow">escrita.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub text-muted font-light tracking-[-0.01em] mb-6 opacity-0"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
        >
          Nós ajudamos a reescrever o final.
        </p>

        {/* Description */}
        <p className="hero-desc text-muted/50 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed opacity-0">
          Traduzimos risco cibernético em estratégia executiva. Simulações de
          crise, advisory e preparação real para incidentes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#crisislab" className="hero-cta btn-primary opacity-0">
            <span>Conheça o CrisisLab</span>
            <span className="btn-icon">
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
          </a>
          <a href="#contato" className="hero-cta btn-outline opacity-0">
            Fale Conosco
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] font-mono text-muted/30 tracking-[0.35em] uppercase">
          scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,229,160,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}
