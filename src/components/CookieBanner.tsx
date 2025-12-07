import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const GA_ID = "G-XXXXXXXXXX"; // Replace with your actual GA ID

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "accepted") {
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (document.getElementById("ga-script")) return;

    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", GA_ID);
    };
  };

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
    loadGoogleAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-lg p-4 md:p-6 pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            We use cookies and analytics to improve website performance and measure traffic. You can accept or reject analytics cookies at any time.
          </p>
          <div className="flex gap-3 shrink-0">
            <Button variant="outline" onClick={handleReject}>
              Reject
            </Button>
            <Button onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
