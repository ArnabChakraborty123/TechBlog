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
> *(slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10)*

---

## 📸 Lighthouse Audit Results

<details>
<summary><strong>Click to expand full Lighthouse report</strong></summary>

### Desktop Performance Scores

<img src="https://github.com/user-attachments/assets/7abb2987-aea8-47c7-96ca-ec5062285157" width="600" alt="Desktop Performance Screenshot" />


| Category | Score | Status |
|----------|-------|--------|
| Performance | **100** 🟢 | Perfect |
| Accessibility | **96** 🟢 | Excellent |
| Best Practices | **100** 🟢 | Perfect |
| SEO | **100** 🟢 | Perfect |

---

### Detailed Category Reports

<details>
<summary><strong>Performance: 100/100 ✅</strong></summary>

<img  src="https://github.com/user-attachments/assets/e527172c-4122-45b2-b031-51e3c89a9e19"  width="600" alt="Performance Screenshot" />


**Core Web Vitals:**
- First Contentful Paint: 0.3s
- Largest Contentful Paint: 0.6s  
- Total Blocking Time: 10ms
- Cumulative Layout Shift: 0 (Perfect!)
- Speed Index: 0.6s

All metrics in the green zone!
</details>

<details>
<summary><strong>Accessibility: 96/100 ✅</strong></summary>

<img  src="https://github.com/user-attachments/assets/9144cbb9-279c-4d3f-82b9-1c08121b256c" width="600" alt="Accessibility Screenshot" />


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

<img src="https://github.com/user-attachments/assets/debfe8da-fcce-4ab4-a079-5b0b616fff11" width="600" alt="Best Practices Screenshot" />

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

<img src="https://github.com/user-attachments/assets/a6ddeb84-91c1-4829-9468-db8da55d21b5" width="600" alt="SEO Screenshot"/>


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
- ✅ Accessibility: 96/100 (Target: 85+) - **+7 over target**
- ✅ Best Practices: 100/100 (Target: 90+) - **+10 over target**
- ✅ SEO: 100/100 (Target: 95+) - **+5 over target**

**Tested on:** [https://tech-blog-five-theta.vercel.app](https://tech-blog-five-theta.vercel.app)  
**Date:** January 29, 2026  
**Tool:** Chrome Lighthouse (DevTools)

</details>
