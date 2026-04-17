"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    label: "Cen\u00e1rio",
    value:
      "Ransomware, data breach, insider threat \u2014 cen\u00e1rios reais do mercado brasileiro.",
  },
  {
    label: "Formato",
    value:
      "Meia-dia ou dia inteiro. Remoto ou presencial. 6 a 20 participantes.",
  },
  {
    label: "Plataforma",
    value:
      "Browser-based, conduzido por facilitador especialista. Sem instala\u00e7\u00e3o.",
  },
  {
    label: "Resultado",
    value:
      "Scoring propriet\u00e1rio, relat\u00f3rio executivo e debrief com recomenda\u00e7\u00f5es acion\u00e1veis.",
  },
];

const terminalLines = [
  { prefix: "$", text: " crisislab init --scenario ransomware", type: "command" as const },
  { prefix: "\u25b8", text: " Carregando cen\u00e1rio: Ataque ransomware ao setor financeiro", type: "output" as const },
  { prefix: "\u25b8", text: " Participantes conectados: 12/12", type: "output" as const },
  { prefix: "\u25b8", text: " Facilitador: ativo", type: "output" as const },
  { prefix: "---", text: "", type: "divider" as const },
  { prefix: "\u26a1", text: " Fase 1: Detec\u00e7\u00e3o Inicial", type: "phase" as const },
  { prefix: "", text: "08:00 \u2014 Alerta SIEM: atividade an\u00f4mala em servidor de arquivos", type: "log" as const },
  { prefix: "", text: "08:03 \u2014 Ticket aberto: \u201carquivos inacess\u00edveis no departamento financeiro\u201d", type: "log" as const },
  { prefix: "", text: "08:07 \u2014 Analista SOC: poss\u00edvel criptografia em massa detectada", type: "log" as const },
  { prefix: "---", text: "", type: "divider" as const },
  { prefix: "\u25b8", text: " Aguardando decis\u00e3o do time...", type: "waiting" as const },
];

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
      {/* Double-bezel terminal */}
      <div className="bezel-outer-lg">
        <div className="bezel-inner-lg overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3.5 bg-surface-light/50 border-b border-white/[0.04]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="ml-3 text-[11px] font-mono text-muted/50">
              crisislab \u2014 simula\u00e7\u00e3o ativa
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-8 font-mono text-sm space-y-2.5 min-h-[360px]">
            {terminalLines.map((line, i) => {
              if (i >= visibleLines) return null;

              const isCurrentLine = i === visibleLines - 1 && !typingComplete;
              const fullText = line.prefix + line.text;
              const displayText = isCurrentLine
                ? fullText.slice(0, currentCharIndex)
                : fullText;

              if (line.type === "divider") {
                return (
                  <div
                    key={i}
                    className="h-px my-4"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,229,160,0.1), transparent)",
                    }}
                  />
                );
              }

              if (line.type === "phase") {
                return (
                  <div key={i} className="text-accent font-semibold text-[13px]">
                    {displayText}
                  </div>
                );
              }

              if (line.type === "log") {
                return (
                  <div
                    key={i}
                    className="text-muted/70 pl-4 border-l border-accent/15 text-xs"
                  >
                    {displayText}
                  </div>
                );
              }

              if (line.type === "waiting") {
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-accent">
                      {isCurrentLine ? displayText.slice(0, 1) : "\u25b8"}
                    </span>
                    <span className="text-foreground/90">
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
                    line.type === "command" ? "text-muted/80" : "text-muted/50"
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
      </div>

      {/* Floating stat \u2014 double-bezel */}
      <div className="terminal-stat absolute -bottom-6 -left-4 md:-left-6">
        <div className="bezel-outer" style={{ borderRadius: "1rem", padding: "4px" }}>
          <div
            className="bezel-inner px-5 py-3.5"
            style={{ borderRadius: "calc(1rem - 4px)" }}
          >
            <div className="text-2xl font-bold gradient-text text-glow">94%</div>
            <div className="text-[10px] text-muted/60 font-mono mt-0.5">
              satisfa\u00e7\u00e3o p\u00f3s-exerc\u00edcio
            </div>
          </div>
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

      gsap.fromTo(
        ".cl-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".cl-heading",
        { clipPath: "inset(100% 0 0 0)", y: 50, filter: "blur(4px)" },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".cl-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".cl-text",
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".cl-text", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".cl-feature",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".cl-features", start: "top 80%" },
        }
      );

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

      gsap.fromTo(
        ".cl-terminal",
        { x: 80, opacity: 0, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".cl-terminal", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".terminal-stat",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".cl-terminal", start: "top 60%" },
        }
      );

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
      className="relative py-36 md:py-44 px-6 overflow-hidden"
    >
      {/* Background mesh orb */}
      <div
        className="mesh-orb mesh-orb-primary"
        style={{ width: "600px", height: "600px", top: "30%", right: "-5%" }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: info */}
          <div className="cl-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="cl-line h-px w-14 bg-accent/40 origin-left" />
              <span className="text-[10px] font-mono text-accent/70 tracking-[0.2em] uppercase">
                Produto
              </span>
            </div>

            <h2 className="cl-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.08] tracking-[-0.03em]">
              <span className="gradient-text text-glow">CrisisLab</span>
            </h2>

            <p className="cl-text text-xl text-muted mb-4 leading-relaxed">
              Simula\u00e7\u00f5es de crise cibern\u00e9tica conduzidas por
              facilitador.
            </p>

            <p className="cl-text text-muted/70 mb-14 leading-relaxed">
              Testamos a resposta do seu time antes que um incidente real o
              fa\u00e7a. Cen\u00e1rios realistas, press\u00e3o controlada,
              resultados mensur\u00e1veis. Seu CISO recebe um relat\u00f3rio que
              o board entende.
            </p>

            {/* Feature list */}
            <div className="cl-features relative">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border/50">
                <div className="cl-progress w-full h-full bg-accent origin-top" />
              </div>

              <div className="space-y-8">
                {features.map((feat) => (
                  <div
                    key={feat.label}
                    className="cl-feature flex gap-6 items-start"
                  >
                    <div
                      className="w-[15px] h-[15px] rounded-full border-2 border-accent bg-background flex-shrink-0 mt-1"
                      style={{
                        boxShadow: "0 0 8px rgba(0,229,160,0.15)",
                      }}
                    />
                    <div>
                      <span className="text-[10px] font-mono text-accent/70 tracking-[0.2em] uppercase block mb-1.5">
                        {feat.label}
                      </span>
                      <p className="text-sm text-muted/70 leading-relaxed">
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
