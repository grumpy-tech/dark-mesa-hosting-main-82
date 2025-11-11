import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={cn(
        "flex w-12 h-7 p-0.5 rounded-full cursor-pointer transition-all duration-300 bg-background/50 border border-border/30 hover:border-border/60",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      <div className="flex justify-between items-center w-full relative">
        <div
          className={cn(
            "flex justify-center items-center w-5 h-5 rounded-full transition-all duration-300 absolute",
            isDark ? "left-0.5 bg-muted" : "left-[calc(100%-22px)] bg-muted"
          )}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-muted-foreground" strokeWidth={2} />
          ) : (
            <Sun className="w-3 h-3 text-muted-foreground" strokeWidth={2} />
          )}
        </div>
      </div>
    </div>
  );
}
