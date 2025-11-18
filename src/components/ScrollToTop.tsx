import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTopImmediate = () => {
      // Ensure top on all browsers and after heavy renders
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run immediately, on next frame, and after a brief delay
    scrollToTopImmediate();
    requestAnimationFrame(scrollToTopImmediate);
    setTimeout(scrollToTopImmediate, 0);
  }, [pathname]);

  return null;
}

