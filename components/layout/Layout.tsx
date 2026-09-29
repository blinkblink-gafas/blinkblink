import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared page chrome. Every page renders through this (wired in `_app.tsx`)
 * so the Navbar, Footer and cart drawer are consistent across the whole
 * site instead of opted into per page.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
