## Project Structure

```
altimacrm-nextjs/
├── app/
│   ├── layout.tsx          # Root layout: GTM, fonts, metadata
│   ├── page.tsx            # Main landing page (assembles all sections)
│   ├── thank-you/
│   │   └── page.tsx        # Post-form-submission thank-you page
│   └── api/
│       └── submit/
│           └── route.ts    # Form submission API route
├── components/
│   ├── Header.tsx          # Logo header with background image
│   ├── BannerSection.tsx   # Hero section with headline + banner image
│   ├── Section1.tsx        # Form (left) + Infrastructure copy (right)
│   ├── Section2.tsx        # Built not improvised — text + image
│   ├── Section3.tsx        # Real Brokerage Ecosystems — centered text
│   ├── Section4.tsx        # Strategic infrastructure — text + image
│   ├── FAQ.tsx             # Accordion FAQ (client component)
│   ├── Section5.tsx        # Launch CTA + second demo form
│   ├── Footer.tsx          # Full footer with nav, socials, floating CTA
│   ├── DemoForm.tsx        # *** REUSABLE *** demo form with intl-tel-input + validation
│   ├── SuccessModal.tsx    # Thank-you modal
│   ├── ClientInit.tsx      # Client-side: WOW.js init + session tracking
│   └── GTMScript.tsx       # Google Tag Manager head/noscript snippets
├── lib/
│   └── tracking.ts         # UTM capture, session intelligence, form tracking helpers
├── styles/
│   └── globals.css         # All styles (converted from original style.css + inline)
├── public/
│   ├── images/             # All webp/svg/png assets from original site
│   └── fonts/              # Inter font files
├── .env.local.example      # Environment variable template
├── next.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Copy font files

Copy the original font files into `public/fonts/`:
- `Inter_18ptRegular.woff2`
- `Inter_18ptRegular.woff`
- `Inter_18ptRegular.ttf`
- `Inter_18ptRegular.eot`

### 3. Configure environment variables



### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

---

## Key Components

### `DemoForm` (Reusable)
Used in both Section 1 and Section 5. Accepts props:
- `formId` — unique HTML form id
- `phoneInputId` — id for the phone input (intl-tel-input target)
- `countryCodeInputId` — id for the hidden country code input
- `namePrefix` — `''` for the first form, `'new'` for the second form

### `FAQ`
Client component with accordion state. FAQ items are defined as a data array — easy to update.

### `ClientInit`
Mounts once on the client to:
- Capture UTM params to localStorage
- Initialize session intelligence (visit count, scroll depth, etc.)
- Load and init WOW.js for scroll animations

### `lib/tracking.ts`
Pure utility functions for building tracking payloads that are injected into form submissions. Mirrors the original `main.js` and `submit.js` logic.

---

## Form Submission Flow

1. User fills out `DemoForm`
2. Client-side validation runs (name, email, phone, message)
3. Cloudflare Turnstile token is verified
4. Tracking fields are injected (UTMs, device, scroll depth, etc.)
5. `POST /api/submit` is called
6. Server verifies Turnstile token (if `TURNSTILE_SECRET_KEY` is set)
7. Payload is forwarded to your CRM webhook (`CRM_WEBHOOK_URL`)
8. User is redirected to `/thank-you/?success=1`
