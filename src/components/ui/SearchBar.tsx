"use client"

import { useState, useCallback } from "react"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  variant?: "default" | "hero"
  className?: string
}

export default function SearchBar({
  placeholder = "Buscar...",
  onSearch,
  variant = "default",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSearch?.(query.trim())
    },
    [query, onSearch]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      // Real-time search for default variant
      if (variant === "default") {
        onSearch?.(value.trim())
      }
    },
    [variant, onSearch]
  )

  const baseClasses = "flex items-center gap-2 w-full"

  const variantClasses = {
    default: "bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm",
    hero: "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4",
  }

  const inputClasses = {
    default: "flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400",
    hero: "flex-1 bg-transparent outline-none text-white placeholder-white/70 text-lg",
  }

  const buttonClasses = {
    default: "p-2 text-gray-500 hover:text-red-600 transition-colors",
    hero: "p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors",
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <svg
        className={`w-5 h-5 ${variant === "hero" ? "text-white/70" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClasses[variant]}
      />
      {variant === "hero" && (
        <button type="submit" className={buttonClasses[variant]}>
          Buscar
        </button>
      )}
    </form>
  )
}
