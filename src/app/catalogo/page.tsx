"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type Category =
  | "Todos"
  | "Estampadas"
  | "Lisas"
  | "Eventos"
  | "Deportivas"
  | "Impermeables"
  | "Hogar";

interface Product {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
}

const CATEGORIES: Category[] = [
  "Todos",
  "Estampadas",
  "Lisas",
  "Eventos",
  "Deportivas",
  "Impermeables",
  "Hogar",
];

const CATEGORY_COLORS: Record<string, string> = {
  Estampadas: "bg-[#C75B39] text-white",
  Lisas: "bg-[#1B3A5C] text-white",
  Eventos: "bg-[#D4A843] text-white",
  Deportivas: "bg-emerald-600 text-white",
  Impermeables: "bg-sky-600 text-white",
  Hogar: "bg-amber-700 text-white",
};

const products: Product[] = [
  // --- Estampadas (7) ---
  {
    id: 1,
    name: "Algod\u00f3n Estampado Floral",
    category: "Estampadas",
    description:
      "Tela de algod\u00f3n suave con hermoso estampado de flores tropicales, ideal para vestidos y blusas.",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Viscosa Tropical",
    category: "Estampadas",
    description:
      "Estampado tropical vibrante en viscosa ligera, perfecta para ropa de verano.",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1546085234-35ba03db67e1?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Algod\u00f3n Abstracto",
    category: "Estampadas",
    description:
      "Dise\u00f1o abstracto moderno sobre algod\u00f3n premium de alta calidad.",
    price: 135,
    image:
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Popelina Geom\u00e9trica",
    category: "Estampadas",
    description:
      "Patrones geom\u00e9tricos elegantes en popelina de algod\u00f3n, ideal para camisas.",
    price: 115,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Sat\u00e9n Animal Print",
    category: "Estampadas",
    description:
      "Estampado animal print en sat\u00e9n brillante para prendas con actitud.",
    price: 175,
    image:
      "https://images.unsplash.com/photo-1615196534044-75f83f578827?w=600&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Algod\u00f3n Paisley",
    category: "Estampadas",
    description:
      "Cl\u00e1sico estampado paisley en algod\u00f3n, perfecto para proyectos de decoraci\u00f3n.",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop",
  },
  {
    id: 7,
    name: "Jersey Rayas Marineras",
    category: "Estampadas",
    description:
      "Rayas cl\u00e1sicas azul y blanco en jersey de algod\u00f3n el\u00e1stico.",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb2dc?w=600&h=600&fit=crop",
  },

  // --- Lisas (5) ---
  {
    id: 8,
    name: "Algod\u00f3n Pima Blanco",
    category: "Lisas",
    description:
      "Algod\u00f3n pima de fibra larga, suavidad excepcional para prendas b\u00e1sicas.",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=600&fit=crop",
  },
  {
    id: 9,
    name: "Lino Natural Beige",
    category: "Lisas",
    description:
      "Lino 100% natural, fresco y transpirable para el clima hondure\u00f1o.",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=600&h=600&fit=crop",
  },
  {
    id: 10,
    name: "Popelina Color Terracota",
    category: "Lisas",
    description:
      "Popelina de algod\u00f3n en tono terracota, vers\u00e1til para m\u00faltiples proyectos.",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1558618019-6be1f88f4cb2?w=600&h=600&fit=crop",
  },
  {
    id: 11,
    name: "Gabardina Azul Marino",
    category: "Lisas",
    description:
      "Gabardina resistente ideal para pantalones, faldas y uniformes escolares.",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=600&h=600&fit=crop",
  },
  {
    id: 12,
    name: "Drill de Algod\u00f3n Verde Olivo",
    category: "Lisas",
    description:
      "Tela drill de gran durabilidad, perfecta para pantalones y ropa de trabajo.",
    price: 105,
    image:
      "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?w=600&h=600&fit=crop",
  },

  // --- Eventos (5) ---
  {
    id: 13,
    name: "Sat\u00edn Brillante Dorado",
    category: "Eventos",
    description:
      "Sat\u00edn de lujo con brillo dorado, perfecto para vestidos de gala y decoraci\u00f3n de eventos.",
    price: 225,
    image:
      "https://images.unsplash.com/photo-1550639524-a6f58345a2ca?w=600&h=600&fit=crop",
  },
  {
    id: 14,
    name: "Organza Cristal",
    category: "Eventos",
    description:
      "Organza transparente con acabado cristalino, ideal para decoraciones y velos.",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&h=600&fit=crop",
  },
  {
    id: 15,
    name: "Tul Iluvi\u00f3n Blanco",
    category: "Eventos",
    description:
      "Tul suave para faldas de ballet, decoraciones y vestidos de novia.",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1522684462852-01b24e76b77d?w=600&h=600&fit=crop",
  },
  {
    id: 16,
    name: "Encaje Chantilly",
    category: "Eventos",
    description:
      "Encaje fino franc\u00e9s, dise\u00f1o delicado para vestidos de novia y alta costura.",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
  },
  {
    id: 17,
    name: "Terciopelo Borgoña",
    category: "Eventos",
    description:
      "Terciopelo premium de pelo corto, lujoso al tacto para vestidos y decoraci\u00f3n.",
    price: 285,
    image:
      "https://images.unsplash.com/photo-1528459584353-5297db1a9c01?w=600&h=600&fit=crop",
  },

  // --- Deportivas (4) ---
  {
    id: 18,
    name: "Lycra Deportiva Premium",
    category: "Deportivas",
    description:
      "Lycra de alta compresi\u00f3n con protecci\u00f3n UV, ideal para leggins y ropa deportiva.",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop",
  },
  {
    id: 19,
    name: "Mesh Deportivo Transpirable",
    category: "Deportivas",
    description:
      "Malla transpirable de alto rendimiento para camisetas y ropa de gimnasio.",
    price: 135,
    image:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&h=600&fit=crop",
  },
  {
    id: 20,
    name: "Dry-Fit Profesional",
    category: "Deportivas",
    description:
      "Tela tecnol\u00f3gica de secado r\u00e1pido para uniformes deportivos profesionales.",
    price: 155,
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=600&fit=crop",
  },
  {
    id: 21,
    name: "Spandex Compresi\u00f3n",
    category: "Deportivas",
    description:
      "Spandex de alta elasticidad para prendas de compresi\u00f3n y trajes de ba\u00f1o.",
    price: 175,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop",
  },

  // --- Impermeables (4) ---
  {
    id: 22,
    name: "Lona N\u00e1utica Resistente",
    category: "Impermeables",
    description:
      "Lona impermeable de alta resistencia para toldos, cubiertas y uso marino.",
    price: 195,
    image:
      "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=600&h=600&fit=crop",
  },
  {
    id: 23,
    name: "Nylon Impermeable",
    category: "Impermeables",
    description:
      "Nylon ligero 100% impermeable, perfecto para impermeables y bolsos.",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1523380677598-64b7b3a0561e?w=600&h=600&fit=crop",
  },
  {
    id: 24,
    name: "PVC Transparente",
    category: "Impermeables",
    description:
      "L\u00e1mina de PVC transparente flexible para manteles, cubiertas y protecci\u00f3n.",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=600&h=600&fit=crop",
  },
  {
    id: 25,
    name: "Tela para Toldo UV",
    category: "Impermeables",
    description:
      "Tela con protecci\u00f3n UV y repelente al agua para toldos y sombrillas.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=600&h=600&fit=crop",
  },

  // --- Hogar (5) ---
  {
    id: 26,
    name: "Tela para Cortinas Blackout",
    category: "Hogar",
    description:
      "Tela blackout que bloquea el 99% de la luz, ideal para dormitorios.",
    price: 185,
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=600&fit=crop",
  },
  {
    id: 27,
    name: "Tapizer\u00eda Chenille",
    category: "Hogar",
    description:
      "Chenille de alta resistencia para tapizado de muebles y sof\u00e1s.",
    price: 265,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
  },
  {
    id: 28,
    name: "Lona Canvas Natural",
    category: "Hogar",
    description:
      "Canvas 100% algod\u00f3n para bolsos, cojines y proyectos de manualidades.",
    price: 115,
    image:
      "https://images.unsplash.com/photo-1534889156217-d643df14f14a?w=600&h=600&fit=crop",
  },
  {
    id: 29,
    name: "Fleece Polar Suave",
    category: "Hogar",
    description:
      "Fleece polar ultra suave para cobijas, pijamas y mantas infantiles.",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=600&h=600&fit=crop",
  },
  {
    id: 30,
    name: "Yute Decorativo",
    category: "Hogar",
    description:
      "Tela de yute natural para caminos de mesa, decoraci\u00f3n r\u00fastica y manualidades.",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop",
  },
];

