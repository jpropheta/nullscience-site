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

      gsap.fromTo(
        ".hiw-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".hiw-heading",
        { clipPath: "inset(100% 0 0 0)", y: 50, filter: "blur(4px)" },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".hiw-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".hiw-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".hiw-desc", start: "top 85%" },
        }
      );

      /* Progress line — fills on scroll with glow */
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

      /* Step items — alternating slide with blur */
      const stepItems = gsap.utils.toArray<HTMLElement>(".hiw-step");
      stepItems.forEach((step, i) => {
        const fromLeft = i % 2 === 0;

        /* Step number — spring scale in */
        const numberEl = step.querySelector(".hiw-number");
        if (numberEl) {
          gsap.fromTo(
            numberEl,
            { scale: 0, opacity: 0, filter: "blur(6px)" },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "back.out(2)",
              scrollTrigger: { trigger: step, start: "top 80%" },
            }
          );
        }

        const fillEl = step.querySelector(".hiw-number-fill");
        if (fillEl) {
          gsap.fromTo(
            fillEl,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: step, start: "top 78%" },
            }
          );
        }

        /* Content slides in from alternating sides with blur */
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
              filter: "blur(6px)",
            },
            {
              x: 0,
              opacity: 1,
              clipPath: "inset(0 0% 0 0%)",
              filter: "blur(0px)",
              duration: 1,
              ease: "cubic-bezier(0.32, 0.72, 0, 1)",
              scrollTrigger: { trigger: step, start: "top 78%" },
            }
          );
        }

        /* Detail badge */
        const detailEl = step.querySelector(".hiw-detail");
        if (detailEl) {
          gsap.fromTo(
            detailEl,
            { opacity: 0, y: 10, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.6,
              delay: 0.3,
              ease: "cubic-bezier(0.32, 0.72, 0, 1)",
              scrollTrigger: { trigger: step, start: "top 78%" },
            }
          );
        }

        /* Active step glow tracking */
        const glowEl = step.querySelector(".hiw-glow");
        if (glowEl) {
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () =>
              gsap.to(glowEl, { opacity: 1, scale: 1, duration: 0.5 }),
            onLeave: () =>
              gsap.to(glowEl, { opacity: 0, scale: 0.8, duration: 0.4 }),
            onEnterBack: () =>
              gsap.to(glowEl, { opacity: 1, scale: 1, duration: 0.5 }),
            onLeaveBack: () =>
              gsap.to(glowEl, { opacity: 0, scale: 0.8, duration: 0.4 }),
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
      className="relative py-36 md:py-44 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="hiw-line h-px w-14 bg-accent/40 origin-left" />
          <span className="text-[10px] font-mono text-accent/70 tracking-[0.2em] uppercase">
            Processo
          </span>
        </div>

        {/* Heading */}
        <h2 className="hiw-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.08] tracking-[-0.03em]">
          Como <span className="gradient-text">funciona</span>
        </h2>

        {/* Description */}
        <p className="hiw-desc text-lg md:text-xl text-muted max-w-2xl mb-24 leading-relaxed">
          Do diagnóstico ao relatório final — um processo
          desenhado para gerar resultados concretos em semanas, não meses.
        </p>

        {/* Timeline */}
        <div className="hiw-timeline relative">
          {/* Vertical track */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-border/40">
            <div className="hiw-progress w-full h-full bg-accent origin-top" />
          </div>
          {/* Glow trail */}
          <div className="absolute left-[31px] md:left-[47px] top-0 bottom-0 w-[3px] pointer-events-none">
            <div className="hiw-progress-glow w-full h-full bg-accent/30 blur-[4px] origin-top" />
          </div>

          <div className="space-y-20">
            {steps.map((step) => (
              <div
                key={step.number}
                className="hiw-step flex gap-8 md:gap-12 items-start group relative"
              >
                {/* Step number — double-bezel */}
                <div className="relative flex-shrink-0">
                  <div className="bezel-outer" style={{ borderRadius: "1rem", padding: "4px" }}>
                    <div
                      className="hiw-number relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bezel-inner overflow-hidden"
                      style={{ borderRadius: "calc(1rem - 4px)" }}
                    >
                      {/* Radial fill bg */}
                      <div className="hiw-number-fill absolute inset-0 bg-accent/[0.04]" style={{ borderRadius: "inherit" }} />
                      {/* Active glow */}
                      <div className="hiw-glow absolute inset-0 bg-accent/8 opacity-0 scale-80" style={{ borderRadius: "inherit" }} />
                      <span className="relative text-2xl md:text-3xl font-bold font-mono gradient-text">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="hiw-content pt-2 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-muted/70 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <span className="hiw-detail eyebrow-tag">
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
