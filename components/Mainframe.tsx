"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Mainframe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(hLineRef.current, { scaleX: 0 });
    gsap.set(nodeRef.current, { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.2)" });
    gsap.set(cardsRef.current, { borderColor: "rgba(255, 255, 255, 0.05)", opacity: 0.3 });

    // TRIGGER 1: THE GLOBAL HUD DESCENT 
    // ^ Handled entirely by components/GlobalConduit.tsx now.

    // TRIGGER 2: THE PINNED CIRCUIT
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(nodeRef.current, { 
      backgroundColor: "#39FF14", 
      borderColor: "#39FF14",
      boxShadow: "0 0 15px rgba(57, 255, 20, 0.8)",
      duration: 0.2 
    });

    tl.to(hLineRef.current, { 
      scaleX: 1, 
      ease: "none", 
      duration: 2 
    }, "laserStart");

    cardsRef.current.forEach((card) => {
      if (!card || !hLineRef.current) return;

      // Mathematically calculate the exact time the laser touches each card
      // by measuring their real pixel distance relative to the screen width.
      const lineLeft = hLineRef.current.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      const totalWidth = window.innerWidth - lineLeft; 
      
      // This ratio (0 to 1) is how far across the screen the card sits
      const hitRatio = Math.max(0, (cardLeft - lineLeft) / totalWidth);

      // The laser takes 2 seconds to cross the screen. Multiply duration by the ratio.
      tl.to(card, {
        borderColor: "rgba(57, 255, 20, 1)", 
        boxShadow: "0 0 30px rgba(57, 255, 20, 0.2)",
        opacity: 1,
        duration: 0.1,
      }, `laserStart+=${hitRatio * 2}`); 
    });

  }, { scope: containerRef });

  return (
    <section id="mainframe" ref={containerRef} className="h-screen flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
      
      {/* --- CHECKPOINT & LASER --- */}
      <div ref={nodeRef} className="hidden md:block absolute left-[calc(2rem-4px)] lg:left-[calc(4rem-4px)] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full z-20" />
      <div ref={hLineRef} className="hidden md:block absolute left-8 lg:left-16 top-1/2 right-0 h-[2px] bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-transparent origin-left z-0 -translate-y-1/2" />

      {/* --- CONTENT --- */}
      <div className="w-full max-w-6xl px-6 pl-16 lg:pl-32 relative z-10 mx-auto">
        <h2 className="text-5xl md:text-7xl font-geist font-bold text-white mb-20 opacity-90 tracking-tighter">
          THE MAINFRAME
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            { id: "01", title: "Node Access", desc: "Holders gain immediate clearance to operate lightweight verification nodes." },
            { id: "02", title: "Protocol Governance", desc: "Direct voting rights on the execution state of the smart contract logic." },
            { id: "03", title: "Yield Generation", desc: "Automated dividend routing directly to holding wallets via immutable smart contracts." }
          ].map((card, index) => (
            <div 
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-[#050505] border border-white/5 p-8 rounded-sm flex flex-col justify-center min-h-[250px] transition-all"
            >
              <p className="font-inter text-[#39FF14] text-xs tracking-widest uppercase mb-4">{card.id}. Utility</p>
              <h3 className="text-2xl font-geist text-white font-bold mb-4">{card.title}</h3>
              <p className="text-white/60 font-inter text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}