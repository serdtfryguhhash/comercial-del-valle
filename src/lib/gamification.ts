/* ------------------------------------------------------------------ */
/*  Gamification / Loyalty Points System                               */
/* ------------------------------------------------------------------ */

export const POINT_ACTIONS = {
  BROWSE_CATALOG: { action: "Explorar catálogo", points: 5 },
  ADD_WISHLIST: { action: "Agregar a lista de deseos", points: 10 },
  COMPLETE_PROJECT: { action: "Completar proyecto", points: 100 },
  USE_AI_ADVISOR: { action: "Usar asesor IA", points: 15 },
  DAILY_VISIT: { action: "Visita diaria", points: 20 },
  SAVE_INSPIRATION: { action: "Guardar inspiración", points: 10 },
  SAVE_MEASUREMENTS: { action: "Guardar medidas", points: 25 },
  USE_CALCULATOR: { action: "Usar calculadora", points: 10 },
} as const;

export interface LoyaltyLevel {
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  bgColor: string;
  icon: string;
}

export const LOYALTY_LEVELS: LoyaltyLevel[] = [
  {
    name: "Cliente Nuevo",
    minPoints: 0,
    maxPoints: 99,
    color: "text-gray-600",
    bgColor: "bg-gray-200",
    icon: "🌱",
  },
  {
    name: "Cliente Frecuente",
    minPoints: 100,
    maxPoints: 499,
    color: "text-blue-600",
    bgColor: "bg-blue-200",
    icon: "⭐",
  },
  {
    name: "Cliente Estrella",
    minPoints: 500,
    maxPoints: 1499,
    color: "text-amber-600",
    bgColor: "bg-amber-200",
    icon: "🌟",
  },
  {
    name: "Cliente VIP",
    minPoints: 1500,
    maxPoints: Infinity,
    color: "text-purple-600",
    bgColor: "bg-purple-200",
    icon: "💎",
  },
];

export function getCurrentLevel(points: number): LoyaltyLevel {
  for (let i = LOYALTY_LEVELS.length - 1; i >= 0; i--) {
    if (points >= LOYALTY_LEVELS[i].minPoints) {
      return LOYALTY_LEVELS[i];
    }
  }
  return LOYALTY_LEVELS[0];
}

export function getNextLevel(points: number): LoyaltyLevel | null {
  const currentIdx = LOYALTY_LEVELS.findIndex(
    (l) => points >= l.minPoints && points <= l.maxPoints
  );
  if (currentIdx < LOYALTY_LEVELS.length - 1) {
    return LOYALTY_LEVELS[currentIdx + 1];
  }
  return null;
}

export function getProgressToNextLevel(points: number): number {
  const current = getCurrentLevel(points);
  const next = getNextLevel(points);
  if (!next) return 100;
  const range = next.minPoints - current.minPoints;
  const progress = points - current.minPoints;
  return Math.min(100, Math.round((progress / range) * 100));
}
