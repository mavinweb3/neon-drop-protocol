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
  const laser1Ref = useRef<HTMLDivElement>(null);
  const laser2Ref = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const plugsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    gsap.set(plugsRef.current, { backgroundColor: "rgba(57,255,20,0.1)", boxShadow: "none" });
    gsap.set(cardsRef.current, { borderColor: "rgba(57,255,20,0.05)", opacity: 0.3, y: 30 });
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
      if (!card || !plug) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: ht,
          start: "center center", 
          toggleActions: "play none none reverse",
        }
      });

      tl.to(plug, { backgroundColor: "#39FF14", boxShadow: "0 0 15px #39FF14", duration: 0.2 });
      tl.to(card, { opacity: 1, y: 0, borderColor: "rgba(57,255,20,0.8)", boxShadow: "0 0 20px rgba(57,255,20,0.1)", duration: 0.3 }, "-=0.1");
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

    // 5. FADE OUT ROADMAP UI WHEN CTA ENTERS
    if (ctaWrapperRef.current && headerRef.current && nodeRef.current) {
      gsap.to([headerRef.current, nodeRef.current], {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ctaWrapperRef.current,
          containerAnimation: ht,
          start: "left 90%", // Start fading when CTA is 10vw into the screen
          end: "left 50%", // Fully hid when CTA hits center
          scrub: true,
        }
      });
    }

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 w-full h-screen bg-[#050505] overflow-hidden flex flex-col"
    >
      {/* ── HEADER ── */}
      <div ref={headerRef} className="absolute top-12 md:top-24 left-20 lg:left-28 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-geist font-bold text-white tracking-tighter opacity-90 drop-shadow-[0_0_15px_rgba(57,255,20,0.15)] leading-[1.1]">
          EXECUTION<br/>ROADMAP
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[1px] w-12 bg-[#39FF14]" />
          <span className="text-[#39FF14] font-[family-name:var(--font-geist-mono)] text-sm tracking-[0.3em] uppercase">SYSTEM_INIT</span>
        </div>
      </div>

      {/* ── TWO-PART HORIZONTAL LASER ── */}
      {/* Background track (extends full width to the right) */}
      <div className="absolute top-1/2 left-8 lg:left-16 right-0 h-[2px] bg-[#39FF14]/10 z-0 -translate-y-1/2" />
      
      {/* Laser 1: From left offset to center (The "Read Head") */}
      <div 
        ref={laser1Ref}
        className="roadmap-laser-1 absolute top-1/2 left-8 lg:left-16 w-[calc(50%-2rem)] lg:w-[calc(50%-4rem)] h-[2px] bg-[#39FF14] shadow-[0_0_15px_#39FF14] origin-left z-0 -translate-y-1/2" 
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
        className="absolute top-1/2 left-0 w-max h-auto flex flex-row items-start gap-12 pl-[100vw] z-10"
      >
        {roadmapData.map((card, index) => (
          <div key={card.id} className="relative flex flex-col items-center w-[320px] md:w-[400px]">
            {/* The Circuit Plug */}
            <div 
              ref={(el) => { plugsRef.current[index] = el; }}
              className="w-[2px] h-[60px]" 
            />
            {/* The Phase Card */}
            <div 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-full bg-[#080808] border border-white/5 p-8 rounded-sm text-left backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            >
              <span className="font-inter text-[#39FF14] text-xs tracking-widest uppercase mb-4 block">Phase {card.id}</span>
              <h3 className="text-2xl font-geist text-white font-bold mb-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{card.title}</h3>
              <p className="text-white/50 font-inter text-sm leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}

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
