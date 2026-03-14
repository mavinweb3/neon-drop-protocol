# UPDATE.md — Neon Drop Protocol State Ledger

---

## 2026-03-14T22:45:00+08:00 — World Coordinate Parallax Translation (Roadmap Setup)

### Files Modified
- `components/GlobalConduit.tsx` — Added `.global-power-bg` class to the vertical track line to enable targeted sub-component animations.
- `components/Roadmap.tsx` — Addressed a visual continuity flaw where the globally fixed `GlobalConduit` line remained statically rooted in the viewport during horizontal panning. Attached a synchronized GSAP `x: () => -getPanWidth()` tween to the vertical origin pieces (`.global-power-line`, `.global-power-bg`, `nodeRef`, and `headerRef`). As the user scrolls horizontally right, the entire vertical origin translates left off-screen continuously, behaving like a physical marker anchored in the scrolling world. Adjusted `.roadmap-laser-1` to anchor rigidly at `left-0` with `w-[50vw]` to ensure a continuous, unbroken grid beam as the origin moves left.

---

## 2026-03-13T15:05:00+08:00 — Mainframe Stack Pinning & SVG Routing

### Files Modified
- `components/Mainframe.tsx` — Transformed into a pinned scroll timeline. Utilized `ScrollTrigger` to lock the vertical height of the section to `+=200%`. Injected an `<svg>` element acting as an intelligent routing line (`#mainframe-power-path`) that draws itself over scroll by manipulating `stroke-dashoffset`. Synchronized the drawing line with a chained timeline that sequentially cascades the `.mainframe-card` grid elements upward from off-screen into the viewport.

---

## 2026-03-13T17:35:00+08:00 — Global Power Conduit Unification

### Files Created
- `components/GlobalConduit.tsx` — Built a centralized, fixed tracking line (`.global-power-line`) to act as the single source of truth for the entire application's power descent. Hooks into `document.documentElement` to scrub from `scaleY: 0` to `0.5` precisely as the `#mainframe` ID enters the viewport.

### Files Modified
- `app/page.tsx` — Ripped out the redundant localized Hero tracking lines. Injected `<GlobalConduit />` at the top level to bridge all components.
- `components/Mainframe.tsx` — Purged its internal redundant `fixed` vertical conduit `DIV`s. Handed off its internal timeline termination sequence to directly grab and animate `.global-power-line` from `0.5` to `1.0`.

---

## 2026-03-13T17:30:00+08:00 — Hero Conduit Reintegration (Pre-Mainframe Handoff)

### Files Modified
- `app/page.tsx` — Reintegrated the `.hero-power-line` directly into the `heroConduitRef` Landing Page wrapper. Constructed a native `absolute w-[2px]` geometric track down the left margin (`left-8 lg:left-16`) attached to a localized GSAP `ScrollTrigger` scrub. This visually originates the power line at the top of the monitor and draws it down dynamically to mathematically intersect with the untouched Mainframe block.
- `components/Mainframe.tsx` — Intentionally bypassed. Left 100% frozen and completely isolated to preserve the heavily refined horizontal laser checkpoint logic as explicitly requested.

---

## 2026-03-13T17:25:00+08:00 — Phase 3 Fixed HUD Conduit Architecture

### Files Modified
- `app/page.tsx` — Purged all isolated/fragmented `.hero-power-line` `div` structures from the Hero section to yield a completely empty left margin.
- `components/Mainframe.tsx` — Rebuilt the component to drive the entire vertical power grid. Injected a `fixed` global vertical conduit (`left-8 lg:left-16`) that spans `h-screen` and scrubs natively off the `document.documentElement` scroll depth, bridging seamlessly into the `pin: true` checkpoint relay timeline.

---

## 2026-03-13T16:55:00+08:00 — HUD Removal (Line Conflict Resolution)

### Files Modified
- `app/page.tsx` — Removed the `<HUD />` component overlay. Its independent global vertical tracker (`left-6 md:left-12`) was visually clashing with the new localized Hero-to-Mainframe conduit (`left-8 lg:left-16`), creating redundant and overlapping geometry.

---

## 2026-03-13T16:50:00+08:00 — Global Power Conduit (Seamless Handoff)

