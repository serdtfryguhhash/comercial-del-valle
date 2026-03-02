"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/stores";
import { getStreakMessage } from "@/lib/engagement";
import { Flame } from "lucide-react";

export default function StreakBadge() {
  const engagement = useAppStore((s) => s.engagement);

  if (engagement.streak <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm"
    >
      <Flame className="h-3.5 w-3.5" />
      <span>{getStreakMessage(engagement.streak)}</span>
    </motion.div>
  );
}
