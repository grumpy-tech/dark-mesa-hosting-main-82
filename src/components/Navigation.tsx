import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Globe, Server, DollarSign, HelpCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import darkMesaLogoNavbar from "@/assets/dark-mesa-logo-navbar.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={darkMesaLogoNavbar} 
              alt="Dark Mesa Hosting" 
              className="h-6 sm:h-7 w-auto"
            />
          </Link>

          {/* Navigation Items & Theme Toggle */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <Link
                  key={item.name}
                  to={item.url}
                  className={cn(
                    "relative cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 md:px-4 py-2 transition-colors",
                    "text-white/70 hover:text-primary",
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
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
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
            <ThemeToggle className="opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </nav>
  );
}
