"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MintCard from "@/components/MintCard";
import Mainframe from "@/components/Mainframe";
import Roadmap from "@/components/Roadmap";
import GlobalConduit from "@/components/GlobalConduit";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Existing Hero Fade-in
    if (heroRef.current) {
      gsap.fromTo(
        ".hero-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, { scope: heroRef });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      
      {/* ── UNIFIED GLOBAL CONDUIT ── */}
      <GlobalConduit />

      {/* ── Ambient glow effects ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#39FF14]/5 blur-[160px]" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#39FF14]/3 blur-[120px]" />
      </div>

      {/* ── HERO & MINT WRAPPER ── */}
      <div className="relative w-full z-10">
        {/* ── Hero Section ── */}
        <section ref={heroRef} className="relative z-20 flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center">
          {/* Protocol badge */}
          <div className="hero-anim mb-8 inline-flex items-center gap-2 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50">
            <span className="h-2 w-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
            <span className="font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] font-medium text-[#39FF14] uppercase">
              Protocol Live
            </span>
          </div>

          {/* Main headline */}
          <h1 className="hero-anim font-[family-name:var(--font-geist-sans)] text-5xl leading-[1.05] font-extrabold tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[7rem]">
            Neon Drop
            <br />
            <span className="relative inline-block mt-2 md:mt-4">
              <span className="absolute inset-0 bg-[#39FF14]/20 blur-3xl rounded-full" />
              <span className="relative bg-gradient-to-r from-[#39FF14] to-[#00FF88] bg-clip-text text-transparent">
                Protocol
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-anim mt-8 max-w-2xl font-[family-name:var(--font-inter)] text-base sm:text-lg leading-relaxed text-neutral-400">
            Genesis-grade NFT drops. Hardened by zero-trust security.
            <br className="hidden sm:block" />
            Mint your proof of existence on-chain.
          </p>

          {/* Decorative line */}
          <div className="mt-14 h-px w-40 bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent" />
        </section>

        {/* ── Action Section (Interactive Mint Card) ── */}
        <section className="relative z-20 px-6 pb-32 pt-8">
          <MintCard />
        </section>
      </div>

      {/* Below the Hero Wrapper, the Mainframe picks up the vertical line exactly at left-16 */}
      <Mainframe />
      <Roadmap />

      {/* ── Footer pulse line ── */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
    </main>
  );
}
