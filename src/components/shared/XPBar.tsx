"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores";
import {
  getCurrentLevel,
  getNextLevel,
  getProgressToNextLevel,
} from "@/lib/gamification";

export default function XPBar() {
  const loyalty = useAppStore((s) => s.loyalty);
  const currentLevel = getCurrentLevel(loyalty.points);
  const nextLevel = getNextLevel(loyalty.points);
  const progress = getProgressToNextLevel(loyalty.points);

  return (
    <div className="rounded-xl border border-[#E5E0D5] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentLevel.icon}</span>
          <div>
            <p className={`text-sm font-semibold ${currentLevel.color}`}>
              {currentLevel.name}
            </p>
            <p className="text-xs text-[#5C5C5C]">
              {loyalty.points} puntos
            </p>
          </div>
        </div>
        {nextLevel && (
          <p className="text-xs text-[#5C5C5C]">
            Siguiente: {nextLevel.name} ({nextLevel.minPoints} pts)
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        />
      </div>

      {nextLevel && (
        <p className="mt-1.5 text-right text-[10px] text-[#5C5C5C]">
          {nextLevel.minPoints - loyalty.points} puntos para el siguiente nivel
        </p>
      )}
    </div>
  );
}
