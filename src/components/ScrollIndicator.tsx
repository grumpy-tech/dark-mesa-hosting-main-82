import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-medium">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </div>
    </div>
  );
}
