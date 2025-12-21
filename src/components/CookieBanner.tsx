import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const GA_ID = "G-C71J58WMC9";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    console.log("🍪 CookieBanner: Component mounted");
    const consent = localStorage.getItem("cookie_consent");
    console.log("🍪 CookieBanner: Current consent status:", consent);
    
    if (!consent) {
      console.log("🍪 CookieBanner: No consent found, showing banner");
      setShowBanner(true);
    } else if (consent === "accepted") {
      console.log("🍪 CookieBanner: Consent accepted, loading GA");
      loadGoogleAnalytics();
    } else {
      console.log("🍪 CookieBanner: Consent rejected, not loading GA");
    }
  }, []);

  const loadGoogleAnalytics = () => {
    console.log("📊 GA: Starting to load Google Analytics...");
    
    if (document.getElementById("ga-script")) {
      console.log("📊 GA: Script already loaded, skipping");
      return;
    }

    // Initialize dataLayer FIRST (before script loads)
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function GLOBALLY on window
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    console.log("📊 GA: Initializing gtag");
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    // Now load the script
    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    
    console.log("📊 GA: Script src:", script.src);
    
    script.onerror = (error) => {
      console.error("📊 GA: Failed to load script:", error);
    };
    
    script.onload = () => {
      console.log("📊 GA: Script loaded successfully!");
      console.log("📊 GA: dataLayer:", window.dataLayer);
    };
    
    document.head.appendChild(script);
    console.log("📊 GA: Script appended to document head");
  };

  const handleAccept = () => {
    console.log("✅ User clicked Accept");
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
    loadGoogleAnalytics();
  };

  const handleReject = () => {
    console.log("❌ User clicked Reject");
    localStorage.setItem("cookie_consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

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

// Type declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
