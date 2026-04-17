"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) return;
    setSending(true);
    const subject = encodeURIComponent(`Contato: ${nome}${empresa ? ` — ${empresa}` : ""}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}${empresa ? `\nEmpresa: ${empresa}` : ""}\n\n${mensagem}`
    );
    window.location.href = `mailto:contato@nullscience.ai?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 500);
  };

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
        {submitted ? (
          <div className="contact-form text-center py-16 opacity-0">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/30 mb-6"
              style={{ background: "rgba(0,229,160,0.06)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground/80 mb-2">Mensagem preparada</h3>
            <p className="text-sm text-muted/50 max-w-xs mx-auto">
              Seu cliente de e-mail foi aberto com a mensagem preenchida. Basta enviar para finalizar o contato.
            </p>
          </div>
        ) : (
          <form
            className="contact-form space-y-5 opacity-0"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
                  Nome <span className="text-accent/60">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-[border-color,box-shadow] duration-150"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
                  E-mail corporativo <span className="text-accent/60">*</span>
                </label>
                <input
                  type="email"
                  placeholder="nome@empresa.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-[border-color,box-shadow] duration-150"
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
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-[border-color,box-shadow] duration-150"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-muted/40 uppercase tracking-wider mb-2">
                Como podemos ajudar?
              </label>
              <textarea
                rows={4}
                placeholder="Descreva brevemente o que você busca..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border/50 text-sm text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-[border-color,box-shadow] duration-150 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={sending || !nome || !email}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{sending ? "Preparando..." : "Enviar mensagem"}</span>
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
        )}
      </div>
    </section>
  );
}
