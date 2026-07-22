---
target: src/pages/index.astro (Manitfood landing page)
total_score: 23
max_score: 36
na_heuristics: 7
p0_count: 2
p1_count: 3
timestamp: 2026-07-22T09-46-42Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review sub-agent · B: detector + browser evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Hero secondary CTA `href="#demo"` targets an ID that doesn't exist anywhere in the page — dead link with zero feedback |
| 2 | Match System / Real World | 3/4 | Copy well-grounded in Russian food-business reality; drag-handle icon on before/after implies pointer-drag that doesn't exist (scroll-only) |
| 3 | User Control and Freedom | 2/4 | No skip for the 300vh pinned scroll section; no anchor nav to jump to pricing/FAQ; no back-to-top |
| 4 | Consistency and Standards | 2/4 | "Открыть бота в Telegram" appears 5×, only 1 actually opens Telegram; brand primary color silently disappears in `data-theme="black"` sections |
| 5 | Error Prevention | 3/4 | FAQ pre-empts real purchase anxieties well (free regen, no charge until confirmed, cancel anytime) |
| 6 | Recognition Rather Than Recall | 3/4 | Numbered 1-2-3 step patterns and repeated card idioms keep scanning low-effort |
| 7 | Flexibility and Efficiency | n/a | Linear marketing scroller on a Persuade surface — no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 2/4 | Two full duplicated segment narratives back-to-back, plus a 12-tile gradient gallery adding weight without real information |
| 9 | Error Recovery | 3/4 | No live error states needed on-page; FAQ substitutes reasonably |
| 10 | Help and Documentation | 3/4 | FAQ section is substantive and targeted, functions as adequate lightweight documentation |
| **Total** | | **23/36** | **Acceptable (64%)** |

*(Heuristic 7 scored n/a per mode-applicability rule for Persuade surfaces; total renormalized to /36.)*

## Design Specificity Verdict

**Partially specific — copy is authored, visual scaffold is generic.**

**LLM assessment**: The copy and pricing are genuinely domain-researched and would not survive a swap to an unrelated product — real RUB price anchoring against the actual food-photography market ("Разовая профессиональная съёмка стоит 3 000–15 000 ₽"), FAQ items specific to AI food-photo trust concerns ("Нейросеть не исказит моё блюдо?", "Это не будет выглядеть как «ИИ-глянец»?"), and named micro-segments (кондитеры на дому, кейтеринг, пекарни, бары). But the structural template — hero → sticky before/after scrub → segmented audience blocks → tiered pricing tabs → FAQ accordion → final CTA — is the exact shape used by countless "AI headshot / AI real-estate / AI product photo" SaaS pages. Nothing in layout or componentry signals *food* specifically. The one place the page could build real category-specific proof (the before/after imagery) instead uses two near-identical stock photos, and the "12 styles" gallery renders as flat color gradients with text labels rather than photos — the code's own comment admits this is a placeholder ("пока без реальных сгенерированных примеров"). An unrelated AI-photo-transformation product could reskin this page with different copy and it would look structurally identical.

**Deterministic scan**: `detect.mjs` ran clean against `src/pages/index.astro` — 0 findings, exit code 0, verified twice (JSON and human-readable mode). No automated anti-pattern violations detected; nothing here contradicts the LLM's specificity concerns, which are structural/compositional rather than the kind of markup anti-pattern the detector catches.

**Visual overlays**: No browser automation tool was available in this session (for either sub-agent), so no live-page overlay or screenshot evidence could be gathered. This is a tooling gap, not a clean signal — treat the visual/rendered layer as unverified rather than passing. In particular, the brand-color-loss issue in `data-theme="black"` sections (see P1 below) was caught by reading daisyUI's theme source, not by seeing the page — it should be visually confirmed once a browser tool is available.

## Overall Impression

