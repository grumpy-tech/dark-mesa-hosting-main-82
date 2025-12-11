// Comprehensive Structured Data for Dark Mesa Hosting
// Use these in different pages as needed

// Organization Schema - Use on Homepage
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dark Mesa Hosting",
  "legalName": "Dark Mesa Hosting",
  "url": "https://darkmesahosting.com",
  "logo": "https://darkmesahosting.com/logo.png",
  "description": "Affordable website building and hosting services for small businesses and startups. Professional web design starting at $249 with hosting from $39/month.",
  "email": "info@darkmesahosting.com",
  "telephone": "+1-234-567-8900",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CA",
    "addressLocality": "Remote & Global"
  },
  "sameAs": [
    "https://facebook.com/darkmesahosting",
    "https://twitter.com/darkmesahosting",
    "https://linkedin.com/company/darkmesahosting"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// LocalBusiness Schema - Use on Homepage and Contact
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dark Mesa Hosting",
  "image": "https://darkmesahosting.com/logo.png",
  "description": "Affordable website building and hosting services for small businesses and startups. Professional web design starting at $249.",
  "url": "https://darkmesahosting.com",
  "telephone": "+1-234-567-8900",
  "email": "info@darkmesahosting.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "0",
    "longitude": "0"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
};

// Service Schema - Use on Website Building and Hosting pages
export const websiteBuildingService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Website Design and Development",
  "provider": {
    "@type": "Organization",
    "name": "Dark Mesa Hosting",
    "url": "https://darkmesahosting.com"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Website Building Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Starter Website Package",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Starter Website Package",
              "description": "Template-based website design with 3 pages, mobile-responsive, SSL certificate, and basic SEO"
            },
            "price": "349",
            "priceCurrency": "USD"
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Business Website Package",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Business Website Package",
              "description": "Custom-branded website with 6 pages, enhanced SEO, Google Analytics, and priority support"
            },
            "price": "599",
            "priceCurrency": "USD"
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Pro Website Package",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pro Website Package",
              "description": "Fully custom website with 9 pages, full local SEO, blog/store capability, and same-day support"
            },
            "price": "999",
            "priceCurrency": "USD"
          }
        ]
      }
    ]
  }
};

export const hostingService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Hosting",
  "provider": {
    "@type": "Organization",
    "name": "Dark Mesa Hosting",
    "url": "https://darkmesahosting.com"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter Hosting Plan",
      "description": "Basic hosting with SSL, monthly backups, 99.9% uptime guarantee",
      "price": "39",
      "priceCurrency": "USD",
      "billingDuration": "P1M"
    },
    {
      "@type": "Offer",
      "name": "Business Hosting Plan",
      "description": "Professional hosting with priority support, bi-weekly backups, 99.99% uptime",
      "price": "69",
      "priceCurrency": "USD",
      "billingDuration": "P1M"
    },
    {
      "@type": "Offer",
      "name": "Pro Hosting Plan",
      "description": "Premium hosting with same-day support, daily backups, 99.99% uptime",
      "price": "99",
      "priceCurrency": "USD",
      "billingDuration": "P1M"
    }
  ]
};

// Product Schema for Pricing Page
export const pricingProducts = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Starter Package",
      "description": "Website building and hosting for small businesses starting out",
      "offers": {
        "@type": "Offer",
        "price": "39",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Business Package",
      "description": "Professional website with custom branding and enhanced features",
      "offers": {
        "@type": "Offer",
        "price": "69",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "position": 3,
      "name": "Pro Package",
      "description": "Premium website solution with full customization and priority support",
      "offers": {
        "@type": "Offer",
        "price": "99",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
};

// BreadcrumbList Schema - Dynamic for each page
export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
