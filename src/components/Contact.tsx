"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
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
      id="contato"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.03) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Heading */}
        <div className="contact-content text-center mb-14 opacity-0">
          <div className="eyebrow mb-6 justify-center">
            <span className="eyebrow-dot" />
            <span>Contato</span>
          </div>
          <h2
            className="font-bold tracking-[-0.03em] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Vamos conversar sobre{" "}
            <span className="gradient-text">sua prontidão</span>
          </h2>
          <p className="text-muted/50 text-base max-w-md mx-auto leading-relaxed">
            Conte-nos sobre sua organização e agendamos uma conversa inicial sem
            compromisso.
          </p>
        </div>

        {/* Form */}
        <form
          className="contact-form space-y-5 opacity-0"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
                E-mail corporativo
              </label>
              <input
                type="email"
                placeholder="nome@empresa.com"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
              Empresa
            </label>
            <input
              type="text"
              placeholder="Nome da empresa"
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
              Como podemos ajudar?
            </label>
            <textarea
              rows={4}
              placeholder="Descreva brevemente o que você busca..."
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all duration-300 resize-none"
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn-primary">
              <span>Enviar mensagem</span>
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
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
