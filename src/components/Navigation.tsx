import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Globe, Server, DollarSign, HelpCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import darkMesaLogo from "@/assets/dark-mesa-logo.png";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Website Building", url: "/website-building", icon: Globe },
  { name: "Hosting", url: "/hosting", icon: Server },
  { name: "Plans & Pricing", url: "/pricing", icon: DollarSign },
  { name: "FAQ", url: "/faq", icon: HelpCircle },
  { name: "Contact", url: "/contact", icon: Mail },
];

export function Navigation() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const activeTab = navItems.find((item) => item.url === location.pathname)?.name || "Home";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6">
      {/* Unified Navigation Bar */}
      <div className="flex items-center gap-1 sm:gap-2 bg-background/80 backdrop-blur-lg border border-border py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-full shadow-lg max-w-full overflow-x-auto">
        {/* Brand Logo */}
        <Link to="/" className="px-2 py-1 flex items-center">
          <img 
            src={darkMesaLogo} 
            alt="Dark Mesa" 
            className="h-6 sm:h-7 md:h-8 w-auto object-contain"
          />
        </Link>
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "relative cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full transition-colors",
                  "text-foreground/70 hover:text-primary",
                  isActive && "text-primary"
                )}
              >
                <span className="hidden lg:inline whitespace-nowrap">{item.name}</span>
                <span className="lg:hidden">
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10 border border-primary/10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
}
