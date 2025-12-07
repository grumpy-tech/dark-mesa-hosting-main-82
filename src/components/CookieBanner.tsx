import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

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
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg p-5">
        <div className="flex justify-center mb-4">
          <Cookie className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Your privacy</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We use cookies and analytics to improve website performance and measure traffic. You can accept or reject analytics cookies at any time.
        </p>
        <div className="flex gap-3">
          <Button onClick={handleAccept} className="flex-1">
            Accept
          </Button>
          <Button variant="outline" onClick={handleReject} className="flex-1">
            Reject
          </Button>
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
