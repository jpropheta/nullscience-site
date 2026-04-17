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

const inputClasses = (hasError: boolean) =>
  `w-full px-5 py-3.5 bg-background border text-sm text-foreground placeholder:text-muted/30 focus:outline-none ${
    hasError
      ? "border-red-500/50 focus:border-red-500/70"
      : "border-border/60 focus:border-accent/40 focus:shadow-[0_0_25px_rgba(0,229,160,0.08)]"
  }` +
  " rounded-xl" +
  " transition-all duration-500";

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
    if (!formData.nome.trim()) errs.nome = "Nome \u00e9 obrigat\u00f3rio";
    if (!formData.empresa.trim()) errs.empresa = "Empresa \u00e9 obrigat\u00f3ria";
    if (!formData.email.trim()) {
      errs.email = "E-mail \u00e9 obrigat\u00f3rio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "E-mail inv\u00e1lido";
    }
    if (!formData.mensagem.trim()) errs.mensagem = "Mensagem \u00e9 obrigat\u00f3ria";
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
            { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }
          );
        }
        return;
      }

      setStatus("submitting");

      const subject = encodeURIComponent(
        `Contato Nullscience \u2014 ${formData.empresa}`
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
          { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" }
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
      x: x * 0.12,
      y: y * 0.12,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleBtnLeave = useCallback(() => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".contact-tag",
        { opacity: 0, scale: 0.9, y: 20, filter: "blur(4px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-heading",
        { clipPath: "inset(100% 0 0 0)", y: 50, filter: "blur(4px)" },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".contact-desc", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 70, clipPath: "inset(0 0 100% 0)", filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          filter: "blur(0px)",
          duration: 1.2,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-alt",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
          scrollTrigger: { trigger: ".contact-alt", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".contact-glow",
        { scale: 0.5, opacity: 0.2 },
        {
          scale: 1.3,
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
    <section ref={sectionRef} id="contato" className="relative py-36 md:py-44 px-6">
      <div className="contact-glow mesh-orb mesh-orb-primary" style={{ width: "700px", height: "500px", bottom: "0", left: "50%", transform: "translateX(-50%)" }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="contact-tag eyebrow-tag mb-10">
          <span className="eyebrow-dot" />
          <span>Vamos Conversar</span>
        </div>

        <h2 className="contact-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.08] tracking-[-0.03em]">
          Pronto para testar a resili\u00eancia{" "}
          <span className="gradient-text">do seu time?</span>
        </h2>

        <p className="contact-desc text-lg md:text-xl text-muted mb-14 leading-relaxed">
          Sem formul\u00e1rios intermin\u00e1veis. Conte-nos sobre seu contexto
          e montamos uma proposta sob medida. Respondemos em at\u00e9 24 horas.
        </p>

        {/* Double-bezel form container */}
        <div className="contact-form">
          <div className="bezel-outer-lg">
            <div className="bezel-inner-lg p-8 md:p-12">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label className="text-[10px] font-mono text-muted/60 tracking-[0.2em] uppercase block mb-2.5">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className={inputClasses(!!errors.nome)}
                      style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                    />
                    {errors.nome && (
                      <p className="text-[11px] text-red-400/80 mt-1.5 font-mono">{errors.nome}</p>
                    )}
                  </div>

                  <div className="text-left">
                    <label className="text-[10px] font-mono text-muted/60 tracking-[0.2em] uppercase block mb-2.5">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Sua empresa"
                      className={inputClasses(!!errors.empresa)}
                      style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                    />
                    {errors.empresa && (
                      <p className="text-[11px] text-red-400/80 mt-1.5 font-mono">{errors.empresa}</p>
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono text-muted/60 tracking-[0.2em] uppercase block mb-2.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={inputClasses(!!errors.email)}
                    style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400/80 mt-1.5 font-mono">{errors.email}</p>
                  )}
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono text-muted/60 tracking-[0.2em] uppercase block mb-2.5">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre seu cen\u00e1rio e objetivos..."
                    className={inputClasses(!!errors.mensagem) + " resize-none"}
                    style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                  />
                  {errors.mensagem && (
                    <p className="text-[11px] text-red-400/80 mt-1.5 font-mono">{errors.mensagem}</p>
                  )}
                </div>

                {/* Submit \u2014 full-width pill with magnetic hover */}
                <button
                  ref={btnRef}
                  type="submit"
                  disabled={status === "submitting"}
                  onMouseMove={handleBtnMove}
                  onMouseLeave={handleBtnLeave}
                  className={`w-full py-4 font-semibold rounded-full text-sm tracking-wide ${
                    status === "success"
                      ? "bg-accent text-background glow-lg"
                      : status === "submitting"
                      ? "bg-accent/60 text-background cursor-wait"
                      : "bg-accent text-background hover:shadow-[0_0_40px_rgba(0,229,160,0.25)] active:scale-[0.98]"
                  }`}
                  style={{
                    transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
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
          </div>
        </div>

        <p className="contact-alt mt-10 text-sm text-muted/50">
          Prefere e-mail direto?{" "}
          <a
            href="mailto:contato@nullscience.ai"
            className="text-accent/80 hover:text-accent hover:underline"
            style={{ transition: "all 400ms cubic-bezier(0.32, 0.72, 0, 1)" }}
          >
            contato@nullscience.ai
          </a>
        </p>
      </div>
    </section>
  );
}
