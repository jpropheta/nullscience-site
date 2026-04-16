"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    label: "Cenário",
    value:
      "Ransomware, data breach, insider threat — cenários reais do mercado brasileiro.",
  },
  {
    label: "Formato",
    value:
      "Meia-dia ou dia inteiro. Remoto ou presencial. 6 a 20 participantes.",
  },
  {
    label: "Plataforma",
    value:
      "Browser-based, conduzido por facilitador especialista. Sem instalação.",
  },
  {
    label: "Resultado",
    value:
      "Scoring proprietário, relatório executivo e debrief com recomendações acionáveis.",
  },
];

const terminalLines = [
  { prefix: "$", text: " crisislab init --scenario ransomware", type: "command" as const },
  { prefix: "▸", text: " Carregando cenário: Ataque ransomware ao setor financeiro", type: "output" as const },
  { prefix: "▸", text: " Participantes conectados: 12/12", type: "output" as const },
  { prefix: "▸", text: " Facilitador: ativo", type: "output" as const },
  { prefix: "---", text: "", type: "divider" as const },
  { prefix: "⚡", text: " Fase 1: Detecção Inicial", type: "phase" as const },
  { prefix: "", text: "08:00 — Alerta SIEM: atividade anômala em servidor de arquivos", type: "log" as const },
  { prefix: "", text: '08:03 — Ticket aberto: "arquivos inacessíveis no departamento financeiro"', type: "log" as const },
  { prefix: "", text: "08:07 — Analista SOC: possível criptografia em massa detectada", type: "log" as const },
  { prefix: "---", text: "", type: "divider" as const },
  { prefix: "▸", text: " Aguardando decisão do time...", type: "waiting" as const },
];

