"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "277",
    suffix: " dias",
    label: "Tempo médio para identificar e conter um breach",
    source: "IBM Cost of a Data Breach 2024",
  },
  {
    value: "4.88",
    suffix: "M USD",
    label: "Custo médio global de uma violação de dados",
    source: "IBM Cost of a Data Breach 2024",
  },
  {
    value: "68",
    suffix: "%",
    label: "Das organizações que sofreram breach não tinham plano de resposta testado",
    source: "Ponemon Institute",
  },
  {
    value: "46",
    suffix: "%",
    label: "De redução no impacto financeiro com exercícios regulares de simulação",
    source: "Ponemon Institute",
  },
];

export default function WhyItMatters() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        ".wim-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".wim-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stat cards with number count-up
      const statEls = gsap.utils.toArray<HTMLElement>(".wim-stat");
      statEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // Animated number
        const numEl = el.querySelector(".wim-num");
        if (numEl) {
          const target = parseFloat(numEl.getAttribute("data-value") || "0");
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            delay: i * 0.1 + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (numEl) {
                numEl.textContent = target % 1 === 0
                  ? Math.round(obj.val).toString()
                  : obj.val.toFixed(2);
              }
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span>Por que importa</span>
          </div>
          <h2
            className="wim-heading font-semibold tracking-[-0.03em] leading-[1.08] max-w-3xl opacity-0"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Os números não mentem.{" "}
            <span className="text-muted">
              A maioria das organizações não está preparada.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="wim-stat group p-6 rounded-2xl border border-border/40 bg-surface/40 hover:border-accent/15 transition-[border-color,background-color] duration-150 opacity-0"
            >
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="wim-num text-3xl md:text-4xl font-bold tracking-[-0.04em] gradient-text"
                  data-value={s.value}
                >
                  0
                </span>
                <span className="text-sm font-semibold text-accent/70">
                  {s.suffix}
                </span>
              </div>
              <p className="text-sm text-muted/60 leading-relaxed mb-3">
                {s.label}
              </p>
              <p className="text-[10px] font-mono text-muted/30 uppercase tracking-wider">
                {s.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
