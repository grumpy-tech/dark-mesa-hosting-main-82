import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Globe, Server, DollarSign, HelpCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

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
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-6">
      {/* Brand Logo */}
      <Link to="/" className="text-xl font-bold text-gradient bg-background/80 backdrop-blur-lg border border-border py-2.5 px-4 rounded-full shadow-lg inline-flex items-center justify-center leading-none">
        Dark Mesa
      </Link>
      
      {/* Navigation and Theme Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-lg border border-border py-2 px-2 rounded-full shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "relative cursor-pointer text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-full transition-colors",
                  "text-foreground/70 hover:text-primary",
                  isActive && "text-primary"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
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
        <ThemeToggle />
      </div>
    </div>
  );
}