The page has a real point of view in its writing — it understands exactly what a Russian cafe owner or home baker is anxious about when handed an "AI will fix your photos" pitch, and it defuses that anxiety competently and repeatedly. But the page undersells its own product at the one moment that matters most: the before/after demo shows almost no visible transformation, degrades to a permanently-frozen "before" image if JavaScript fails, and the honesty disclaimer explaining this is a placeholder is nearly invisible. Layered on top are a dead link in the hero, a CTA label that lies about its own behavior four times before it's true, and a theme bug that mutes the brand's signature orange exactly on the highest-stakes button on the page. The single biggest opportunity: make the before/after section actually prove the product works, since everything else on the page is built to earn trust for a claim that section currently fails to demonstrate.

## What's Working

1. **FAQ genuinely defuses category-specific anxiety.** Questions like "Нейросеть не исказит моё блюдо?" and "Это не будет выглядеть как «ИИ-глянец»?" show real understanding of what a restaurant owner or home baker actually fears about AI-generated photos — not generic FAQ filler.
2. **Zero-pressure trial framing is consistent throughout.** "Первое фото бесплатно," "без карты," "подтверждаете сами" reinforced at hero, mid-page, pricing, and final CTA — deliberate anxiety-reduction, not an afterthought.
3. **Honest restraint on the style gallery.** Rather than fabricate fake "after" photos for all 12 styles, the team used abstract gradient cards and documented why in a code comment — an ethically sound instinct, even though it costs persuasive power (see Priority Issues).

## Priority Issues

**[P0] The core proof (before/after demo) barely demonstrates the product, and fails silently without JS**
- **Why it matters**: This is the one moment the page is supposed to prove the value proposition. `before/burger.jpg` and `after/burger.jpg` are near-identical studio-quality shots — the "before" already looks professionally shot, so the demo shows almost no transformation. The DOM also stacks "before" on top with `clip-path: inset(0 0 0 0%)` as the CSS default, so if JS fails to load or run, the visitor sees only the untouched "before" image, forever, with no visible "after." A visitor who scrolls through 3 screen-heights of scroll-jacking and perceives no real change will conclude the product doesn't work.
- **Fix**: Replace with a genuinely amateur phone photo (uneven light, cluttered background) paired with a real styled "after," or delay this section until real generated examples exist. Add a no-JS fallback (e.g., a static side-by-side pair) so the demo degrades gracefully.
- **Suggested command**: `/impeccable harden`

**[P0] The honesty disclaimer is nearly invisible at the exact moment it matters**
- **Why it matters**: The caption disclosing these are illustrative, not real, results ("Иллюстрация — реальные примеры «до/после» появятся здесь...") is styled `text-white/40 text-xs` at the bottom of a full-bleed black section — estimated contrast ~3.8:1, failing WCAG AA (needs 4.5:1) and easy to miss given size and position. Combined with the P0 above, a visitor is likely to walk away believing they saw real proof of a transformation that didn't really happen — undermining the team's own intended transparency.
- **Fix**: Raise this disclaimer's contrast and size, or move it to a persistent visible label instead of faint bottom-screen text.
- **Suggested command**: `/impeccable audit`

**[P1] Broken anchor: hero's secondary CTA leads nowhere**
- **Why it matters**: `<a href="#demo">Как это работает ↓</a>` (line ~149) targets an ID that doesn't exist anywhere in the document. This is the first interactive alternative a hesitant visitor reaches for ("show me how it works before I commit") — a dead link here makes the whole page feel unfinished within the first screen.
- **Fix**: Point it at the actual before/after demo section anchor, or a real explainer section.
- **Suggested command**: `/impeccable harden`

**[P1] Same CTA copy, different behavior, five times over**
- **Why it matters**: "Открыть бота в Telegram" appears in the header, hero, end of each segment section, and the final CTA — but only the last is an actual external link to Telegram; the other four just anchor-scroll to `#start`. This violates consistency and match-between-system-and-real-world: the label promises an action that doesn't happen until the fifth click. First-time visitors may click once, see nothing external happen, and disengage.
- **Fix**: Differentiate copy — e.g., "Смотреть тарифы ↓" for internal anchors, reserving "Открыть бота в Telegram" exclusively for the real external link.
- **Suggested command**: `/impeccable clarify`

