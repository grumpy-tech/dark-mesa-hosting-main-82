import { Link, useLocation } from "react-router-dom";
import type { MouseEvent } from "react";
import { Facebook, Linkedin, Twitter, Instagram, Home, Globe, Server, DollarSign, HelpCircle, Mail } from "lucide-react";

const quickLinks = [
  { name: "Home", url: "/", icon: Home },
  { name: "Website Building", url: "/website-building", icon: Globe },
  { name: "Hosting", url: "/hosting", icon: Server },
  { name: "Plans & Pricing", url: "/pricing", icon: DollarSign },
  { name: "FAQ", url: "/faq", icon: HelpCircle },
  { name: "Contact", url: "/contact", icon: Mail },
];

const socials = [
  { name: "Facebook", icon: Facebook, url: "#" },
  { name: "LinkedIn", icon: Linkedin, url: "#" },
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
];

export function Footer() {
  const location = useLocation();

  const handleLinkClick = (e: MouseEvent, url: string) => {
    // Normalize paths: remove trailing slashes for comparison
    const normalize = (p: string) => p.replace(/\/+$/g, "") || "/";

    const current = normalize(location.pathname + (location.search || ""));
    const target = normalize(url);

    if (current === target) {
      e.preventDefault();
      // Smooth scroll in-page for same path
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // else allow <Link> to navigate; ScrollToTop handles the rest robustly
  };
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-gradient mb-2">Dark Mesa Hosting</p>
            <p className="text-sm text-muted-foreground">Design. Speed. Reliability.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      onClick={(e) => handleLinkClick(e, link.url)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Dark Mesa Hosting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}