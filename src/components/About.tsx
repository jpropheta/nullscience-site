"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent">
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="icon-path"
          pathLength="1"
        />
        <path
          d="M16 12L22 15.5V22.5L16 26L10 22.5V15.5L16 12Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
          className="icon-inner"
          pathLength="1"
        />
      </svg>
    ),
    title: "Advisory Estratégico",
    description:
      "Assessoria em cibersegurança para C-level. Transformamos complexidade técnica em decisões executivas claras.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent">
        <circle
          cx="16"
          cy="16"
          r="12"
          stroke="currentColor"
          strokeWidth="1.5"
          className="icon-path"
          pathLength="1"
        />
        <path
          d="M16 8V16L22 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="icon-inner"
          pathLength="1"
        />
      </svg>
    ),
    title: "Simulação de Crise",
    description:
      "Exercícios imersivos de resposta a incidentes. Seu time pratica sob pressão antes que a pressão real chegue.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent">
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          className="icon-path"
          pathLength="1"
        />
        <path
          d="M12 12L16 16L20 12M12 18H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-inner"
          pathLength="1"
        />
      </svg>
    ),
    title: "Preparação para Incidentes",
    description:
      "Playbooks, governance e processos de resposta. Da detecção ao board report, tudo documentado e testado.",
  },
];

function TiltCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.4,
      ease: "power2.out",
    });

    // Move glow to cursor position
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX - rect.left - 100,
        y: e.clientY - rect.top - 100,
        opacity: 1,
        duration: 0.3,
      });
    }
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      className="about-card"
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative p-8 rounded-lg border border-border bg-surface hover:border-accent/30 transition-colors duration-500 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover glow */}
        <div
          ref={glowRef}
          className="absolute w-[200px] h-[200px] rounded-full bg-accent/10 blur-[60px] pointer-events-none opacity-0"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Section label line draw
      gsap.fromTo(
        ".about-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Heading clip-path reveal
      gsap.fromTo(
        ".about-heading",
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
          },
        }
      );

      // Description
      gsap.fromTo(
        ".about-desc",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-desc",
            start: "top 85%",
          },
        }
      );

      // Cards staggered entrance with clip-path
      gsap.fromTo(
        ".about-card",
        { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 60 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-cards",
            start: "top 80%",
          },
        }
      );

      // SVG icon draw-on effect
      gsap.fromTo(
        ".icon-path",
        { strokeDashoffset: 1, strokeDasharray: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".about-cards",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".icon-inner",
        { strokeDashoffset: 1, strokeDasharray: 1, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".about-cards",
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="sobre" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="about-line h-px w-12 bg-accent/40 origin-left" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Quem Somos
          </span>
        </div>

        {/* Heading */}
        <h2 className="about-heading text-3xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Risco cibernético traduzido em{" "}
          <span className="gradient-text">estratégia executiva</span>
        </h2>

        {/* Description */}
        <p className="about-desc text-lg text-muted max-w-2xl mb-20 leading-relaxed">
          A Nullscience é uma firma de advisory em cibersegurança focada no
          Brasil e América Latina. Não vendemos ferramentas — preparamos
          organizações para o que vem a seguir.
        </p>

        {/* Cards */}
        <div className="about-cards grid md:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => (
            <TiltCard key={cap.title} index={i}>
              <span className="mb-6 block">{cap.icon}</span>
              <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {cap.description}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
