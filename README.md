# **Contentstack Launch — Next.js Hello World**

Experience the speed of composable architecture at the edge. This project serves as a premium, high-performance "Hello World" demonstration for **Contentstack Launch**.

## **What is Contentstack?**

[Contentstack](https://www.contentstack.com) is the leading Composable CMS, designed to help organizations deliver digital experiences at the speed of thought. We empower developers with the freedom to use the tools they love while giving content managers the power to iterate without friction.

## **What is Launch?**

**Launch** is Contentstack’s enterprise-grade frontend hosting solution. It is built to seamlessly deploy, manage, and scale your Next.js applications directly from your source code. With global edge delivery and deep integration into the Contentstack ecosystem, Launch is the final piece of the composable puzzle.

* [**Explore Launch Documentation**](https://www.contentstack.com/docs/developers/launch)  
* [**View Launch API Reference**](https://www.contentstack.com/docs/developers/apis/launch-api)

## **Developer Setup**

### **Prerequisites**

Ensure you have Node.js 18+ installed.

npm install  
cp .env.example .env.local  
# Set NEXT_PUBLIC_SITE_URL to your public URL (see SEO below)
# Set the CONTENTSTACK_* values when using the My Stack connection check

The Contentstack variables are server-only and must be configured in the environment
where the Next.js server runs. After adding or changing them locally, restart `npm run dev`.
For Launch or another host, add them to the deployment environment and redeploy the app;
changing variables in the hosting dashboard does not update an already-running deployment.

### **Development**

Launch a local development server:

npm run dev

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view your stack.

### **Production Build**

To prepare the application for a production environment:

npm run build  
npm start

*Note: For static exports, add output: 'export' to next.config.ts. Note that dynamic OG images require a server-side runtime.*

## **Performance & Optimization**

Designed with a "Brooklyn Studio" aesthetic and an obsessed focus on PageSpeed:

* **Zero Render-Blocking Icons:** The hero rocket is an inline SVG, eliminating the need for heavy external font files.  
* **Optimized Typography:** Uses the Inter variable font via next/font for minimal layout shift (CLS).  
* **Edge-Ready Motion:** All animations (floating rocket, space-time warp) are compositor-friendly, utilizing only transform and opacity for 60fps performance on mobile.  
* **Critical CSS:** Leverages experimental.inlineCss to remove render-blocking CSS requests.

## **SEO & Social Unfurls**

The app is pre-configured for perfect social sharing:

1. **Metadata Base:** Set NEXT\_PUBLIC\_SITE\_URL to drive canonical URLs and absolute image paths.  
2. **Dynamic Preview Cards:** Branded 1200×630 OG and Twitter images are generated automatically.  
3. **Structured Data:** Includes JSON-LD for **WebSite**, **WebPage**, and **SoftwareApplication** to maximize search engine visibility.

*Made with* 💜 *by the Contentstack tribe.*
