import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const triesRef = useRef<number[]>([]);

  const forceTop = () => {
    // Blur any focused element
    try {
      const active = document.activeElement as HTMLElement | null;
      if (active && typeof active.blur === "function") active.blur();
    } catch (e) {
      /* ignore */
    }

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
    }

    // Scroll other common scrollable containers
    const maybeScrollables = [
      document.querySelector("main"),
      document.getElementById("root"),
      document.querySelector(".app-shell"),
    ];
    maybeScrollables.forEach((el) => {
      if (el && "scrollTop" in el) (el as HTMLElement).scrollTop = 0;
    });
  };

  useLayoutEffect(() => {
    // Clear previous timeouts
    triesRef.current.forEach((id) => clearTimeout(id));
    triesRef.current = [];

    // Multiple aggressive attempts
    forceTop();
    requestAnimationFrame(() => forceTop());

    // Staggered retries to catch late layout shifts
    const t1 = window.setTimeout(() => forceTop(), 25);
    const t2 = window.setTimeout(() => forceTop(), 100);
    const t3 = window.setTimeout(() => forceTop(), 300);
    const t4 = window.setTimeout(() => forceTop(), 500);
    triesRef.current.push(t1, t2, t3, t4);

    return () => {
      triesRef.current.forEach((id) => clearTimeout(id));
      triesRef.current = [];
    };
  }, [pathname]);

  return null;
}
