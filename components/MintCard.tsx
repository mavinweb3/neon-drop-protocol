"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

import { useActiveWalletChain, useSwitchActiveWalletChain, useConnectModal } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "@/lib/client";

export default function MintCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const { connect } = useConnectModal();
  const targetChain = sepolia;

  const isConnected = !!activeChain;
  const isWrongNetwork = isConnected && activeChain.id !== targetChain.id;

  let buttonText = "CONNECT WALLET";
  let buttonAction: (() => void) | undefined = () => connect({ client });
  let textClass = "text-[#39FF14]";
  let borderClass = "border-[#39FF14]/50";
  let disabled = false;
  let cursorClass = "cursor-pointer";

  if (isConnected && isWrongNetwork) {
    buttonText = "SWITCH TO SEPOLIA";
    buttonAction = () => switchChain(targetChain);
    textClass = "text-red-500";
    borderClass = "border-red-500/50";
  } else if (isConnected && !isWrongNetwork) {
    buttonText = "AWAITING CONTRACT";
    buttonAction = undefined;
    disabled = true;
    cursorClass = "cursor-not-allowed";
  }

  // 3D Glass Tilt Effect
  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;

    // Use QuickTo for highly performant animations bound to mouse movement
    const xTo = gsap.quickTo(imageRef.current, "rotationY", { ease: "power3", duration: 0.6 });
    const yTo = gsap.quickTo(imageRef.current, "rotationX", { ease: "power3", duration: 0.6 });
    const imgXTo = gsap.quickTo(imageRef.current, "x", { ease: "power3", duration: 0.6 });
    const imgYTo = gsap.quickTo(imageRef.current, "y", { ease: "power3", duration: 0.6 });

    // Scroll Animation for Bento Cards
    gsap.fromTo(
      ".bento-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%", // trigger when top of card hits 80% down the viewport
        }
      }
    );

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate cursor position from center of card
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Apply tilt to the NFT preview image (inverted y for natural tilt)
      xTo(x * 0.08);
      yTo(-y * 0.08);

      // Apply subtle parallax movement
      imgXTo(x * 0.03);
      imgYTo(y * 0.03);
    };

    const handleMouseLeave = () => {
      // Return to resting state
      xTo(0);
      yTo(0);
      imgXTo(0);
      imgYTo(0);
    };

    const element = cardRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="w-full max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 relative">

        {/* Left Column: NFT Preview (3D tilt interaction) */}
        <div className="md:col-span-5 relative h-[350px] md:h-auto rounded-[2rem] border border-[#39FF14]/15 bg-gradient-to-b from-[#0A0A0A]/80 to-[#0A0A0A]/40 backdrop-blur-2xl p-6 flex items-center justify-center overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-[#39FF14]/5 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

          <div
            ref={imageRef}
            className="relative z-10 w-full aspect-square max-w-[280px] rounded-2xl border border-dashed border-[#39FF14]/30 bg-[#39FF14]/5 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(57,255,20,0.2)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The tiltable NFT Placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#39FF14]/50 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              style={{ transform: "translateZ(30px)" }} // Pops out slightly on Z axis during tilt
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        {/* Right Column: Bento Grid for Stats & Mint Action */}
        <div className="md:col-span-7 flex flex-col gap-4">

          {/* Header Card */}
          <div className="rounded-2xl border border-[#39FF14]/10 bg-[#0A0A0A]/60 backdrop-blur-xl p-6 relative overflow-hidden">
            {/* Diagonal scanline accent */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#39FF14]/10 to-transparent -mr-16 -mt-16 rounded-full blur-2xl" />

            <h2 className="font-[family-name:var(--font-geist-sans)] text-2xl sm:text-3xl font-bold text-white tracking-tight relative z-10">
              Genesis Protocol key
            </h2>
            <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-neutral-400 relative z-10">
              The foundational clearance token required to access the Neon Drop mainframe. Highly encrypted.
            </p>
          </div>

          {/* Bento Stats Grid */}
          <div className="grid grid-cols-2 gap-4 flex-1">

            {/* Stat: Total Minted */}
            <div className="bento-card rounded-2xl border border-[#39FF14]/10 bg-[#0A0A0A]/40 backdrop-blur-md p-5 flex flex-col justify-center relative overflow-hidden group hover:border-[#39FF14]/30 transition-colors">
              <span className="text-[#39FF14]/50 text-xs sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium mb-1 relative z-10">Supply Minted</span>
              <span className="text-white text-xl sm:text-2xl font-[family-name:var(--font-geist-mono)] relative z-10">0 <span className="text-neutral-600">/ 5,000</span></span>
            </div>

            {/* Stat: Price */}
            <div className="bento-card rounded-2xl border border-[#39FF14]/10 bg-[#0A0A0A]/40 backdrop-blur-md p-5 flex flex-col justify-center relative overflow-hidden group hover:border-[#39FF14]/30 transition-colors">
              <span className="text-[#39FF14]/50 text-xs sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium mb-1 relative z-10">Mint Price</span>
              <span className="text-white text-xl sm:text-2xl font-[family-name:var(--font-geist-mono)] flex items-end gap-1.5 relative z-10">
                0.05 <span className="text-xs text-neutral-500 mb-1 leading-tight tracking-wider">ETH</span>
              </span>
            </div>

            {/* Stat: Network */}
            <div className="bento-card rounded-2xl border border-[#39FF14]/10 bg-[#0A0A0A]/40 backdrop-blur-md p-5 flex flex-col justify-center relative overflow-hidden group hover:border-[#39FF14]/30 transition-colors">
              <span className="text-[#39FF14]/50 text-xs sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium mb-1 relative z-10">Network</span>
              <span className="text-white text-[15px] sm:text-base font-[family-name:var(--font-inter)] flex items-center gap-2 tracking-wide relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse shadow-[0_0_8px_#39FF14]" />
                Ethereum
              </span>
            </div>

            {/* Stat: Utility */}
            <div className="bento-card rounded-2xl border border-[#39FF14]/10 bg-[#0A0A0A]/40 backdrop-blur-md p-5 flex flex-col justify-center relative overflow-hidden group hover:border-[#39FF14]/30 transition-colors">
              <span className="text-[#39FF14]/50 text-xs sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium mb-1 relative z-10">Utility</span>
              <span className="text-white text-xs sm:text-[13px] leading-snug font-[family-name:var(--font-inter)] opacity-90 relative z-10 text-balance">
                Protocol Governance & Node Access
              </span>
            </div>
          </div>

          {/* Action Area (CRT Glow + Glitch effect) */}
          <div className="mt-2 relative">
            {/* Ambient Background Glow behind button */}
            <div className="absolute inset-0 bg-[#39FF14] rounded-xl blur-xl opacity-10 animate-pulse" />

            <button
              disabled={disabled}
              onClick={buttonAction}
              className={`btn-glitch relative z-10 w-full ${cursorClass} rounded-xl bg-[#0F1A12] border ${borderClass} px-6 py-4.5 font-[family-name:var(--font-inter)] text-sm tracking-[0.2em] font-bold ${textClass} uppercase transition-all duration-300 shadow-[inset_0_0_20px_rgba(57,255,20,0.05),0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[inset_0_0_30px_rgba(57,255,20,0.1),0_0_30px_rgba(57,255,20,0.3)] hover:bg-[#142618]`}
              data-text={buttonText}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {buttonText}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
