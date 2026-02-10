# Professional Portfolio - Zhamelleden Nuradil

Welcome to the source code of my personal portfolio website. This project is a high-performance, mobile-first web application designed to showcase engineering projects, leadership experience, and achievements with a premium, futuristic aesthetic.

## 🚀 Key Features

### 1. **Smart Navigation & Header**
- **Sticky Header**: The header automatically hides when scrolling down to focus on content and reappears instantly when scrolling up.
- **Mobile Drawer**: A custom-built, off-canvas hamburger menu providing easy thumb access on mobile devices.
- **Active State**: Navigation links automatically highlight based on the current section (ScrollSpy).

### 2. **Immersive UI & Animations**
- **Particle Background**: A lightweight, CSS-driven particle system that creates a floating, organic back-drop without heavy JavaScript or Canvas.
- **Glassmorphism**: Extensive use of `backdrop-filter: blur()` for a modern, frosted glass look on cards and navigation.
- **Scroll Reveals**: Elements fade in and lift up smoothly as they enter the viewport using `IntersectionObserver`.

### 3. **Bilingual Support (EN / RU)**
- **Instant Switching**: Toggle between English and Russian instantly without page reloads.
- **Persistence**: Language preference is saved in `localStorage` and remembered on next visit.

### 4. **Performance & Accessibility**
- **Lighthouse Optimized**: 90+ Score target.
- **Optimized Assets**: Images use `loading="lazy"` (except LCP) and explicit dimensions to prevent layout shifts.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` settings.
- **Semantic HTML**: Fully accessible structure with ARIA labels for icon-only buttons.

### 5. **PDF Certificate Integration**
- **Preview & Download**: Gallery items for certificates include a direct PDF preview link and a dedicated download button.

---

## 📂 Project Structure

```
/
├── index.html          # Main entry point (Semantic HTML5)
├── css/
│   └── style.css       # All styles (Variables, Flexbox/Grid, Animations, Responsive)
├── js/
│   └── script.js       # Core logic (Lang switch, ScrollSpy, Particles, Mobile Nav)
└── assets/
    ├── images/         # Profile photos and project thumbnails
    └── certificates/   # PDF certificates and award scans
```

---

## 🛠️ Setup & Deployment

### **Option 1: GitHub Pages (Recommended)**
1.  Upload this repository to GitHub.
2.  Go to **Settings** > **Pages**.
3.  Select **Source**: `main` branch, `/` root folder.
4.  Click **Save**. Your site will be live in minutes!

### **Option 2: Vercel**
1.  Import your GitHub repository into Vercel.
2.  Framework Preset: **Other** (Static).
3.  Click **Deploy**.

### **Option 3: Local Development**
1.  Open the project folder in VS Code.
2.  Use "Live Server" extension to run `index.html`.
    *Or run python server:* `python -m http.server 8000`

---

## 🎨 Customization Guide

### **Changing Images**
Replace files in `assets/images/`. Ensure you update the filenames in `index.html` if they differ.

### **Adding New Certificates**
1.  Place the PDF or JPG in `assets/certificates/`.
2.  Copy a `.gallery-item` block in `index.html`.
3.  Update the `href` (for PDF) or `src` (for Image) and the text captions.

### **Updating Text**
All text is directly in `index.html`. Look for `data-lang="en"` and `data-lang="ru"` spans to update content for both languages.

---

*Verified Production Ready: February 2026*
