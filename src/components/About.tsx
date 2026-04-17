"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Advisory Executivo",
    desc: "Estratégia de cibersegurança traduzida para a linguagem do board. Alinhamos risco técnico com decisão de negócio.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Simulações de Crise",
    desc: "Exercícios imersivos que testam a resiliência real da sua organização. Cenários de ransomware, fraude e incidentes críticos.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Preparação para Incidentes",
    desc: "Playbooks, governança e treinamento para que sua equipe saiba exatamente o que fazer quando o alerta tocar.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Separator line
      gsap.fromTo(
        ".about-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".about-line",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Service cards stagger
      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-cards",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow + heading */}
        <div className="mb-20">
          <div className="eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span>Quem somos</span>
          </div>
          <h2
            className="about-heading font-bold tracking-[-0.03em] text-foreground/95 max-w-3xl leading-[1.08] opacity-0"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Segurança cibernética não é só tecnologia.{" "}
            <span className="text-muted">
              É estratégia, cultura e prontidão.
            </span>
          </h2>
        </div>

        {/* Separator */}
        <div
          className="about-line h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent mb-16 origin-left"
          style={{ transformOrigin: "left" }}
        />

        {/* Service cards */}
        <div className="about-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="about-card group p-8 rounded-2xl border border-border/50 bg-surface/50 hover:bg-surface-elevated/80 hover:border-accent/15 transition-all duration-500 opacity-0"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/15 transition-all duration-500">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] mb-3 text-foreground/90">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted/70">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
