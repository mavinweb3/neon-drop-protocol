# UPDATE.md — Neon Drop Protocol State Ledger

---

## 2026-03-13T15:05:00+08:00 — Mainframe Stack Pinning & SVG Routing

### Files Modified
- `components/Mainframe.tsx` — Transformed into a pinned scroll timeline. Utilized `ScrollTrigger` to lock the vertical height of the section to `+=200%`. Injected an `<svg>` element acting as an intelligent routing line (`#mainframe-power-path`) that draws itself over scroll by manipulating `stroke-dashoffset`. Synchronized the drawing line with a chained timeline that sequentially cascades the `.mainframe-card` grid elements upward from off-screen into the viewport.

---

## 2026-03-14T16:40:00+08:00 — Roadmap Mathematical Laser Handoff Fix

### Files Modified
- `components/Roadmap.tsx` — Reverted the horizontal CTA embed to keep components decoupled. Re-implemented the mathematical intersection logic from the Mainframe: the scroll pin `panWidth` is measured, and each card's physical X position is calculated against the horizontal laser's growth. The cards now perfectly ignite at the exact millisecond the laser tip touches their plug. Added massive trailing padding (`pr-[100vw]`) to the horizontal track so that after Phase 06 translates completely off-screen to the left, the user can continue scrolling. This allows the horizontal laser to continue its growth all the way to `right-0` (the right edge of the screen).
- `app/page.tsx` — Re-mounted `<TerminalCTA />` below `<Roadmap />`.
- `components/TerminalCTA.tsx` — As the user scrolls vertically down into this component, the pinned horizontal laser firing from `left-0` perfectly simulates the visual of the Roadmap laser entering the new screen.

---

## 2026-03-14T17:15:00+08:00 — TerminalCTA Pixel Consistency & Roadmap Wipe

### Files Modified
- `components/Roadmap.tsx` — Discovered a 1-pixel vertical kink between the Roadmap and TerminalCTA lasers. TerminalCTA was using `-translate-y-1/2` on its `top-1/2` lines to perfectly center them on the axis, while Roadmap was missing this transform. Applied `-translate-y-1/2` to all 3 Roadmap lasers to mathematically align them perfectly to the same row of pixels across the component boundary.
- Added a `headerRef` inside `Roadmap.tsx` and mapped it to a new `containerAnimation` ScrollTrigger. The "EXECUTION ROADMAP" title and the `nodeRef` checkpoint now elegantly fade to `opacity: 0` as the Terminal CTA element horizontally scrubs into the viewport, yielding the screen completely to the final CTA.

---

## 2026-03-14T16:55:00+08:00 — TerminalCTA Horizontal Scroll Embedding

### Files Modified
- `components/TerminalCTA.tsx` — Refactored component to map its GSAP `scrollTrigger` dynamically. Added `containerTween?: gsap.core.Tween` interface. If passed, the component configures itself for a `containerAnimation` trigger (`start: "left 80%"`) instead of a vertical pin.
- `components/Roadmap.tsx` — Imported `TerminalCTA` and rendered it as the final `w-[100vw]` element in the horizontal `.map` track. Captured the master horizontal GSAP tween in React state via `useState` and passed it down to `TerminalCTA`. This perfectly solves the user request: the components remain entirely separated in code, but functionally exist on the exact same horizontal continuous scroll timeline.
- `app/page.tsx` — Removed standalone `<TerminalCTA />`.

---

## 2026-03-14T16:50:00+08:00 — Roadmap GSAP Garbage Collection Fix

### Files Modified
- `components/Roadmap.tsx` — Fixed a severe React Strict Mode + GSAP bug where the page would jump erratically between Roadmap and TerminalCTA components. This was caused by wrapping the ScrollTrigger creation inside a `requestAnimationFrame` callback, which broke `@gsap/react`'s automatic cleanup context. On every hot reload or React re-render, permanent zombie ScrollTriggers were left behind, creating conflicting overlapping pinned layers. Refactored the timeline to run synchronously utilizing functional GSAP values (`() => -getPanWidth()`) paired with `invalidateOnRefresh: true` to securely let GSAP internally handle dynamic sizing natively within the `useGSAP` reactive context.

---

## 2026-03-14T16:45:00+08:00 — Roadmap Component Split & Laser Physics Fix

