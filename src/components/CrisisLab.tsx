"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    label: "Cenários realistas",
    desc: "Ransomware, fraude, vazamento de dados e crises regulatórias — construídos com base em incidentes reais.",
  },
  {
    label: "Comunicação multi-stakeholder",
    desc: "Mensagens adaptadas para board, jurídico, comunicação, TI e reguladores — simultaneamente.",
  },
  {
    label: "Métricas e scoring",
    desc: "Relatório pós-sessão com gaps identificados, tempo de resposta e recomendações acionáveis.",
  },
  {
    label: "Facilitação especializada",
    desc: "Conduzido por profissionais com experiência real em resposta a incidentes em grandes organizações.",
  },
];

export default function CrisisLab() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column: heading + description
      gsap.fromTo(
        ".cl-left",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right column: feature items stagger
      gsap.fromTo(
        ".cl-feature",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cl-features",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Terminal window reveal
      gsap.fromTo(
        ".cl-terminal",
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cl-terminal",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="crisislab"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.04) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Left: product intro */}
          <div className="cl-left opacity-0">
            <div className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              <span>Produto</span>
            </div>
            <h2
              className="font-semibold tracking-[-0.03em] leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              CrisisLab
            </h2>
            <p className="text-lg text-muted/60 leading-relaxed mb-8 max-w-md">
              Exercícios de simulação de crise cibernética que expõem gaps
              reais na sua prontidão — antes que um incidente real faça isso.
            </p>
            <a href="#contato" className="btn-primary inline-flex">
              <span>Agendar simulação</span>
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
          </div>

          {/* Right: feature list */}
          <div className="cl-features flex flex-col gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="cl-feature group flex gap-5 p-4 rounded-xl border border-border/40 bg-surface/30 hover:border-accent/15 hover:bg-surface-elevated/50 transition-[border-color,background-color] duration-150 opacity-0"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-accent/60 group-hover:bg-accent transition-colors duration-150" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-[-0.01em] text-foreground/85 mb-1">
                    {f.label}
                  </h4>
                  <p className="text-sm text-muted/55 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal mockup */}
        <div className="cl-terminal rounded-2xl border border-border/50 bg-surface/80 overflow-hidden glow-border opacity-0">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] font-mono text-muted/40 ml-3">
              crisislab — simulação ativa
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed">
            <p className="text-muted/40 mb-2">
              <span className="text-accent/60">$</span> crisislab init
              --cenario ransomware-financeiro
            </p>
            <p className="text-muted/30 mb-4">
              Inicializando ambiente de simulação...
            </p>
            <p className="text-muted/40 mb-1">
              <span className="text-accent/70">[14:32:07]</span> Cenário
              carregado: <span className="text-foreground/70">Ransomware — Instituição Financeira</span>
            </p>
            <p className="text-muted/40 mb-1">
              <span className="text-accent/70">[14:32:08]</span> Stakeholders:{" "}
              <span className="text-foreground/70">
                CISO, Jurídico, Comunicação, Board
              </span>
            </p>
            <p className="text-muted/40 mb-1">
              <span className="text-accent/70">[14:32:08]</span> Duração:{" "}
              <span className="text-foreground/70">90 minutos</span>
            </p>
            <p className="text-muted/40 mt-4">
              <span className="text-accent/60">$</span> Pronto para iniciar.{" "}
              <span className="inline-block w-2 h-4 bg-accent/50 ml-0.5 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
