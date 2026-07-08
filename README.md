# Kavaroc — عازل ذكي للباب

Modern, mobile-first, RTL landing page for Kavaroc with WhatsApp-based order flow.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## 📦 Build

```bash
npm run build       # production bundle in /dist
npm run preview     # preview the production build
```

## 💬 How Orders Work

When a customer submits the order form, **two things happen automatically**:

1. **WhatsApp opens automatically** with a pre-filled, beautifully formatted message containing all the order details (name, phone, city, address, quantity, total). The customer just presses "Send" and the order arrives in your WhatsApp at `0771541962`.

2. **The order is saved to your browser's local storage** as a backup. You can view, export (CSV), or delete all stored orders via the small 🛍️ icon at the bottom-right of the page.

**That's it — no setup, no servers, no third-party services.** Everything works out of the box.

## 📊 Local Orders Dashboard

Click the small **🛍️ bag icon** at the bottom-right of the page to:
- View all orders received through this device
- **Export to CSV** (one click, ready for Excel / Google Sheets)
- Delete stored orders

> ℹ️ Orders are stored per-browser. If you want a shared view across all devices, consider enabling Google Sheets later (instructions below).

## 🖼️ Media Manager (Upload Your Own Images)

You can upload your product images, logo, and video directly from the page — no need to edit code.

**How to access:**
1. Click the **🔒 lock icon** (bottom-right corner)
2. Enter password: **`kavarocIn@123`**
3. Click the **🖼️ Images** button
4. Upload files into any slot (drag-drop or click)

**Available slots:**
| Slot | Used in |
|---|---|
| Logo (SVG) | Header + Footer |
| Hero main image | Hero section + Order form summary |
| Hero video | Hero section (under product image) |
| Gallery 1-4 | Product gallery |
| Solution result | "كيفاش كيخدم" section |
| How it works | "كيفاش كيخدم" section |
| Washable | "قابل للغسل" section |

All files are stored in **IndexedDB** (your browser, no server). Customers never see the upload UI — it's behind the admin password.

## ✏️ Customization

| What to change | File |
|---|---|
| Phone number, price, brand name | `src/data/content.js` |
| Cities dropdown | `src/data/content.js` → `cities` array |
| Reviews | `src/data/content.js` → `reviews` array |
| Colors | `tailwind.config.js` (look for `brand` and `ink`) |
| WhatsApp message format | `src/components/OrderForm.jsx` → `buildWhatsAppLink()` |
| Admin password | `src/lib/adminGate.js` → `DEFAULT_PASSWORD` (or change it after first login) |

## 🔐 Privacy Policy

A comprehensive **Moroccan-compliant** privacy policy is built into the site:
- Open via the **"سياسة الخصوصية"** link in the footer
- Covers all aspects: data collection, storage, sharing, user rights
- Aligned with **Moroccan Law 09-08** and **CNDP** guidelines
- Customers can print it for their records
- Edit content in `src/components/PrivacyPolicy.jsx` (sections array)

## 🔐 Admin Mode (Hidden from Customers)

The **media manager** and **orders dashboard** are hidden from regular visitors. Only you can access them:

1. Look at the **very bottom-right** corner of the page — there's a small grey 🔒 lock icon
2. Click it → enter the password: **`kavarocIn@123`**
3. Once unlocked, the 🛍️ Orders and 🖼️ Media buttons appear
4. Click the green 🔓 unlock icon to lock again

**To change the default password:**
1. Unlock once with `kavarocIn@123`
2. In the password modal, click "تغيير كلمة السر"
3. Enter a new password (min 4 chars)
4. It's saved in your browser's `localStorage` so it persists

**In production:** Customers only see a tiny lock icon at `bottom-2 right-2` that does nothing for them. The Orders and Media buttons are completely hidden unless the admin is unlocked in that browser session.

## 📁 Project Structure

```
src/
├── App.jsx                    # Page assembly
├── main.jsx                   # Entry point
├── index.css                  # Tailwind + RTL + custom theme
├── components/
│   ├── Header.jsx             # Sticky nav + mobile menu
│   ├── Hero.jsx               # Headline, badges, price, CTA, video
│   ├── TrustBadges.jsx
│   ├── CountdownTimer.jsx     # Live promo countdown
│   ├── Problem.jsx            # 3 illustrated problems
│   ├── Solution.jsx           # Before/After slider
│   ├── Benefits.jsx           # 6 feature cards
│   ├── HowItWorks.jsx         # 3-step flow
│   ├── ProductGallery.jsx     # Gallery + zoom modal
│   ├── Reviews.jsx            # 6 testimonials
│   ├── FAQ.jsx                # Accordion
│   ├── CODBanner.jsx          # COD/Promo
│   ├── OrderForm.jsx          # Form + WhatsApp redirect
│   ├── AdminOrders.jsx        # Local orders viewer + CSV export
│   ├── Footer.jsx
│   ├── StickyOrderButton.jsx  # Mobile sticky CTA
│   ├── WhatsAppButton.jsx     # Floating chat
│   └── PromoBanner.jsx        # Exit-intent popup
├── data/content.js            # All Darija content + 45 cities
└── illustrations/             # Custom SVG product visuals
```

## 🌐 Deploy

The site is a static SPA. Deploy to:
- **Vercel** — `vercel deploy`
- **Netlify** — drag `/dist` to their dashboard
- **Cloudflare Pages** — connect your git repo

No environment variables needed for the default WhatsApp-only setup.

## 🔮 Future: Adding Google Sheets (Optional)

If you later want a shared dashboard across all your devices/employees, you can add Google Sheets integration. The webhook code is provided in the git history — just say the word and I'll wire it back up.

---

Built with React + Vite + Tailwind + Framer Motion. © Kavaroc.
