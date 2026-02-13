import Link from "next/link";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
  height?: "full" | "large" | "medium" | "small";
  overlay?: "light" | "medium" | "dark";
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

const heightClasses = {
  full: "h-screen min-h-[600px]",
  large: "h-[80vh] min-h-[500px]",
  medium: "h-[60vh] min-h-[400px]",
  small: "h-[40vh] min-h-[300px]",
};

const overlayClasses = {
  light: "bg-black/30",
  medium: "bg-black/50",
  dark: "bg-black/70",
};

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920",
  ctaText,
  ctaHref,
  height = "large",
  overlay = "medium",
  showSearch = false,
  searchPlaceholder = "Buscar en el menú...",
  onSearch,
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${heightClasses[height]} flex items-center justify-center bg-gray-900`}
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 text-gray-200">{subtitle}</p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors"
          >
            {ctaText}
          </Link>
        )}
        {showSearch && (
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar
              variant="hero"
              placeholder={searchPlaceholder}
              onSearch={onSearch}
            />
          </div>
        )}
      </div>
    </section>
  );
}
