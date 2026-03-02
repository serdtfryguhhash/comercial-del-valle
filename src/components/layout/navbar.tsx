"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Phone,
  Scissors,
  Sparkles,
  BookOpen,
  Calculator,
  Star,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import StreakBadge from "@/components/shared/StreakBadge";
import { useAppStore } from "@/stores";
import { POINT_ACTIONS } from "@/lib/gamification";

const mainNavLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/novedades", label: "Novedades", icon: Star },
  { href: "/asesor", label: "Asesor IA", icon: Sparkles },
  { href: "/calculadora", label: "Calculadora", icon: Calculator },
];

const moreNavLinks = [
  { href: "/proyectos", label: "Proyectos", icon: FolderOpen },
  { href: "/mis-proyectos", label: "Seguimiento", icon: Scissors },
  { href: "/inspiracion", label: "Inspiración", icon: BookOpen },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const allNavLinks = [...mainNavLinks, ...moreNavLinks];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { recordVisit, addPoints, engagement } = useAppStore();
  const [hasRecorded, setHasRecorded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Record daily visit
  useEffect(() => {
    if (!hasRecorded) {
      const today = new Date().toISOString().split("T")[0];
      if (engagement.lastVisit !== today) {
        recordVisit();
        addPoints(POINT_ACTIONS.DAILY_VISIT.action, POINT_ACTIONS.DAILY_VISIT.points);
      }
      setHasRecorded(true);
    }
  }, [hasRecorded, engagement.lastVisit, recordVisit, addPoints]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAFAF7]/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 group">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1B3A5C] sm:text-2xl">
              Comercial
            </span>
            <span className="font-[family-name:var(--font-playfair)] text-xl font-light text-[#1B3A5C] sm:text-2xl">
              del Valle
            </span>
            <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-[#D4A843] group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                      : "text-[#1A1A1A]/70 hover:text-[#1B3A5C] hover:bg-[#1B3A5C]/5"
                  }`}
                >
                  {link.icon && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              );
            })}

            {/* More dropdown-like links */}
            {moreNavLinks.slice(0, 3).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                      : "text-[#1A1A1A]/70 hover:text-[#1B3A5C] hover:bg-[#1B3A5C]/5"
                  }`}
                >
                  {link.icon && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              );
            })}

            <div className="mx-1.5 h-5 w-px bg-[#E5E0D5]" />

            <StreakBadge />

            <Button
              asChild
              className="ml-2 rounded-full bg-[#1B3A5C] px-5 text-sm font-medium text-white hover:bg-[#244D78] transition-colors"
            >
              <Link href="/contacto">
                <Phone className="mr-1.5 h-4 w-4" />
                Contáctanos
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <StreakBadge />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-6 w-6 text-[#1B3A5C]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-[#FAFAF7]">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col gap-1 pt-8">
                  {/* Mobile Logo */}
                  <div className="mb-6 px-2">
                    <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1B3A5C]">
                      Comercial
                    </span>
                    <span className="font-[family-name:var(--font-playfair)] text-xl font-light text-[#1B3A5C]">
                      {" "}del Valle
                    </span>
                    <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[#D4A843]" />
                  </div>

                  {/* Mobile Nav Links */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      pathname === "/"
                        ? "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                        : "text-[#1A1A1A]/80 hover:bg-[#1B3A5C]/5 hover:text-[#1B3A5C]"
                    }`}
                  >
                    Inicio
                  </Link>

                  {allNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? "bg-[#1B3A5C]/10 text-[#1B3A5C]"
                            : "text-[#1A1A1A]/80 hover:bg-[#1B3A5C]/5 hover:text-[#1B3A5C]"
                        }`}
                      >
                        {link.icon && <link.icon className="h-4 w-4" />}
                        {link.label}
                      </Link>
                    );
                  })}

                  {/* Mobile CTA */}
                  <div className="mt-4 px-2">
                    <Button
                      asChild
                      className="w-full rounded-full bg-[#1B3A5C] text-sm font-medium text-white hover:bg-[#244D78]"
                    >
                      <Link
                        href="/contacto"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Phone className="mr-1.5 h-4 w-4" />
                        Contáctanos
                      </Link>
                    </Button>
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="mt-8 border-t border-[#E5E0D5] px-4 pt-6">
                    <p className="text-xs text-[#5C5C5C]">
                      Lun - Vie: 8:00 - 17:30
                    </p>
                    <p className="text-xs text-[#5C5C5C]">
                      Sáb: 8:00 - 17:00
                    </p>
                    <a
                      href="tel:+50496518484"
                      className="mt-2 block text-sm font-medium text-[#1B3A5C]"
                    >
                      9651-8484
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/50496518484"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctanos por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