### Files Modified
- `app/page.tsx` — Purged old broken lines. Built a new Global Power Conduit wrapper (`heroConduitRef`) around the Hero and Mint Action sections. Injected the `.hero-power-line` (`left-8 lg:left-16 w-[2px]`) and integrated a `useGSAP` scrub bound to the container's height to drop the line organically from the top navigation down to the Mainframe boundary.
- `components/Mainframe.tsx` — Validated and stripped any negative margins from `.mainframe-v-line`. Locked its starting coordinates precisely to `absolute left-8 lg:left-16 top-0` ensuring a 100% physically uninterrupted energy flow from the bottom of the Hero section.

---

## 2026-03-13T16:03:00+08:00 — Sequential Energy Relay (Mainframe)

### Files Modified
## 2026-03-13T16:03:00+08:00 — Sequential Energy Relay (Mainframe)

### Files Modified
- `components/Mainframe.tsx` 
  - **Relay Implementation**: Rebuilt the scroll-scrubbed logic to introduce a Sequential Energy Relay. Added a `.mainframe-v-line` vertical dropdown, a `.mainframe-node` intersection point, and a `.mainframe-h-line` horizontal laser. Bound these to a `useGSAP` scrub timeline where the laser shoots across the grid and mathematically ignites Phase 1, 2, and 3 cards simultaneously as its `scaleX` progresses.
  - **Relay Refinement**: Re-aligned the checkpoint node and horizontal laser to perfectly bisect the vertical axis of the cards (`top-1/2 -translate-y-1/2`) behind a solid `bg-[#050505]` card backdrop. Upgraded GSAP ScrollTrigger physics (`scrub: 2.5`, `end: "+=600"`) to enforce heavy smoothing trail effects and demand a deeper physical scroll depth to execute the full sequence.

---

## 2026-03-13T15:55:00+08:00 — Horizontal Circuit Plug Architecture

### Files Modified
- `components/Roadmap.tsx` — Rebuilt the component to utilize horizontal scroll pinning. Replaced the global vertical tracker with a local horizontal `main-conduit`. Implemented vertical `plugs` for each Phase card that glow when the `energy-fill` horizontal scrub mathematically intersects their position using `containerAnimation` scroll bounds.

---

## 2026-03-13T15:45:00+08:00 — Phase 2 Power Relays (Compartmentalization)

### Files Modified
- `components/Mainframe.tsx` — Purged all continuous HTML routing lines. Un-pinned the component to restore standard scroll behavior. Implemented standard staggered floating entrance for Utility Cards accompanied by a brief `#39FF14` box-shadow pulse to simulate wireless power transfer.
- `components/Roadmap.tsx` — Abandoned horizontal pinning logic. Reverted to a compartmentalized vertical timeline. Implemented a single `vertical-conduit-fill` tracker that natively scrubs via `ScrollTrigger` intersection bounds. Phase icons and text trigger glow states only when the vertical tracking element physically intersects their row coordinate.

---

## 2026-03-13T15:12:00+08:00 — CSS Div Sequencing Grid & Alignment Fixes

### Files Modified
- `components/Mainframe.tsx` — Ripped out the overlapping `<svg>` routing element. Built a responsive, sequential power grid using absolute DOM `<div>` nodes (`.path-1` through `.path-4`). Bound to a GSAP timeline to draw power chronologically from the left HUD wire into the active cards. Elevated title text to `z-20` to prevent intersection clipping.
- `components/Roadmap.tsx` — Removed the non-scaling SVG bend. Replaced with a responsive native CSS `border-bl-radius` joint to cleanly branch the vertical HUD tracker into the horizontal timeline.

---

## 2026-03-13T15:05:00+08:00 — Mainframe Stack Pinning & SVG Routing

### Files Modified
- `components/Mainframe.tsx` — Transformed into a pinned scroll timeline. Utilized `ScrollTrigger` to lock the vertical height of the section to `+=150%`. Injected an `<svg>` element acting as an intelligent routing line (`#mainframe-power-path`) that draws itself over scroll by manipulating `stroke-dashoffset`. Synchronized the drawing line with a chained timeline that sequentially cascades the `.mainframe-card` grid elements upward from off-screen into the viewport.

