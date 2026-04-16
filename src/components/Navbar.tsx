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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          setScrolled(self.progress > 0);
        },
      });
    },
    { scope: navRef }
  );

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
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
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  // Magnetic button effect
  const handleMagnetic = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
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
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    },
    []
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group relative z-50">
          <div className="w-8 h-8 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
            <span className="text-accent font-mono font-bold text-sm">N</span>
          </div>
          <span className="font-mono text-sm font-semibold tracking-wider text-foreground">
            NULLSCIENCE
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-muted hover:text-accent transition-colors duration-300 font-mono tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contato"
          onClick={(e) => handleNavClick(e, "#contato")}
          onMouseMove={handleMagnetic}
          onMouseLeave={handleMagneticLeave}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-mono border border-accent/30 text-accent rounded hover:bg-accent/10 transition-all duration-300"
        >
          Fale Conosco
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-2xl font-mono text-foreground hover:text-accent transition-colors duration-300"
            style={{
              transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
              transition:
                "transform 0.4s cubic-bezier(0.25,0.4,0.25,1), opacity 0.4s cubic-bezier(0.25,0.4,0.25,1), color 0.3s",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contato"
          onClick={(e) => handleNavClick(e, "#contato")}
          className="mt-4 px-8 py-3 text-sm font-mono border border-accent/30 text-accent rounded hover:bg-accent/10 transition-all duration-300"
          style={{
            transitionDelay: mobileOpen
              ? `${navLinks.length * 50}ms`
              : "0ms",
            transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileOpen ? 1 : 0,
            transition:
              "transform 0.4s cubic-bezier(0.25,0.4,0.25,1), opacity 0.4s cubic-bezier(0.25,0.4,0.25,1), color 0.3s, background 0.3s",
          }}
        >
          Fale Conosco
        </a>
      </div>
    </nav>
  );
}
