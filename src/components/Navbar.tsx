"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "CrisisLab", href: "#crisislab" },
  { label: "Por Que", href: "#por-que" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      /* Entrance: pill slides down from above */
      gsap.fromTo(
        pillRef.current,
        { y: -60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
        }
      );

      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => setScrolled(self.progress > 0),
      });
    },
    { scope: navRef }
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const handleMagnetic = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    []
  );

  const handleMagneticLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    },
    []
  );

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-4 pt-5">
      {/* ── Floating Glass Pill ── */}
      <div
        ref={pillRef}
        className="mx-auto max-w-4xl opacity-0"
        style={{
          transition: "all 700ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div
          className={`
            flex items-center justify-between
            rounded-full px-2 py-1.5
            transition-all duration-700
            ${
              scrolled
                ? "bg-background/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                : "bg-background/40 backdrop-blur-xl border border-white/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            }
          `}
          style={{
            transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 pl-3 group relative z-50"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div
              className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40"
              style={{
                transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              <span className="text-accent font-mono font-bold text-xs">
                N
              </span>
            </div>
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-foreground/80 hidden sm:block">
              NULLSCIENCE
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[12px] text-muted/60 hover:text-foreground/90 px-3 py-1.5 rounded-full hover:bg-white/[0.04] font-mono tracking-wide"
                style={{
                  transition: "all 400ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — pill button */}
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, "#contato")}
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[12px] font-mono rounded-full bg-accent/8 border border-accent/15 text-accent/90 hover:bg-accent/15 hover:border-accent/30 hover:text-accent"
            style={{
              transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 6px rgba(0,229,160,0.5)" }}
            />
            Fale Conosco
          </a>

          {/* Mobile Hamburger — morphs to X */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/[0.04]"
            style={{
              transition: "all 400ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className="block w-full h-[1.5px] bg-foreground/80 origin-center"
                style={{
                  transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                  transform: mobileOpen
                    ? "rotate(45deg) translateY(7.5px)"
                    : "rotate(0) translateY(0)",
                }}
              />
              <span
                className="block w-full h-[1.5px] bg-foreground/80"
                style={{
                  transition: "all 300ms cubic-bezier(0.32, 0.72, 0, 1)",
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="block w-full h-[1.5px] bg-foreground/80 origin-center"
                style={{
                  transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                  transform: mobileOpen
                    ? "-rotate(45deg) translateY(-7.5px)"
                    : "rotate(0) translateY(0)",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center gap-6 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(3, 3, 5, 0.96)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          transition: "opacity 500ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-3xl font-light text-foreground/70 hover:text-accent tracking-tight"
            style={{
              transitionDelay: mobileOpen ? `${100 + i * 60}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(30px)",
              opacity: mobileOpen ? 1 : 0,
              filter: mobileOpen ? "blur(0px)" : "blur(4px)",
              transition:
                "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms cubic-bezier(0.22,1,0.36,1), color 300ms",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contato"
          onClick={(e) => handleNavClick(e, "#contato")}
          className="mt-6 btn-primary"
          style={{
            transitionDelay: mobileOpen
              ? `${100 + navLinks.length * 60}ms`
              : "0ms",
            transform: mobileOpen ? "translateY(0)" : "translateY(30px)",
            opacity: mobileOpen ? 1 : 0,
            filter: mobileOpen ? "blur(0px)" : "blur(4px)",
            transition:
              "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          Fale Conosco
          <span className="btn-arrow">
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
        </a>
      </div>
    </nav>
  );
}
