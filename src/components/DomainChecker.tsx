import { useState } from "react";
import { Search, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function DomainChecker() {
  const [domain, setDomain] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<"available" | "unavailable" | null>(null);

  const checkDomain = () => {
    if (!domain) return;
    
    setChecking(true);
    setResult(null);
    
    // Simulate domain check
    setTimeout(() => {
      const available = Math.random() > 0.5;
      setResult(available ? "available" : "unavailable");
      setChecking(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkDomain();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="yourdomain.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 pl-4 pr-12 text-base bg-card border-border focus:border-primary transition-colors"
          />
          {result && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {result === "available" ? (
                <Check className="w-5 h-5 text-primary" />
              ) : (
                <X className="w-5 h-5 text-accent" />
              )}
            </div>
          )}
        </div>
        <Button
          onClick={checkDomain}
          disabled={!domain || checking}
          size="lg"
          className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          {checking ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Check
            </>
          )}
        </Button>
      </div>
      {result && (
        <div className="mt-4 p-4 rounded-lg bg-card border border-border animate-fade-in">
          <p className="text-sm font-medium">
            {result === "available" ? (
              <span className="text-primary">
                ✓ Great news! <strong>{domain}</strong> is available!
              </span>
            ) : (
              <span className="text-accent">
                ✗ Sorry, <strong>{domain}</strong> is already taken. Try a different name.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
