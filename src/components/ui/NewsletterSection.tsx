"use client";

import { useState } from "react";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  backgroundColor?: "orange" | "gray" | "amber";
}

const bgClasses = {
  orange: "bg-orange-600",
  gray: "bg-gray-800",
  amber: "bg-amber-50",
};

const textClasses = {
  orange: {
    title: "text-white",
    description: "text-orange-100",
    input: "text-gray-900",
    button: "bg-white text-orange-600 hover:bg-gray-100",
    success: "text-white",
    error: "text-orange-200",
  },
  gray: {
    title: "text-white",
    description: "text-gray-300",
    input: "text-gray-900",
    button: "bg-orange-600 text-white hover:bg-orange-700",
    success: "text-white",
    error: "text-gray-300",
  },
  amber: {
    title: "text-gray-800",
    description: "text-gray-600",
    input: "text-gray-900",
    button: "bg-orange-600 text-white hover:bg-orange-700",
    success: "text-green-600",
    error: "text-red-600",
  },
};

export default function NewsletterSection({
  title = "Suscribete a nuestro boletin",
  description = "Recibe ofertas exclusivas, eventos especiales y las ultimas novedades de nuestro restaurante.",
  backgroundColor = "gray",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    // Simulate API call - in production, connect to your newsletter service
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setMessage("Gracias por suscribirte. Pronto recibiras nuestras novedades.");
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch {
      setStatus("error");
      setMessage("No se pudo completar la suscripcion. Intentalo de nuevo.");
    }
  };

  const colors = textClasses[backgroundColor];

  return (
    <section className={`py-16 ${bgClasses[backgroundColor]}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${colors.title}`}>
          {title}
        </h2>
        <p className={`text-lg mb-8 ${colors.description}`}>
          {description}
        </p>

        {status === "success" ? (
          <div className={`text-lg font-medium ${colors.success}`}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className={`flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange-500 ${colors.input}`}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${colors.button}`}
            >
              {status === "loading" ? "Enviando..." : "Suscribirse"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className={`mt-4 ${colors.error}`}>{message}</p>
        )}
      </div>
    </section>
  );
}