### Files Modified
- `components/Roadmap.tsx` — Split the laser horizontally into a Two-Phase system using `containerAnimation` logic (returning to the physically accurate "Read Head" approach). `.roadmap-laser-1` acts as the read head, animating quickly from the left edge to the exact center of the screen as the user begins scrolling. As the `pr-[50vw]` track pans, Phase cards scroll horizontally and physically ignite *exactly* when they hit the center tip. Finally, `.roadmap-laser-2` is mapped specifically to Phase 06: the exact instant Phase 06 hits the center, Laser 2 begins scaling from center to the right edge (`right-0`), continuing its growth smoothly across the remaining remaining `50vw` track padding scroll distance.
- `app/page.tsx` — Separated `<TerminalCTA />` back directly beneath `<Roadmap />`. As the user scrolls vertically into it, the pinned horizontal laser firing from `left-0` perfectly simulates the Roadmap laser seamlessly entering the new screen.

---

## 2026-03-14T16:10:00+08:00 — Horizontal CTA Integration & Card Timing Fix

### Files Modified
- `components/Roadmap.tsx` — Complete rewrite. Split the laser into a TWO-PHASE system: `.roadmap-laser-1` (left to center, quick fill in 15% of scroll = the "read head") and `.roadmap-laser-2` (center to right edge, fires in the last 40% of scroll). Cards now activate correctly at `center center` via `containerAnimation`. Embedded the TerminalCTA as the LAST element inside the horizontal track (`w-screen`, `marginTop: -50vh`) so it scrolls in horizontally with zero vertical break. CTA activation uses `containerAnimation` with `start: "left 80%"`. Cryptographic scrambler inlined into the component.
- `app/page.tsx` — Removed standalone `<TerminalCTA />` since it is now embedded in the Roadmap's horizontal track.

---

## 2026-03-14T15:55:00+08:00 — Roadmap-to-TerminalCTA Seamless Laser Handoff

### Files Modified
- `components/Roadmap.tsx` — Extended the `.roadmap-laser` from `right-1/2` to `right-0` so it spans the full screen width. Re-synced its GSAP `scaleX` animation from `end: "+=400"` to `end: () => \`+=${panWidth}\`` so the laser tip draws proportionally across the entire horizontal scroll, reaching the right edge exactly when the last card exits. The laser now visually "exits" the Roadmap screen to the right.
- `components/TerminalCTA.tsx` — No changes needed. Its laser already starts at `left-0 w-1/2`, which visually picks up exactly where the Roadmap laser exited on the right edge, creating a continuous line across the scene transition.

---

## 2026-03-14T15:30:00+08:00 — Terminal CTA "Scene Cut" Redesign

### Files Modified
- `components/TerminalCTA.tsx` — Complete rewrite. Replaced the vertical-drop entrance with a horizontal "Scene Cut" from the left edge. Structural layout: `h-screen` pinned container, horizontal power line at `top-1/2 left-0 w-1/2` (stops dead center), `origin-left`. GSAP timeline: `pin: true`, `end: "+=1000"`, `scrub: 1`. Animation sequence: Step 1 — laser `scaleX: 0 → 1` shoots from left to center. Step 2 — CTA box unfolds at center with `scale`, `opacity`, and `#39FF14` glow. Step 3 — cryptographic scrambler fires simultaneously (`"<"` label) with the box unfold, locking into "INITIATE PROTOCOL // CONNECT WALLET". Corner wireframe accents added to the CTA box.

---

## 2026-03-14T14:50:00+08:00 — Decryption Matrix CTA Architecture

### Files Modified
- `components/TerminalCTA.tsx` — [NEW] Engineered the final footer sequence from scratch. Built a 90-degree corner drop line that connects directly from the `Roadmap` laser tip at the top center of the viewport, dropping straight down into a "Core Receptacle". Wired a multi-stage GSAP timeline (`useGSAP`) that handles: 1) The line descent, 2) A pulse impact on the receptacle, 3) A geometric Grid Unfold (width/height expanding out from center), 4) A cryptographic text scrambler via `setInterval` switching random hex/symbols until snapping to "INITIATE PROTOCOL // CONNECT WALLET", and 5) A cyclic breathing `#39FF14` residual pulse on the container borders. 
- `app/page.tsx` — Mounted `<TerminalCTA />` immediately below `<Roadmap />` without disrupting the existing timeline flows.

