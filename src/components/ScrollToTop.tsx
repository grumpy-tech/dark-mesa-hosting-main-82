import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const triesRef = useRef<number[]>([]);

  const forceTop = () => {
    console.log("[ScrollToTop] Forcing scroll to top");

    // Blur any focused element
    try {
      const active = document.activeElement as HTMLElement | null;
      if (active && typeof active.blur === "function") {
        active.blur();
        console.log("[ScrollToTop] Blurred active element:", active.tagName);
      }
    } catch (e) {
      console.warn("[ScrollToTop] Failed to blur element:", e);
    }

    // Scroll window and document
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      console.log("[ScrollToTop] Reset window scroll:", {
        window: window.scrollY,
        documentElement: document.documentElement.scrollTop,
        body: document.body.scrollTop
      });
    } catch (e) {
      console.warn("[ScrollToTop] Failed to scroll window:", e);
    }

    // Scroll #scroll-root container
    const scrollRoot = document.getElementById("scroll-root");
    if (scrollRoot) {
      scrollRoot.scrollTop = 0;
      console.log("[ScrollToTop] Reset #scroll-root to top");
    }

    // Scroll other common scrollable containers
    const maybeScrollables = [
      document.querySelector("main"),
      document.getElementById("root"),
      document.querySelector(".app-shell"),
    ];
    maybeScrollables.forEach((el) => {
      if (el && "scrollTop" in el) {
        (el as HTMLElement).scrollTop = 0;
        console.log("[ScrollToTop] Reset scrollable container:", el);
      }
    });
  };

  useLayoutEffect(() => {
    console.log("[ScrollToTop] Route changed to:", pathname);

    // Clear previous timeouts
    triesRef.current.forEach((id) => clearTimeout(id));
    triesRef.current = [];

    // Multiple aggressive attempts
    console.log("[ScrollToTop] Immediate scroll attempt");
    forceTop();
    
    requestAnimationFrame(() => {
      console.log("[ScrollToTop] requestAnimationFrame scroll attempt");
      forceTop();
    });

    // Staggered retries to catch late layout shifts
    const t1 = window.setTimeout(() => {
      console.log("[ScrollToTop] 25ms delayed scroll attempt");
      forceTop();
    }, 25);
    const t2 = window.setTimeout(() => {
      console.log("[ScrollToTop] 100ms delayed scroll attempt");
      forceTop();
    }, 100);
    const t3 = window.setTimeout(() => {
      console.log("[ScrollToTop] 300ms delayed scroll attempt");
      forceTop();
    }, 300);
    const t4 = window.setTimeout(() => {
      console.log("[ScrollToTop] 500ms delayed scroll attempt");
      forceTop();
    }, 500);
    triesRef.current.push(t1, t2, t3, t4);

    return () => {
      console.log("[ScrollToTop] Cleanup timeouts for route:", pathname);
      triesRef.current.forEach((id) => clearTimeout(id));
      triesRef.current = [];
    };
  }, [pathname]);

  return null;
}
