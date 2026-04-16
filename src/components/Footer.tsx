"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Parallax reveal — footer slides up from behind the content above
      gsap.fromTo(
        footerRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top 70%",
            scrub: 0.5,
          },
        }
      );

      // Ambient gradient shift
      gsap.to(".footer-gradient", {
        backgroundPosition: "200% 50%",
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // Content items stagger
      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-border py-12 px-6 overflow-hidden"
    >
      {/* Ambient gradient background */}
      <div
        className="footer-gradient absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00e5a0, transparent, #00b8d4, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="footer-item flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent/10 border border-accent/30 flex items-center justify-center">
            <span className="text-accent font-mono font-bold text-xs">N</span>
          </div>
          <span className="font-mono text-xs text-muted tracking-wider">
            NULLSCIENCE
          </span>
        </div>

        {/* Copyright */}
        <p className="footer-item text-xs text-muted/60 font-mono">
          © {new Date().getFullYear()} Nullscience. Cybersecurity Advisory.
          Brasil & LATAM.
        </p>

        {/* Email */}
        <div className="footer-item flex items-center gap-6">
          <a
            href="mailto:contato@nullscience.ai"
            className="text-xs text-muted hover:text-accent transition-colors font-mono"
          >
            contato@nullscience.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
