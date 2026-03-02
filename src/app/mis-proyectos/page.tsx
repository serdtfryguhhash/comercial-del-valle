"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  Clock,
  Award,
  Lightbulb,
  Scissors,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAppStore,
  type TrackedProject,
  type ProjectStep,
  type ProjectStatus,
} from "@/stores";
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
/*  Status helpers                                                     */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; bgColor: string; icon: React.ReactNode }
> = {
  idea: {
    label: "Idea",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  cortando: {
    label: "Cortando",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    icon: <Scissors className="h-4 w-4" />,
  },
  cosiendo: {
    label: "Cosiendo",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    icon: <Clock className="h-4 w-4" />,
  },
  terminado: {
    label: "Terminado",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    icon: <CheckCircle className="h-4 w-4" />,
  },
};

const STATUS_ORDER: ProjectStatus[] = ["idea", "cortando", "cosiendo", "terminado"];

function getNextStatus(current: ProjectStatus): ProjectStatus | null {
  const idx = STATUS_ORDER.indexOf(current);
  return idx < STATUS_ORDER.length - 1 ? STATUS_ORDER[idx + 1] : null;
}

/* ------------------------------------------------------------------ */
/*  Achievement badges                                                 */
/* ------------------------------------------------------------------ */

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (projects: TrackedProject[]) => boolean;
}

