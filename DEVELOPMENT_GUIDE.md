# IKIGAI Hospital — Website Development Guide

> **Purpose:** Single source of truth for converting the IKIGAI Hospital Figma design into a production website.  
> **Audience:** UI/UX developers, frontend engineers, and anyone implementing or reviewing pages.  
> **Figma file:** [IKIGAI-Hospital](https://www.figma.com/design/m3dXaMzxHZ30R7V3YraIPl/IKIGAI-Hospital?node-id=149-329)  
> **Canonical frame:** **Landing page 1** (`149:329`) — use this frame only.

---

## ⚠️ Primary objective — same look & feel from 15″ to 24″ screens

The Figma is authored at **1920px**. The live site must look **proportionally identical** on:

| Device class | Typical CSS width | Expectation |
|--------------|-------------------|-------------|
| 15″ laptop | ~1366–1440px | Same layout, scaled down fluidly |
| 16–17″ laptop | ~1512–1680px | Same layout, mid-scale |
| 24″ monitor | ~1920px | Exact Figma match (cap) |

**How we achieve this:** every size (type, images, gaps, radii, button heights) uses `clamp()` with a `vw` middle term. There is **no body zoom hack** and **no stepped breakpoint font sizes** on the desktop range.

**Where this section conflicts with later Figma-derived tables, THIS SECTION WINS.**

### D1. Fluid sizing system (non-negotiable)

```
Figma px → clamp(min, N / 19.2 vw, Npx)
```

Example: Figma `64px` → `clamp(2.5rem, 3.33vw, 4rem)` (40 → 64px).

- At **1920px**: sizes hit their **max** (exact Figma).
- At **1440px**: sizes are ~75% of Figma (still the same composition).
- At **1366px**: sizes are ~71% of Figma.
- Above **1920px**: layout is centered in `max-w-[1920px]`; sizes stay capped — do not grow past Figma.

`body` only needs `min-width: 320px`. Never set a fixed `1920px` width on `body`.

**Rule: never use stepped breakpoint sizes for sizing** (`md:text-[48px] 2xl:text-[64px]`). Breakpoints (`sm` / `lg` / `xl`) are only for **layout changes** (column counts, show/hide, stack vs row) — never for scaling type, spacing, or image dimensions on the 15″–24″ range.

### D2. Fluid type utilities (define once, reuse everywhere)

Map every Figma text style to a named utility. Do not invent one-off `text-[Npx]` in components.

| Utility | Clamp value | Range (approx) | Figma source (1920) |
|---------|-------------|----------------|---------------------|
| `text-display` | `clamp(2.5rem, 3.33vw, 4rem)` | 40 → 64px | Hero H1 — Aeonik 64 |
| `text-h2` | `clamp(2.5rem, 3.33vw, 4rem)` | 40 → 64px | Section titles — Aeonik 64 |
| `text-h3` | `clamp(1.375rem, 1.35vw, 1.625rem)` | 22 → 26px | Card titles, specialist names — Aeonik 26 |
| `text-stat` | `clamp(3.5rem, 4.9vw, 5.875rem)` | 56 → 94px | Stats — Aeonik 94 |
| `text-nav` | `clamp(0.875rem, 1.04vw, 1.25rem)` | 14 → 20px | Header CTA — DM Sans Regular |
| `text-cta` | `clamp(0.875rem, 1.04vw, 1.25rem)` | 14 → 20px | Buttons — DM Sans Regular |
| `text-label` | `clamp(0.8125rem, 1.15vw, 1.375rem)` | 13 → 22px | Section labels — DM Sans Medium uppercase |
| `text-body` | `clamp(0.875rem, 1.04vw, 1.25rem)` | 14 → 20px | Descriptions — DM Sans Regular |
| `text-body-sm` | `clamp(0.8125rem, 0.94vw, 1.125rem)` | 13 → 18px | Card body, FAQ answers — DM Sans Regular |
| `text-field` | `clamp(0.8125rem, 1.15vw, 1.375rem)` | 13 → 22px | Form placeholders — DM Sans Medium |

#### Section H2 responsive locks (tablet / mobile)

Breakpoints: mobile = `max-md` (<768px); tablet = `md`–`max-lg` (768–1023px); desktop = `lg+`.

| Element | Utility / class | Desktop (`lg+`) | Tablet (`md`–`lg`) | Mobile (`max-md`) |
|---------|-----------------|-----------------|--------------------|-------------------|
| Section H2 | `text-h2` + locks | Fluid → **64px** | **42px** locked | **38px** locked |
| Specialist name | `text-h3` + `max-lg:!text-[1.375rem]` | Fluid → **26px** | **22px** locked | **22px** locked |
| Stat number | `text-stat` | Fluid → **94px** | Fluid (same clamp) | Fluid (same clamp) |

### D3. Fluid layout / spacing / media clamps

| Item | Clamp (max = Figma @ 1920) |
|------|----------------------------|
| Page gutter | `px-[clamp(1.25rem, 6.25vw, 7.5rem)]` → 20 → 120px |
| Container | `mx-auto w-full max-w-[1920px]` + gutter above |
| Header pill height | `h-[clamp(56px, 4.375vw, 84px)]` |
| Header pill width | `w-[clamp(920px, 72.7vw, 1396px)]` |
| Header top offset | `top-[clamp(12px, 1.56vw, 30px)]` |
| Header radius | `rounded-[clamp(32px, 2.92vw, 56px)]` |
| Button height | `h-[clamp(44px, 2.92vw, 56px)]` |
| Button radius | `rounded-[clamp(22px, 1.54vw, 29.5px)]` |
| Service tag chip | `h-[clamp(40px, 2.6vw, 50px)]` + `rounded-[clamp(20px, 1.3vw, 25px)]` |
| Service card image | `w-[clamp(360px, 42.55vw, 817px)]` + `aspect-[817/438]` |
| Specialist card | `w-[clamp(240px, 21.1vw, 405px)]` + `aspect-[405/552]` |
| Specialist overlay | `h-[clamp(120px, 9.7vw, 186px)]` gradient bottom |
| CTA band radius | `rounded-[clamp(24px, 2.29vw, 44px)]` |
| Testimonial card | `w-[clamp(280px, 23.6vw, 453px)]` + `min-h-[clamp(220px, 16.2vw, 311px)]` |
| Social video tile | `w-[clamp(280px, 20.6vw, 396px)]` + `aspect-[396/636]` |
| FAQ image | `w-[clamp(320px, 41.6vw, 799px)]` + `aspect-[799/542]` |
| Location map | `w-[clamp(320px, 28.15vw, 540px)]` + `aspect-[540/395]` |
| Form field height | `h-[clamp(56px, 4.11vw, 79px)]` |
| Form field radius | `rounded-[clamp(28px, 2.08vw, 40px)]` |
| Why Ikigai logo | `w-[clamp(280px, 24.4vw, 468px)]` |
| Value icon | `size-[clamp(48px, 4.06vw, 78px)]` |

**Images and videos** must scale with the same `vw` / `%` / `aspect-*` rules — never hard-code only desktop pixel widths without a fluid width.

### D4. Intentional line breaks

Preserve Figma line breaks on ≥sm; let text flow on small screens:

| Location | Break after |
|----------|-------------|
| Hero H1 | `Expert Care for Complex` / `Vascular, Wound & Surgical Conditions` |
| Services H2 | `Advanced Care.` / `One Integrated Approach.` |
| Specialists H2 | `Meet the Specialists` / `Behind Your Care` |
| Why Ikigai H2 | `Advanced Care Built on Trust,` / `Expertise and Precision.` |
| Patient Stories H2 | `Trusted by Patients.` / `Driven by Outcomes.` |
| Appointment H2 | `Your Health Deserves` / `Specialist Care.` |

Pattern: `<br className="hidden sm:block" />`

### D5. Header conventions

- **Fixed** white pill: `fixed` + centered, `z-50`.
- Background: `#FFFFFF` + `box-shadow: 0 0 4px rgba(0,0,0,0.25)` + fluid radius.
- Logo: IKIGAI Clinics wordmark (icon + text SVG).
- Right cluster: navy **Talk to our doctor** (`#394464`) + split phone CTA (emoji icon left + red `#d31c1c` fill right).
- Below `lg`: collapse into hamburger; keep phone CTA visible.

### D6. Motion defaults

- FAQ accordion: expand/collapse with `150ms ease`.
- Social video tiles: play icon hover scale.
- Buttons / links: global `150ms ease` transition.
- Page load: soft fade on hero text only.
- Respect `prefers-reduced-motion: reduce`.

---

## 1. Project summary

IKIGAI Hospital is a multi-specialty vascular, wound, and surgical care hospital site: clean white editorial layout, navy and red accents, large Aeonik display type, service cards with tag chips, specialist profiles, patient testimonials, FAQs, and appointment booking.

| Item | Value |
|------|--------|
| Brand | IKIGAI Hospitals / IKIGAI Clinics |
| Design canvas | Desktop `1920 × 13011` (`Landing page 1`) |
| Content width | `1680px` (side inset `120px`) |
| Primary accent | Red `#D31C1C` |
| Secondary accent | Navy `#394464` |
| Display / titles | **Aeonik** (`public/fonts/Aeonik-Regular.ttf`) |
| Body / nav / labels | **DM Sans** (Google Fonts or self-hosted) |
| Contact phone | `+91 9063453373` |
| Designed by | Theories Consulting |

---

## 2. Figma source of truth

### 2.1 Which frames to build

Build only from **Landing page 1** (`149:329`). This is the only frame on Page 1.

| Page | Figma frame | Node ID | Desktop size | Route |
|------|-------------|---------|--------------|-------|
| Home | `Landing page 1` | `149:329` | `1920 × 13011` | `/` |
| Services (detail) | *(derive from Home services block)* | — | TBD | `/services` |
| Specialists (detail) | *(derive from Home specialists block)* | — | TBD | `/specialists` |
| Contact / Book | *(derive from appointment form)* | — | TBD | `/contact` |

Until inner-page frames exist, reuse Home tokens, header, and footer.

### 2.2 How to use Figma while coding

1. Open Dev Mode on `Landing page 1` (`149:329`).
2. Measure spacing from the **120px** left/right gutter — convert to fluid clamps, not absolute canvas X.
3. Export photos at **2×**; logos/icons as **SVG** when possible.
4. Rebuild with flex/grid + tokens — **do not** paste Figma absolute-position output into production.
5. Use `get_design_context` via Figma MCP for reference code; always adapt to this project's Vite + React + Tailwind stack.

### 2.3 Known design gaps

| Gap | Recommendation |
|-----|----------------|
| No mobile / tablet frames | Use Section 8 layout breakpoints; keep fluid type/spacing |
| No inner pages (Services, Specialist profile) | Shell routes + reuse Home patterns |
| No hover / focus states in Figma | Use Section 6 defaults |
| Aeonik licensing | Self-host licensed files; trial font in Figma — confirm license before launch |
| Header has no nav links in Figma | Only logo + CTAs shown; add nav when approved |
| FAQ answers only for first item | Expand accordion content from medical team |

---

## 3. Recommended tech stack

| Layer | Recommendation | Why |
|-------|----------------|-----|
| Framework | **React 19 + TypeScript** | Component-based, type-safe |
| Build tool | **Vite 6** | Fast HMR, optimized builds |
| Styling | **Tailwind CSS v4** + CSS variables / `@utility` fluid type | Matches clamp workflow |
| Routing | **React Router v7** | Multi-page expansion |
| Forms | React Hook Form + Zod | Appointment booking form |
| Hosting | Vercel / Netlify | Static SPA deployment |

> **Current project:** Vite + React + Tailwind v4 scaffold is already initialized in this repo.

---

## 4. Design tokens

Store in `src/styles/tokens.css` (or Tailwind `@theme`).

### 4.1 Color

```css
:root {
  /* Brand */
  --color-primary: #D31C1C;
  --color-primary-dark: #B01818;
  --color-navy: #394464;
  --color-navy-dark: #2D3550;

  /* Neutrals */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-text: #000000;
  --color-text-muted: rgba(0, 0, 0, 0.4);
  --color-text-on-dark: #FFFFFF;
  --color-text-on-dark-muted: rgba(255, 255, 255, 0.8);

  /* Surfaces */
  --color-bg: #FFFFFF;
  --color-bg-muted: #F5F7F6;
  --color-bg-navy: #394464;
  --color-bg-red: #D31C1C;

  /* Semantic */
  --color-focus: #D31C1C;
  --color-error: #D64545;
  --color-success: #1F9D55;
  --color-star: #F5A623;
}
```

**Usage rules**

- Red `#D31C1C` = phone CTA fill, section labels, accents.
- Navy `#394464` = primary buttons, CTA bands, submit button.
- White pills on dark = secondary CTAs (outline phone on CTA band).
- Muted labels = `rgba(0,0,0,0.4)` for form placeholders and field labels.

### 4.2 Typography (raw Figma @ 1920)

> In code, always use the fluid utilities in **D2** — never hard-code these px values except as clamp maxima.

| Role | Font | Weight | Size @ 1920 | Color | Use |
|------|------|--------|-------------|-------|-----|
| Hero H1 | Aeonik | Regular | `64px` | black | Hero headline |
| Section H2 | Aeonik | Regular | `64px` | black / white | All section titles |
| Stat number | Aeonik | Regular | `94px` | black | 10+ / 95% / 10K+ / 2 |
| Card title | Aeonik | Regular | `26px` | black / white | Service cards, specialist names, FAQ questions |
| Section label | DM Sans | Medium | `22px` | `#D31C1C` | "Our Services", "Our Specialists", etc. |
| Body | DM Sans | Regular | `20px` | black / white | Descriptions, addresses |
| Small body | DM Sans | Regular | `18px` | black / muted | Testimonials, value props |
| Field label | DM Sans | Medium | `22px` | `rgba(0,0,0,0.4)` | Form placeholders |
| Button / CTA | DM Sans | Regular | `20px` | white / black | Pill buttons |

**Font loading**

```css
@font-face {
  font-family: "Aeonik";
  src: url("/fonts/Aeonik-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* DM Sans — load from Google Fonts or self-host */
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap");

:root {
  --font-display: "Aeonik", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
}
```

### 4.3 Spacing scale (Figma maxima)

| Token | Value | Common use |
|-------|-------|------------|
| `--space-1` | `4px` | Micro |
| `--space-2` | `8px` | Tight |
| `--space-3` | `12px` | Compact |
| `--space-4` | `16px` | Card internal |
| `--space-5` | `24px` | Related blocks |
| `--space-6` | `32px` | Sub-gaps |
| `--space-7` | `40px` | Card grids |
| `--space-8` | `48px` | Medium pad |
| `--space-9` | `64px` | Large pad |
| `--space-10` | `80px` | Section rhythm |
| `--space-11` | `120px` | **Page gutter** |

Use these as clamp **max** values; never as fixed desktop-only padding for the 15″–24″ band.

### 4.4 Layout

```css
:root {
  --page-max: 1920px;
  --content-max: 1680px;
  --gutter: 120px;
  --header-height: 84px;
  --radius-pill: 56px;
  --radius-btn: 29.5px;
  --radius-card: 16px;
  --radius-service-img: 8px;
  --radius-cta-band: 44px;
  --radius-field: 40px;
  --btn-height: 56px;
  --field-height: 79px;
}
```

```
|← 120 →|←——————— content 1680 ———————→|← 120 →|
```

`Container`: `mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)]`.

### 4.5 Elevation & effects

| Effect | Spec |
|--------|------|
| Header pill | `background: #fff; box-shadow: 0 0 4px rgba(0,0,0,0.25); border-radius: 56px` |
| Navy CTA | `background: #394464; border-radius: 29.5px; color: white` |
| Red phone CTA | `background: #D31C1C; border-radius: 0 29.5px 29.5px 0` |
| Service card overlay | `linear-gradient(to bottom, transparent, black)` on image bottom |
| Service tag chip | `border: 1px solid #000; border-radius: 25px; height: 50px` |
| Testimonial card | `box-shadow: 0 0 4px rgba(0,0,0,0.25); border-radius: 16px` |
| CTA band | `background: #394464; border-radius: 44px` |
| Form field | `border: 1px solid rgba(0,0,0,0.4); border-radius: 40px` |
| Submit button | `background: #394464; border-radius: 39.5px; color: white` |

---

## 5. Information architecture

### 5.1 Primary navigation (from `149:783`)

| Label | Type | Target |
|-------|------|--------|
| Logo | Link | `/` |
| Talk to our doctor | Primary navy button | `tel:+919063453373` or `/contact` |
| Phone | Red split CTA | `tel:+919063453373` |

> Figma shows no text nav links in header. Add Services / Specialists / Locations anchors when approved.

### 5.2 Footer (`202:1030`)

**Component:** `src/components/layout/Footer.tsx`

| Block | Content |
|-------|---------|
| Appointment form | Name · Phone · Treatment · Preferred Date · Submit Request |
| Brand mark | IKIGAI Clinics logo (icon + wordmark SVG) |
| Social | Facebook · Instagram · LinkedIn (`#` until real URLs) |
| Legal | `© 2026 Ikigai Hospitals. All rights reserved.` |
| Credit | `Designed by Theories Consulting` |

**Form fields (Figma `149:679`)**

| Field | Placeholder | Width @ 1920 |
|-------|-------------|--------------|
| Your Name | `Your Name` | 318px |
| Phone Number | `Phone Number` | 316px |
| Treatment | `Treatment` | 317px |
| Preferred Date | `Preferred Date` | 317px |
| Submit | `Submit Request` | 318px (navy fill) |

**Assets (`public/images/`)**

| File | Use |
|------|-----|
| `brand/logo-icon.svg` | Header + footer icon mark |
| `brand/logo-wordmark.svg` | Header + footer wordmark |
| `icons/facebook.svg` | Footer social |
| `icons/instagram.svg` | Footer social |
| `icons/linkedin.svg` | Footer social |
| `icons/play.svg` | Social video tiles |
| `icons/star.svg` | Testimonial ratings |
| `icons/medical-assistance.png` | Why Ikigai value icons (×4) |
| `brand/ikigai-symbol.svg` | Why Ikigai decorative logo |

---

## 6. Component library (build these first)

### 6.1 `Header` / `Navbar`

| Spec | Figma @ 1920 | Code |
|------|--------------|------|
| Size | `1396 × 84`, top `30px` | Fluid clamps in **D3** |
| Shape | Pill radius `56px` | Fluid radius |
| Background | White + shadow | See 4.5 |
| Logo | Icon `66×62` + wordmark `156×56` | SVG, fluid height |
| Navy CTA | `231 × 56` | `Button` variant `navy` |
| Phone CTA | Split `270 × 56` (icon + red) | `PhoneButton` |

### 6.2 `Button`

| Variant | Look | Height | Radius | Type |
|---------|------|--------|--------|------|
| Navy filled | `#394464`, white text | 56 | 29.5 | `text-cta` |
| Red filled | `#D31C1C`, white text | 56 | 29.5 | `text-cta` |
| White filled | White bg, black text | 56 | 29.5 | `text-cta` |
| White outline | Transparent + white border | 56 | 29.5 | `text-cta` (on navy band) |
| Tag chip | Transparent + black border | 50 | 25 | `text-body` |
| Submit | Navy fill | 79 | 39.5 | `text-field` white |

Hover: slight brightness shift. Focus-visible: `2px` outline `--color-focus` offset `2px`.

### 6.3 `StatBlock`

Number (`text-stat`) + label (`text-body` uppercase) in 2×2 grid beside hospital image.

Home stats: **10+ Years of Combined Experience · 95% Successful Outcomes · 10K+ Patients Treated · 2 Urban Locations**.

### 6.4 `ServiceCard` / Services section (`202:1028`)

**Layout:** white band; 2-column grid of service cards; each card = image + gradient overlay + title + description + tag chips.

**8 service categories (Figma order):**

| # | Title | Key tags |
|---|-------|----------|
| 1 | Plastic & Cosmetic Surgery | Hair Restoration, Gynecomastia, Botox/Fillers, Laser Hair Removal, Facial Plastic Surgery, Laser Scar Rejuvenation, Breast Cosmetic Surgery |
| 2 | Diabetic Foot Care | Foot Lab, Neurotouch, Plantar Pressure Assessment, Diabetic Foot Pedicure, Orthotics & Prosthetics, Custom Footwear |
| 3 | Varicose Veins Treatment | Laser Therapy, Glue Therapy, Aesthetic Sclerotherapy, Compression Therapy, Thrombosis Clinic |
| 4 | Dialysis Access Services | AV Fistula, AV Graft, Permcath Placement, Fistuloplasty, Central Vein Angioplasty |
| 5 | Advanced Wound Care | Vacuum Therapy, Stem Cell Therapy, Plasma Therapy, HBOT, Velox, Skin Substitutes |
| 6 | Vascular & Endovascular | Vascular Lab, Doppler Scan, Bypass Surgery, Angioplasty & Stenting, Atherectomy, Lithotripsy, IVC Filter, Angiojet, IVUS |
| 7 | Hand Surgery | Brachial Plexus, Congenital Hand Deformity, Post Burn Contractures, Hand Trauma |
| 8 | Cosmetic Gynaecology | Vaginoplasty, Labiaplasty, Clitoroplasty |

**Card structure**

| Part | Spec |
|------|------|
| Image | `817 × 438`, radius `8px` (left col) / `16px` (some cards) |
| Overlay | `157px` gradient bottom, title + description in white |
| Tags | Black border pills, `50px` height, wrap freely |

Grid: `grid-cols-1 lg:grid-cols-2`; gap ≈ `50px` fluid.

### 6.5 `SpecialistCard` / Specialists section (`202:1029`)

**Layout:** 4-column row; stacks to 1 col below `lg`.

| Field | Content |
|-------|---------|
| Photo | `405 × 552`, radius `16px`, gradient overlay at bottom |
| Name | Aeonik 26 white on overlay |
| Specialty | DM Sans 18 white on overlay |
| Qualification | DM Sans 20 |
| Role | DM Sans 20 |
| Registration No. | DM Sans 20 |

**Specialists (lock copy):**

| Name | Specialty | Registration |
|------|-----------|--------------|
| Dr. Viswanath Atreyapurapu | Vascular & Endovascular Surgeon | 74412 |
| Dr. Pinjala Rama Krishna | Vascular & Endovascular Surgeon | 13631 |
| Dr. K.S.M. Manikanth Babu | Plastic, Aesthetic & Reconstructive Surgeon | 74329 |
| Dr. Nikhila Pinjala | Vascular & Endovascular Surgeon | 78858 |

### 6.6 `CtaBand` / Mid-page CTA (`149:620`)

| Spec | Figma @ 1920 | Code |
|------|--------------|------|
| Band | `#394464`, `1680 × 477`, radius `44px` | `bg-navy rounded-[clamp(24px,2.29vw,44px)]` |
| H2 | Aeonik 64 white | `text-h2 text-white` |
| Body | DM Sans 20 white | `text-body text-white` |
| CTAs | White "Talk to our doctor" + outline phone | `Button` variants |

### 6.7 `WhyIkigai` / Value props (`149:550`)

**Layout:** 2 columns — decorative IKIGAI symbol left + 4 value items right.

| # | Title | Icon |
|---|-------|------|
| 1 | Expert-Led Multidisciplinary Care | `medical-assistance-1.png` |
| 2 | Advanced Technology & Clinical Precision | `medical-assistance-2.png` |
| 3 | Comprehensive Care Under One Roof | `medical-assistance-3.png` |
| 4 | Patient-First Approach | `medical-assistance-4.png` |

### 6.8 `SocialMedia` / Video section (`149:941`)

**Layout:** H2 + Instagram CTA + 4 video tiles in a row.

| Spec | Figma @ 1920 |
|------|--------------|
| Tile | `396 × 636`, play icon centered |
| CTA | Navy pill "Follow us on instagram" |

### 6.9 `TestimonialCard` / Patient Stories (`149:942`)

**Layout:** 4 cards in a row; white cards with shadow.

| Field | Spec |
|-------|------|
| Stars | 5-star rating (gold) |
| Name | Aeonik 26 |
| Treatment type | DM Sans 18 muted |
| Quote | DM Sans 18 |

**Patients (lock copy):**

| Name | Treatment | Quote (truncated) |
|------|-----------|-------------------|
| Prasanth Reddy | Vein Laser Treatment | "I underwent vein laser treatment at Ikigai Hospitals…" |
| Sowmya G | Varicose Veins Treatment | "Excellent care for my varicose veins…" |
| Neelima Karri | AVF Surgery | "My AVF surgery was handled with great expertise…" |
| Ravi Katta | Plastic Surgery | "The plastic surgery team at Ikigai is outstanding…" |

### 6.10 `FaqAccordion` / FAQs section (`149:940`)

**Layout:** image left (`799 × 542`) + accordion right.

**Questions (lock copy):**

1. What conditions does Ikigai Hospitals specialise in?
2. Do you provide treatment for diabetic foot problems?
3. What treatments are available for varicose veins?
4. Can I consult a vascular and endovascular surgeon?
5. Do you offer plastic and reconstructive surgery?

First item expanded by default in Figma with full answer text.

### 6.11 `LocationCard` / Locations section (`149:939`)

**Layout:** 2 location cards side by side.

| Location | Address |
|----------|---------|
| Kondapur | Ikigai Hospitals, 4th floor, Prasad Enclave, Masjid Banda Rd, above Starbucks, Masjid Banda, Camelot Layout, Hyderabad, Telangana 500084 |
| Manikonda | Prasad Hospitals, Marrichettu Road, opp. Paradise, Manikonda, Hyderabad, Telangana 500089 |

Each card: map screenshot + location name + full address.

### 6.12 `AppointmentForm` + `Footer`

See **5.2**. Form sits above footer logo row.

### 6.13 `Container` / `SectionHeading`

- `Container` — fluid gutter, max 1920.
- `SectionHeading` — red label (`text-label text-primary uppercase`) + `text-h2` + optional body.

---

## 7. Page section map — Home (`149:329`)

| Order | Section | Approx Y / node | Purpose | Components |
|------:|---------|-----------------|---------|------------|
| 0 | Header | `149:783` y=30 | Global nav + CTAs | `Header` |
| 1 | Hero | `198:125` y=0 | Value prop + team photo | `Hero` |
| 2 | Stats | `149:533` y=1200 | Trust metrics + hospital image | `StatBlock` |
| 3 | Services | `202:1028` y=2249 | 8 service categories | `ServiceCard` |
| 4 | Specialists | `202:1029` y=5362 | 4 doctor profiles | `SpecialistCard` |
| 5 | CTA band | `149:620` y=6684 | Mid-page conversion | `CtaBand` |
| 6 | Why Ikigai | `149:550` y=7281 | Value propositions | `WhyIkigai` |
| 7 | Social media | `149:941` y=8633 | Video gallery + Instagram | `SocialMedia` |
| 8 | Patient stories | `149:942` y=9636 | Testimonials | `TestimonialCard` |
| 9 | FAQs | `149:940` y=10387 | Accordion + image | `FaqAccordion` |
| 10 | Locations | `149:939` y=11296 | Two hospital locations | `LocationCard` |
| 11 | Appointment + Footer | `202:1030` y=12263 | Booking form + legal | `AppointmentForm`, `Footer` |

**Hero copy (lock unless marketing updates)**

- H1: *Expert Care for Complex Vascular, Wound & Surgical Conditions*
- Sub: *Advanced diagnosis, precision treatment and compassionate care led by experienced vascular, endovascular, plastic and reconstructive specialists.*

**Section headings (lock copy)**

- Services: *Advanced Care. One Integrated Approach.*
- Specialists: *Meet the Specialists Behind Your Care*
- CTA: *Get the Right Specialist for Your Condition.*
- Why Ikigai: *Advanced Care Built on Trust, Expertise and Precision.*
- Social: *See Ikigai in Action*
- Testimonials: *Trusted by Patients. Driven by Outcomes.*
- FAQs: *Frequently Asked Questions*
- Locations: *Care, Wherever You Need It*
- Appointment: *Your Health Deserves Specialist Care.*

---

## 8. Responsive strategy

### 8.1 Desktop 15″–24″ (primary goal)

| CSS width | Behavior |
|-----------|----------|
| `1920` | Exact Figma sizes (clamp max) |
| `1440–1919` | Proportional fluid scale via `vw` |
| `1280–1439` | Same composition; still fluid clamps |
| `>1920` | Centered `max-w-[1920px]`; no further growth |

**QA rule:** side-by-side screenshot of 1440 vs 1920 must look like the **same design zoomed**, not a reflowed layout.

### 8.2 Layout breakpoints (structure only)

| Breakpoint | Width | Layout changes only |
|------------|-------|---------------------|
| `xl` | ≥1280 | Full desktop grids (2-col services, 4-col specialists/testimonials) |
| `lg` | ≥1024 | 2-col where needed |
| `md` | ≥768 | Stack service pairs; 2-col testimonials |
| `sm` / base | <768 | Single column; hamburger header; stacked form fields |

Touch targets ≥ `44×44`. Form stacks to one column under `768`.

---

## 9. Suggested project structure

```text
ikagai/
├── public/
│   ├── fonts/                 # Aeonik-Regular.ttf
│   └── images/
│       ├── brand/             # logo-icon, logo-wordmark, ikigai-symbol
│       ├── hero/              # team photo, hospital building
│       ├── services/          # 8 service card images
│       ├── specialists/       # 4 doctor photos
│       ├── social/            # 4 video thumbnails
│       ├── testimonials/      # (optional patient avatars)
│       ├── faq/               # reception desk image
│       ├── locations/         # map screenshots
│       └── icons/             # medical-assistance, social, play, star
├── src/
│   ├── components/
│   │   ├── layout/            # Header, Footer, Container
│   │   ├── ui/                # Button, Tag, Accordion, FormField
│   │   └── sections/          # Hero, Stats, Services, Specialists, …
│   ├── content/
│   │   ├── services.ts
│   │   ├── specialists.ts
│   │   ├── testimonials.ts
│   │   ├── faqs.ts
│   │   └── locations.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── index.css          # @utility fluid type
│   ├── lib/
│   │   └── constants.ts
│   ├── pages/
│   │   └── Home.tsx
│   ├── App.tsx
│   └── main.tsx
├── DEVELOPMENT_GUIDE.md
├── package.json
└── vite.config.ts
```

---

## 10. Development phases

### Phase 0 — Foundations

- [x] Init Vite + React + TypeScript + Tailwind
- [ ] `tokens.css` + fluid `@utility` type scale (**D2**)
- [ ] `Container` with fluid gutter
- [ ] `Button` variants (navy, red, white, outline, tag, submit)
- [ ] Confirm Aeonik font in `public/fonts/` + DM Sans loaded
- [ ] Export logo SVGs + favicon from Figma

### Phase 1 — Global chrome

- [ ] `Header` (desktop fluid) + mobile menu
- [ ] `Footer` + `AppointmentForm`
- [ ] Route shells for Services / Specialists / Contact

### Phase 2 — Home (pixel-critical)

- [ ] Hero (full-bleed team photo + headline)
- [ ] Stats (hospital image + 2×2 metrics)
- [ ] Services grid (8 cards with tags)
- [ ] Specialists (4 profile cards)
- [ ] CTA band
- [ ] Why Ikigai
- [ ] Social media video tiles
- [ ] Patient testimonials
- [ ] FAQ accordion
- [ ] Locations
- [ ] Visual QA at **1920, 1680, 1440, 1366**

### Phase 3 — Inner pages & polish

- [ ] Services / Specialists / Contact detail pages when Figma is ready
- [ ] SEO, a11y, performance
- [ ] Form validation + submission backend
- [ ] Cross-browser QA

---

## 11. Content model (scale later)

```ts
type Service = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  tags: string[];
};

type Specialist = {
  slug: string;
  name: string;
  specialty: string;
  qualification: string;
  role: string;
  registrationNo: string;
  photo: string;
};

type Testimonial = {
  name: string;
  treatment: string;
  quote: string;
  rating: number;
};

type FaqItem = {
  question: string;
  answer: string;
};

type Location = {
  name: string;
  address: string;
  mapImage: string;
};
```

---

## 12. Interaction & motion

| Interaction | Guidance |
|-------------|----------|
| Page load | Soft fade/slide hero text only |
| FAQ accordion | Expand/collapse; one or many open per product decision |
| Buttons | 150ms ease |
| Sticky header | Fixed over hero; maintain contrast on scroll |
| Form | Inline validation on blur; submit loading state |

---

## 13. Accessibility checklist

- [ ] One `h1` per page; logical heading order
- [ ] Meaningful `alt` on all medical/service images
- [ ] Contrast ≥ 4.5:1 for body text (watch muted `rgba(0,0,0,0.4)` on white)
- [ ] Keyboard: nav, CTAs, accordion, form fields
- [ ] Visible focus rings (`--color-focus`)
- [ ] Phone links use `tel:` protocol
- [ ] Form fields have associated `<label>` elements (not just placeholders)
- [ ] Landmarks: `banner`, `main`, `contentinfo`, `nav`

---

## 14. SEO & performance

| Topic | Standard |
|-------|----------|
| Title | `IKIGAI Hospitals — Expert Vascular & Surgical Care` |
| Meta description | Unique per page, ~150–160 chars |
| Images | WebP/AVIF; reserve aspect ratios; lazy-load below fold |
| LCP | Hero image + H1; `font-display: swap` |
| CLS | No late font-size jumps; clamp from first paint |
| Fonts | Subset Aeonik if possible; DM Sans from Google Fonts |

---

## 15. Visual QA process

For every completed section:

1. Figma Dev Mode beside browser at **1920**.
2. Check gutter `120`, type maxima, button `56`, navy `#394464`, red `#D31C1C`.
3. Retest at **1680, 1440, 1366** — composition must stay identical (scaled).
4. Spot-check **1024** and **390** for layout collapse only.
5. Mark done when spacing/type/assets are within ~2–4px at 1920 and proportionally correct at 1440.

**Tolerances**

- Spacing @ 1920: ±4px
- Type @ 1920: exact clamp max
- 15″–24″: proportional match, not a different layout
- Color: exact brand values

**Acceptance for the main objective**

> A stakeholder viewing the site on a 15″ laptop and a 24″ monitor should recognize the **same** homepage — only scale changes, not structure, hierarchy, or density.

---

## 16. Definition of done (per page)

- [ ] Matches `Landing page 1` structure and copy
- [ ] Fluid type + spacing used; no fixed desktop-only px for the 1280–1920 band
- [ ] Header + Footer shared
- [ ] Responsive layout breakpoints applied
- [ ] Images optimized with aspect ratios
- [ ] A11y + basic SEO meta
- [ ] QA at 1920 **and** 1440 / 1366 signed off

---

## 17. Quick reference — do / don't

| Do | Don't |
|----|-------|
| Build from `Landing page 1` (`149:329`) | Build from other frames |
| Use `clamp(min, N/19.2vw, Npx)` for all desktop sizes | Use `md:` / `2xl:` to change font sizes |
| Cap layout at `max-w-[1920px]` | Stretch the design past 1920 |
| Reuse `Button` / `Container` / type utilities | One-off absolute Figma exports |
| Keep 15″ and 24″ composition identical | Redesign density per laptop size |
| Self-host licensed Aeonik | Ship unlicensed / trial fonts |
| Export assets from Figma at 2× | Use temporary MCP asset URLs in production |

---

## 18. Figma connection reference

| Item | Value |
|------|--------|
| File | [IKIGAI-Hospital](https://www.figma.com/design/m3dXaMzxHZ30R7V3YraIPl/IKIGAI-Hospital) |
| File key | `m3dXaMzxHZ30R7V3YraIPl` |
| Canonical node | `149:329` (Landing page 1) |
| MCP status | Connected (authenticated) |
| Code Connect | Not available (Pro plan) |
| Figma variables | None defined on frame |

---

## 19. Change log

| Date | Change |
|------|--------|
| 2026-09-02 | Initial IKIGAI Hospital guide from Figma `Landing page 1` (`149:329`); fluid 15″–24″ rules adapted from Theories Consulting development guide |

---

*Questions on ambiguous Figma values: verify in Dev Mode on node `149:329`, then update this guide so engineering and design stay aligned.*
