"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entendemos seu contexto: setor, maturidade de segurança, estrutura de resposta e objetivos do exercício.",
    detail: "Reunião de scoping com CISO e equipe de segurança",
  },
  {
    number: "02",
    title: "Design do Cenário",
    description:
      "Criamos um cenário sob medida baseado em ameaças reais do seu setor. Nada genérico — tudo calibrado.",
    detail: "Cenário customizado + briefing do facilitador",
  },
  {
    number: "03",
    title: "Simulação",
    description:
      "Execução facilitada com injects em tempo real. O time toma decisões sob pressão, como seria em um incidente real.",
    detail: "Meia-dia ou dia inteiro, remoto ou presencial",
  },
  {
    number: "04",
    title: "Debrief & Relatório",
    description:
      "Scoring proprietário, gap analysis e relatório executivo. Recomendações claras que vão do SOC ao board.",
    detail: "Relatório entregue em até 5 dias úteis",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Label line
      gsap.fromTo(
        ".hiw-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Heading clip
      gsap.fromTo(
        ".hiw-heading",
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hiw-heading", start: "top 85%" },
        }
      );

      // Description
      gsap.fromTo(
        ".hiw-desc",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hiw-desc", start: "top 85%" },
        }
      );

      // Progress line — fills on scroll with glow
      gsap.fromTo(
        ".hiw-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hiw-timeline",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        }
      );

      // Progress line glow pulses
      gsap.fromTo(
        ".hiw-progress-glow",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hiw-timeline",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        }
      );

      // Step items — slide from alternating sides
      const stepItems = gsap.utils.toArray<HTMLElement>(".hiw-step");
      stepItems.forEach((step, i) => {
        const fromLeft = i % 2 === 0;

        // Step number — radial fill effect via scale
        const numberEl = step.querySelector(".hiw-number");
        if (numberEl) {
          gsap.fromTo(
            numberEl,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
              },
            }
          );
        }

        // Number radial fill bg
        const fillEl = step.querySelector(".hiw-number-fill");
        if (fillEl) {
          gsap.fromTo(
            fillEl,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
              },
            }
          );
        }

        // Content slides in from alternating sides
        const contentEl = step.querySelector(".hiw-content");
        if (contentEl) {
          gsap.fromTo(
            contentEl,
            {
              x: fromLeft ? -60 : 60,
              opacity: 0,
              clipPath: fromLeft
                ? "inset(0 100% 0 0)"
                : "inset(0 0 0 100%)",
            },
            {
              x: 0,
              opacity: 1,
              clipPath: "inset(0 0% 0 0%)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
              },
            }
          );
        }

        // Detail badge
        const detailEl = step.querySelector(".hiw-detail");
        if (detailEl) {
          gsap.fromTo(
            detailEl,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
              },
            }
          );
        }

        // Connecting line between steps
        const connector = step.querySelector(".hiw-connector");
        if (connector) {
          gsap.fromTo(
            connector,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
              },
            }
          );
        }
      });

      // Active step glow — tracks scroll position
      const stepNodes = gsap.utils.toArray<HTMLElement>(".hiw-step");
      stepNodes.forEach((step) => {
        const glowEl = step.querySelector(".hiw-glow");
        if (glowEl) {
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () =>
              gsap.to(glowEl, { opacity: 1, scale: 1, duration: 0.4 }),
            onLeave: () =>
              gsap.to(glowEl, { opacity: 0, scale: 0.8, duration: 0.3 }),
            onEnterBack: () =>
              gsap.to(glowEl, { opacity: 1, scale: 1, duration: 0.4 }),
            onLeaveBack: () =>
              gsap.to(glowEl, { opacity: 0, scale: 0.8, duration: 0.3 }),
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="hiw-line h-px w-12 bg-accent/40 origin-left" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Processo
          </span>
        </div>

        {/* Heading */}
        <h2 className="hiw-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Como <span className="gradient-text">funciona</span>
        </h2>

        {/* Description */}
        <p className="hiw-desc text-lg text-muted max-w-2xl mb-20 leading-relaxed">
          Do diagnóstico ao relatório final — um processo desenhado para gerar
          resultados concretos em semanas, não meses.
        </p>

        {/* Timeline */}
        <div className="hiw-timeline relative">
          {/* Vertical track line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-border">
            {/* Fill */}
            <div className="hiw-progress w-full h-full bg-accent origin-top" />
          </div>
          {/* Glow trail */}
          <div className="absolute left-[31px] md:left-[47px] top-0 bottom-0 w-[3px] pointer-events-none">
            <div className="hiw-progress-glow w-full h-full bg-accent/30 blur-[4px] origin-top" />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.number} className="hiw-step flex gap-8 md:gap-12 items-start group relative">
                {/* Step number */}
                <div className="relative flex-shrink-0">
                  <div className="hiw-number relative w-16 h-16 md:w-24 md:h-24 rounded-lg border border-border bg-surface flex items-center justify-center group-hover:border-accent/40 transition-all duration-500 overflow-hidden">
                    {/* Radial fill bg */}
                    <div className="hiw-number-fill absolute inset-0 bg-accent/5 rounded-lg" />
                    {/* Active glow */}
                    <div className="hiw-glow absolute inset-0 bg-accent/10 rounded-lg opacity-0 scale-80" />
                    <span className="relative text-2xl md:text-3xl font-bold font-mono gradient-text">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="hiw-content pt-2 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span className="hiw-detail inline-flex items-center gap-2 text-xs font-mono text-accent/70 px-3 py-1 rounded-full border border-accent/10 bg-accent/5">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
