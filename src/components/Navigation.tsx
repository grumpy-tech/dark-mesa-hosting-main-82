import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", url: "/" },
  { name: "Websites", url: "/website-building" },
  { name: "Hosting", url: "/hosting" },
  { name: "Pricing", url: "/pricing" },
  { name: "FAQ", url: "/faq" },
  { name: "Contact", url: "/contact" },
];

export function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (url: string) =>
    url === "/" ? location.pathname === "/" : location.pathname === url;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled || menuOpen
          ? "bg-background/95 backdrop-blur border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-xs">DM</span>
            </div>
            <span
              className="text-base font-semibold text-foreground whitespace-nowrap hidden sm:block"
              style={{ fontFamily: "Iceland, sans-serif", letterSpacing: "0.02em" }}
            >
              Dark Mesa Hosting
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive(item.url)
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <Link to="/quote" className="hidden md:block">
              <Button size="sm" className="font-semibold">
                Get Free Quote
              </Button>
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.url)
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-between px-3">
              <ThemeToggle />
              <Link to="/quote">
                <Button size="sm" className="font-semibold">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
