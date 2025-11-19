import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const triesRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const forceTop = () => {
    // Primary target: our custom scroll container
    const scrollRoot = document.getElementById("scroll-root");
    if (scrollRoot) {
      scrollRoot.scrollTop = 0;
      scrollRoot.scrollLeft = 0;
    }

    // Fallbacks for any other case
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useLayoutEffect(() => {
    // Clear previous timeouts
    triesRef.current.forEach(clearTimeout);
    triesRef.current = [];

    // Multiple attempts to beat layout shifts and animations
    forceTop();
    requestAnimationFrame(forceTop);

    const timeouts = [0, 25, 100, 300, 500].map(delay =>
      setTimeout(forceTop, delay)
    );
    triesRef.current = timeouts;

    return () => {
      triesRef.current.forEach(clearTimeout);
      triesRef.current = [];
    };
  }, [pathname]);

  return null;
}
