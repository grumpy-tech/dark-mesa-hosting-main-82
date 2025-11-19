import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div id="scroll-root" className="min-h-screen overflow-y-auto [scroll-behavior:auto]">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
