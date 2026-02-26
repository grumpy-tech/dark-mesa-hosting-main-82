import { Instagram, Mail, Shield, FileText, Globe, Server, DollarSign, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Websites", url: "/website-building" },
  { name: "Hosting", url: "/hosting" },
  { name: "Pricing", url: "/pricing" },
  { name: "FAQ", url: "/faq" },
  { name: "Contact", url: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", url: "/privacy" },
  { name: "Terms of Service", url: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border" style={{ background: 'hsl(var(--footer-bg))', color: 'hsl(var(--footer-foreground))' }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <span
              className="text-lg font-semibold block mb-3"
              style={{ fontFamily: "Iceland, sans-serif", letterSpacing: "0.04em" }}
            >
              Dark Mesa Hosting
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional websites for small businesses. Built, hosted, and maintained.
            </p>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Get in Touch</h3>
            <a
              href="mailto:info@darkmesahosting.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              info@darkmesahosting.com
            </a>
            <p className="text-sm text-muted-foreground mt-3">
              Response within 24 hours.
            </p>
            <Link
              to="/quote"
              className="inline-block mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Get a free quote →
            </Link>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dark Mesa Hosting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
