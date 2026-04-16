"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    prefix: "R$ ",
    numericValue: 6.75,
    suffix: "M",
    decimals: 2,
    label: "Custo médio de um data breach no Brasil",
    source: "IBM, 2024",
  },
  {
    prefix: "",
    numericValue: 75,
    suffix: "%",
    decimals: 0,
    label: "das empresas brasileiras sofreram ataques ransomware",
    source: "Sophos, 2024",
  },
  {
    prefix: "",
    numericValue: 204,
    suffix: "",
    decimals: 0,
    label: "dias em média para identificar uma violação",
    source: "IBM, 2024",
  },
  {
    prefix: "",
    numericValue: 2,
    suffix: "x",
    decimals: 0,
    label: "maior custo quando não há plano de resposta testado",
    source: "Ponemon Institute",
  },
];

const quoteWords =
  "O plano de resposta a incidentes que nunca foi testado não é um plano — é uma esperança.".split(
    " "
  );

export default function WhyItMatters() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Background pulse synced to scroll
      gsap.fromTo(
        ".wim-pulse",
        { scale: 0.8, opacity: 0.2 },
        {
          scale: 1.2,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Section label line
      gsap.fromTo(
        ".wim-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Heading clip reveal
      gsap.fromTo(
        ".wim-heading",
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".wim-heading", start: "top 85%" },
        }
      );

      // Description
      gsap.fromTo(
        ".wim-desc",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wim-desc", start: "top 85%" },
        }
      );

      // Stats cards — clip reveal + slight rotation on scroll
      const statCards = gsap.utils.toArray<HTMLElement>(".wim-stat");
      statCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: "inset(0 0 100% 0)",
            opacity: 0,
            y: 40,
            rotateX: 8,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".wim-stats",
              start: "top 80%",
            },
          }
        );

        // Subtle scale/rotate on scroll for depth
        gsap.to(card, {
          yPercent: -3 * (i % 2 === 0 ? 1 : -1),
          rotate: (i % 2 === 0 ? 1 : -1) * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // Number counting animations
      const counters = gsap.utils.toArray<HTMLElement>(".wim-counter");
      counters.forEach((counter, i) => {
        const stat = stats[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.numericValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            const formatted =
              stat.decimals > 0
                ? obj.val.toFixed(stat.decimals).replace(".", ",")
                : Math.round(obj.val).toString();
            counter.textContent = `${stat.prefix}${formatted}${stat.suffix}`;
          },
        });
      });

      // Quote — word-by-word dramatic reveal
      const quoteWordEls = gsap.utils.toArray<HTMLElement>(".quote-word");
      gsap.fromTo(
        quoteWordEls,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".wim-quote",
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="por-que" className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      {/* Pulsing glow synced to scroll */}
      <div className="wim-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[200px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="wim-line h-px w-12 bg-accent/40 origin-left" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Por Que Importa
          </span>
        </div>

        {/* Heading */}
        <h2 className="wim-heading text-3xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
          O custo de não estar{" "}
          <span className="gradient-text">preparado</span>
        </h2>

        {/* Description */}
        <p className="wim-desc text-lg text-muted max-w-2xl mb-16 leading-relaxed">
          O cenário de ameaças no Brasil está entre os mais agressivos do mundo.
          A diferença entre empresas que sobrevivem a um incidente e as que não
          se recuperam? Preparação.
        </p>

        {/* Stats grid */}
        <div
          className="wim-stats grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ perspective: "800px" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="wim-stat relative p-6 rounded-lg border border-border bg-surface hover:border-accent/20 transition-all duration-500 group"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="wim-counter text-4xl md:text-5xl font-bold gradient-text text-glow block">
                  {stat.prefix}0{stat.suffix}
                </span>
                <p className="text-sm text-muted mt-4 leading-relaxed">
                  {stat.label}
                </p>
                <span className="text-xs font-mono text-muted/50 mt-2 block">
                  {stat.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote — word-by-word reveal */}
        <div className="wim-quote mt-20 p-8 rounded-lg border border-accent/10 bg-accent/5 max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
            &ldquo;
            {quoteWords.map((word, i) => (
              <span key={i}>
                <span className="quote-word inline-block">{word}</span>
                {i < quoteWords.length - 1 ? " " : ""}
              </span>
            ))}
            &rdquo;
          </p>
          <span className="text-sm text-muted font-mono mt-4 block">
            — Nullscience
          </span>
        </div>
      </div>
    </section>
  );
}
