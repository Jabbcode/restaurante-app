"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/reservaciones", label: "Reservaciones" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="relative flex items-center gap-4">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {session && (
          <li>
            <Link
              href="/admin"
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors font-medium text-sm"
            >
              Panel Admin
            </Link>
          </li>
        )}
      </ul>

      {/* Theme Toggle - Desktop */}
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      {/* Mobile: Theme Toggle + Menu Button */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[var(--foreground)] hover:text-[var(--primary)]"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
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

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="absolute top-full right-0 mt-2 w-48 bg-[var(--card-bg)] shadow-lg rounded-lg py-2 md:hidden z-50 border border-[var(--card-border)]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {session && (
            <li className="border-t border-[var(--card-border)] mt-2 pt-2">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-[var(--primary)] font-medium hover:bg-[var(--secondary)] transition-colors"
              >
                Panel Admin
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
