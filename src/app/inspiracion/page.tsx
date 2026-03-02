"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Bookmark,
  X,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore, type InspirationItem, type InspirationCategory } from "@/stores";
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
    transition: { staggerChildren: 0.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES: InspirationCategory[] = [
  "Vestidos",
  "Faldas",
  "Camisas",
  "Decoración",
  "Accesorios",
];

const CATEGORY_COLORS: Record<InspirationCategory, string> = {
  Vestidos: "bg-pink-100 text-pink-700",
  Faldas: "bg-purple-100 text-purple-700",
  Camisas: "bg-blue-100 text-blue-700",
  "Decoración": "bg-amber-100 text-amber-700",
  Accesorios: "bg-emerald-100 text-emerald-700",
};

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1546085234-35ba03db67e1?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1615196534044-75f83f578827?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function InspiracionPage() {
  const { inspirations, addInspiration, removeInspiration, addPoints } =
    useAppStore();

  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState<InspirationCategory | "Todas">("Todas");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Vestidos" as InspirationCategory,
    imageUrl: "",
    fabricNotes: "",
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  function handleAdd() {
    if (!form.title.trim()) return;
    const item: InspirationItem = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      imageUrl: form.imageUrl.trim() || SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)],
      fabricNotes: form.fabricNotes.trim(),
      savedAt: new Date().toISOString(),
    };
    addInspiration(item);
    addPoints(POINT_ACTIONS.SAVE_INSPIRATION.action, POINT_ACTIONS.SAVE_INSPIRATION.points);
    setForm({ title: "", description: "", category: "Vestidos", imageUrl: "", fabricNotes: "" });
    setShowForm(false);
  }

  const filtered =
    filterCat === "Todas"
      ? inspirations
      : inspirations.filter((i) => i.category === filterCat);

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
              Biblioteca de Inspiración
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Guarda tus ideas de costura, patrones favoritos y referencia de diseños
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-md">
            <XPBar />
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="gap-1.5 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
          >
            <Plus className="h-4 w-4" />
            Nueva Inspiración
          </Button>
        </div>

        {/* New Inspiration Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-2xl border border-[#D4A843]/30 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1A1A1A]">Nueva Inspiración</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Título (ej: Vestido Floral de Verano)"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="border-[#E5E0D5]"
                />
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm({ ...form, category: v as InspirationCategory })
                  }
                >
                  <SelectTrigger className="border-[#E5E0D5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Descripción..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="border-[#E5E0D5] sm:col-span-2"
                />
                <Input
                  placeholder="URL de imagen de referencia (opcional)"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="border-[#E5E0D5]"
                />
                <Input
                  placeholder="Notas de telas (ej: Viscosa floral)"
                  value={form.fabricNotes}
                  onChange={(e) => setForm({ ...form, fabricNotes: e.target.value })}
                  className="border-[#E5E0D5]"
                />
              </div>
              <Button onClick={handleAdd} className="mt-4 bg-[#1B3A5C] text-white hover:bg-[#244D78]">
                Guardar Inspiración
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-[#5C5C5C]" />
          <button
            onClick={() => setFilterCat("Todas")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterCat === "Todas"
                ? "bg-[#1B3A5C] text-white"
                : "bg-gray-100 text-[#5C5C5C] hover:bg-gray-200"
            }`}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filterCat === cat
                  ? CATEGORY_COLORS[cat]
                  : "bg-gray-100 text-[#5C5C5C] hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E0D5] bg-white p-12 text-center">
            <Bookmark className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-[#5C5C5C]">No tienes inspiraciones guardadas.</p>
            <p className="text-sm text-[#5C5C5C]">Guarda ideas para tus próximos proyectos de costura.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                variants={scaleIn}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#E5E0D5] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => removeInspiration(item.id)}
                      className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[item.category]}`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-[#5C5C5C] line-clamp-2">{item.description}</p>
                  )}
                  {item.fabricNotes && (
                    <p className="mt-2 text-xs text-[#D4A843] font-medium">
                      Tela: {item.fabricNotes}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
