# Tech Blog Website – Frontend Technical Assessment

A fast, SEO-optimized tech blog website built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.  
This project focuses on performance, accessibility, and modern SEO best practices.

---

## 🔗 Live Deployment
👉 [https://tech-blog-five-theta.vercel.app](https://tech-blog-five-theta.vercel.app)

## 📂 GitHub Repository
👉 [https://github.com/ArnabChakraborty123/TechBlog](https://github.com/ArnabChakraborty123/TechBlog)

---

## 📌 Project Overview
This application displays a list of tech blog articles fetched from a public API.  
Users can search articles, filter them by category, and read full content inside an accessible modal.  

**Core Focus Areas:**
- Performance
- SEO
- Accessibility
- Responsive design
- Modern frontend best practices

---

## 🚀 Features
- SEO-optimized homepage
- Article grid displaying **exactly 10 blog posts**
- Search functionality across:
  - Title
  - Description
  - Content
- Category-based filtering
- Combined search + category filtering
- Accessible article modal
- Responsive layout for all screen sizes
- Loading and error state handling
- Keyboard navigation support

---

## 🛠️ Technologies Used
- **Next.js** (Latest version with App Router)
- **TypeScript**
- **Tailwind CSS**
- **Git & GitHub**
- **Vercel** (Deployment)

---

## 📡 API Integration
Blog data is fetched from:  
> *(Add your API endpoint here)*

---

## 📸 Lighthouse Audit Results

<details>
<summary><strong>Click to expand full Lighthouse report</strong></summary>

### Desktop Performance Scores
![Lighthouse Overview](https://github.com/user-attachments/assets/90869239-e3dd-448e-bc85-64c9815fb187)

| Category | Score | Status |
|----------|-------|--------|
| Performance | **100** 🟢 | Perfect |
| Accessibility | **92** 🟢 | Excellent |
| Best Practices | **100** 🟢 | Perfect |
| SEO | **100** 🟢 | Perfect |

---

### Detailed Category Reports

<details>
<summary><strong>Performance: 100/100 ✅</strong></summary>

![Performance Screenshot](https://github.com/user-attachments/assets/494a40f6-64eb-4326-a4ec-08ac00c8af8f)

**Core Web Vitals:**
- First Contentful Paint: 0.3s
- Largest Contentful Paint: 0.6s  
- Total Blocking Time: 10ms
- Cumulative Layout Shift: 0 (Perfect!)
- Speed Index: 0.6s

All metrics in the green zone!
</details>

<details>
<summary><strong>Accessibility: 92/100 ✅</strong></summary>

![Accessibility Screenshot](https://github.com/user-attachments/assets/16253618-72ea-4d0d-81a6-eb5db5aeed58)

**What's Working:**
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper heading hierarchy

**Minor Issues:**
- Some color contrast ratios in dark mode
- Few links need better aria-labels

Score exceeds the 85+ target requirement!
</details>

<details>
<summary><strong>Best Practices: 100/100 ✅</strong></summary>

![Best Practices Screenshot](https://github.com/user-attachments/assets/1ba9cb88-20d3-4f34-973a-cfeaf7050510)

**Security & Standards:**
- ✅ Effective CSP against XSS attacks
- ✅ Proper origin isolation (COOP)
- ✅ Clickjacking mitigation
- ✅ No browser errors
- ✅ All modern web standards followed

Perfect implementation!
</details>

<details>
<summary><strong>SEO: 100/100 ✅</strong></summary>

![SEO Screenshot](https://github.com/user-attachments/assets/d2858919-09d9-4104-a69d-8137263f687e)

**Optimizations:**
- ✅ Valid structured data (JSON-LD)
- ✅ Meta descriptions optimized
- ✅ Open Graph tags implemented
- ✅ All images have alt text
- ✅ robots.txt configured
- ✅ Sitemap.xml generated
- ✅ Mobile-friendly design

Perfect search engine optimization!
</details>

---

### Summary

**All target requirements exceeded!** 🎉

- ✅ Performance: 100/100 (Target: 90+) - **+10 over target**
- ✅ Accessibility: 92/100 (Target: 85+) - **+7 over target**
- ✅ Best Practices: 100/100 (Target: 90+) - **+10 over target**
- ✅ SEO: 100/100 (Target: 95+) - **+5 over target**

**Tested on:** [https://tech-blog-five-theta.vercel.app](https://tech-blog-five-theta.vercel.app)  
**Date:** January 29, 2026  
**Tool:** Chrome Lighthouse (DevTools)

</details>
