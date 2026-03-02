"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Heart,
  FolderPlus,
  Scissors,
  Package,
  X,
  ChevronDown,
  ChevronUp,
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
import { useAppStore, type Project, type ProjectFabric, type WishlistItem } from "@/stores";
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

/* ------------------------------------------------------------------ */
/*  Fabric types for forms                                             */
/* ------------------------------------------------------------------ */

const FABRIC_TYPES = [
  "Algodón",
  "Lino",
  "Seda",
  "Poliéster",
  "Viscosa",
  "Satén",
  "Gabardina",
  "Drill",
  "Popelina",
  "Jersey",
  "Tul",
  "Encaje",
  "Mezclilla",
  "Chiffon",
  "Terciopelo",
  "Otro",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProyectosPage() {
  const {
    wishlist,
    removeFromWishlist,
    projects,
    addProject,
    removeProject,
    addFabricToProject,
    removeFabricFromProject,
    addPoints,
  } = useAppStore();

  const [showNewProject, setShowNewProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Fabric form for adding to project
  const [addingFabricTo, setAddingFabricTo] = useState<string | null>(null);
  const [fabricForm, setFabricForm] = useState({
    fabricName: "",
    fabricType: "Algodón",
    quantityMeters: 1,
    color: "",
    pricePerMeter: 100,
    notes: "",
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  function handleCreateProject() {
    if (!projectName.trim()) return;
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: projectName.trim(),
      description: projectDesc.trim(),
      fabrics: [],
      createdAt: new Date().toISOString(),
    };
    addProject(newProject);
    setProjectName("");
    setProjectDesc("");
    setShowNewProject(false);
    addPoints(POINT_ACTIONS.ADD_WISHLIST.action, POINT_ACTIONS.ADD_WISHLIST.points);
  }

  function handleAddFabric(projectId: string) {
    if (!fabricForm.fabricName.trim()) return;
    const fabric: ProjectFabric = {
      id: crypto.randomUUID(),
      fabricName: fabricForm.fabricName.trim(),
      fabricType: fabricForm.fabricType,
      quantityMeters: fabricForm.quantityMeters,
      color: fabricForm.color.trim(),
      pricePerMeter: fabricForm.pricePerMeter,
      notes: fabricForm.notes.trim(),
    };
    addFabricToProject(projectId, fabric);
    setFabricForm({
      fabricName: "",
      fabricType: "Algodón",
      quantityMeters: 1,
      color: "",
      pricePerMeter: 100,
      notes: "",
    });
    setAddingFabricTo(null);
  }

  function handleAddWishlistToProject(projectId: string, item: WishlistItem) {
    const fabric: ProjectFabric = {
      id: crypto.randomUUID(),
      fabricName: item.fabricName,
      fabricType: item.fabricType,
      quantityMeters: 1,
      color: item.color,
      pricePerMeter: item.pricePerMeter,
      notes: "Agregado desde lista de deseos",
    };
    addFabricToProject(projectId, fabric);
  }

  function getTotalFabric(project: Project) {
    return project.fabrics.reduce((sum, f) => sum + f.quantityMeters, 0);
  }

  function getTotalCost(project: Project) {
    return project.fabrics.reduce(
      (sum, f) => sum + f.quantityMeters * f.pricePerMeter,
      0
    );
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
            <motion.h1 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Mis Proyectos de Costura
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Planifica tus proyectos, organiza tus telas y calcula los costos
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* XP Bar */}
        <div className="mb-8 max-w-md">
          <XPBar />
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* ── Wishlist Column ── */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-[#C75B39]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                  Lista de Deseos
                </h2>
              </div>

              {wishlist.length === 0 ? (
                <p className="text-sm text-[#5C5C5C]">
                  Tu lista de deseos está vacía. Agrega telas desde el catálogo o novedades.
                </p>
              ) : (
                <div className="space-y-3">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between rounded-lg border border-gray-100 bg-[#FAFAF7] p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#1A1A1A]">
                          {item.fabricName}
                        </p>
                        <p className="text-xs text-[#5C5C5C]">
                          {item.fabricType} · {item.color} · L. {item.pricePerMeter}/m
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="ml-2 shrink-0 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Projects Column ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-[#1B3A5C]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1A1A]">
                  Proyectos
                </h2>
              </div>
              <Button
                onClick={() => setShowNewProject(true)}
                className="gap-1.5 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
              >
                <FolderPlus className="h-4 w-4" />
                Nuevo Proyecto
              </Button>
            </div>

            {/* New Project Form */}
            <AnimatePresence>
              {showNewProject && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden rounded-2xl border border-[#D4A843]/30 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Crear Nuevo Proyecto</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Nombre del proyecto (ej: Vestido de Verano)"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="border-[#E5E0D5]"
                    />
                    <Textarea
                      placeholder="Descripción del proyecto..."
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="border-[#E5E0D5]"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleCreateProject} className="bg-[#1B3A5C] text-white hover:bg-[#244D78]">
                        Crear Proyecto
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewProject(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Projects List */}
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E5E0D5] bg-white p-12 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-3 text-[#5C5C5C]">No tienes proyectos todavía.</p>
                <p className="text-sm text-[#5C5C5C]">Crea tu primer proyecto para empezar a planificar.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="rounded-2xl border border-[#E5E0D5] bg-white shadow-sm overflow-hidden"
                  >
                    {/* Project Header */}
                    <div
                      className="flex cursor-pointer items-center justify-between p-5"
                      onClick={() =>
                        setExpandedProject(
                          expandedProject === project.id ? null : project.id
                        )
                      }
                    >
                      <div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1A1A1A]">
                          {project.name}
                        </h3>
                        {project.description && (
                          <p className="mt-0.5 text-sm text-[#5C5C5C]">{project.description}</p>
                        )}
                        <div className="mt-2 flex gap-4 text-xs text-[#5C5C5C]">
                          <span>{project.fabrics.length} tela(s)</span>
                          <span>{getTotalFabric(project).toFixed(1)} metros totales</span>
                          <span className="font-semibold text-[#1B3A5C]">
                            L. {getTotalCost(project).toFixed(2)} estimado
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProject(project.id);
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {expandedProject === project.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-[#E5E0D5]"
                        >
                          <div className="p-5">
                            {/* Fabrics in project */}
                            {project.fabrics.length > 0 && (
                              <div className="mb-4 space-y-2">
                                {project.fabrics.map((fabric) => (
                                  <div
                                    key={fabric.id}
                                    className="flex items-center justify-between rounded-lg bg-[#FAFAF7] p-3"
                                  >
                                    <div>
                                      <p className="text-sm font-medium">{fabric.fabricName}</p>
                                      <p className="text-xs text-[#5C5C5C]">
                                        {fabric.fabricType} · {fabric.color} · {fabric.quantityMeters}m ×
                                        L.{fabric.pricePerMeter} ={" "}
                                        <span className="font-semibold">
                                          L.{(fabric.quantityMeters * fabric.pricePerMeter).toFixed(2)}
                                        </span>
                                      </p>
                                      {fabric.notes && (
                                        <p className="text-xs text-[#5C5C5C] italic mt-0.5">{fabric.notes}</p>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => removeFabricFromProject(project.id, fabric.id)}
                                      className="text-gray-400 hover:text-red-500"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add from wishlist */}
                            {wishlist.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs font-semibold uppercase text-[#5C5C5C] mb-2">
                                  Agregar desde Lista de Deseos
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {wishlist.map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => handleAddWishlistToProject(project.id, item)}
                                      className="inline-flex items-center gap-1 rounded-full bg-[#C75B39]/10 px-3 py-1 text-xs font-medium text-[#C75B39] hover:bg-[#C75B39]/20"
                                    >
                                      <Plus className="h-3 w-3" />
                                      {item.fabricName}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Add new fabric form */}
                            {addingFabricTo === project.id ? (
                              <div className="rounded-lg border border-[#D4A843]/30 bg-[#FAFAF7] p-4 space-y-3">
                                <p className="text-sm font-semibold text-[#1A1A1A]">Agregar Tela</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <Input
                                    placeholder="Nombre de la tela"
                                    value={fabricForm.fabricName}
                                    onChange={(e) =>
                                      setFabricForm({ ...fabricForm, fabricName: e.target.value })
                                    }
                                    className="border-[#E5E0D5] bg-white"
                                  />
                                  <Select
                                    value={fabricForm.fabricType}
                                    onValueChange={(v) =>
                                      setFabricForm({ ...fabricForm, fabricType: v })
                                    }
                                  >
                                    <SelectTrigger className="border-[#E5E0D5] bg-white">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {FABRIC_TYPES.map((t) => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    type="number"
                                    min={0.1}
                                    step={0.1}
                                    placeholder="Metros"
                                    value={fabricForm.quantityMeters}
                                    onChange={(e) =>
                                      setFabricForm({
                                        ...fabricForm,
                                        quantityMeters: parseFloat(e.target.value) || 0,
                                      })
                                    }
                                    className="border-[#E5E0D5] bg-white"
                                  />
                                  <Input
                                    placeholder="Color"
                                    value={fabricForm.color}
                                    onChange={(e) =>
                                      setFabricForm({ ...fabricForm, color: e.target.value })
                                    }
                                    className="border-[#E5E0D5] bg-white"
                                  />
                                  <Input
                                    type="number"
                                    min={1}
                                    placeholder="Precio por metro (L.)"
                                    value={fabricForm.pricePerMeter}
                                    onChange={(e) =>
                                      setFabricForm({
                                        ...fabricForm,
                                        pricePerMeter: parseFloat(e.target.value) || 0,
                                      })
                                    }
                                    className="border-[#E5E0D5] bg-white"
                                  />
                                  <Input
                                    placeholder="Notas"
                                    value={fabricForm.notes}
                                    onChange={(e) =>
                                      setFabricForm({ ...fabricForm, notes: e.target.value })
                                    }
                                    className="border-[#E5E0D5] bg-white"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleAddFabric(project.id)}
                                    className="bg-[#1B3A5C] text-white hover:bg-[#244D78]"
                                  >
                                    Agregar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setAddingFabricTo(null)}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setAddingFabricTo(project.id)}
                                className="gap-1"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                Agregar Tela
                              </Button>
                            )}

                            {/* Cost summary */}
                            {project.fabrics.length > 0 && (
                              <div className="mt-4 rounded-lg bg-[#1B3A5C]/5 p-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-[#5C5C5C]">Total de tela:</span>
                                  <span className="font-semibold">{getTotalFabric(project).toFixed(1)} metros</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-[#5C5C5C]">Costo estimado:</span>
                                  <span className="font-bold text-[#1B3A5C] text-base">
                                    L. {getTotalCost(project).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
