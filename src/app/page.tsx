"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Palette,
  Layers,
  Sparkles,
  Shirt,
  Droplets,
  Sofa,
  Star,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Users,
  BadgeDollarSign,
  Gem,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import XPBar from "@/components/shared/XPBar";
import StreakBadge from "@/components/shared/StreakBadge";
import { newArrivals as latestArrivals } from "@/data/new-arrivals";
import { useAppStore } from "@/stores";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  {
    name: "Telas Estampadas",
    description:
      "Estampados tropicales, florales y abstractos para dar vida a tus creaciones.",
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    href: "/catalogo?categoria=estampadas",
  },
  {
    name: "Telas Lisas",
    description:
      "Amplia gama de colores en telas lisas de alta calidad para todo tipo de proyecto.",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&q=80",
    href: "/catalogo?categoria=lisas",
  },
  {
    name: "Telas para Eventos",
    description:
      "Satén, organza, tul y más para hacer de tu evento algo inolvidable.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
    href: "/catalogo?categoria=eventos",
  },
  {
    name: "Telas Deportivas",
    description:
      "Licra, spandex y telas con tecnología de absorción para ropa deportiva.",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    href: "/catalogo?categoria=deportivas",
  },
  {
    name: "Telas Impermeables",
    description:
      "Telas náuticas, para impermeables y protección contra la lluvia y el agua.",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    href: "/catalogo?categoria=impermeables",
  },
  {
    name: "Telas para el Hogar",
    description:
      "Cortinas, tapicería, ropa de cama y más para decorar tu espacio.",
    icon: Sofa,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    href: "/catalogo?categoria=hogar",
  },
];

const features = [
  {
    icon: Gem,
    title: "Variedad Inigualable",
    description:
      "Cientos de telas en docenas de categorías para satisfacer cualquier necesidad creativa o comercial.",
  },
  {
    icon: BadgeDollarSign,
    title: "Precios Competitivos",
    description:
      "Los mejores precios del mercado, tanto al por mayor como al detalle. Calidad a tu alcance.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description:
      "Nuestro equipo de expertos te asesora para encontrar la tela perfecta para tu proyecto.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad Garantizada",
    description:
      "Solo trabajamos con los mejores materiales de proveedores de confianza nacionales e internacionales.",
  },
];

const newArrivals = [
  {
    id: 101,
    name: "Tela Navide\u00f1a Estampada",
    price: 135,
    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=600&h=600&fit=crop",
  },
  {
    id: 102,
    name: "Lino Europeo Premium",
    price: 285,
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=600&fit=crop",
  },
  {
    id: 103,
    name: "Seda Japonesa",
    price: 395,
    image:
      "https://images.unsplash.com/photo-1550639524-a6f58345a2ca?w=600&h=600&fit=crop",
  },
  {
    id: 104,
    name: "Algod\u00f3n Org\u00e1nico",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=600&h=600&fit=crop",
  },
  {
    id: 105,
    name: "Terciopelo Italiano",
    price: 345,
    image:
      "https://images.unsplash.com/photo-1528459584353-5297db1a9c01?w=600&h=600&fit=crop",
  },
  {
    id: 106,
    name: "Chiffon Tornasol",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=600&fit=crop",
  },
];