const BADGES: Badge[] = [
  {
    id: "first-project",
    name: "Primera Creación",
    description: "Completar tu primer proyecto",
    icon: "🎉",
    requirement: (p) => p.filter((pr) => pr.status === "terminado").length >= 1,
  },
  {
    id: "three-projects",
    name: "Costurera Dedicada",
    description: "Completar 3 proyectos",
    icon: "⭐",
    requirement: (p) => p.filter((pr) => pr.status === "terminado").length >= 3,
  },
  {
    id: "five-projects",
    name: "Maestra de la Aguja",
    description: "Completar 5 proyectos",
    icon: "👑",
    requirement: (p) => p.filter((pr) => pr.status === "terminado").length >= 5,
  },
  {
    id: "multi-tasker",
    name: "Multitarea",
    description: "Tener 3+ proyectos activos",
    icon: "🔥",
    requirement: (p) => p.filter((pr) => pr.status !== "terminado").length >= 3,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MisProyectosPage() {
  const {
    trackedProjects,
    addTrackedProject,
    removeTrackedProject,
    updateProjectStatus,
    toggleProjectStep,
    addProjectStep,
    updateTrackedProject,
    addPoints,
  } = useAppStore();

  const [showNewForm, setShowNewForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newStepName, setNewStepName] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "todos">("todos");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  function handleCreate() {
    if (!name.trim()) return;
    const project: TrackedProject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: desc.trim(),
      status: "idea",
      fabrics: [],
      steps: [],
      timeSpentMinutes: 0,
      notes: "",
      createdAt: new Date().toISOString(),
    };
    addTrackedProject(project);
    setName("");
    setDesc("");
    setShowNewForm(false);
  }

  function handleAdvanceStatus(id: string, currentStatus: ProjectStatus) {
    const next = getNextStatus(currentStatus);
    if (next) {
      updateProjectStatus(id, next);
      if (next === "terminado") {
        addPoints(
          POINT_ACTIONS.COMPLETE_PROJECT.action,
          POINT_ACTIONS.COMPLETE_PROJECT.points
        );
      }
    }
  }

  function handleAddStep(projectId: string) {
    if (!newStepName.trim()) return;
    const step: ProjectStep = {
      id: crypto.randomUUID(),
      name: newStepName.trim(),
      completed: false,
    };
    addProjectStep(projectId, step);
    setNewStepName("");
  }

  function getProgress(project: TrackedProject): number {
    const statusWeight =
      STATUS_ORDER.indexOf(project.status) / (STATUS_ORDER.length - 1);
    if (project.steps.length === 0) return Math.round(statusWeight * 100);
    const stepsComplete =
      project.steps.filter((s) => s.completed).length / project.steps.length;
    return Math.round((statusWeight * 0.5 + stepsComplete * 0.5) * 100);
  }

  const earnedBadges = BADGES.filter((b) => b.requirement(trackedProjects));
  const filteredProjects =
    filterStatus === "todos"
      ? trackedProjects
      : trackedProjects.filter((p) => p.status === filterStatus);

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
              Seguimiento de Proyectos
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Lleva el control de cada proyecto desde la idea hasta el producto terminado
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
            onClick={() => setShowNewForm(true)}
            className="gap-1.5 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
          >
            <Plus className="h-4 w-4" />
            Nuevo Proyecto
          </Button>
        </div>

        {/* Achievement Badges */}
        {earnedBadges.length > 0 && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-[#D4A843]" />
              <h3 className="font-semibold text-[#1A1A1A]">Tus Logros</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10 px-4 py-2"
                >
                  <span className="text-lg">{badge.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{badge.name}</p>
                    <p className="text-[10px] text-[#5C5C5C]">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* New Project Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-2xl border border-[#D4A843]/30 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Nuevo Proyecto</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Nombre del proyecto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#E5E0D5]"
                />
                <Textarea
                  placeholder="Descripción..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="border-[#E5E0D5]"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCreate} className="bg-[#1B3A5C] text-white hover:bg-[#244D78]">
                    Crear
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("todos")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterStatus === "todos"
                ? "bg-[#1B3A5C] text-white"
                : "bg-gray-100 text-[#5C5C5C] hover:bg-gray-200"
            }`}
          >
            Todos ({trackedProjects.length})
          </button>
          {STATUS_ORDER.map((status) => {
            const config = STATUS_CONFIG[status];
            const count = trackedProjects.filter((p) => p.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? `${config.bgColor} ${config.color}`
                    : "bg-gray-100 text-[#5C5C5C] hover:bg-gray-200"
                }`}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Project Cards */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E0D5] bg-white p-12 text-center">
            <Scissors className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-[#5C5C5C]">No hay proyectos en esta categoría.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const config = STATUS_CONFIG[project.status];
              const progress = getProgress(project);
              const nextStatus = getNextStatus(project.status);
              const isExpanded = expandedId === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="rounded-2xl border border-[#E5E0D5] bg-white shadow-sm overflow-hidden"
                >
                  {/* Header */}
                  <div
                    className="cursor-pointer p-5"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bgColor} ${config.color}`}>
                            {config.icon}
                            {config.label}
                          </span>
                          {project.status === "terminado" && (
                            <span className="text-xs text-emerald-600 font-semibold">
                              Completado
                            </span>
                          )}
                        </div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1A1A1A]">
                          {project.name}
                        </h3>
                        {project.description && (
                          <p className="mt-0.5 text-sm text-[#5C5C5C]">{project.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-[#5C5C5C] mb-1">
                        <span>Progreso</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <motion.div
                          className={`h-full rounded-full ${
                            project.status === "terminado"
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-[#E5E0D5]"
                      >
                        <div className="p-5 space-y-4">
                          {/* Status Pipeline */}
                          <div>
                            <p className="text-xs font-semibold uppercase text-[#5C5C5C] mb-3">
                              Estado del Proyecto
                            </p>
                            <div className="flex items-center gap-2">
                              {STATUS_ORDER.map((status, i) => {
                                const sc = STATUS_CONFIG[status];
                                const isCurrent = project.status === status;
                                const isPast = STATUS_ORDER.indexOf(project.status) > i;
                                return (
                                  <div key={status} className="flex items-center gap-2">
                                    <div
                                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                                        isCurrent
                                          ? `${sc.bgColor} ${sc.color} ring-2 ring-offset-1 ring-current`
                                          : isPast
                                          ? "bg-emerald-100 text-emerald-600"
                                          : "bg-gray-100 text-gray-400"
                                      }`}
                                    >
                                      {sc.icon}
                                      <span className="hidden sm:inline">{sc.label}</span>
                                    </div>
                                    {i < STATUS_ORDER.length - 1 && (
                                      <ArrowRight className="h-3 w-3 text-gray-300" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Steps Checklist */}
                          <div>
                            <p className="text-xs font-semibold uppercase text-[#5C5C5C] mb-2">
                              Pasos del Proyecto
                            </p>
                            {project.steps.length > 0 && (
                              <div className="space-y-1.5 mb-3">
                                {project.steps.map((step) => (
                                  <button
                                    key={step.id}
                                    onClick={() => toggleProjectStep(project.id, step.id)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-[#FAFAF7]"
                                  >
                                    {step.completed ? (
                                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                                    ) : (
                                      <Circle className="h-4 w-4 shrink-0 text-gray-300" />
                                    )}
                                    <span
                                      className={`text-sm ${
                                        step.completed
                                          ? "text-[#5C5C5C] line-through"
                                          : "text-[#1A1A1A]"
                                      }`}
                                    >
                                      {step.name}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Agregar paso..."
                                value={expandedId === project.id ? newStepName : ""}
                                onChange={(e) => setNewStepName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleAddStep(project.id);
                                }}
                                className="h-9 border-[#E5E0D5] text-sm"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddStep(project.id)}
                                className="h-9"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>

                          {/* Time tracker */}
                          <div>
                            <p className="text-xs font-semibold uppercase text-[#5C5C5C] mb-2">
                              Tiempo Invertido
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 text-sm text-[#1A1A1A]">
                                <Clock className="h-4 w-4 text-[#D4A843]" />
                                <span>{Math.floor(project.timeSpentMinutes / 60)}h {project.timeSpentMinutes % 60}min</span>
                              </div>
                              <div className="flex gap-1">
                                {[15, 30, 60].map((mins) => (
                                  <button
                                    key={mins}
                                    onClick={() =>
                                      updateTrackedProject(project.id, {
                                        timeSpentMinutes: project.timeSpentMinutes + mins,
                                      })
                                    }
                                    className="rounded-md bg-[#FAFAF7] px-2 py-1 text-xs text-[#5C5C5C] hover:bg-[#E5E0D5]"
                                  >
                                    +{mins}min
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <p className="text-xs font-semibold uppercase text-[#5C5C5C] mb-2">Notas</p>
                            <Textarea
                              value={project.notes}
                              onChange={(e) =>
                                updateTrackedProject(project.id, { notes: e.target.value })
                              }
                              placeholder="Agrega notas sobre el proyecto..."
                              className="min-h-[60px] border-[#E5E0D5] text-sm"
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#E5E0D5]">
                            {nextStatus ? (
                              <Button
                                size="sm"
                                onClick={() => handleAdvanceStatus(project.id, project.status)}
                                className="gap-1 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
                              >
                                <ArrowRight className="h-3.5 w-3.5" />
                                Avanzar a {STATUS_CONFIG[nextStatus].label}
                              </Button>
                            ) : (
                              <span className="text-sm font-semibold text-emerald-600">
                                Proyecto completado
                              </span>
                            )}
                            <button
                              onClick={() => removeTrackedProject(project.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
