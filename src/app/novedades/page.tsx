"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Filter,
  Sparkles,
  Tag,
} from "lucide-react";
import { useAppStore, type WishlistItem } from "@/stores";
import { newArrivals, isNewArrival } from "@/data/new-arrivals";
import { POINT_ACTIONS } from "@/lib/gamification";
import XPBar from "@/components/shared/XPBar";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Category colors                                                    */
/* ------------------------------------------------------------------ */

const CATEGORY_COLORS: Record<string, string> = {
  Estampadas: "bg-[#C75B39]/10 text-[#C75B39]",
  Lisas: "bg-[#1B3A5C]/10 text-[#1B3A5C]",
  Eventos: "bg-[#D4A843]/10 text-[#D4A843]",
  Deportivas: "bg-emerald-100 text-emerald-700",
  Impermeables: "bg-sky-100 text-sky-700",
  Hogar: "bg-amber-100 text-amber-700",
};

const FILTER_CATEGORIES = [
  "Todas",
  "Estampadas",
  "Lisas",
  "Eventos",
  "Deportivas",
  "Impermeables",
  "Hogar",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NovedadesPage() {
  const { favorites, toggleFavorite, addToWishlist, wishlist, addPoints } =
    useAppStore();

  const [filterCat, setFilterCat] = useState("Todas");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = newArrivals
    .filter((a) => filterCat === "Todas" || a.category === filterCat)
    .filter((a) => !showFavoritesOnly || favorites.includes(a.id));

  function handleToggleFavorite(id: string) {
    toggleFavorite(id);
    if (!favorites.includes(id)) {
      addPoints(POINT_ACTIONS.ADD_WISHLIST.action, POINT_ACTIONS.ADD_WISHLIST.points);
    }
  }

  function handleAddToWishlist(arrival: typeof newArrivals[0]) {
    if (wishlist.some((w) => w.id === arrival.id)) return;
    const item: WishlistItem = {
      id: arrival.id,
      fabricName: arrival.name,
      fabricType: arrival.type,
      pricePerMeter: arrival.pricePerMeter,
      color: arrival.colors[0],
      image: arrival.image,
      addedAt: new Date().toISOString(),
    };
    addToWishlist(item);
    addPoints(POINT_ACTIONS.ADD_WISHLIST.action, POINT_ACTIONS.ADD_WISHLIST.points);
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1B3A5C] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)",
          backgroundSize: "20px 20px", backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
        }} />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mx-auto mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]" />
            <motion.h1 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl">
              Novedades
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Descubre las últimas telas que llegaron a Comercial del Valle
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 max-w-md">
          <XPBar />
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-[#5C5C5C]" />
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filterCat === cat
                  ? "bg-[#1B3A5C] text-white"
                  : "bg-gray-100 text-[#5C5C5C] hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                showFavoritesOnly
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-[#5C5C5C] hover:bg-gray-200"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${showFavoritesOnly ? "fill-current" : ""}`} />
              Favoritos
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E0D5] bg-white p-12 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-[#5C5C5C]">No se encontraron telas con este filtro.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((arrival) => {
              const isFav = favorites.includes(arrival.id);
              const isNew = isNewArrival(arrival.dateAdded);
              const isInWishlist = wishlist.some((w) => w.id === arrival.id);

              return (
                <motion.div
                  key={arrival.id}
                  variants={scaleIn}
                  className="group overflow-hidden rounded-2xl border border-[#E5E0D5] bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={arrival.image}
                      alt={arrival.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#C75B39] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                          <Sparkles className="h-3 w-3" />
                          ¡Nuevo!
                        </span>
                      )}
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[arrival.category]}`}>
                        {arrival.category}
                      </span>
                    </div>

                    {/* Favorite button */}
                    <button
                      onClick={() => handleToggleFavorite(arrival.id)}
                      className="absolute top-3 right-3 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          isFav ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-playfair)] text-sm font-bold text-[#1A1A1A] leading-tight">
                        {arrival.name}
                      </h3>
                      <span className="shrink-0 text-sm font-bold text-[#1B3A5C]">
                        L.{arrival.pricePerMeter}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#5C5C5C]">{arrival.type}</p>
                    <p className="mt-1.5 text-xs text-[#5C5C5C] line-clamp-2">
                      {arrival.description}
                    </p>

                    {/* Colors */}
                    <div className="mt-2 flex items-center gap-1">
                      <Tag className="h-3 w-3 text-[#D4A843]" />
                      <p className="text-[10px] text-[#5C5C5C] truncate">
                        {arrival.colors.join(", ")}
                      </p>
                    </div>

                    {/* Add to wishlist */}
                    <button
                      onClick={() => handleAddToWishlist(arrival)}
                      disabled={isInWishlist}
                      className={`mt-3 w-full rounded-lg py-2 text-xs font-semibold transition-colors ${
                        isInWishlist
                          ? "bg-emerald-50 text-emerald-600 cursor-default"
                          : "bg-[#1B3A5C]/5 text-[#1B3A5C] hover:bg-[#1B3A5C]/10"
                      }`}
                    >
                      {isInWishlist ? "En tu lista de deseos" : "Agregar a lista de deseos"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </main>
  );
}
