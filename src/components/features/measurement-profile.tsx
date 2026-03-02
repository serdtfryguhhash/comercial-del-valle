"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Trash2, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore, type BodyMeasurements } from "@/stores";
import { POINT_ACTIONS } from "@/lib/gamification";

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Measurement field config                                           */
/* ------------------------------------------------------------------ */

interface MeasField {
  key: keyof BodyMeasurements;
  label: string;
  description: string;
  placeholder: string;
}

const FIELDS: MeasField[] = [
  {
    key: "busto",
    label: "Busto",
    description: "Mida alrededor de la parte más prominente del busto",
    placeholder: "ej: 90",
  },
  {
    key: "cintura",
    label: "Cintura",
    description: "Mida en la parte más estrecha del torso",
    placeholder: "ej: 70",
  },
  {
    key: "cadera",
    label: "Cadera",
    description: "Mida alrededor de la parte más ancha de la cadera",
    placeholder: "ej: 96",
  },
  {
    key: "hombroAHombro",
    label: "Hombro a Hombro",
    description: "Mida de un extremo del hombro al otro",
    placeholder: "ej: 40",
  },
  {
    key: "espalda",
    label: "Ancho de Espalda",
    description: "Mida el ancho de la espalda entre las axilas",
    placeholder: "ej: 38",
  },
  {
    key: "largoBrazo",
    label: "Largo de Brazo",
    description: "Desde el hombro hasta la muñeca con el brazo relajado",
    placeholder: "ej: 60",
  },
  {
    key: "largoTorso",
    label: "Largo del Torso",
    description: "Desde el hombro hasta la cintura",
    placeholder: "ej: 42",
  },
  {
    key: "largoPierna",
    label: "Largo de Pierna",
    description: "Desde la cintura hasta el tobillo por el lado",
    placeholder: "ej: 105",
  },
  {
    key: "contornoCuello",
    label: "Contorno de Cuello",
    description: "Mida alrededor de la base del cuello",
    placeholder: "ej: 36",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MeasurementProfile() {
  const { measurements, setMeasurements, clearMeasurements, addPoints } =
    useAppStore();

  const [form, setForm] = useState<Record<keyof BodyMeasurements, string>>({
    busto: "",
    cintura: "",
    cadera: "",
    largoBrazo: "",
    largoPierna: "",
    espalda: "",
    hombroAHombro: "",
    largoTorso: "",
    contornoCuello: "",
  });

  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (measurements) {
      const updated: Record<string, string> = {};
      for (const key of Object.keys(measurements) as (keyof BodyMeasurements)[]) {
        updated[key] = measurements[key] ? String(measurements[key]) : "";
      }
      setForm(updated as Record<keyof BodyMeasurements, string>);
    }
  }, [measurements]);

  function handleSave() {
    const parsed: BodyMeasurements = {
      busto: parseFloat(form.busto) || 0,
      cintura: parseFloat(form.cintura) || 0,
      cadera: parseFloat(form.cadera) || 0,
      largoBrazo: parseFloat(form.largoBrazo) || 0,
      largoPierna: parseFloat(form.largoPierna) || 0,
      espalda: parseFloat(form.espalda) || 0,
      hombroAHombro: parseFloat(form.hombroAHombro) || 0,
      largoTorso: parseFloat(form.largoTorso) || 0,
      contornoCuello: parseFloat(form.contornoCuello) || 0,
    };
    setMeasurements(parsed);
    addPoints(
      POINT_ACTIONS.SAVE_MEASUREMENTS.action,
      POINT_ACTIONS.SAVE_MEASUREMENTS.points
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!mounted) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-[#1B3A5C]" />
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
            Mi Perfil de Medidas
          </h2>
        </div>
        {measurements && (
          <button
            onClick={clearMeasurements}
            className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Borrar
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-[#5C5C5C]">
        Guarda tus medidas corporales para que la calculadora de telas y el asesor IA
        puedan darte recomendaciones más precisas. Todas las medidas en centímetros (cm).
      </p>

      {/* Visual Body Diagram */}
      <div className="mb-6 rounded-xl bg-[#FAFAF7] p-6 text-center">
        <div className="relative mx-auto" style={{ width: 160, height: 320 }}>
          {/* Simple body silhouette SVG */}
          <svg viewBox="0 0 160 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Head */}
            <circle cx="80" cy="30" r="20" stroke="#1B3A5C" strokeWidth="2" fill="#E5E0D5" />
            {/* Neck */}
            <line x1="80" y1="50" x2="80" y2="65" stroke="#1B3A5C" strokeWidth="2" />
            {/* Shoulders */}
            <line x1="40" y1="75" x2="120" y2="75" stroke="#1B3A5C" strokeWidth="2" />
            {/* Torso */}
            <path d="M40 75 Q35 120 45 160 L55 170 Q80 175 105 170 L115 160 Q125 120 120 75" stroke="#1B3A5C" strokeWidth="2" fill="#FAFAF7" />
            {/* Arms */}
            <line x1="40" y1="75" x2="20" y2="170" stroke="#1B3A5C" strokeWidth="2" />
            <line x1="120" y1="75" x2="140" y2="170" stroke="#1B3A5C" strokeWidth="2" />
            {/* Legs */}
            <line x1="65" y1="170" x2="55" y2="300" stroke="#1B3A5C" strokeWidth="2" />
            <line x1="95" y1="170" x2="105" y2="300" stroke="#1B3A5C" strokeWidth="2" />

            {/* Measurement lines */}
            {/* Bust */}
            <line x1="30" y1="100" x2="130" y2="100" stroke="#D4A843" strokeWidth="1" strokeDasharray="4 2" />
            <text x="135" y="104" fill="#D4A843" fontSize="8" fontWeight="bold">Busto</text>
            {/* Waist */}
            <line x1="38" y1="130" x2="122" y2="130" stroke="#C75B39" strokeWidth="1" strokeDasharray="4 2" />
            <text x="127" y="134" fill="#C75B39" fontSize="8" fontWeight="bold">Cintura</text>
            {/* Hip */}
            <line x1="42" y1="160" x2="118" y2="160" stroke="#1B3A5C" strokeWidth="1" strokeDasharray="4 2" />
            <text x="123" y="164" fill="#1B3A5C" fontSize="8" fontWeight="bold">Cadera</text>
            {/* Shoulder */}
            <text x="42" y="70" fill="#5C5C5C" fontSize="7">Hombro a hombro</text>
          </svg>
        </div>
        <p className="mt-2 text-xs text-[#5C5C5C]">
          Diagrama de referencia para tomar medidas
        </p>
      </div>

      {/* Measurement Form */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
              {field.label}
            </label>
            <Input
              type="number"
              min={0}
              step={0.5}
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
              className="border-[#E5E0D5]"
            />
            <p className="mt-0.5 text-[10px] text-[#5C5C5C]">{field.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button
          onClick={handleSave}
          className="gap-1.5 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
        >
          <Save className="h-4 w-4" />
          Guardar Medidas
        </Button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-1 text-sm text-emerald-600"
          >
            <CheckCircle className="h-4 w-4" />
            Medidas guardadas
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