---

## 2026-03-14T12:45:00+08:00 — Mainframe Laser Timing Sync

### Files Modified
- `components/Mainframe.tsx` — Rewrote the GSAP timeline card-ignition logic. Instead of hardcoded time offsets (`0.2 + (index * 0.6)`), implemented a dynamic mathematical sequence. It measures each card's real pixel distance (`getBoundingClientRect().left`) relative to the horizontal laser origin and calculates the exact `hitRatio`. Multiplies this ratio by the laser's 2-second travel duration, inserting the card's ignition animation into the timeline at the precise millisecond the physical tip of the laser geographically touches the card on screen (using label offset `` `laserStart+=${hitRatio * 2}` ``).

---

## 2026-03-13T18:35:00+08:00 — Global Conduit Checkpoint Reconnection

### Files Modified
- `components/GlobalConduit.tsx` — Reverted from `h-[45vh]` back to `h-screen`. The line at `scaleY: 0.5` now equals exactly 50vh, matching the checkpoint at `top-1/2`.
- `components/Mainframe.tsx` — Removed the finale animation that pushed `.global-power-line` from `scaleY: 0.5` to `1.0`, which caused excess bleed below the checkpoint.
- `components/Roadmap.tsx` — Aligned all `top-[45%]` references (laser, node, track) to `top-1/2` so both the Mainframe and Roadmap checkpoints sit at the same 50vh position.

---

## 2026-03-13T18:05:00+08:00 — Roadmap Visual Cleanup

### Files Modified
- `components/Roadmap.tsx` — Checkpoint node now starts as `bg-[#050505] border-white/20` (dim gray). Added `nodeRef` and a GSAP `ScrollTrigger` that scrubs the node to `bg-[#39FF14]` synchronized with the laser shoot sequence. Shifted the "EXECUTION ROADMAP" header from `left-8 lg:left-16` to `left-20 lg:left-28` to prevent crowding the vertical conduit line.
- `components/GlobalConduit.tsx` — Capped the fixed vertical line height from `h-screen` to `h-[45vh]`, ensuring the green power line terminates exactly at the 45% viewport mark where the Roadmap checkpoint node sits, eliminating the excess green bleed below the node.

---

## 2026-03-13T17:58:00+08:00 — Roadmap Laser "Read Head" Synchronization

### Files Modified
- `components/Roadmap.tsx` — Synchronized the horizontal laser by turning it into a fixed "Read Head". Modified `.roadmap-laser` width to `right-[50%]` and decoupled its shoot sequence from the master pinned timeline so it reaches `scaleX: 1` instantly upon section entry. Adjusted track offset to `pl-[100vw]` so cards start fully off-screen. Reconfigured `containerAnimation` to trigger precisely at `"center center"`—meaning a card exclusively hits its `opacity: 1` active state the exact millisecond its centered plug visually touches the geometric tip of the center-fixed laser.

---

## 2026-03-13T17:45:00+08:00 — Roadmap Horizontal Circuit Array

### Files Modified
- `components/Roadmap.tsx` — Transformed into a premium horizontal "conveyor belt" experience. Hard-pinned the section (`h-screen`) and horizontally translated a `w-max` flex track leftward relative to vertical scroll distance. Embedded a static `.roadmap-laser` crossing the 45% screen mark. Expanded Roadmap to 6 comprehensive phases. Wired a GSAP `containerAnimation` Timeline that geometrically tracks each incoming card; as a card slides past the screen center, its localized vertical `plug` and border mathematically flash active `#39FF14`.

---

## 2026-03-13T17:40:00+08:00 — Roadmap Vertical Stack Reversion

### Files Modified
- `components/Roadmap.tsx` — Purged the broken `pin: true` horizontal GSAP scrub layout that was hiding the cards off-screen. Reconstructed the component entirely into a vertically-stacked `flex-col` layout matching the `left-[8rem]/16` indentation of the `GlobalConduit`. Attached a new `useGSAP` intersecting sequence to fade/slide the Phase cards (`y: 0`, `opacity: 1`) independently as the user scrolls downwards alongside the global power line.

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
