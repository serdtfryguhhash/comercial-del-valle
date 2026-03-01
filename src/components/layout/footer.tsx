import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const footerLinks = [
  { href: "#catalogo", label: "Catalogo" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
  { href: "#faq", label: "Preguntas Frecuentes" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B3A5C] text-white/90">
      {/* Gold accent line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D4A843] via-[#E0BD6A] to-[#D4A843]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                Comercial
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-2xl font-light text-white">
                {" "}del Valle
              </span>
              <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#D4A843]" />
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/70">
              Tu tienda de telas desde San Pedro Sula. Calidad, variedad y los
              mejores precios para todos tus proyectos textiles.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/comercialdelvallehn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-[#D4A843] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/comercialdelvallehn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-[#D4A843] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@comercialdelvallehn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-[#D4A843] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.15z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
              Enlaces
            </h3>
            <div className="mb-2 h-0.5 w-10 bg-[#D4A843]" />
            <nav className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-[#D4A843]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
              Contacto
            </h3>
            <div className="mb-2 h-0.5 w-10 bg-[#D4A843]" />
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A843]" />
                <div className="text-sm text-white/70">
                  <a
                    href="tel:+50496518484"
                    className="block transition-colors hover:text-[#D4A843]"
                  >
                    9651-8484 (celular)
                  </a>
                  <a
                    href="tel:+50425583014"
                    className="block transition-colors hover:text-[#D4A843]"
                  >
                    2558-3014 (fijo)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A843]" />
                <a
                  href="mailto:comercialdelvalle.hn@gmail.com"
                  className="text-sm text-white/70 transition-colors hover:text-[#D4A843]"
                >
                  comercialdelvalle.hn@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A843]" />
                <p className="text-sm text-white/70">
                  Barrio El Benque, 6a Calle entre
                  <br />
                  10a y 11a Avenida SO,
                  <br />
                  San Pedro Sula, Honduras 22021
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A843]" />
                <div className="text-sm text-white/70">
                  <p>Lun - Vie: 8:00 - 17:30</p>
                  <p>Sab: 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Comercial del Valle. Todos los derechos reservados.</p>
          <p>Hecho con orgullo en Honduras</p>
        </div>
      </div>
    </footer>
  );
}
