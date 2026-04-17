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
    label: "Custo m\u00e9dio de um data breach no Brasil",
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
    label: "dias em m\u00e9dia para identificar uma viola\u00e7\u00e3o",
    source: "IBM, 2024",
  },
  {
    prefix: "",
    numericValue: 2,
    suffix: "x",
    decimals: 0,
    label: "maior custo quando n\u00e3o h\u00e1 plano de resposta testado",
    source: "Ponemon Institute",
  },
];

const quoteWords =
  "O plano de resposta a incidentes que nunca foi testado n\u00e3o \u00e9 um plano \u2014 \u00e9 uma esperan\u00e7a.".split(
    " "
  );

export default function WhyItMatters() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* Background pulse synced to scroll */
      gsap.fromTo(
        ".wim-pulse",
        { scale: 0.7, opacity: 0.15 },
        {
          scale: 1.3,
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

      gsap.fromTo(
        ".wim-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".wim-heading",
        { clipPath: "inset(100% 0 0 0)", y: 50, filter: "blur(4px)" },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".wim-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".wim-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".wim-desc", start: "top 85%" },
        }
      );

      /* Stat cards \u2014 double-bezel blur-up entrance with rotation */
      const statCards = gsap.utils.toArray<HTMLElement>(".wim-stat");
      statCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: "inset(0 0 100% 0)",
            opacity: 0,
            y: 50,
            rotateX: 6,
            filter: "blur(8px)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            delay: i * 0.1,
            ease: "cubic-bezier(0.32, 0.72, 0, 1)",
            scrollTrigger: {
              trigger: ".wim-stats",
              start: "top 80%",
            },
          }
        );

        /* Subtle parallax float */
        gsap.to(card, {
          yPercent: -3 * (i % 2 === 0 ? 1 : -1),
          rotate: (i % 2 === 0 ? 1 : -1) * 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      /* Number counting */
      const counters = gsap.utils.toArray<HTMLElement>(".wim-counter");
      counters.forEach((counter, i) => {
        const stat = stats[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.numericValue,
          duration: 2.5,
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

      /* Quote \u2014 word-by-word dramatic reveal */
      const quoteWordEls = gsap.utils.toArray<HTMLElement>(".quote-word");
      gsap.fromTo(
        quoteWordEls,
        { opacity: 0.1, y: 12, filter: "blur(2px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.6,
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
    <section ref={sectionRef} id="por-que" className="relative py-36 md:py-44 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      {/* Pulsing mesh orb */}
      <div className="wim-pulse mesh-orb mesh-orb-primary" style={{ width: "700px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="wim-line h-px w-14 bg-accent/40 origin-left" />
          <span className="text-[10px] font-mono text-accent/70 tracking-[0.2em] uppercase">
            Por Que Importa
          </span>
        </div>

        {/* Heading */}
        <h2 className="wim-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-8 max-w-4xl leading-[1.08] tracking-[-0.03em]">
          O custo de n\u00e3o estar{" "}
          <span className="gradient-text">preparado</span>
        </h2>

        {/* Description */}
        <p className="wim-desc text-lg md:text-xl text-muted max-w-2xl mb-20 leading-relaxed">
          O cen\u00e1rio de amea\u00e7as no Brasil est\u00e1 entre os mais
          agressivos do mundo. A diferen\u00e7a entre empresas que sobrevivem a
          um incidente e as que n\u00e3o se recuperam? Prepara\u00e7\u00e3o.
        </p>

        {/* Stats grid \u2014 double-bezel cards */}
        <div
          className="wim-stats grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ perspective: "1000px" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="wim-stat">
              <div className="bezel-outer h-full group">
                <div
                  className="bezel-inner relative p-7 h-full overflow-hidden"
                  style={{
                    transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      borderRadius: "inherit",
                      transition: "opacity 600ms cubic-bezier(0.32, 0.72, 0, 1)",
                    }}
                  />
                  <div className="relative">
                    <span className="wim-counter text-4xl md:text-5xl font-bold gradient-text text-glow block">
                      {stat.prefix}0{stat.suffix}
                    </span>
                    <p className="text-sm text-muted/70 mt-4 leading-relaxed">
                      {stat.label}
                    </p>
                    <span className="text-[10px] font-mono text-muted/40 mt-2 block">
                      {stat.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote \u2014 double-bezel */}
        <div className="wim-quote mt-24 max-w-3xl mx-auto">
          <div className="bezel-outer-lg">
            <div className="bezel-inner-lg p-10 md:p-12 text-center">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/85">
                &ldquo;
                {quoteWords.map((word, i) => (
                  <span key={i}>
                    <span className="quote-word inline-block">{word}</span>
                    {i < quoteWords.length - 1 ? " " : ""}
                  </span>
                ))}
                &rdquo;
              </p>
              <span className="text-xs text-muted/50 font-mono mt-6 block">
                \u2014 Nullscience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
