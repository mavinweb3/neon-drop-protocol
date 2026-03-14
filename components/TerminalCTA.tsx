"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FINAL_TEXT = "INITIATE PROTOCOL // CONNECT WALLET";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

interface TerminalCTAProps {
  embedded?: boolean;
  containerTween?: gsap.core.Tween | null;
}

export default function TerminalCTA({ embedded = false, containerTween }: TerminalCTAProps) {
  const containerRef = useRef<HTMLElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const ctaBoxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !laserRef.current || !ctaBoxRef.current) return;

    // Initial states
    gsap.set(laserRef.current, { scaleX: 0 });
    gsap.set(ctaBoxRef.current, { scale: 0, opacity: 0 });
    gsap.set(buttonRef.current, { opacity: 0, y: 20 });

    // If embedded, we absolutely MUST wait for containerTween to prevent an accidental vertical pin!
    if (embedded && !containerTween) return;

    // THE TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        ...(embedded ? {
          containerAnimation: containerTween || undefined,
          start: "left 80%", // Trigger when it enters 20% from the right while scrolling horizontally
          toggleActions: "play none none reverse",
        } : {
          start: "top top",
          end: "+=1000",
          scrub: 1,
          pin: true,
        })
      },
    });

    // STEP 1: Horizontal power line shoots from left edge to dead center
    tl.to(laserRef.current, {
      scaleX: 1,
      ease: "none",
      duration: 1.5,
    });

    // STEP 2: CTA Box unfolds at the center (where the laser tip lands)
    tl.to(ctaBoxRef.current, {
      scale: 1,
      opacity: 1,
      boxShadow: "0 0 40px rgba(57, 255, 20, 0.3), 0 0 80px rgba(57, 255, 20, 0.1)",
      duration: 0.8,
      ease: "power3.out",
    });

    // STEP 3: Trigger the cryptographic scramble simultaneously with box unfold
    tl.call(() => {
      setIsScrambling(true);
    }, [], "<"); // "<" = start at the same time as the previous tween

    // Fade in button after box is open
    tl.to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "+=0.3");

  }, { scope: containerRef, dependencies: [containerTween, embedded] });

  // Cryptographic text scrambling effect
  useEffect(() => {
    if (!isScrambling) return;

    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        FINAL_TEXT.split("").map((letter, index) => {
          if (letter === " " || letter === "/" || letter === ":") return letter;
          if (index < iteration) return FINAL_TEXT[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= FINAL_TEXT.length) {
        clearInterval(interval);
        // Final lock-in glow
        if (textRef.current) {
          gsap.to(textRef.current, {
            textShadow: "0 0 15px #39FF14, 0 0 30px rgba(57,255,20,0.3)",
            color: "#39FF14",
            duration: 0.4,
          });
        }
      }

      iteration += 0.5;
    }, 35);

    return () => clearInterval(interval);
  }, [isScrambling]);

  return (
    <section
      ref={containerRef}
      className={embedded ? "relative z-10 w-[100vw] shrink-0 h-screen bg-[#050505] overflow-hidden" : "relative z-10 w-full h-screen bg-[#050505] overflow-hidden"}
    >

      {/* ── THE HORIZONTAL POWER LINE ── */}
      {/* Starts at left-0, vertically centered, width 50% so it stops dead center */}
      <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-[#39FF14]/10 -translate-y-1/2 z-0" />
      <div
        ref={laserRef}
        className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-[#39FF14] shadow-[0_0_15px_#39FF14] -translate-y-1/2 origin-left z-10"
      />

      {/* ── IMPACT NODE (where the laser tip hits center) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full border border-[#39FF14]/30 bg-[#050505] z-20" />

      {/* ── THE DECRYPTION MATRIX CTA BOX ── */}
      <div
        ref={ctaBoxRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl border border-[#39FF14]/40 bg-[#0A0A0A]/90 backdrop-blur-lg z-30 p-12 md:p-16"
      >
        {/* Status bar */}
        <p className="font-[family-name:var(--font-geist-mono)] text-[#39FF14]/60 text-xs tracking-[0.3em] uppercase mb-8">
          [ SECURE CONNECTION ESTABLISHED ]
        </p>

        {/* The Scrambling Text */}
        <h2
          ref={textRef}
          className="font-geist text-2xl md:text-4xl lg:text-5xl font-bold text-white/60 tracking-tight leading-[1.1] min-h-[60px] md:min-h-[80px]"
        >
          {isScrambling ? displayText : "0x00000000..."}
        </h2>

        {/* Subtitle */}
        <p className="mt-6 font-inter text-white/30 text-sm md:text-base max-w-lg">
          Your genesis key awaits decryption. Access the terminal to finalize mint sequence.
        </p>

        {/* CTA Button */}
        <div ref={buttonRef} className="mt-10">
          <button className="relative group overflow-hidden border border-[#39FF14]/50 bg-black px-8 py-4 uppercase tracking-[0.2em] text-[#39FF14] font-[family-name:var(--font-geist-mono)] text-sm transition-all hover:bg-[#39FF14]/10 hover:border-[#39FF14] hover:shadow-[0_0_25px_rgba(57,255,20,0.4)] active:scale-95">
            <span className="relative z-10">Access Terminal</span>
            <div className="absolute inset-0 h-full w-0 bg-[#39FF14]/10 transition-all duration-300 ease-out group-hover:w-full" />
          </button>
        </div>

        {/* Corner accents (wireframe aesthetic) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#39FF14]/60" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#39FF14]/60" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#39FF14]/60" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#39FF14]/60" />
      </div>

    </section>
  );
}