const testimonials = [
  {
    name: "María Elena Reyes",
    role: "Diseñadora de Modas",
    rating: 5,
    text: "Llevo más de 5 años comprando mis telas en Comercial del Valle. La variedad es impresionante y siempre encuentro exactamente lo que necesito para mis colecciones. El personal es muy amable y conocedor.",
  },
  {
    name: "Carlos Andrés Mejía",
    role: "Tapicero Profesional",
    rating: 5,
    text: "Como tapicero profesional, necesito telas de calidad a buen precio. Comercial del Valle siempre tiene lo que busco. Sus telas para tapicería son de primera y los precios son inmejorables en San Pedro Sula.",
  },
  {
    name: "Sandra Patricia López",
    role: "Emprendedora Textil",
    rating: 4,
    text: "Desde que empecé mi negocio de ropa, Comercial del Valle ha sido mi proveedor de confianza. La atención personalizada y la asesoría que me dan para elegir las telas correctas no tiene comparación.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const loyalty = useAppStore((s) => s.loyalty);
  const engagement = useAppStore((s) => s.engagement);

  useEffect(() => { setMounted(true); }, []);

  const scrollNewArrivals = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-x-hidden bg-[#FAFAF7] text-[#1A1A1A]">
      {/* ============================================================ */}
      {/*  1. HERO SECTION                                             */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-end pt-20">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&q=80"
          alt="Telas y textiles de calidad"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5C]/90 via-[#1B3A5C]/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              La Mejor Selección de Telas en San Pedro Sula
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
            >
              Más de 30 años vistiendo a Honduras con las mejores telas del
              mercado. Calidad, variedad y los mejores precios.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-lg bg-[#D4A843] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#c49a38] hover:shadow-xl"
              >
                Ver Catálogo
              </Link>
              <a
                href="https://wa.me/50496518484"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#1ebe5a] hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Contáctanos por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. CATEGORIES SECTION                                       */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1B3A5C] sm:text-4xl lg:text-5xl">
              Nuestras Categorías
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#D4A843]" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#1A1A1A]/70">
              Explora nuestra amplia selección de telas para cada necesidad y
              proyecto.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.name} variants={scaleIn}>
                  <Link
                    href={cat.href}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A843] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1B3A5C]">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/65">
                        {cat.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#C75B39] transition-colors group-hover:text-[#D4A843]">
                        Ver más
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2.5 NEW ARRIVALS ("Recién Llegados")                        */}
      {/* ============================================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1B3A5C] sm:text-4xl lg:text-5xl">
              Reci&eacute;n Llegados
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#D4A843]" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#1A1A1A]/70">
              Las &uacute;ltimas telas que acaban de llegar a nuestra tienda
            </p>
          </motion.div>

          {/* Scroll controls */}
          <div className="relative mt-12">
            {/* Left arrow */}
            <button
              onClick={() => scrollNewArrivals("left")}
              className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl md:flex"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="h-6 w-6 text-[#1B3A5C]" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => scrollNewArrivals("right")}
              className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl md:flex"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="h-6 w-6 text-[#1B3A5C]" />
            </button>

            {/* Scrollable row */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            >
              {newArrivals.map((product) => (
                <motion.div
                  key={product.id}
                  variants={scaleIn}
                  className="w-[260px] shrink-0 snap-start"
                >
                  <div className="group overflow-hidden rounded-2xl bg-[#FAFAF7] shadow-md transition-all hover:shadow-xl">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="260px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* NUEVO badge */}
                      <span className="absolute top-3 left-3 rounded-full bg-[#D4A843] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                        Nuevo
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#1A1A1A] leading-snug">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-[#1B3A5C]">
                          L. {product.price}
                          <span className="text-xs font-normal text-gray-500">
                            {" "}
                            /yarda
                          </span>
                        </span>
                        <Link
                          href="/catalogo"
                          className="inline-flex items-center gap-1 rounded-lg bg-[#1B3A5C] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A5C]/90"
                        >
                          Ver
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* "Ver Todo" card */}
              <motion.div
                variants={scaleIn}
                className="w-[260px] shrink-0 snap-start"
              >
                <Link
                  href="/catalogo"
                  className="group flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#D4A843]/40 bg-[#D4A843]/5 p-8 transition-all hover:border-[#D4A843] hover:bg-[#D4A843]/10"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A843]/20 transition-colors group-hover:bg-[#D4A843]/30">
                    <ArrowRight className="h-8 w-8 text-[#D4A843]" />
                  </div>
                  <span className="mt-4 font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1B3A5C]">
                    Ver Todo el Cat&aacute;logo
                  </span>
                  <span className="mt-1 text-sm text-[#1A1A1A]/60">
                    Explora m&aacute;s de 30 telas
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. ABOUT PREVIEW                                            */}
      {/* ============================================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                  alt="Interior de Comercial del Valle"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#D4A843]/30" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeUp}
                className="inline-block text-sm font-semibold uppercase tracking-widest text-[#D4A843]"
              >
                Sobre Nosotros
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1B3A5C] sm:text-4xl"
              >
                Más Que Una Tienda de Telas
              </motion.h2>

              <motion.div variants={fadeUp} className="mt-6 space-y-4">
                <p className="text-lg leading-relaxed text-[#1A1A1A]/75">
                  En Comercial del Valle somos mucho más que un proveedor de
                  telas. Desde nuestro local en el Barrio El Benque de San Pedro
                  Sula, hemos servido a la comunidad sampedrana con dedicación,
                  ofreciendo la más amplia variedad de telas de calidad.
                </p>
                <p className="text-lg leading-relaxed text-[#1A1A1A]/75">
                  Nuestro compromiso es brindarte telas de la mejor calidad a
                  precios accesibles, con la atención personalizada que nos
                  caracteriza. Ya seas diseñador, costurero, tapicero o
                  emprendedor, aquí encontrarás todo lo que necesitas.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/nosotros"
                  className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#C75B39] transition-colors hover:text-[#D4A843]"
                >
                  Conoce Nuestra Historia
                  <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. WHY CHOOSE US                                            */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1B3A5C] sm:text-4xl lg:text-5xl">
              ¿Por Qué Elegirnos?
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#D4A843]" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="rounded-2xl bg-white p-8 text-center shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1B3A5C]/10">
                    <Icon className="h-7 w-7 text-[#1B3A5C]" />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1B3A5C]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/65">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. WHATSAPP CTA BANNER                                      */}
      {/* ============================================================ */}
      <section className="bg-[#1B3A5C] py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl"
          >
            ¿Necesitas Ayuda para Elegir tu Tela?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Escríbenos por WhatsApp y te asesoramos con lo que necesites.
            Nuestro equipo está listo para ayudarte.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a
              href="https://wa.me/50496518484"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-10 py-5 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#1ebe5a] hover:shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
              Escribir por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  6. TESTIMONIALS                                             */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1B3A5C] sm:text-4xl lg:text-5xl">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#D4A843]" />
            <p className="mx-auto mt-4 flex items-center justify-center gap-2 text-lg text-[#1A1A1A]/70">
              <Star className="h-5 w-5 fill-[#D4A843] text-[#D4A843]" />
              <span className="font-semibold text-[#1A1A1A]">4.6</span>{" "}
              promedio de satisfacción
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="rounded-2xl bg-white p-8 shadow-md"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.rating
                          ? "fill-[#D4A843] text-[#D4A843]"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-5 text-base leading-relaxed text-[#1A1A1A]/75">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="font-semibold text-[#1B3A5C]">{t.name}</p>
                  <p className="text-sm text-[#1A1A1A]/55">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      {/* ============================================================ */}
      {/*  STICKINESS: LOYALTY, STREAK & NEW ARRIVALS                  */}
      {/* ============================================================ */}
      {mounted && (
        <section className="bg-gradient-to-b from-[#FAFAF7] to-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {/* Section header */}
              <motion.div variants={fadeUp} className="text-center mb-12">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#D4A843]">
                  Tu Experiencia
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                  Herramientas Para Ti
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[#5C5C5C]">
                  Explora nuestras herramientas exclusivas para planificar tus proyectos de costura
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                <div className="sm:col-span-2 lg:col-span-1">
                  <XPBar />
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#E5E0D5] bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <span className="text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1A1A1A]">{engagement.streak}</p>
                    <p className="text-xs text-[#5C5C5C]">Días de racha</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#E5E0D5] bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1A1A1A]">{loyalty.totalPointsEarned}</p>
                    <p className="text-xs text-[#5C5C5C]">Puntos ganados</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#E5E0D5] bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1A1A1A]">{engagement.longestStreak}</p>
                    <p className="text-xs text-[#5C5C5C]">Mejor racha</p>
                  </div>
                </div>
              </motion.div>

              {/* Quick access cards */}
              <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                {[
                  { href: "/asesor", icon: "💬", title: "Asesor IA", desc: "Consejero experto en telas" },
                  { href: "/calculadora", icon: "📐", title: "Calculadora", desc: "Calcula cuánta tela necesitas" },
                  { href: "/proyectos", icon: "📋", title: "Proyectos", desc: "Planifica tus creaciones" },
                  { href: "/inspiracion", icon: "✨", title: "Inspiración", desc: "Ideas para tus diseños" },
                ].map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group rounded-xl border border-[#E5E0D5] bg-white p-5 shadow-sm transition-all hover:border-[#D4A843] hover:shadow-md"
                  >
                    <span className="text-2xl">{card.icon}</span>
                    <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-base font-bold text-[#1A1A1A] group-hover:text-[#1B3A5C]">
                      {card.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#5C5C5C]">{card.desc}</p>
                  </Link>
                ))}
              </motion.div>

              {/* Featured New Arrivals */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1A1A]">
                      Telas Recién Llegadas
                    </h3>
                    <p className="text-sm text-[#5C5C5C]">Las últimas novedades en nuestra tienda</p>
                  </div>
                  <Link
                    href="/novedades"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#C75B39] hover:text-[#D4A843] transition-colors"
                  >
                    Ver todas
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {latestArrivals.slice(0, 4).map((arrival) => (
                    <Link
                      key={arrival.id}
                      href="/novedades"
                      className="group overflow-hidden rounded-xl border border-[#E5E0D5] bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={arrival.image}
                          alt={arrival.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-[#C75B39] px-2 py-0.5 text-[10px] font-bold text-white">
                          <Sparkles className="h-2.5 w-2.5" />
                          ¡Nuevo!
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-[#1A1A1A] truncate">{arrival.name}</h4>
                        <p className="text-xs text-[#5C5C5C]">{arrival.type}</p>
                        <p className="mt-1 text-sm font-bold text-[#1B3A5C]">L. {arrival.pricePerMeter}/m</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  7. LOCATION PREVIEW                                         */}
      {/* ============================================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1B3A5C] sm:text-4xl lg:text-5xl">
              Visítanos en San Pedro Sula
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#D4A843]" />
          </motion.div>

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
            {/* Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B3A5C]/10">
                  <MapPin className="h-6 w-6 text-[#1B3A5C]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1B3A5C]">
                    Dirección
                  </h3>
                  <p className="mt-1 text-[#1A1A1A]/70">
                    Barrio El Benque, 6.ª Calle entre 10.ª y 11.ª Avenida SO
                    <br />
                    San Pedro Sula, Cortés, Honduras
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B3A5C]/10">
                  <Clock className="h-6 w-6 text-[#1B3A5C]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1B3A5C]">
                    Horario
                  </h3>
                  <div className="mt-1 space-y-1 text-[#1A1A1A]/70">
                    <p>
                      <span className="font-medium text-[#1A1A1A]">
                        Lunes a Viernes:
                      </span>{" "}
                      8:00 AM - 5:00 PM
                    </p>
                    <p>
                      <span className="font-medium text-[#1A1A1A]">
                        Sábado:
                      </span>{" "}
                      8:00 AM - 12:00 PM
                    </p>
                    <p>
                      <span className="font-medium text-[#1A1A1A]">
                        Domingo:
                      </span>{" "}
                      Cerrado
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B3A5C]/10">
                  <Phone className="h-6 w-6 text-[#1B3A5C]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1B3A5C]">
                    Teléfono
                  </h3>
                  <p className="mt-1 text-[#1A1A1A]/70">+504 9651-8484</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#C75B39] transition-colors hover:text-[#D4A843]"
                >
                  Cómo Llegar
                  <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              <iframe
                title="Ubicación de Comercial del Valle en San Pedro Sula"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.123456789!2d-88.0278!3d15.5036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSan%20Pedro%20Sula%2C%20Honduras!5e0!3m2!1ses!2shn!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
