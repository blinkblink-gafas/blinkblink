import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";

export interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared page chrome. Every page renders through this (wired in `_app.tsx`)
 * so the Navbar — and anything added here later, like a Footer — is
 * consistent across the whole site instead of opted into per page.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
