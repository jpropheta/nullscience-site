"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  nome: string;
  empresa: string;
  email: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  empresa?: string;
  email?: string;
  mensagem?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    empresa: "",
    email: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!formData.empresa.trim()) errs.empresa = "Empresa é obrigatória";
    if (!formData.email.trim()) {
      errs.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "E-mail inválido";
    }
    if (!formData.mensagem.trim()) errs.mensagem = "Mensagem é obrigatória";
    return errs;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { x: -8 },
            { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" }
          );
        }
        return;
      }

      setStatus("submitting");

      const subject = encodeURIComponent(
        `Contato Nullscience — ${formData.empresa}`
      );
      const body = encodeURIComponent(
        `Nome: ${formData.nome}\nEmpresa: ${formData.empresa}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.mensagem}`
      );

      await new Promise((r) => setTimeout(r, 800));
      window.location.href = `mailto:contato@nullscience.ai?subject=${subject}&body=${body}`;
      setStatus("success");

      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { scale: 0.95 },
          { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }
        );
      }

      setTimeout(() => {
        setStatus("idle");
        setFormData({ nome: "", empresa: "", email: "", mensagem: "" });
      }, 3000);
    },
    [formData, validate]
  );

  const handleBtnMove = useCallback((e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleBtnLeave = useCallback(() => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".contact-tag",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-heading",
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-desc",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact-desc", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-alt",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact-alt", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".contact-glow",
        { scale: 0.6, opacity: 0.3 },
        {
          scale: 1.2,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="contato" className="relative py-32 px-6">
      <div className="contact-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="contact-tag inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-accent/20 bg-accent/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent tracking-wider uppercase">
            Vamos Conversar
          </span>
        </div>

        <h2 className="contact-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Pronto para testar a resiliência{" "}
          <span className="gradient-text">do seu time?</span>
        </h2>

        <p className="contact-desc text-lg text-muted mb-12 leading-relaxed">
          Sem formulários intermináveis. Conte-nos sobre seu contexto e montamos
          uma proposta sob medida. Respondemos em até 24 horas.
        </p>

        <div className="contact-form p-8 md:p-10 rounded-lg border border-border bg-surface">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="text-left">
                <label className="text-xs font-mono text-muted tracking-wider uppercase block mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className={`w-full px-4 py-3 bg-background border rounded text-sm text-foreground placeholder:text-muted/40 focus:outline-none transition-all duration-300 ${
                    errors.nome
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-border focus:border-accent/60 focus:shadow-[0_0_20px_rgba(0,229,160,0.1)]"
                  }`}
                />
                {errors.nome && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.nome}</p>
                )}
              </div>

              {/* Empresa */}
              <div className="text-left">
                <label className="text-xs font-mono text-muted tracking-wider uppercase block mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Sua empresa"
                  className={`w-full px-4 py-3 bg-background border rounded text-sm text-foreground placeholder:text-muted/40 focus:outline-none transition-all duration-300 ${
                    errors.empresa
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-border focus:border-accent/60 focus:shadow-[0_0_20px_rgba(0,229,160,0.1)]"
                  }`}
                />
                {errors.empresa && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.empresa}</p>
                )}
              </div>
            </div>

            {/* E-mail */}
            <div className="text-left">
              <label className="text-xs font-mono text-muted tracking-wider uppercase block mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={`w-full px-4 py-3 bg-background border rounded text-sm text-foreground placeholder:text-muted/40 focus:outline-none transition-all duration-300 ${
                  errors.email
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-border focus:border-accent/60 focus:shadow-[0_0_20px_rgba(0,229,160,0.1)]"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>
              )}
            </div>

            {/* Mensagem */}
            <div className="text-left">
              <label className="text-xs font-mono text-muted tracking-wider uppercase block mb-2">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                rows={5}
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Conte-nos sobre seu cenário e objetivos..."
                className={`w-full px-4 py-3 bg-background border rounded text-sm text-foreground placeholder:text-muted/40 focus:outline-none transition-all duration-300 resize-none ${
                  errors.mensagem
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-border focus:border-accent/60 focus:shadow-[0_0_20px_rgba(0,229,160,0.1)]"
                }`}
              />
              {errors.mensagem && (
                <p className="text-xs text-red-400 mt-1 font-mono">{errors.mensagem}</p>
              )}
            </div>

            <button
              ref={btnRef}
              type="submit"
              disabled={status === "submitting"}
              onMouseMove={handleBtnMove}
              onMouseLeave={handleBtnLeave}
              className={`w-full py-4 font-semibold rounded text-sm tracking-wide transition-all duration-300 ${
                status === "success"
                  ? "bg-accent text-background glow-accent-strong"
                  : status === "submitting"
                  ? "bg-accent/60 text-background cursor-wait"
                  : "bg-accent text-background hover:bg-accent/90 glow-accent"
              }`}
            >
              {status === "submitting" && (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="31.4 31.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Enviando...
                </span>
              )}
              {status === "success" && "Mensagem Enviada!"}
              {status === "idle" && "Enviar Mensagem"}
              {status === "error" && "Tentar Novamente"}
            </button>
          </form>
        </div>

        <p className="contact-alt mt-8 text-sm text-muted">
          Prefere e-mail direto?{" "}
          <a
            href="mailto:contato@nullscience.ai"
            className="text-accent hover:underline transition-colors"
          >
            contato@nullscience.ai
          </a>
        </p>
      </div>
    </section>
  );
}