/* ── Typewriter terminal ── */
function TerminalTyping() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisibleLines(terminalLines.length);
        setTypingComplete(true);
        return;
      }

      ScrollTrigger.create({
        trigger: termRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          if (!triggered.current) {
            triggered.current = true;
            startTyping();
          }
        },
      });
    },
    { scope: termRef }
  );

  const startTyping = useCallback(() => {
    let lineIdx = 0;

    const typeLine = () => {
      if (lineIdx >= terminalLines.length) {
        setTypingComplete(true);
        return;
      }

      const line = terminalLines[lineIdx];
      const fullText = line.prefix + line.text;
      setVisibleLines(lineIdx + 1);

      if (line.type === "divider") {
        lineIdx++;
        setTimeout(typeLine, 200);
        return;
      }

      let charIdx = 0;
      const typeChar = () => {
        if (charIdx <= fullText.length) {
          setCurrentCharIndex(charIdx);
          charIdx++;
          const delay =
            line.type === "command"
              ? 30 + Math.random() * 40
              : 10 + Math.random() * 15;
          setTimeout(typeChar, delay);
        } else {
          lineIdx++;
          setCurrentCharIndex(0);
          setTimeout(typeLine, line.type === "command" ? 400 : 150);
        }
      };

      typeChar();
    };

    typeLine();
  }, []);

  return (
    <div ref={termRef} className="relative">
      <div className="rounded-lg border border-border bg-surface overflow-hidden glow-accent">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-light border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 text-xs font-mono text-muted">
            crisislab — simulação ativa
          </span>
        </div>

        {/* Terminal content */}
        <div className="p-6 font-mono text-sm space-y-2 min-h-[340px]">
          {terminalLines.map((line, i) => {
            if (i >= visibleLines) return null;

            const isCurrentLine =
              i === visibleLines - 1 && !typingComplete;
            const fullText = line.prefix + line.text;
            const displayText = isCurrentLine
              ? fullText.slice(0, currentCharIndex)
              : fullText;

            if (line.type === "divider") {
              return <div key={i} className="h-px bg-border my-3" />;
            }

            if (line.type === "phase") {
              return (
                <div key={i} className="text-accent font-semibold">
                  {displayText}
                </div>
              );
            }

            if (line.type === "log") {
              return (
                <div
                  key={i}
                  className="text-muted/80 pl-4 border-l border-accent/20 text-xs"
                >
                  {displayText}
                </div>
              );
            }

            if (line.type === "waiting") {
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-accent">{isCurrentLine ? displayText.slice(0, 1) : "▸"}</span>
                  <span className="text-foreground">
                    {isCurrentLine ? displayText.slice(1) : line.text}
                  </span>
                  {(!isCurrentLine || typingComplete) && (
                    <span className="w-2 h-4 bg-accent inline-block terminal-cursor" />
                  )}
                </div>
              );
            }

            return (
              <div
                key={i}
                className={
                  line.type === "command" ? "text-muted" : "text-muted/60"
                }
              >
                {line.type === "command" && (
                  <span className="text-accent">
                    {isCurrentLine
                      ? displayText.slice(0, Math.min(currentCharIndex, 1))
                      : "$"}
                  </span>
                )}
                {line.type === "command"
                  ? isCurrentLine
                    ? displayText.slice(1)
                    : line.text
                  : displayText}
                {isCurrentLine && (
                  <span className="w-2 h-4 bg-accent inline-block ml-0.5 terminal-cursor" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating stats */}
      <div className="terminal-stat absolute -bottom-6 -left-6 p-4 rounded-lg border border-border bg-surface-light glow-accent">
        <div className="text-2xl font-bold gradient-text">94%</div>
        <div className="text-xs text-muted font-mono">
          satisfação pós-exercício
        </div>
      </div>
    </div>
  );
}

export default function CrisisLab() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Label line
      gsap.fromTo(
        ".cl-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Heading with clip-path
      gsap.fromTo(
        ".cl-heading",
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cl-heading", start: "top 85%" },
        }
      );

      // Descriptions
      gsap.fromTo(
        ".cl-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cl-text", start: "top 85%" },
        }
      );

      // Feature items with clip-path wipe from left
      gsap.fromTo(
        ".cl-feature",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cl-features", start: "top 80%" },
        }
      );

      // Feature progress line
      gsap.fromTo(
        ".cl-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".cl-features",
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        }
      );

      // Terminal entrance from right with parallax offset
      gsap.fromTo(
        ".cl-terminal",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cl-terminal", start: "top 80%" },
        }
      );

      // Floating stat bounce in
      gsap.fromTo(
        ".terminal-stat",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".cl-terminal", start: "top 60%" },
        }
      );

      // Split-screen parallax: left side moves at different rate than right
      gsap.to(".cl-left", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(".cl-right", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="crisislab"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background accent glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div className="cl-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="cl-line h-px w-12 bg-accent/40 origin-left" />
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Produto
              </span>
            </div>

            <h2 className="cl-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="gradient-text">CrisisLab</span>
            </h2>

            <p className="cl-text text-xl text-muted mb-4 leading-relaxed">
              Simulações de crise cibernética conduzidas por facilitador.
            </p>

            <p className="cl-text text-muted mb-12 leading-relaxed">
              Testamos a resposta do seu time antes que um incidente real o faça.
              Cenários realistas, pressão controlada, resultados mensuráveis. Seu
              CISO recebe um relatório que o board entende.
            </p>

            {/* Feature list */}
            <div className="cl-features relative">
              {/* Animated progress line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border">
                <div className="cl-progress w-full h-full bg-accent origin-top" />
              </div>

              <div className="space-y-8">
                {features.map((feat) => (
                  <div key={feat.label} className="cl-feature flex gap-6 items-start">
                    <div className="w-[15px] h-[15px] rounded-full border-2 border-accent bg-background flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-mono text-accent tracking-wider uppercase block mb-1">
                        {feat.label}
                      </span>
                      <p className="text-sm text-muted leading-relaxed">
                        {feat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: terminal */}
          <div className="cl-right cl-terminal">
            <TerminalTyping />
          </div>
        </div>
      </div>
    </section>
  );
}
