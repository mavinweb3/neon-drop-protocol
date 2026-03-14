"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalConduit() {
  
  useEffect(() => {
    // 1. Initial State
    gsap.set(".global-power-line", { scaleY: 0 });

    // 2. The Universal Descent (Hero -> Mainframe)
    // Draws the line from 0 to 50% of the screen height over the first ~800px of scrolling.
    // This avoids endTrigger conflicts with pinned sections downstream.
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "+=800",
      scrub: 1,
      animation: gsap.to(".global-power-line", { scaleY: 0.5, ease: "none" })
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <>
      {/* --- THE UNIFIED BACKBONE --- */}
      {/* Background Track */}
      <div className="hidden md:block fixed left-8 lg:left-16 top-0 h-screen w-[2px] bg-white/5 z-40 pointer-events-none" />
      
      {/* Active Power Line (scaleY 0.5 = 50vh = checkpoint at top-1/2) */}
      <div 
        className="global-power-line hidden md:block fixed left-8 lg:left-16 top-0 h-screen w-[2px] bg-[#39FF14] shadow-[0_0_10px_#39FF14] origin-top z-40 pointer-events-none" 
      />
    </>
  );
}
