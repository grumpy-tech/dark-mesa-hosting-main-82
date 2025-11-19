import { ReactNode, MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface FooterLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export function FooterLink({ to, children, className }: FooterLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const forceScrollToTop = () => {
    // Scroll window
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (e) {
      /* ignore */
    }

    // Scroll #scroll-root container
    const scrollRoot = document.getElementById("scroll-root");
    if (scrollRoot) {
      scrollRoot.scrollTop = 0;
      scrollRoot.scrollLeft = 0;
    }

    // Blur any focused element
    try {
      const active = document.activeElement as HTMLElement | null;
      if (active && typeof active.blur === "function") active.blur();
    } catch (e) {
      /* ignore */
    }
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Normalize paths for comparison
    const normalize = (p: string) => p.replace(/\/+$/g, "") || "/";
    const current = normalize(location.pathname);
    const target = normalize(to);

    // Always scroll to top first
    forceScrollToTop();

    if (current === target) {
      // Same page - smooth scroll
      window.scrollTo({ top: 0, behavior: "smooth" });
      const scrollRoot = document.getElementById("scroll-root");
      if (scrollRoot) {
        scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Navigate to new page
      navigate(to);
      
      // Force scroll again after navigation
      setTimeout(() => {
        forceScrollToTop();
        requestAnimationFrame(() => forceScrollToTop());
      }, 100);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
