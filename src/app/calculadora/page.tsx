"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Ruler,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/stores";
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
/*  Garment types & calculation logic                                  */
/* ------------------------------------------------------------------ */

type GarmentType = "falda" | "vestido" | "camisa" | "pantalon" | "cortinas" | "mantel";

interface GarmentConfig {
  label: string;
  description: string;
  measurements: string[];
  calculate: (m: Record<string, number>) => CalculationResult;
}

interface CalculationResult {
  totalMeters: number;
  breakdown: { label: string; meters: number }[];
  seamAllowance: number;
  notes: string[];
}

const SEAM_ALLOWANCE_CM = 2.5;
const FABRIC_WIDTH_CM = 150; // Standard

const GARMENT_CONFIGS: Record<GarmentType, GarmentConfig> = {
  falda: {
    label: "Falda",
    description: "Falda recta o acampanada",
    measurements: ["cintura", "cadera", "largoFalda"],
    calculate: (m) => {
      const largoCm = m.largoFalda + SEAM_ALLOWANCE_CM * 2 + 5; // hem
      const anchoCm = m.cadera + SEAM_ALLOWANCE_CM * 2 + 10; // ease
      const panels = Math.ceil(anchoCm / FABRIC_WIDTH_CM);
      const metersBody = (largoCm * panels) / 100;
      const waistband = 0.15;
      const total = metersBody + waistband;
      return {
        totalMeters: Math.ceil(total * 10) / 10,
        breakdown: [
          { label: "Cuerpo de la falda", meters: Math.round(metersBody * 100) / 100 },
          { label: "Pretina", meters: waistband },
        ],
        seamAllowance: SEAM_ALLOWANCE_CM,
        notes: [
          `Cintura: ${m.cintura} cm`,
          `Cadera: ${m.cadera} cm`,
          `Largo: ${m.largoFalda} cm`,
          "Incluye 5 cm para dobladillo",
        ],
      };
    },
  },
  vestido: {
    label: "Vestido",
    description: "Vestido recto o entallado",
    measurements: ["busto", "cintura", "cadera", "largoVestido", "hombroAHombro"],
    calculate: (m) => {
      const bodiceLength = 45; // avg
      const skirtLength = m.largoVestido - bodiceLength;
      const bodiceMeters = ((bodiceLength + SEAM_ALLOWANCE_CM * 2) * 2) / 100;
      const skirtMeters = ((skirtLength + SEAM_ALLOWANCE_CM * 2 + 5) * Math.ceil((m.cadera + 10) / FABRIC_WIDTH_CM)) / 100;
      const sleeves = 0.5;
      const total = bodiceMeters + skirtMeters + sleeves;
      return {
        totalMeters: Math.ceil(total * 10) / 10,
        breakdown: [
          { label: "Cuerpo superior (corpiño)", meters: Math.round(bodiceMeters * 100) / 100 },
          { label: "Falda del vestido", meters: Math.round(skirtMeters * 100) / 100 },
          { label: "Mangas y extras", meters: sleeves },
        ],
        seamAllowance: SEAM_ALLOWANCE_CM,
        notes: [
          `Busto: ${m.busto} cm`,
          `Cintura: ${m.cintura} cm`,
          `Cadera: ${m.cadera} cm`,
          `Largo total: ${m.largoVestido} cm`,
          "Incluye tela adicional para mangas",
        ],
      };
    },
  },
  camisa: {
    label: "Camisa",
    description: "Camisa o blusa",
    measurements: ["busto", "hombroAHombro", "largoBrazo", "largoTorso"],
    calculate: (m) => {
      const bodyMeters = ((m.largoTorso + SEAM_ALLOWANCE_CM * 2 + 3) * 2) / 100;
      const sleeveMeters = ((m.largoBrazo + SEAM_ALLOWANCE_CM * 2) * 2) / 100;
      const collar = 0.15;
      const total = bodyMeters + sleeveMeters + collar;
      return {
        totalMeters: Math.ceil(total * 10) / 10,
        breakdown: [
          { label: "Cuerpo (frente y espalda)", meters: Math.round(bodyMeters * 100) / 100 },
          { label: "Mangas (2)", meters: Math.round(sleeveMeters * 100) / 100 },
          { label: "Cuello y extras", meters: collar },
        ],
        seamAllowance: SEAM_ALLOWANCE_CM,
        notes: [
          `Busto: ${m.busto} cm`,
          `Hombro a hombro: ${m.hombroAHombro} cm`,
          `Largo brazo: ${m.largoBrazo} cm`,
          `Largo torso: ${m.largoTorso} cm`,
        ],
      };
    },
  },
  pantalon: {
    label: "Pantalón",
    description: "Pantalón recto o slim",
    measurements: ["cintura", "cadera", "largoPierna"],
    calculate: (m) => {
      const legMeters = ((m.largoPierna + SEAM_ALLOWANCE_CM * 2 + 5) * 2) / 100;
      const waistband = 0.15;
      const total = legMeters + waistband + 0.2; // fly and pockets
      return {
        totalMeters: Math.ceil(total * 10) / 10,
        breakdown: [
          { label: "Piernas (2)", meters: Math.round(legMeters * 100) / 100 },
          { label: "Pretina", meters: waistband },
          { label: "Bragueta y bolsillos", meters: 0.2 },
        ],
        seamAllowance: SEAM_ALLOWANCE_CM,
        notes: [
          `Cintura: ${m.cintura} cm`,
          `Cadera: ${m.cadera} cm`,
          `Largo pierna: ${m.largoPierna} cm`,
          "Incluye 5 cm para dobladillo",
        ],
      };
    },
  },
  cortinas: {
    label: "Cortinas",
    description: "Par de cortinas para ventana",
    measurements: ["anchoVentana", "altoVentana"],
    calculate: (m) => {
      const fullness = 2; // double width for fullness
      const totalWidth = m.anchoVentana * fullness;
      const panels = Math.ceil(totalWidth / FABRIC_WIDTH_CM);
      const heightMeters = (m.altoVentana + 20 + 15) / 100; // +20 hem, +15 top
      const total = heightMeters * panels;
      return {
        totalMeters: Math.ceil(total * 10) / 10,
        breakdown: [
          { label: `${panels} panel(es) de cortina`, meters: Math.round(total * 100) / 100 },
        ],
        seamAllowance: 0,
        notes: [
          `Ancho ventana: ${m.anchoVentana} cm`,
          `Alto ventana: ${m.altoVentana} cm`,
          `Factor de plenitud: ${fullness}x`,
          `${panels} panel(es) necesario(s)`,
          "Incluye 20 cm para dobladillo inferior y 15 cm para cabecera",
        ],
      };
    },
  },
  mantel: {
    label: "Mantel",
    description: "Mantel rectangular",
    measurements: ["largoMesa", "anchoMesa", "caida"],
    calculate: (m) => {
      const totalLength = m.largoMesa + m.caida * 2 + SEAM_ALLOWANCE_CM * 2;
      const totalWidth = m.anchoMesa + m.caida * 2 + SEAM_ALLOWANCE_CM * 2;
      const panels = Math.ceil(totalWidth / FABRIC_WIDTH_CM);
      const meters = (totalLength * panels) / 100;
      return {
        totalMeters: Math.ceil(meters * 10) / 10,
        breakdown: [
          { label: "Mantel completo", meters: Math.round(meters * 100) / 100 },
        ],
        seamAllowance: SEAM_ALLOWANCE_CM,
        notes: [
          `Largo mesa: ${m.largoMesa} cm`,
          `Ancho mesa: ${m.anchoMesa} cm`,
          `Caída lateral: ${m.caida} cm`,
          `Tamaño final: ${totalLength} x ${totalWidth} cm`,
        ],
      };
    },
  },
};

