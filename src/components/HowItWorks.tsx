"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Mapeamos a maturidade atual da sua organização em resposta a incidentes, governança e comunicação de crise.",
  },
  {
    num: "02",
    title: "Design do Cenário",
    desc: "Construímos cenários sob medida — ransomware, fraude, vazamento, crise regulatória — calibrados para o seu setor.",
  },
  {
    num: "03",
    title: "Simulação ao Vivo",
    desc: "Exercício imersivo de 60–90 minutos com injects em tempo real, comunicação multi-stakeholder e pressão realista.",
  },
  {
    num: "04",
    title: "Relatório e Ação",
    desc: "Relatório detalhado com scoring, gaps identificados, timeline de resposta e roadmap de melhorias priorizadas.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        ".hiw-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".hiw-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Vertical progress line with scrub
      gsap.fromTo(
        ".hiw-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );

      // Steps stagger
      gsap.fromTo(
        ".hiw-step",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hiw-steps",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="metodo" ref={sectionRef} className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <div className="eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span>Método</span>
          </div>
          <h2
            className="hiw-heading font-semibold tracking-[-0.03em] leading-[1.08] max-w-2xl opacity-0"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Quatro passos.{" "}
            <span className="text-muted">Um salto em prontidão.</span>
          </h2>
        </div>

        <div className="hiw-steps relative">
          {/* Vertical line track */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-border/30" />
          {/* Animated progress overlay */}
          <div
            className="hiw-progress absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-accent), rgba(0,229,160,0.2))",
            }}
          />

          <div className="flex flex-col gap-10 md:gap-12">
            {steps.map((s, i) => (
              <div
                key={i}
                className="hiw-step relative flex gap-8 md:gap-12 items-start opacity-0"
              >
                {/* Step number circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-accent/30 bg-background flex items-center justify-center">
                    <span className="text-xs font-mono text-accent/80 font-semibold">
                      {s.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-3">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-3 text-foreground/90">
                    {s.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted/50 leading-relaxed max-w-lg">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
