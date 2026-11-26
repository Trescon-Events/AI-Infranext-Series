# AI InfraNext — Series Hub

> **Standing Technical & Editorial Guardrails**
> Refer to `BUILD-SPEC.html` for complete architecture and functional specification.

## Project Summary
- **Live Domain:** https://aiinfranext.com/ (and www.aiinfranext.com)
- **Repository:** Trescon-Events/aiinfranext-series (branch `main`)
- **Hosting:** Cloudflare Pages project `aiinfranext-series` + Cloudflare Worker router `aiinfranext-router`
- **Stack:** Hand-crafted static HTML5, Bootstrap 4 grid, custom CSS variables, vanilla ES6 JS (zero runtime framework overhead)

---

## Mandatory Brand & Editorial Guardrails

1. **Brand Name:** Always write **AI InfraNext** (closed-up compound, capital `N`).
   - ❌ Never write `AI Infranext`, `AI Infra Next`, or `AI INFRANEXT` in copy.
   - ❌ Never abbreviate to `AIN`, `AIIN`, or `InfraNext` alone.
   - ❌ Never place "the" before AI InfraNext (e.g. say "AI InfraNext brings together...", not "The AI InfraNext...").
   - Use UK English spellings and sentence case throughout.

2. **Core Verbal Brand Assets (Must Remain Distinct):**
   - **Series Descriptor:** *"The infrastructure beneath enterprise AI"*
   - **Commercial Proposition:** *"Where AI infrastructure meets enterprise demand"*
   - **Regional Brand Line:** *"[Market]'s AI build, decided here"*
   - **Series Thesis:** *"From announced to operational"*
   - ❌ Never blend these distinct verbal assets into one sentence.

3. **Two-Door Attendance Model:**
   - ❌ **NEVER** use the phrase *"By invitation only"* anywhere on the site.
   - *"By invitation"* must always travel with the qualified audience it applies to (senior enterprise, public-sector, and selected infrastructure-capital delegates classified by mandate).
   - Commercial delegates, technology vendors, and consultants enter via the Business Pass.

4. **World AI Show Lineage Rule:**
   - ❌ Never describe AI InfraNext as a track, stream, or spin-off of World AI Show.
   - World AI Show credentials (48 editions, 4 continents, 42,000+ C-level executives) appear strictly in Section 09 as Trescon's organisational track record.

5. **Sovereignty Guardrail:**
   - Sovereignty is an agenda theme (Pillar 3), never the series identity or headline posture.
   - Frame markets as domestic enterprise and national capability building trusted infrastructure *together with* the global technology ecosystem.

6. **Capacity & Commercial Confidentiality:**
   - Every infrastructure capacity figure displayed on edition cards must carry an explicit status label (*operational, secured, contracted, announced, planned, targeted*) and plain-text source (never a hyperlink).
   - ❌ Never display sponsorship pricing on the website.
   - ❌ Never list prospective sponsors before contracts are signed.

7. **Consent Qualifier:**
   - Any mention of delegate lists or profiles in sponsorship copy must explicitly include the consent qualifier.

---

## Architecture & Hosting Rules
- The root project `aiinfranext-series` serves the global series hub (`/`), `/assets/*`, and `/insights/*`.
- Regional edition microsites (`/indonesia/*`, `/malaysia/*`, `/singapore/*`, `/uae/*`) are routed via Cloudflare Worker to dedicated edition Pages projects.
- **NEVER** embed edition-specific registration forms (Konfhub) on the series root.
- The Series Enquiry section uses HubSpot embed v2 (Portal `2953901`).
- Only **LinkedIn** is featured as an official social channel (`linkedin.com/showcase/ai-infranext`).
