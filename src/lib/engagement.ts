/* ------------------------------------------------------------------ */
/*  Daily Visit Streak & Engagement Helpers                            */
/* ------------------------------------------------------------------ */

export function getStreakMessage(streak: number): string {
  if (streak <= 0) return "¡Bienvenido!";
  if (streak === 1) return "¡Primera visita del día!";
  if (streak < 3) return `${streak} días seguidos`;
  if (streak < 7) return `¡${streak} días seguidos! ¡Sigue así!`;
  if (streak < 14) return `¡${streak} días seguidos! ¡Increíble!`;
  if (streak < 30) return `¡${streak} días seguidos! ¡Eres imparable!`;
  return `¡${streak} días seguidos! ¡Leyenda!`;
}

export function getStreakEmoji(streak: number): string {
  if (streak <= 0) return "👋";
  if (streak < 3) return "🔥";
  if (streak < 7) return "🔥🔥";
  if (streak < 14) return "🔥🔥🔥";
  if (streak < 30) return "⚡";
  return "💎";
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("es-HN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function timeAgo(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Justo ahora";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  return formatDate(date);
}
