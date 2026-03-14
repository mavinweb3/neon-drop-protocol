"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HUD() {
  const hudRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll tracking: The green line physically grows down the page as you scroll
    gsap.fromTo(
      ".hud-power-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Smooth, low-latency tracking
        },
      }
    );

    // Glow head that follows the leading edge of the power line
    gsap.fromTo(
      ".hud-glow-head",
      { top: "0%" },
      {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      }
    );

    // Initial load: Snap in the HUD structure like a visor booting up
    gsap.fromTo(
      ".hud-frame-line",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: "expo.out", stagger: 0.05 }
    );
  }, { scope: hudRef });

  return (
    <div ref={hudRef} className="fixed inset-0 z-50 pointer-events-none mix-blend-screen isolate flex justify-center">
      {/* Container aligned to the max width layout but pinned to the screen */}
      <div className="relative w-full h-full max-w-screen-2xl">
        
        {/* ── Left Power Conduit (The Main Tracker) ── */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] md:w-[2px]">
          {/* Static track */}
          <div className="hud-frame-line absolute inset-0 bg-gradient-to-b from-[#39FF14]/0 via-[#39FF14]/15 to-[#39FF14]/0 origin-top" />
          
          {/* Dynamic power fill */}
          <div className="hud-power-line absolute inset-0 bg-[#39FF14] shadow-[0_0_20px_#39FF14] origin-top" />
          
          {/* Spark/Glow tip */}
          <div className="hud-glow-head absolute left-1/2 -translate-x-1/2 -translate-y-full w-[3px] h-[60px] bg-white rounded-full blur-[2px] shadow-[0_0_25px_#ffffff]" />
          
          {/* Left Crosshair markers */}
          <div className="hud-frame-line absolute top-1/4 -left-2 w-4 h-[1px] bg-[#39FF14]/40" />
          <div className="hud-frame-line absolute top-1/2 -left-2 w-4 h-[1px] bg-[#39FF14]/40" />
          <div className="hud-frame-line absolute top-3/4 -left-2 w-4 h-[1px] bg-[#39FF14]/40" />
        </div>

        {/* ── Right Framing Line ── */}
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px]">
          <div className="hud-frame-line absolute inset-0 bg-gradient-to-b from-[#39FF14]/0 via-[#39FF14]/10 to-[#39FF14]/0 origin-bottom" />
          
          {/* Right Crosshair markers */}
          <div className="hud-frame-line absolute top-[15%] -right-2 w-3 h-[1px] bg-[#39FF14]/30" />
          <div className="hud-frame-line absolute top-[85%] -right-2 w-3 h-[1px] bg-[#39FF14]/30" />
        </div>

        {/* ── Top & Bottom Framing Lines (Hidden on mobile for clean look) ── */}
        <div className="hidden md:block absolute top-[40px] left-12 right-12 h-[1px]">
          <div className="hud-frame-line absolute inset-0 bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/10 to-[#39FF14]/0 origin-left" />
        </div>
        <div className="hidden md:block absolute bottom-[40px] left-12 right-12 h-[1px]">
          <div className="hud-frame-line absolute inset-0 bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/10 to-[#39FF14]/0 origin-right" />
        </div>
        
        {/* ── Corner Accents ── */}
        <div className="hud-frame-line absolute top-[40px] left-12 w-4 h-4 border-t border-l border-[#39FF14]/40 hidden md:block" />
        <div className="hud-frame-line absolute top-[40px] right-12 w-4 h-4 border-t border-r border-[#39FF14]/40 hidden md:block" />
        <div className="hud-frame-line absolute bottom-[40px] left-12 w-4 h-4 border-b border-l border-[#39FF14]/40 hidden md:block" />
        <div className="hud-frame-line absolute bottom-[40px] right-12 w-4 h-4 border-b border-r border-[#39FF14]/40 hidden md:block" />
        
        {/* ── HUD Data overlays ── */}
        <div className="hud-frame-line absolute bottom-12 right-[60px] md:bottom-14 md:right-16 text-[#39FF14]/40 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] uppercase opacity-60">
          SYS.CORE // NEON-DROP
        </div>

        <div className="hud-frame-line absolute top-12 left-[60px] md:top-14 md:left-16 text-[#39FF14]/40 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.3em] uppercase opacity-60">
          GLOBAL_TRACKER // ACTIVE
        </div>
      </div>
    </div>
  );
}
