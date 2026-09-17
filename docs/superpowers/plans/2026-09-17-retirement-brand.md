# Retirement Brand Implementation Plan

> **For agentic workers:** Execute this plan task-by-task in the current dedicated redesign branch, with verification after each deliverable.

**Goal:** Deliver the approved deep-blue/gold redesign with all original content and functionality preserved.

**Architecture:** Keep the existing Next.js Pages Router and calculator state intact. Extract brand and illustrated tool presentation into reusable components, use a dedicated stylesheet loaded after existing styles, and change only presentation within existing pages.

**Tech Stack:** Next.js 14.2.5, React 18, CSS, inline SVG, Node test runner.

**Spec:** ../specs/2026-09-17-retirement-brand-design.md

## Global Constraints
- All 56 Markdown content files remain byte-identical.
- All seven tool URLs, inputs, calculations, guide text and results remain available.
- Preserve APIs, calculation core, subscriptions, mail, advertisements, affiliate links, metadata and public routes.
- Preserve original color variables and existing fonts; add no animation dependency.
- Motion respects reduced-motion; content stays visible without animation or JavaScript.

## Task 1: Brand and illustrated tools
**Files:** Create components/BrandLogo.js, components/ToolArtwork.js, components/ToolCollection.js, lib/tools.js; modify pages/tools/index.js and public/favicon.svg.
**Interfaces:** BrandLogo({compact=false}) renders decorative symbol plus readable brand name. ToolArtwork({kind}) renders a decorative SVG. ToolCollection({variant="home"}) renders seven original links and copy, using home or full descriptions.
- [x] Add rendered-output tests against the existing tools page: verify each of seven tool links contains its own decorative SVG and complete original copy. Verify each illustration differs and text remains readable without artwork.
- [x] Run `node --test tests/presentation.test.cjs`; confirm missing dedicated SVG illustrations fail before changes.
- [x] Implement shared logo, seven vector illustrations and tool collection. Preserve separate original home and full tool descriptions.
- [x] Repeat the tests and confirm every original route and description survives.

## Task 2: Home and consistent page identity
**Files:** Modify pages/index.js, pages/_app.js, pages/_document.js, all existing page brand links and components/RetirementCalculator.js; create styles/brand.css.
**Interfaces:** All original page exports and calculator handlers remain unchanged. Shared presentation components from Task 1 are consumed by the original pages.
- [x] Render the original home and capture links, original copy, result amounts and email input. Use preservation tests to check these after redesign.
- [x] Replace starfield/canvas and glow with a cup-and-horizon composition, left-aligned original headline and supporting copy.
- [x] Integrate the shared seven-tool collection; improve original articles/book sections and common navigation, footer, tool panels and reading styles.
- [x] Replace calculator bounce with reduced-motion-aware result fade. Connect labels to original range inputs without changing values or handlers.
- [x] Apply BrandLogo to every existing nav-logo link, preserving the original nav links. Update favicon consistently.
- [x] Run rendered presentation tests and baseline hash checks.

## Task 3: Build and reviewable preview
**Files:** Create scripts/verify-preservation.cjs and docs/redesign-verification.md.
- [x] Verify original pages remain present and Markdown, API, lib/useRetirementCalc.js and affiliate data hashes match baseline.
- [x] Run `npm run build`; fix failures caused by this change, retaining original dependency versions.
- [x] Start the built site and check home, tool list, seven calculators, article list, article detail and information pages.
- [x] Inspect 390px, 768px and 1440px layouts, keyboard navigation and reduced motion. Adjust only presentation when issues appear.
- [x] Verify unchanged calculators with representative input changes and original results; do not send actual mail or contact submissions.
- [x] Record evidence and external-service limits, commit the reviewed changes locally, and provide a preview without pushing or deploying.