const MEASUREMENT_LABELS: Record<string, string> = {
  busto: "Busto (cm)",
  cintura: "Cintura (cm)",
  cadera: "Cadera (cm)",
  largoBrazo: "Largo de brazo (cm)",
  largoPierna: "Largo de pierna (cm)",
  hombroAHombro: "Hombro a hombro (cm)",
  largoTorso: "Largo del torso (cm)",
  largoFalda: "Largo de la falda (cm)",
  largoVestido: "Largo del vestido (cm)",
  anchoVentana: "Ancho de la ventana (cm)",
  altoVentana: "Alto de la ventana (cm)",
  largoMesa: "Largo de la mesa (cm)",
  anchoMesa: "Ancho de la mesa (cm)",
  caida: "Caída del mantel (cm)",
};

const SIZE_CHART = [
  { size: "XS", busto: "80-84", cintura: "60-64", cadera: "86-90" },
  { size: "S", busto: "84-88", cintura: "64-68", cadera: "90-94" },
  { size: "M", busto: "88-92", cintura: "68-72", cadera: "94-98" },
  { size: "L", busto: "92-96", cintura: "72-76", cadera: "98-102" },
  { size: "XL", busto: "96-100", cintura: "76-80", cadera: "102-106" },
  { size: "XXL", busto: "100-104", cintura: "80-84", cadera: "106-110" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CalculadoraPage() {
  const { measurements, addPoints } = useAppStore();
  const [garmentType, setGarmentType] = useState<GarmentType>("falda");
  const [measurementValues, setMeasurementValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [pricePerMeter, setPricePerMeter] = useState(125);
  const [hasAwarded, setHasAwarded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const config = GARMENT_CONFIGS[garmentType];

  // Pre-fill from saved measurements
  useEffect(() => {
    if (measurements) {
      const prefilled: Record<string, number> = {};
      if (measurements.busto) prefilled.busto = measurements.busto;
      if (measurements.cintura) prefilled.cintura = measurements.cintura;
      if (measurements.cadera) prefilled.cadera = measurements.cadera;
      if (measurements.largoBrazo) prefilled.largoBrazo = measurements.largoBrazo;
      if (measurements.largoPierna) prefilled.largoPierna = measurements.largoPierna;
      if (measurements.hombroAHombro) prefilled.hombroAHombro = measurements.hombroAHombro;
      if (measurements.largoTorso) prefilled.largoTorso = measurements.largoTorso;
      setMeasurementValues((prev) => ({ ...prev, ...prefilled }));
    }
  }, [measurements]);

  function handleCalculate() {
    const allFilled = config.measurements.every(
      (m) => measurementValues[m] && measurementValues[m] > 0
    );
    if (!allFilled) return;

    const calcResult = config.calculate(measurementValues);
    setResult(calcResult);

    if (!hasAwarded) {
      addPoints(POINT_ACTIONS.USE_CALCULATOR.action, POINT_ACTIONS.USE_CALCULATOR.points);
      setHasAwarded(true);
    }
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
              Calculadora de Telas
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Calcula exactamente cuánta tela necesitas para tu proyecto
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 max-w-md">
          <XPBar />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator */}
          <div className="space-y-6">
            {/* Garment Type */}
            <div className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-[#1B3A5C]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                  Tipo de Prenda
                </h2>
              </div>
              <Select
                value={garmentType}
                onValueChange={(v) => {
                  setGarmentType(v as GarmentType);
                  setResult(null);
                }}
              >
                <SelectTrigger className="border-[#E5E0D5]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(GARMENT_CONFIGS).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>
                      {cfg.label} — {cfg.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Measurements */}
            <div className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="h-5 w-5 text-[#D4A843]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                  Medidas
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {config.measurements.map((key) => (
                  <div key={key}>
                    <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                      {MEASUREMENT_LABELS[key] || key}
                    </label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="cm"
                      value={measurementValues[key] || ""}
                      onChange={(e) =>
                        setMeasurementValues({
                          ...measurementValues,
                          [key]: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="border-[#E5E0D5]"
                    />
                  </div>
                ))}
              </div>

              {/* Price per meter */}
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">
                  Precio por metro (L.)
                </label>
                <Input
                  type="number"
                  min={1}
                  value={pricePerMeter}
                  onChange={(e) => setPricePerMeter(parseFloat(e.target.value) || 0)}
                  className="border-[#E5E0D5] max-w-[200px]"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="mt-4 w-full gap-1.5 bg-[#1B3A5C] text-white hover:bg-[#244D78]"
              >
                <Calculator className="h-4 w-4" />
                Calcular Tela
              </Button>
            </div>

            {/* Size Chart */}
            <div className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-[#5C5C5C]" />
                <h3 className="text-base font-semibold text-[#1A1A1A]">
                  Tabla de Tallas de Referencia (cm)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E0D5]">
                      <th className="px-3 py-2 text-left font-semibold text-[#1A1A1A]">Talla</th>
                      <th className="px-3 py-2 text-left font-semibold text-[#1A1A1A]">Busto</th>
                      <th className="px-3 py-2 text-left font-semibold text-[#1A1A1A]">Cintura</th>
                      <th className="px-3 py-2 text-left font-semibold text-[#1A1A1A]">Cadera</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="border-b border-gray-50">
                        <td className="px-3 py-2 font-medium text-[#1B3A5C]">{row.size}</td>
                        <td className="px-3 py-2 text-[#5C5C5C]">{row.busto}</td>
                        <td className="px-3 py-2 text-[#5C5C5C]">{row.cintura}</td>
                        <td className="px-3 py-2 text-[#5C5C5C]">{row.cadera}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="sticky top-24 space-y-4"
              >
                {/* Main Result */}
                <div className="rounded-2xl border border-[#D4A843]/30 bg-gradient-to-br from-[#1B3A5C] to-[#0f2440] p-8 text-white shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#D4A843]">
                    Resultado
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold">
                      {result.totalMeters}
                    </span>
                    <span className="mb-1 text-lg text-white/80">metros</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    de tela para {config.label.toLowerCase()}
                  </p>

                  <div className="mt-6 flex items-center justify-between rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div>
                      <p className="text-xs text-white/60">Costo estimado</p>
                      <p className="text-2xl font-bold text-[#D4A843]">
                        L. {(result.totalMeters * pricePerMeter).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right text-xs text-white/60">
                      <p>{result.totalMeters} m × L. {pricePerMeter}/m</p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-[#1A1A1A] mb-3">
                    Desglose del Cálculo
                  </h3>
                  <div className="space-y-2">
                    {result.breakdown.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-[#FAFAF7] px-4 py-2.5"
                      >
                        <span className="text-sm text-[#5C5C5C]">{item.label}</span>
                        <span className="text-sm font-semibold text-[#1A1A1A]">
                          {item.meters} m
                        </span>
                      </div>
                    ))}
                  </div>
                  {result.seamAllowance > 0 && (
                    <p className="mt-3 text-xs text-[#5C5C5C]">
                      * Margen de costura incluido: {result.seamAllowance} cm por lado
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="rounded-2xl border border-[#E5E0D5] bg-white p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-[#1A1A1A] mb-3">
                    Detalles
                  </h3>
                  <ul className="space-y-1">
                    {result.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#5C5C5C]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
                        {note}
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm text-[#5C5C5C]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A843]" />
                      Ancho estándar de tela: {FABRIC_WIDTH_CM} cm
                    </li>
                  </ul>
                  <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                    Nota: Este cálculo es una estimación. Recomendamos comprar un 10% extra
                    para imprevistos. Visítenos en Comercial del Valle para asesoría
                    personalizada.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="sticky top-24 rounded-2xl border border-dashed border-[#E5E0D5] bg-white p-12 text-center">
                <Calculator className="mx-auto h-16 w-16 text-gray-200" />
                <p className="mt-4 text-[#5C5C5C]">
                  Selecciona el tipo de prenda, ingresa tus medidas y calcula la tela necesaria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
