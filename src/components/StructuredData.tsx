export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mesa Hosting",
    description: "Professional website building and hosting services",
    url: "https://darkmesa.com",
    telephone: "+1-234-567-8900",
    email: "hello@darkmesa.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "Global",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
    sameAs: [
      "https://facebook.com/darkmesa",
      "https://linkedin.com/company/darkmesa",
      "https://twitter.com/darkmesa",
      "https://instagram.com/darkmesa",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Basic One-Pager Website",
        price: "249",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Basic Hosting",
        price: "12",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "12",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