---

## 2026-03-13T14:58:00+08:00 — Roadmap Horizon Pinning Implementation

### Files Modified
- `components/Roadmap.tsx` — Transformed into a premium horizontal-scroll experience. Set the main section to `pin: true` via GSAP ScrollTrigger. Shifted the timeline content into an oversized horizontal `<div ref={trackRef}>` that dynamically translates `x` leftward proportionally to the mapped scroll bounds. Rewrote the layout to stagger phases horizontally across the X-axis alternating top/bottom of a continuous center-crossing horizontal power wire (`.horizontal-conduit-fill`), scrubbing visually from left to right perfectly synchronized to the user's vertical scroll.

---

## 2026-03-13T14:48:00+08:00 — Phase 2.0: Global HUD Framing & Synchronization

### Files Created
- `components/HUD.tsx` — Engineered an Awwwards-tier global framing system serving as a fixed `z-50` overlay across the entire application viewport (`mix-blend-screen`). Embedded a dynamic left-mounted tracked line (`.hud-power-line`) using `gsap.fromTo` mapped strictly to the native `document.documentElement` scroll progress. Designed custom architectural markers (corner brackets, bounding lines, right-edge static rails) animated on the initial visor load.

### Files Modified
- `app/page.tsx` — Injected the pure `<HUD />` component overlay at the root level inside `<main>`, enabling tracking context across all scroll positions unconstrained by specific component boundaries.
- `components/Roadmap.tsx` — Striped out the secondary restricted local scrolling conduit. Retained the local GSAP horizontal displacement reveals (`.phase-text`).

### State Variables Introduced
- Provided `hudRef` (`useRef<HTMLDivElement>`) in `components/HUD.tsx`.

---

## 2026-03-13T14:40:00+08:00 — Roadmap GSAP Power Conduit Expansion

### Files Modified
- `components/Roadmap.tsx` — Converted to a Client Component to accommodate GSAP. Transformed the visual phase timeline blocks to use two overlapping `<divs>`: a static `bg-[#39FF14]/10` track and an absolutely positioned `.conduit-fill` power line (`bg-[#39FF14]`). Bound `.conduit-fill` to scale down to `scaleY: 0` on load and grow to `scaleY: 1` dynamically as the user scrubs down via a `gsap.fromTo` ScrollTrigger (`scrub: 1`). Implemented a staggered fade/slide-in entrance reveal (`opacity: 0` to `1`, `x: -20` to `0`) for the `.phase-text` content blocks synchronized with the container scroll.

### State Variables Introduced
- Provided `containerRef` (`useRef<HTMLElement>`) in `components/Roadmap.tsx` to handle bounding bounds for GSAP scope targeting.

---

## 2026-03-13T14:35:00+08:00 — Component Isolation (page.tsx Refactoring)

### Files Created
- `components/Mainframe.tsx` — Extracted the "THE MAINFRAME" section (Protocol Architecture 3-column utility grid) from `app/page.tsx` into a dedicated functional component.
- `components/Roadmap.tsx` — Extracted the "SYSTEM INITIATION PHASES" section (Execution Roadmap vertical timeline) from `app/page.tsx` into a dedicated functional component.

### Files Modified
- `app/page.tsx` — Removed the hardcoded Section 2 and Section 3 HTML and replaced them with `<Mainframe />` and `<Roadmap />` imports. Retained the Hero section and its GSAP staggered load animation logic.

### State Variables Introduced
- None.

---

## 2026-03-13T14:02:00+08:00 — Phase 1 Design Polish

### Files Modified
- `app/globals.css` — Reduced hover glitch translation offsets from 2px to 1px and minimized text-shadows for a more refined glitch effect on the connect button.
- `app/layout.tsx` — Added a fixed, full-screen `<div>` with a subtle SVG noise filter (`opacity-[0.03]`, `mix-blend-overlay`) at the lowest z-index to give the background physical depth.
- `app/page.tsx` — Transitioned to `"use client"`. Replaced harsh `drop-shadow` on 'Protocol' text with a physical, bleeding light effect using an absolute blurred div. Added `useGSAP` to stagger-fade in the Hero elements on mount.
- `components/MintCard.tsx` — Imported and registered `ScrollTrigger`. Created a scroll-triggered `gsap.fromTo` timeline within `useGSAP` that staggers the entrance of the `.bento-card` stat elements when scrolled into view. Left 3D tilt logic untouched.

