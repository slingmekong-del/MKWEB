"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/content";

const NAV_LINKS = SITE.nav;
const { brandName, brandTagline } = SITE.company;
const { wllLabel, quoteLabel } = SITE.headerCtas;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isHome
          ? "bg-navy/80 backdrop-blur-sm"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-mekong.jpg"
              alt="United Mekong Logo"
              width={44}
              height={44}
              className="rounded"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-heading font-extrabold text-base tracking-wider ${
                  isHome ? "text-white" : "text-navy"
                }`}
              >
                {brandName}
              </span>
              <span
                className={`font-mono text-[9px] tracking-[0.18em] uppercase ${
                  isHome ? "text-teal" : "text-teal-dark"
                }`}
              >
                {brandTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? isHome
                      ? "text-teal"
                      : "text-teal-dark"
                    : isHome
                    ? "text-white/80 hover:text-white"
                    : "text-navy/70 hover:text-navy"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/wll-tool"
              className={`text-sm font-mono font-medium px-3 py-1.5 rounded border transition-colors ${
                isHome
                  ? "border-teal/50 text-teal hover:bg-teal/10"
                  : "border-teal-dark/50 text-teal-dark hover:bg-teal/10"
              }`}
            >
              {wllLabel}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold px-4 py-2 rounded bg-teal text-navy hover:bg-teal-dark transition-colors"
            >
              {quoteLabel}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 ${isHome ? "text-white" : "text-navy"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isHome ? "text-white/90" : "text-navy"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3">
              <Link
                href="/wll-tool"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-mono font-medium px-3 py-1.5 rounded border border-teal/50 text-teal"
              >
                {wllLabel}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold px-4 py-2 rounded bg-teal text-navy"
              >
                {quoteLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
