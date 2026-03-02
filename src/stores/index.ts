import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface WishlistItem {
  id: string;
  fabricName: string;
  fabricType: string;
  pricePerMeter: number;
  color: string;
  image?: string;
  addedAt: string;
}

export interface ProjectFabric {
  id: string;
  fabricName: string;
  fabricType: string;
  quantityMeters: number;
  color: string;
  pricePerMeter: number;
  notes: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  fabrics: ProjectFabric[];
  createdAt: string;
}

export type ProjectStatus = "idea" | "cortando" | "cosiendo" | "terminado";

export interface TrackedProject {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  fabrics: ProjectFabric[];
  steps: ProjectStep[];
  timeSpentMinutes: number;
  notes: string;
  createdAt: string;
  completedAt?: string;
}

export interface ProjectStep {
  id: string;
  name: string;
  completed: boolean;
}

export interface InspirationItem {
  id: string;
  title: string;
  description: string;
  category: InspirationCategory;
  imageUrl: string;
  fabricNotes: string;
  savedAt: string;
}

export type InspirationCategory =
  | "Vestidos"
  | "Faldas"
  | "Camisas"
  | "Decoración"
  | "Accesorios";

export interface BodyMeasurements {
  busto: number;
  cintura: number;
  cadera: number;
  largoBrazo: number;
  largoPierna: number;
  espalda: number;
  hombroAHombro: number;
  largoTorso: number;
  contornoCuello: number;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface LoyaltyState {
  points: number;
  totalPointsEarned: number;
  history: PointEvent[];
}

export interface PointEvent {
  id: string;
  action: string;
  points: number;
  timestamp: string;
}

export interface EngagementState {
  lastVisit: string | null;
  streak: number;
  longestStreak: number;
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

interface AppState {
  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Projects (planner)
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addFabricToProject: (projectId: string, fabric: ProjectFabric) => void;
  removeFabricFromProject: (projectId: string, fabricId: string) => void;

  // Tracked Projects (lifecycle)
  trackedProjects: TrackedProject[];
  addTrackedProject: (project: TrackedProject) => void;
  updateTrackedProject: (id: string, updates: Partial<TrackedProject>) => void;
  removeTrackedProject: (id: string) => void;
  updateProjectStatus: (id: string, status: ProjectStatus) => void;
  toggleProjectStep: (projectId: string, stepId: string) => void;
  addProjectStep: (projectId: string, step: ProjectStep) => void;

  // Inspiration
  inspirations: InspirationItem[];
  addInspiration: (item: InspirationItem) => void;
  removeInspiration: (id: string) => void;

  // Measurements
  measurements: BodyMeasurements | null;
  setMeasurements: (m: BodyMeasurements) => void;
  clearMeasurements: () => void;

  // Loyalty
  loyalty: LoyaltyState;
  addPoints: (action: string, points: number) => void;

  // Favorites (new arrivals)
  favorites: string[];
  toggleFavorite: (id: string) => void;

  // AI Conversations
  aiMessages: AIMessage[];
  addAIMessage: (message: AIMessage) => void;
  clearAIMessages: () => void;

  // Engagement
  engagement: EngagementState;
  recordVisit: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Wishlist ──
      wishlist: [],
      addToWishlist: (item) =>
        set((s) => ({ wishlist: [...s.wishlist, item] })),
      removeFromWishlist: (id) =>
        set((s) => ({ wishlist: s.wishlist.filter((w) => w.id !== id) })),
      isInWishlist: (id) => get().wishlist.some((w) => w.id === id),

      // ── Projects ──
      projects: [],
      addProject: (project) =>
        set((s) => ({ projects: [...s.projects, project] })),
      updateProject: (id, updates) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      removeProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
      addFabricToProject: (projectId, fabric) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId
              ? { ...p, fabrics: [...p.fabrics, fabric] }
              : p
          ),
        })),
      removeFabricFromProject: (projectId, fabricId) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId
              ? { ...p, fabrics: p.fabrics.filter((f) => f.id !== fabricId) }
              : p
          ),
        })),

      // ── Tracked Projects ──
      trackedProjects: [],
      addTrackedProject: (project) =>
        set((s) => ({ trackedProjects: [...s.trackedProjects, project] })),
      updateTrackedProject: (id, updates) =>
        set((s) => ({
          trackedProjects: s.trackedProjects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      removeTrackedProject: (id) =>
        set((s) => ({
          trackedProjects: s.trackedProjects.filter((p) => p.id !== id),
        })),
      updateProjectStatus: (id, status) =>
        set((s) => ({
          trackedProjects: s.trackedProjects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status,
                  completedAt:
                    status === "terminado"
                      ? new Date().toISOString()
                      : p.completedAt,
                }
              : p
          ),
        })),
      toggleProjectStep: (projectId, stepId) =>
        set((s) => ({
          trackedProjects: s.trackedProjects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  steps: p.steps.map((step) =>
                    step.id === stepId
                      ? { ...step, completed: !step.completed }
                      : step
                  ),
                }
              : p
          ),
        })),
      addProjectStep: (projectId, step) =>
        set((s) => ({
          trackedProjects: s.trackedProjects.map((p) =>
            p.id === projectId
              ? { ...p, steps: [...p.steps, step] }
              : p
          ),
        })),

      // ── Inspiration ──
      inspirations: [],
      addInspiration: (item) =>
        set((s) => ({ inspirations: [...s.inspirations, item] })),
      removeInspiration: (id) =>
        set((s) => ({
          inspirations: s.inspirations.filter((i) => i.id !== id),
        })),

      // ── Measurements ──
      measurements: null,
      setMeasurements: (m) => set({ measurements: m }),
      clearMeasurements: () => set({ measurements: null }),

      // ── Loyalty ──
      loyalty: { points: 0, totalPointsEarned: 0, history: [] },
      addPoints: (action, points) =>
        set((s) => ({
          loyalty: {
            points: s.loyalty.points + points,
            totalPointsEarned: s.loyalty.totalPointsEarned + points,
            history: [
              {
                id: crypto.randomUUID(),
                action,
                points,
                timestamp: new Date().toISOString(),
              },
              ...s.loyalty.history,
            ],
          },
        })),

      // ── Favorites ──
      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),

      // ── AI Messages ──
      aiMessages: [],
      addAIMessage: (message) =>
        set((s) => ({ aiMessages: [...s.aiMessages, message] })),
      clearAIMessages: () => set({ aiMessages: [] }),

      // ── Engagement ──
      engagement: { lastVisit: null, streak: 0, longestStreak: 0 },
      recordVisit: () =>
        set((s) => {
          const today = new Date().toISOString().split("T")[0];
          const lastVisit = s.engagement.lastVisit;

          if (lastVisit === today) return s;

          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
          const newStreak =
            lastVisit === yesterday ? s.engagement.streak + 1 : 1;

          return {
            engagement: {
              lastVisit: today,
              streak: newStreak,
              longestStreak: Math.max(newStreak, s.engagement.longestStreak),
            },
          };
        }),
    }),
    {
      name: "comercial-del-valle-storage",
    }
  )
);