/* ------------------------------------------------------------------ */
/*  WhatsApp SVG Icon                                                  */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({ product }: { product: Product }) {
  const whatsappUrl = `https://wa.me/50496518484?text=${encodeURIComponent(
    `Hola, me interesa el producto: ${product.name}`
  )}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${
            CATEGORY_COLORS[product.category] ?? "bg-gray-600 text-white"
          }`}
        >
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1A1A1A] leading-snug">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-xl font-bold text-[#1B3A5C]">
            L. {product.price}
            <span className="text-sm font-normal text-gray-500"> /yarda</span>
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1DA851]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar
        </a>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#1B3A5C] py-24 md:py-32">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&h=600&fit=crop"
          alt="Telas de fondo"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Nuestro Cat&aacute;logo de Telas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Encuentra la tela perfecta para tu proyecto
          </motion.p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-[#1B3A5C] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-sm text-gray-500"
        >
          Mostrando{" "}
          <span className="font-semibold text-[#1A1A1A]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "producto" : "productos"}
          {activeCategory !== "Todos" && (
            <>
              {" "}
              en{" "}
              <span className="font-semibold text-[#1B3A5C]">
                {activeCategory}
              </span>
            </>
          )}
        </motion.p>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1B3A5C] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-4xl">
            &iquest;No encuentras lo que buscas?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Cont&aacute;ctanos por WhatsApp y te ayudaremos a encontrar la tela
            ideal para tu proyecto.
          </p>
          <a
            href="https://wa.me/50496518484?text=Hola,%20busco%20una%20tela%20espec%C3%ADfica"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Escr&iacute;benos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
