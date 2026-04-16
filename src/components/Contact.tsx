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

function FloatingInput({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative text-left">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono tracking-wider uppercase ${
          isActive
            ? "top-1.5 text-[10px] text-accent"
            : "top-3.5 text-xs text-muted"
        }`}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-4 pt-5 pb-2 bg-background border rounded text-sm text-foreground focus:outline-none transition-all duration-300 ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : focused
            ? "border-accent/60 shadow-[0_0_20px_rgba(0,229,160,0.1)]"
            : "border-border"
        }`}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1 font-mono">{error}</p>
      )}
    </div>
  );
}

function FloatingTextarea({
  label,
  name,
  value,
  error,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative text-left">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono tracking-wider uppercase ${
          isActive
            ? "top-1.5 text-[10px] text-accent"
            : "top-3.5 text-xs text-muted"
        }`}
      >
        {label}
      </label>
      <textarea
        rows={4}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-4 pt-5 pb-2 bg-background border rounded text-sm text-foreground focus:outline-none transition-all duration-300 resize-none ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : focused
            ? "border-accent/60 shadow-[0_0_20px_rgba(0,229,160,0.1)]"
            : "border-border"
        }`}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1 font-mono">{error}</p>
      )}
    </div>
  );
}

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

  const handleChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

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
        // Shake the form on validation error
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { x: -8 },
            {
              x: 0,
              duration: 0.4,
              ease: "elastic.out(1, 0.3)",
            }
          );
        }
        return;
      }

      setStatus("submitting");

      // Build mailto fallback
      const subject = encodeURIComponent(
        `Contato Nullscience — ${formData.empresa}`
      );
      const body = encodeURIComponent(
        `Nome: ${formData.nome}\nEmpresa: ${formData.empresa}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.mensagem}`
      );

      // Simulate brief delay for UX, then open mailto
      await new Promise((r) => setTimeout(r, 800));

      window.location.href = `mailto:contato@nullscience.ai?subject=${subject}&body=${body}`;

      setStatus("success");

      // Success animation
      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { scale: 0.95 },
          {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          }
        );
      }

      // Reset after delay
      setTimeout(() => {
        setStatus("idle");
        setFormData({ nome: "", empresa: "", email: "", mensagem: "" });
      }, 3000);
    },
    [formData, validate]
  );

  // Magnetic button
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

      // Tag badge
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

      // Heading clip
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

      // Description
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

      // Form card rises up
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

      // Alt contact
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

      // Background glow responds to scroll
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
      {/* Background glow */}
      <div className="contact-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Tag */}
        <div className="contact-tag inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-accent/20 bg-accent/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent tracking-wider uppercase">
            Vamos Conversar
          </span>
        </div>

        {/* Heading */}
        <h2 className="contact-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Pronto para testar a resiliência{" "}
          <span className="gradient-text">do seu time?</span>
        </h2>

        {/* Description */}
        <p className="contact-desc text-lg text-muted mb-12 leading-relaxed">
          Sem formulários intermináveis. Conte-nos sobre seu contexto e montamos
          uma proposta sob medida. Respondemos em até 24 horas.
        </p>

        {/* Form */}
        <div className="contact-form p-8 rounded-lg border border-border bg-surface">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <FloatingInput
                label="Nome"
                name="nome"
                value={formData.nome}
                error={errors.nome}
                onChange={handleChange}
              />
              <FloatingInput
                label="Empresa"
                name="empresa"
                value={formData.empresa}
                error={errors.empresa}
                onChange={handleChange}
              />
            </div>

            <FloatingInput
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
            />

            <FloatingTextarea
              label="Mensagem"
              name="mensagem"
              value={formData.mensagem}
              error={errors.mensagem}
              onChange={handleChange}
            />

            <button
              ref={btnRef}
              type="submit"
              disabled={status === "submitting"}
              onMouseMove={handleBtnMove}
              onMouseLeave={handleBtnLeave}
              className={`w-full py-3.5 font-semibold rounded text-sm tracking-wide transition-all duration-300 ${
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
              {status === "success" && "✓ Mensagem Enviada!"}
              {status === "idle" && "Enviar Mensagem"}
              {status === "error" && "Tentar Novamente"}
            </button>
          </form>
        </div>

        {/* Alternative contact */}
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