### State Variables Introduced
- None. Added `heroRef` in `app/page.tsx` for GSAP targeting.

---

## 2026-03-13T04:15:02+08:00 — Client ID Strict Enforcement

### Files Modified
- `lib/client.ts` — Removed the dummy 32-character hex fallback for `clientId`. The Next.js application now strictly requires `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` to be configured in `.env.local` to compile and render successfully.

### State Variables Introduced
- None.

---

## 2026-03-13T03:39:46+08:00 — Step 2: Network Validation

### Files Modified
- `components/MintCard.tsx` — Implemented network validation using `useActiveWalletChain`, `useSwitchActiveWalletChain`, and `useConnectModal` from thirdweb v5. Created a dynamic 3-state machine on the Mint button: Disconnected ("CONNECT WALLET"), Connected on Wrong Network ("SWITCH TO SEPOLIA"), and Connected on Correct Network ("AWAITING CONTRACT"). Preserved all visual glitches and GSAP classes.

### State Variables Introduced
- Added thirdweb hooks: `activeChain`, `switchChain`, `connect`.
- Introduced derived state variables: `isConnected`, `isWrongNetwork`.

### Notes
- Target chain defaults to `sepolia` for now.

---

## 2026-03-13T03:25:30+08:00 — Aesthetic Refinements (Bento Grid, GSAP Tilt, Glitch)

### Files Created
- `components/MintCard.tsx` — Extracted the minting UI into a dedicated Client Component. Implemented a "Bento Grid" layout for minting stats (Total Minted, Price, Network, Utility). Added a 3D glass tilt effect on the NFT placeholder using GSAP (`useGSAP` + `quickTo` for performant mouse tracking). Added deep dark glow and neo-brutalist tech styling.

### Files Modified
- `app/page.tsx` — Replaced the static Mint Card placeholder with the new `<MintCard />` component. Enhanced typography tracking on the main hero headings to look more technical.
- `app/globals.css` — Added `@keyframes` and `.btn-glitch` classes to implement the text-skew glitch micro-interactions on the Mint button hover state.

### State Variables Introduced
- Added React `useRef` (`cardRef`, `imageRef`) in `components/MintCard.tsx` specifically for GSAP DOM targeting. No Web3 or application state variables introduced yet.

### Notes
- `MintCard.tsx` starts with `"use client";` to satisfy both GSAP and Next.js App Router constraints, keeping `app/page.tsx` as a pure Server Component.

---

## 2026-03-13T03:08:00+08:00 — Project Initialization & Foundational UI Scaffold

### Files Created
- `lib/client.ts` — Thirdweb v5 client singleton (`createThirdwebClient`) sourced from `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`.
- `app/providers.tsx` — Client component wrapping `ThirdwebProvider` from `thirdweb/react`. Isolated from the server-side layout.
- `app/page.tsx` — Static Hero section (Geist Sans h1, Inter body) + Mint Card placeholder with inert disabled button. No transaction logic.
- `app/globals.css` — Forced dark theme (`--background: #050505`, `--foreground: #ededed`). No light-mode toggle.
- `.env.local` — Placeholder for `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`.

### Files Modified
- `app/layout.tsx` — Wrapped `{children}` in `<Providers>` (which renders `<ThirdwebProvider>`). Loaded Geist Sans + Inter via `next/font/google`. Updated metadata title/description. Set `bg-[#050505] text-white` on `<body>`.

### State Variables Introduced
- None (static scaffold — no React state, no hooks, no contract reads/writes).

### Dependencies Installed
- `thirdweb` (v5 SDK)
- `gsap` + `@gsap/react` (pre-installed for future animation work)

### Notes
- `app/layout.tsx` remains a React Server Component (RSC). All client-side Web3 logic is confined to `app/providers.tsx`.
- The mint button is rendered `disabled` with `cursor-not-allowed` — no smart contract interaction is wired yet.
