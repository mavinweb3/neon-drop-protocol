# Neon Drop Protocol — Full Project Context (Handoff Document)

> **Purpose:** This document captures every architectural decision, animation system, file relationship, known bug fix, and design constraint for the Neon Drop Protocol project. Paste this into a new chat to resume development with zero context loss.

---

## 1. Project Overview

**Neon Drop Protocol** is a high-fidelity, cyberpunk-themed Web3 NFT minting landing page. The entire UI is built around a single visual metaphor: a **Global Power Conduit** — a neon green (`#39FF14`) energy line that physically travels through the page as the user scrolls, connecting every section like a circuit board.

**Repository:** `https://github.com/mavinweb3/neon-drop-protocol`

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| React | React 19 | 19.2.3 |
| Animation | GSAP + ScrollTrigger | 3.14.2 |
| React GSAP | `@gsap/react` (`useGSAP` hook) | 2.1.2 |
| Web3 | thirdweb SDK v5 | 5.119.1 |
| Styling | Tailwind CSS v4 | 4.x |
| Typography | Geist Sans (headers), Inter (body) | via `next/font/google` |
| Target Chain | Ethereum Sepolia (testnet) | — |

---

## 3. Mandatory Agent Rules ([AGENTS.md](file:///e:/neon-drop-protocol/AGENTS.md))

These rules are **non-negotiable** and must be followed by any AI agent working on this codebase:

