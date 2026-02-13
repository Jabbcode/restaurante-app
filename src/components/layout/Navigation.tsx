"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
    <nav className="relative">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {session && (
          <li>
            <Link
              href="/admin"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
            >
              Panel Admin
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-700 hover:text-red-600"
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

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 md:hidden z-50">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {session && (
            <li className="border-t border-gray-100 mt-2 pt-2">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-red-600 font-medium hover:bg-red-50 transition-colors"
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
