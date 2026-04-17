"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-accent">
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="icon-path"
          pathLength="1"
        />
        <path
          d="M16 12L22 15.5V22.5L16 26L10 22.5V15.5L16 12Z"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
          className="icon-inner"
          pathLength="1"
        />
      </svg>
    ),
    title: "Advisory Estratégico",
    description:
      "Assessoria em cibersegurança para C-level. Transformamos complexidade técnica em decisões executivas claras.",
    span: "lg:col-span-2",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-accent">
        <circle
          cx="16"
          cy="16"
          r="12"
          stroke="currentColor"
          strokeWidth="1.2"
          className="icon-path"
          pathLength="1"
        />
        <path
          d="M16 8V16L22 20"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="icon-inner"
          pathLength="1"
        />
      </svg>
    ),
    title: "Simulação de Crise",
    description:
      "Exercícios imersivos de resposta a incidentes. Seu time pratica sob pressão antes que a pressão real chegue.",
    span: "",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-accent">
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.2"
          className="icon-path"
          pathLength="1"
        />
        <path
          d="M12 12L16 16L20 12M12 18H20"
          stroke="currentColor"
          strokeWidth="1.2"
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
    span: "",
  },
];

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
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
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: "power2.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX - rect.left - 120,
        y: e.clientY - rect.top - 120,
        opacity: 1,
        duration: 0.4,
      });
    }
  }, []);

  const handleLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    }
  }, []);

  return (
    <div
      className={`about-card ${className || ""}`}
      style={{ perspective: "900px", transformStyle: "preserve-3d" }}
    >
      {/* Double-bezel outer shell */}
      <div className="bezel-outer h-full">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="bezel-inner relative p-8 md:p-10 h-full overflow-hidden group"
          style={{
            transformStyle: "preserve-3d",
            transition: "border-color 500ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* Hover glow */}
          <div
            ref={glowRef}
            className="absolute w-[240px] h-[240px] rounded-full bg-accent/8 blur-[80px] pointer-events-none opacity-0"
          />

          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              transition: "opacity 600ms cubic-bezier(0.32, 0.72, 0, 1)",
              borderRadius: "inherit",
            }}
          />

          <div className="relative" style={{ transform: "translateZ(30px)" }}>
            {children}
          </div>
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

      gsap.fromTo(
        ".about-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-heading",
        { clipPath: "inset(100% 0 0 0)", y: 50, filter: "blur(4px)" },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".about-desc", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-card",
        { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 70, filter: "blur(8px)" },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".about-cards", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".icon-path",
        { strokeDashoffset: 1, strokeDasharray: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".about-cards", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".icon-inner",
        { strokeDashoffset: 1, strokeDasharray: 1, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".about-cards", start: "top 75%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="sobre" className="relative py-36 md:py-44 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <div className="about-line h-px w-14 bg-accent/40 origin-left" />
          <span className="text-[10px] font-mono text-accent/70 tracking-[0.2em] uppercase">
            Quem Somos
          </span>
        </div>

        {/* Heading */}
        <h2 className="about-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-8 max-w-4xl leading-[1.08] tracking-[-0.03em]">
          Risco cibernético traduzido em{" "}
          <span className="gradient-text">estratégia executiva</span>
        </h2>

        {/* Description */}
        <p className="about-desc text-lg md:text-xl text-muted max-w-2xl mb-24 leading-relaxed">
          A Nullscience é uma firma de advisory em cibersegurança
          focada no Brasil e América Latina. Não vendemos ferramentas
          — preparamos organizações para o que vem a seguir.
        </p>

        {/* Asymmetric Bento Grid */}
        <div className="about-cards grid lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => (
            <TiltCard key={cap.title} className={cap.span}>
              <span className="mb-7 block opacity-80">{cap.icon}</span>
              <h3 className="text-xl font-semibold mb-3 tracking-[-0.01em]">
                {cap.title}
              </h3>
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
