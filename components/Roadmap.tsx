"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TerminalCTA from "./TerminalCTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const laser1Ref = useRef<HTMLDivElement>(null);
  const laser2Ref = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const plugsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [horizontalTween, setHorizontalTween] = useState<gsap.core.Tween | null>(null);

  const roadmapData = [
    { id: "01", title: "Genesis Mint", desc: "Deployment of the zero-trust smart contract. Access key generation boot sequence initiated." },
    { id: "02", title: "Node Deployment", desc: "Rollout of localized client protocols for structural network consensus and shard verification." },
    { id: "03", title: "Governance Hook", desc: "Governance consensus mechanism goes live, allowing Key holders to alter core parameters." },
    { id: "04", title: "Yield Aggregation", desc: "Automated staking protocols active. Dividend routing execution via pure algorithmic math." },
    { id: "05", title: "Liquidity Injection", desc: "Protocol-owned liquidity pools deployed to decentralized exchanges. Arbitrage bots online." },
    { id: "06", title: "Phase Zero Ext.", desc: "Cross-chain architectural bridging initiated. Interoperability with layer-2 environments." }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Reset initial styles
    gsap.set(plugsRef.current, { scaleY: 0 });
    gsap.set(nodesRef.current, { backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "none" });
    // Per-card directional y offset for staggered alternating layout
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const isBelow = i % 2 === 0; // Even = below, Odd = above
      gsap.set(card, { borderColor: "rgba(57,255,20,0.05)", opacity: 0.3, y: isBelow ? 30 : -30 });
    });
    gsap.set(nodeRef.current, { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.2)", boxShadow: "none" });
    gsap.set(laser2Ref.current, { scaleX: 0 }); // Phase 2 laser starts hidden

    // Calculate maximum pan width dynamically
    const getPanWidth = () => {
      if (!trackRef.current) return 0;
      return trackRef.current.scrollWidth - window.innerWidth;
    };

    // 1. MASTER PINNED TIMELINE: Move the track left as user scrolls down
    const ht = gsap.to(trackRef.current, {
      x: () => -getPanWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getPanWidth()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true, // Recalculates `x` and `end` on resize/load
      },
    });

    setHorizontalTween(ht);

    // 1B. TRANSLATE WORLD ORIGIN (Parallax world background to the left)
    // The vertical line, node, header, and the optical mask "stay where they are" in the physical world
    gsap.to(['.global-power-line', '.global-power-bg', headerRef.current, nodeRef.current, maskRef.current], {
      x: () => -getPanWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getPanWidth()}`,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // 2. LASER PHASE 1: The "Read Head" (Shoots from left edge to center)
    gsap.fromTo(laser1Ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400",
          scrub: 1,
        }
      }
    );

    // 2B. CHECKPOINT NODE IGNITION
    gsap.to(nodeRef.current, {
      backgroundColor: "#39FF14",
      borderColor: "#39FF14",
      boxShadow: "0 0 15px rgba(57, 255, 20, 0.8)",
      duration: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200",
        scrub: 1,
      }
    });

    // 3. CARDS IGNITION
    // Ignite automatically when their physical position hits the center of the screen
    cardsRef.current.forEach((card, i) => {
      const plug = plugsRef.current[i];
      const node = nodesRef.current[i];
      if (!card || !plug || !node) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: ht,
          start: "center center",
          toggleActions: "play none none reverse",
        }
      });

      // Ignite the plug conduit and junction node sequentially
      tl.to(plug, { scaleY: 1, duration: 0.2, ease: "power2.out" });
      tl.to(node, { backgroundColor: "#39FF14", boxShadow: "0 0 15px #39FF14", duration: 0.1 }, "-=0.05");
      tl.to(card, {
        opacity: 1,
        y: 0,
        backgroundColor: "rgba(57,255,20,0.1)",
        borderColor: "#39FF14",
        boxShadow: "0 0 15px rgba(57,255,20,0.15), inset 0 0 20px rgba(57,255,20,0.05)",
        duration: 0.3
      }, "-=0.05");

      const microData = card.querySelector('.micro-data') as HTMLElement;
      if (microData) {
        tl.to(microData, { opacity: 1, duration: 0.1 }, "<");
        tl.call(() => {
          let iteration = 0;
          const finalStr = "[ SYS_INIT_OK ]";
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
          const interval = setInterval(() => {
            microData.textContent = finalStr.split("").map((letter, idx) => {
              if (letter === " " || letter === "[" || letter === "]") return letter;
              if (idx < iteration) return finalStr[idx];
              return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            if (iteration >= finalStr.length) {
              clearInterval(interval);
              microData.textContent = finalStr;
            }
            iteration += 0.5;
          }, 35);
        }, [], "<");
      }
    });

    // 4. LASER PHASE 2: Extension to the right edge
    const lastCard = cardsRef.current[roadmapData.length - 1];
    if (lastCard && laser2Ref.current) {
      gsap.to(laser2Ref.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lastCard,
          containerAnimation: ht,
          start: "center center", // Start extending exactly as Phase 06 ignites
          end: () => `+=${window.innerWidth / 2}`, // Extend over the remaining 50vw of panning
          scrub: 1,
        }
      });
    }

  }, { dependencies: [] });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full h-screen bg-[#050505] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden flex flex-col"
    >
      {/* ── HEADER ── */}
      <div ref={headerRef} className="absolute top-12 md:top-24 left-20 lg:left-28 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-geist font-bold text-white tracking-tighter opacity-90 drop-shadow-[0_0_15px_rgba(57,255,20,0.15)] leading-[1.1]">
          EXECUTION<br />ROADMAP
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[1px] w-12 bg-[#39FF14]" />
          <span className="text-[#39FF14] font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.3em] uppercase">SYSTEM_INIT</span>
        </div>
      </div>

      {/* ── TWO-PART HORIZONTAL LASER ── */}
      {/* Optical Mask to hide laser origin behind the vertical line, translating left to reveal the laser */}
      <div ref={maskRef} className="absolute top-1/2 left-0 w-8 lg:w-16 h-[20px] bg-[#050505] z-[5] -translate-y-1/2" />

      {/* Background track (extends full width to the right) */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 z-0 -translate-y-1/2" />

      {/* Laser 1: From left offset to center (The "Read Head") */}
      <div
        ref={laser1Ref}
        className="roadmap-laser-1 absolute top-1/2 left-0 w-[50vw] h-[2px] bg-[#39FF14] shadow-[0_0_15px_#39FF14] origin-left z-0 -translate-y-1/2"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Laser 2: From center to right edge (Extends after Phase 06) */}
      <div
        ref={laser2Ref}
        className="roadmap-laser-2 absolute top-1/2 left-1/2 right-0 h-[2px] bg-[#39FF14] shadow-[0_0_15px_#39FF14] origin-left z-0 -translate-y-1/2"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Global Conduit Checkpoint Node */}
      <div ref={nodeRef} className="hidden md:block absolute left-[calc(2rem-4px)] lg:left-[calc(4rem-4px)] top-1/2 -translate-y-[4px] w-[10px] h-[10px] rounded-full bg-[#050505] border border-white/20 z-20" />

      {/* ── THE CONVEYOR BELT TRACK ── */}
      {/* 
        No right padding needed because TerminalCTA is 100vw wide itself. 
        It naturally gives the laser 50vw of space to animate while Phase 06 exits, 
        and then perfectly reveals TerminalCTA.
      */}
      <div
        ref={trackRef}
        className="absolute top-1/2 left-0 w-max h-auto flex flex-row items-start gap-12 pl-[100vw] z-[15] -translate-y-[1px]"
      >
        {roadmapData.map((card, index) => {
          const isBelow = index % 2 === 0; // Even = below timeline, Odd = above timeline
          return (
            <div
              key={card.id}
              className="relative flex justify-center w-[320px] md:w-[400px] h-0"
            >
              <div className={`absolute flex items-center w-full ${isBelow ? 'top-0 flex-col' : 'bottom-0 flex-col-reverse'
                }`}>
                {/* The Circuit Plug */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-[2px] h-[60px] md:h-[80px] bg-white/5 relative overflow-hidden"
                  >
                    <div
                      ref={(el) => { plugsRef.current[index] = el; }}
                      className={`absolute inset-0 w-full h-full bg-[#39FF14] ${isBelow ? 'origin-top' : 'origin-bottom'
                        }`}
                    />
                  </div>
                  {/* Junction Node — flips position based on card direction */}
                  <div
                    ref={(el) => { nodesRef.current[index] = el; }}
                    className={`absolute w-[4px] h-[4px] rounded-full z-10 ${isBelow ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'
                      }`}
                  />
                </div>
                {/* The Phase Card */}
                <div
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="relative w-full bg-[#39FF14]/5 border border-white/5 p-8 rounded-sm text-left overflow-hidden"
                >
                  {/* Hardware Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#39FF14]/50 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#39FF14]/50 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#39FF14]/50 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#39FF14]/50 pointer-events-none" />

                  {/* Micro-Typography */}
                  <div className="micro-data font-mono text-[10px] tracking-widest text-[#39FF14] opacity-0 mb-3">[ SYS_INIT_OK ]</div>

                  <span className="font-inter text-[#39FF14] text-xs tracking-widest uppercase mb-4 block">Phase {card.id}</span>
                  <h3 className="text-2xl font-geist text-white font-bold mb-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{card.title}</h3>
                  <p className="text-white/50 font-inter text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* 50vw spacer allows Phase 06 to scroll fully to the left while Laser 2 extends to the right edge */}
        <div className="w-[50vw] h-[1px] shrink-0" />

        {/* Terminal CTA acts as the next horizontal "page" */}
        <div ref={ctaWrapperRef} className="w-[100vw] shrink-0 h-screen relative -mt-[50vh] z-30">
          <TerminalCTA embedded={true} containerTween={horizontalTween} />
        </div>
      </div>
    </section>
  );
}
