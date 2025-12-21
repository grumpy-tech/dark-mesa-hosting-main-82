// FAQ Page Structured Data for SEO
// This helps Google show your FAQ in rich snippets

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Dark Mesa Hosting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dark Mesa Hosting provides affordable, all-in-one website solutions for small businesses. We handle design, hosting, maintenance, and support in one simple monthly package starting at $39/month. Pay 12 months upfront and get your website built completely free."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard turnaround is 5-14 business days depending on your plan. Starter sites take 5-7 days, Business sites 7-10 days, and Pro sites 10-14 days. Rush delivery is available for an additional fee if you need it faster."
      }
    },
    {
      "@type": "Question",
      "name": "What plans do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer three plans: Starter ($39/mo, 3 pages, $349 build), Business ($69/mo, 6 pages, $599 build), and Pro ($99/mo, 9 pages, $999 build). All plans include hosting, SSL, backups, and support."
      }
    },
    {
      "@type": "Question",
      "name": "What's the 'prepay 12 months = FREE build' offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you pay for 12 months of hosting upfront (annual plan), we build your website completely free! This saves you $349-$999 depending on your plan. For example, Business plan: pay $828/year and get a $599 website build free."
      }
    },
    {
      "@type": "Question",
      "name": "Can I upgrade or downgrade my plan later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You can upgrade anytime (we'll prorate the difference). Downgrades take effect at your next billing cycle. We'll help you migrate smoothly."
      }
    },
    {
      "@type": "Question",
      "name": "What information do you need from me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We'll need your business name, industry, services/products, company overview, contact info, and any specific requirements. We also ask about existing branding (logo, colors), photos you want to use, and examples of websites you like."
      }
    },
    {
      "@type": "Question",
      "name": "Will my website work on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! All our websites are mobile-first and fully responsive. They look perfect and function flawlessly on phones, tablets, and desktops."
      }
    },
    {
      "@type": "Question",
      "name": "What does your hosting include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All plans include: SSL certificates, regular backups, uptime guarantee (99.9% Starter, 99.99% Business/Pro), security monitoring, 24/7 site monitoring, and support. Everything you need to stay online and secure."
      }
    },
    {
      "@type": "Question",
      "name": "What SEO is included in each plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starter includes basic SEO (meta tags, mobile optimization, clean code). Business includes enhanced SEO with schema markup and local signals. Pro includes full local SEO pack with advanced optimization for maximum visibility."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Monthly plans can be cancelled anytime. Annual plans: since you paid upfront, you keep service for the full 12 months. No refunds on annual plans, but you own everything and can take it with you."
      }
    }
  ]
};