**[P1] Brand primary color disappears in `data-theme="black"` sections**
- **Why it matters**: `tailwind.config.mjs` defines a custom brand primary (`#d9481f`), but `#segment-cafe` and `#start` reuse daisyUI's stock `black` theme, whose `--p` token is a zero-chroma gray, not the brand orange. Every `btn-primary` and `text-primary` in those sections — including the final conversion button — renders gray instead of brand orange, right where visual salience matters most.
- **Fix**: Define a custom dark theme (e.g. `black-brand`) that keeps `#d9481f` as primary instead of using stock `black`.
- **Suggested command**: `/impeccable colorize`

**[P2] Pricing shows 5 simultaneous options in the default (most-visited) tab**
- **Why it matters**: `heavyPricing` renders 5 cards at once (`grid-cols-5` desktop) as the default-checked tab, exceeding the ≤4-option guidance for a single purchase decision; a second tab adds 3 more, so a first-time visitor faces 8 total price points to reconcile.
- **Fix**: Trim the default view to 3-4 tiers, or pre-select a recommended tier more assertively and collapse the rest behind "see all options."
- **Suggested command**: `/impeccable distill`

**[P3] 12-tile style gradient gallery is heavy and generic on mobile**
- **Why it matters**: On a 390px viewport this collapses to 6 rows of small gradient tiles — high scroll cost for low information density, especially since these are abstract color swatches rather than actual photography examples, in the section that should be most persuasive for a photography product.
- **Fix**: Show 4-6 curated styles with real preview thumbnails, or move the full 12-style catalog off the primary conversion path.
- **Suggested command**: `/impeccable adapt`

## Persona Red Flags

**Jordan (First-Timer)**: Clicks "Как это работает ↓" in the hero out of caution before committing → dead link, first impression damaged in the opening 10 seconds. Scrolls into the before/after demo expecting proof and sees two near-identical burger photos, reinforcing doubt instead of resolving it.

**Riley (Stress Tester)**: Clicks every "Открыть бота в Telegram" button expecting Telegram to open every time — gets it wrong 4 times before the one that works. Tries to drag the ↔ handle in the before/after slider (implied by its icon); nothing happens, since it's scroll-only. With JS disabled/throttled, finds the demo section permanently frozen on the "before" image.

**Casey (Mobile)**: Scrolls through 3× the viewport height for the before/after reveal on a small screen, for a payoff that's barely perceptible even on desktop. Then hits a 6-row wall of gradient tiles in the style gallery — heavy thumb-scrolling for information that isn't really a decision needed on this page.

## Minor Observations

- Four of the five before/after image pairs in `public/images/` (`bento`, `cake`, `dessert`) are entirely unused on the page — only `burger` appears everywhere. `cake.jpg` sits unused while an entire section targets home cake-makers ("Кондитеры на дому") — a missed opportunity to show a segment-relevant example to that exact audience.
- FAQ accordion uses native `<input type="checkbox">` + div (daisyUI `collapse`) rather than `<details>/<summary>` — functions, but is a semantically weaker pattern for assistive tech.
- Pricing tabs are implemented as radio inputs with `role="tab"` on a hidden `<input>` — works for screen readers, but the visible label text isn't real selectable/searchable text (a known daisyUI a11y caveat).
- `<html class="scroll-smooth">` applies smooth scrolling globally with no `prefers-reduced-motion` guard; combined with the 300vh scroll-jacked before/after section, this is a vestibular-discomfort gap for motion-sensitive users.
- Several reassurance lines under pricing use low-opacity small gray text (`text-sm text-base-content/50`) — estimated contrast ~3.2:1, below WCAG AA, undercutting exactly the reassurance copy meant to reduce purchase hesitation.
- `cafeSegments` (5 items) in a 3-column grid produces an unbalanced 3+2 last row.

## Questions to Consider

- If the before/after demo is the entire reason a visitor would trust this product, why does it currently show two photos that are visually almost the same — and why is the disclaimer explaining that rendered small and half-transparent instead of clearly stated?
- Five buttons on this page say "Открыть бота в Telegram" — if a visitor clicked the first one expecting Telegram to open and it didn't, why should they trust the fifth one will?
- The page runs two full, parallel persuasion narratives (cafe/restaurant vs. home baker) end-to-end — has anyone tested whether a home baker actually reads through the entire restaurant-facing section first, or bounces before reaching the content written for them?
