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

      gsap.fromTo(
        footerRef.current,
        { yPercent: 30, opacity: 0, filter: "blur(4px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top 70%",
            scrub: 0.5,
          },
        }
      );

      gsap.to(".footer-gradient", {
        backgroundPosition: "200% 50%",
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 20, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.7,
          ease: "cubic-bezier(0.32, 0.72, 0, 1)",
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
      className="relative border-t border-border/40 py-14 px-6 overflow-hidden"
    >
      {/* Ambient gradient */}
      <div
        className="footer-gradient absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00e5a0, transparent, #00b8d4, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="footer-item flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-md bg-accent/8 border border-accent/20 flex items-center justify-center"
          >
            <span className="text-accent font-mono font-bold text-[10px]">
              N
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted/60 tracking-[0.18em]">
            NULLSCIENCE
          </span>
        </div>

        {/* Copyright */}
        <p className="footer-item text-[11px] text-muted/40 font-mono">
          \u00a9 {new Date().getFullYear()} Nullscience. Cybersecurity Advisory.
          Brasil & LATAM.
        </p>

        {/* Email */}
        <div className="footer-item flex items-center gap-6">
          <a
            href="mailto:contato@nullscience.ai"
            className="text-[11px] text-muted/50 hover:text-accent font-mono"
            style={{
              transition: "color 400ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            contato@nullscience.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