1. **Zero-Trust Writes:** No smart contract write logic without `isPending`/`isMinting` state blocks.
2. **Gas Protection:** Disable the trigger button the instant a wallet signature is requested.
3. **Network Guarding:** Verify `chainId` matches before rendering mint actions.
4. **`"use client"` Directive:** Required at the top of ANY file using thirdweb hooks, GSAP, or `useState`.
5. **CSS:** Tailwind CSS only. No [.css](file:///e:/neon-drop-protocol/app/globals.css) or `.scss` files (except [globals.css](file:///e:/neon-drop-protocol/app/globals.css) for glitch keyframes).
6. **Theme:** Cyberpunk. Background `#050505`, accent `#39FF14`, sharp contrast.
7. **Animation:** GSAP only via `useGSAP()` hook for React lifecycle safety.
8. **State Ledger:** Every functional change MUST be logged in [UPDATE.md](file:///e:/neon-drop-protocol/UPDATE.md) with timestamp, files modified, and logic description.

---

## 4. File Architecture

```
e:\neon-drop-protocol\
├── app/
│   ├── layout.tsx          # RSC. Loads Geist + Inter fonts, wraps in <Providers>, SVG noise overlay
│   ├── page.tsx            # Client Component. Hero section + MintCard + mounts Mainframe & Roadmap
│   ├── providers.tsx       # Client Component. Wraps children in <ThirdwebProvider>
│   └── globals.css         # Tailwind v4 import + glitch button keyframes
├── components/
│   ├── GlobalConduit.tsx   # The unified vertical power line (fixed, z-40)
│   ├── Mainframe.tsx       # Pinned section with horizontal laser + 3 utility cards
│   ├── Roadmap.tsx         # Horizontal scroll conveyor belt with 6 phase cards + TerminalCTA
│   ├── TerminalCTA.tsx     # Scene-cut CTA with cryptographic text scrambler
│   ├── MintCard.tsx        # NFT preview card with 3D tilt, bento stats, wallet connection
│   └── HUD.tsx             # Global HUD overlay (currently NOT mounted in page.tsx)
├── lib/
│   └── client.ts           # thirdweb client singleton
├── AGENTS.md               # AI agent rules (see Section 3)
├── UPDATE.md               # Immutable state ledger (append-only changelog)
└── .env.local              # NEXT_PUBLIC_THIRDWEB_CLIENT_ID
```

---

## 5. The Scroll Flow (Section-by-Section)

The user experience is a continuous, linear scroll journey:

### 5.1 Hero Section ([app/page.tsx](file:///e:/neon-drop-protocol/app/page.tsx))
- Staggered GSAP fade-in animation on load (`.hero-anim`)
- "Protocol Live" badge, main headline with gradient text, subtitle
- Ambient green glow blurs in the background

### 5.2 MintCard ([components/MintCard.tsx](file:///e:/neon-drop-protocol/components/MintCard.tsx))
- Bento grid layout: NFT preview (left) + stats grid (right)
- **3D Glass Tilt:** `gsap.quickTo` for mouse-tracking rotationX/Y on the NFT placeholder
- **Scroll-triggered entrance:** `.bento-card` elements fade in via ScrollTrigger
- **3-State Wallet Button:**
  - Disconnected → "CONNECT WALLET" (opens modal)
  - Wrong Network → "SWITCH TO SEPOLIA" (red text)
  - Ready → "AWAITING CONTRACT" (disabled)
- Glitch hover effect via CSS `::before`/`::after` pseudo-elements

### 5.3 GlobalConduit ([components/GlobalConduit.tsx](file:///e:/neon-drop-protocol/components/GlobalConduit.tsx))
- **Two fixed `<div>`s** at `left-8 lg:left-16`:
  - `.global-power-bg`: Faint white track (`bg-white/5`)
  - `.global-power-line`: Active green line (`bg-[#39FF14]`), `origin-top`
- Starts at `scaleY(0)` via inline `style` (prevents FOUC)
- GSAP `ScrollTrigger` scrubs `scaleY` from `0` → `0.5` over the first `800px` of scroll
- At `scaleY: 0.5`, the line reaches exactly `top-1/2` (50vh) — the checkpoint position

### 5.4 Mainframe ([components/Mainframe.tsx](file:///e:/neon-drop-protocol/components/Mainframe.tsx))
- **Pinned section** (`pin: true`, `end: "+=2500"`)
- **Checkpoint node** at `left-[calc(4rem-4px)] top-1/2` — ignites green when timeline starts
- **Horizontal laser** (`origin-left`, `scaleX: 0→1`) shoots across the screen
- **Mathematical card ignition:** Each card's `getBoundingClientRect().left` is measured, and the exact `hitRatio` determines when the laser tip touches it (inserted at `laserStart+=${hitRatio * 2}`)
- 3 utility cards: Node Access, Protocol Governance, Yield Generation

### 5.5 Roadmap ([components/Roadmap.tsx](file:///e:/neon-drop-protocol/components/Roadmap.tsx)) — **THE MOST COMPLEX COMPONENT**

This is a **horizontal scroll conveyor belt** that converts vertical scrolling into horizontal panning:

#### Architecture:
- `sectionRef`: The outer `h-screen` container (gets pinned)
- `trackRef`: An absolutely positioned `w-max` flex row that translates left via `x: () => -getPanWidth()`
- 6 Phase cards arranged horizontally with `gap-12` and `pl-[100vw]` initial offset
- Each card has a vertical "plug" line connecting to the horizontal laser axis

#### GSAP Timeline Breakdown:
1. **Master Pin (Step 1):** Pin the section and translate `trackRef` left. Pan width = `trackRef.scrollWidth - window.innerWidth`.
2. **World Origin Parallax (Step 1B):** The GlobalConduit vertical lines, the header text, the checkpoint node, and the optical mask are **all translated left** at the same rate using `document.querySelector()` to escape the `useGSAP` scope.
3. **Laser Phase 1 — "Read Head" (Step 2):** Horizontal laser shoots from the left edge to the center of the screen (`w-[50vw]`, `scaleX: 0→1`).
4. **Checkpoint Node (Step 2B):** Ignites green simultaneously with the laser.
5. **Cards Ignition (Step 3):** Each card uses `containerAnimation: ht` with `start: "center center"` — they ignite exactly when they hit the screen center (where the laser tip is). Active state includes glassmorphism (`bg-[#39FF14]/5`, `inset box-shadow`), and the `.micro-data` text flashes green.
6. **Laser Phase 2 — Extension (Step 4):** After Phase 06 is centered, a second laser (`left-1/2 right-0`) extends from center to the right edge.

#### Optical Mask System:
- The horizontal laser actually starts at `left-0` (screen edge), but a solid black `<div>` (`maskRef`) sits over the left `2rem`/`4rem` to hide it
- This makes the laser look like it originates from the vertical line
- As the user scrolls horizontally, the mask translates left along with the vertical line, progressively revealing the laser underneath

#### Visual Upgrades:
- Architectural grid background (`linear-gradient` 24px pattern)
- Hardware bracket accents on card corners (`border-t border-l` etc.)
- Junction nodes at plug/card connection points (`4px` green circles)
- Micro-typography (`[ SYS_INIT_OK ]`) that illuminates on card activation

#### TerminalCTA Integration:
- [TerminalCTA](file:///e:/neon-drop-protocol/components/TerminalCTA.tsx#20-180) is rendered as the **last element** in the horizontal track
- Wrapped in a `100vw` wide `<div>` with `-mt-[50vh]` to vertically center it
- A `50vw` spacer before it gives Laser Phase 2 room to complete
- The `horizontalTween` state is passed down as `containerTween` prop

### 5.6 TerminalCTA ([components/TerminalCTA.tsx](file:///e:/neon-drop-protocol/components/TerminalCTA.tsx))

A cryptographic "Scene Cut" that appears at the end of the horizontal scroll:

#### Props:
- `embedded?: boolean` — When `true`, uses `containerAnimation` instead of vertical pin
- `containerTween?: gsap.core.Tween` — The Roadmap's master horizontal tween

#### Animation Timeline:
1. **Laser:** Shoots from `left-0` to center (`w-1/2`, `scaleX: 0→1`)
2. **CTA Box:** Unfolds at center (`scale: 0→1`, `opacity: 0→1`) with `#39FF14` glow
3. **Text Scramble:** `setInterval` cycles random characters until locking into "INITIATE PROTOCOL // CONNECT WALLET"
4. **Button:** "ACCESS TERMINAL" fades in with `y: 20→0`

#### Key Safety Logic:
- If `embedded && !containerTween`, the hook returns early (prevents race condition where GSAP tries to create a vertical pin before the tween arrives)

### 5.7 HUD ([components/HUD.tsx](file:///e:/neon-drop-protocol/components/HUD.tsx)) — **NOT CURRENTLY MOUNTED**
- Was removed from [page.tsx](file:///e:/neon-drop-protocol/app/page.tsx) due to visual conflicts with [GlobalConduit](file:///e:/neon-drop-protocol/components/GlobalConduit.tsx#11-47)
- Contains a full-viewport HUD overlay with corner brackets, crosshairs, and data labels
- Could be re-enabled if needed

---

## 6. Critical Bug Fixes & Lessons Learned

### 6.1 GSAP React Context Scoping
- **Problem:** `useGSAP({ scope: sectionRef })` restricts string selectors to elements inside that ref. The [GlobalConduit](file:///e:/neon-drop-protocol/components/GlobalConduit.tsx#11-47) lives outside [Roadmap](file:///e:/neon-drop-protocol/components/Roadmap.tsx#13-252), so `.global-power-line` was invisible.
- **Fix:** Used `document.querySelector()` to grab global elements directly, bypassing scope. Changed `{ scope: sectionRef }` to `{ dependencies: [] }`.

### 6.2 FOUC (Flash of Unstyled Content)
- **Problem:** [GlobalConduit](file:///e:/neon-drop-protocol/components/GlobalConduit.tsx#11-47)'s green line rendered at full height before `useEffect` ran `gsap.set({ scaleY: 0 })`.
- **Fix:** Added inline `style={{ transform: 'scaleY(0)' }}` to the DOM element.

### 6.3 GSAP Zombie ScrollTriggers
- **Problem:** Wrapping ScrollTrigger creation in `requestAnimationFrame` broke `@gsap/react`'s automatic cleanup context. On hot reload, permanent duplicate triggers accumulated.
- **Fix:** Removed `rAF` wrappers. Used functional GSAP values ([() => -getPanWidth()](file:///e:/neon-drop-protocol/components/Roadmap.tsx#71-72)) with `invalidateOnRefresh: true`.

### 6.4 TerminalCTA Race Condition
- **Problem:** When [TerminalCTA](file:///e:/neon-drop-protocol/components/TerminalCTA.tsx#20-180) was embedded in the Roadmap, it tried to create a vertical `pin: true` ScrollTrigger before receiving the `containerTween` prop.
- **Fix:** Added `embedded` prop. If `embedded && !containerTween`, return early from the `useGSAP` hook.

### 6.5 Optical Mask for Laser Origin
- **Problem:** Setting the horizontal laser to `left-0` created a cross (+) shape because the vertical line sits at `left-16`.
- **Fix:** A solid black `<div>` masks the gap. It translates left with the world origin during horizontal scroll, revealing the laser naturally.

---

## 7. Environment Setup

```bash
git clone https://github.com/mavinweb3/neon-drop-protocol.git
cd neon-drop-protocol
npm install
```

Create [.env.local](file:///e:/neon-drop-protocol/.env.local):
```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
```

Run:
```bash
npm run dev
```

---

## 8. What's NOT Implemented Yet

- [ ] **Actual NFT minting logic** — The "AWAITING CONTRACT" state on [MintCard](file:///e:/neon-drop-protocol/components/MintCard.tsx#16-218) has no contract wired
- [ ] **The "Access Terminal" button** in [TerminalCTA](file:///e:/neon-drop-protocol/components/TerminalCTA.tsx#20-180) doesn't have an `onClick` handler
- [ ] **Mobile responsiveness** — Horizontal scroll and GSAP pins need mobile-specific adjustments
- [ ] **HUD overlay** — [HUD.tsx](file:///e:/neon-drop-protocol/components/HUD.tsx) exists but is not mounted (was removed due to visual conflicts)
- [ ] **Footer section** — Only a subtle gradient pulse line exists

---

## 9. Design Tokens (Quick Reference)

| Token | Value |
|---|---|
| Background | `#050505` |
| Accent (Neon Green) | `#39FF14` |
| Secondary Accent | `#00FF88` |
| Card Background | `#080808` |
| CTA Background | `#0A0A0A` |
| Font: Headers | Geist Sans (`--font-geist-sans`) |
| Font: Body | Inter (`--font-inter`) |
| Font: Mono | Geist Mono (`--font-geist-mono`) |
| Global Conduit Position | `left-8` (mobile), `left-16` (desktop) |
| Checkpoint Y-Position | `top-1/2` (50vh) |

---

## 10. File-by-File State Summary

| File | Status | Notes |
|---|---|---|
| [app/layout.tsx](file:///e:/neon-drop-protocol/app/layout.tsx) | ✅ Stable | RSC, fonts, noise overlay, `<Providers>` |
| [app/page.tsx](file:///e:/neon-drop-protocol/app/page.tsx) | ✅ Stable | Hero + MintCard + Mainframe + Roadmap |
| [app/providers.tsx](file:///e:/neon-drop-protocol/app/providers.tsx) | ✅ Stable | `<ThirdwebProvider>` wrapper |
| [app/globals.css](file:///e:/neon-drop-protocol/app/globals.css) | ✅ Stable | Tailwind v4 + glitch keyframes |
| [lib/client.ts](file:///e:/neon-drop-protocol/lib/client.ts) | ✅ Stable | thirdweb singleton |
| [components/GlobalConduit.tsx](file:///e:/neon-drop-protocol/components/GlobalConduit.tsx) | ✅ Stable | Vertical power line, FOUC-fixed |
| [components/Mainframe.tsx](file:///e:/neon-drop-protocol/components/Mainframe.tsx) | ✅ Stable | Pinned laser + mathematical card ignition |
| [components/Roadmap.tsx](file:///e:/neon-drop-protocol/components/Roadmap.tsx) | ✅ Stable | Horizontal scroll, optical mask, visual upgrades |
| [components/TerminalCTA.tsx](file:///e:/neon-drop-protocol/components/TerminalCTA.tsx) | ✅ Stable | Embedded mode, cryptographic scrambler |
| [components/MintCard.tsx](file:///e:/neon-drop-protocol/components/MintCard.tsx) | ✅ Stable | 3D tilt, wallet 3-state button |
| [components/HUD.tsx](file:///e:/neon-drop-protocol/components/HUD.tsx) | ⚠️ Dormant | Not mounted, may conflict with GlobalConduit |
| [AGENTS.md](file:///e:/neon-drop-protocol/AGENTS.md) | ✅ Stable | Non-negotiable agent rules |
| [UPDATE.md](file:///e:/neon-drop-protocol/UPDATE.md) | ✅ Active | Append-only state ledger |
