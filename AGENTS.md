# Antigravity AI Agent Rules: Neon Drop Protocol

## 1. Security & State Management (Critical)
- **Zero-Trust Writes:** Never suggest smart contract "write" logic without a corresponding `isPending` or `isMinting` state block. 
- **Gas Protection:** The moment a transaction signature is requested, the trigger UI (button) MUST immediately become disabled.
- **Network Guarding:** All transaction components must verify the user's active `chainId` matches the target network before rendering the mint action.

## 2. Framework Constraints (Next.js 15 App Router)
- Default to React Server Components (RSC) for data fetching and layout.
- Any file using thirdweb hooks (e.g., `useReadContract`, `useSendTransaction`), GSAP animations, or React state (`useState`) MUST begin with the `"use client";` directive at the absolute top.
- Do not mix server-side secrets with client-side Web3 logic.

## 3. Web3 Execution (thirdweb SDK v5)
- Use the modular v5 imports (e.g., `thirdweb/react`, `thirdweb/components`). Do not use deprecated v4 hooks.
- For standard mints, prefer the built-in `<TransactionButton>` or `<ClaimButton>` for built-in lifecycle management, unless custom GSAP animations require a raw `<button>` hooked to `useSendTransaction`.
- Always implement explicit `.catch()` or `onError` handlers to revert UI states gracefully if a user rejects the wallet pop-up.

## 4. UI, Animation, & Styling
- **CSS:** Tailwind CSS only. No custom `.css` or `.scss` files.
- **Theme:** Cyberpunk. Deep dark backgrounds (`#050505`), sharp contrast, neon green accents (`#39FF14`).
- **Typography:** Geist Sans (Headers, line-height 1.1), Inter (Body).
- **Animation:** Use GSAP for all complex state transitions. Use the `@gsap/react` package and the `useGSAP()` hook for React lifecycle safety and proper cleanup.

## 5. State Ledger & Audit Trail
- **Documentation:** Upon completing any functional step or state change, you MUST append a concise, technical summary of the modifications to an `UPDATE.md` file in the root directory.
- **Format:** Include the timestamp, the specific files altered, the logic implemented (e.g., "Added Sepolia network validation block to MintUI.tsx"), and any newly introduced state variables.
- **Purpose:** This maintains a strict history of "tracked changes" for security audits and cross-session context continuity. Do not skip this step.