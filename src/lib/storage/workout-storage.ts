/**
 * 🗄️ SISTEMA DE ARMAZENAMENTO LOCAL PARA TREINOS
 * Suporta modo offline com sincronização futura
 */

import { 
  WorkoutSession, 
  WorkoutTemplate, 
  ExerciseHistory, 
  WorkoutStreak,
  WorkoutStats,
  calculateExerciseVolume,
  getBestSet
} from "@/lib/types/workout";

const STORAGE_KEYS = {
  SESSIONS: "workout_sessions",
  TEMPLATES: "workout_templates",
  HISTORY: "exercise_history",
  STREAK: "workout_streak",
  STATS: "workout_stats",
  PENDING_SYNC: "pending_sync"
};

/**
 * Salvar sessão de treino
 */
export function saveWorkoutSession(session: WorkoutSession): void {
  const sessions = getWorkoutSessions();
  const existingIndex = sessions.findIndex(s => s.id === session.id);
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  
  // Atualizar histórico por exercício
  updateExerciseHistory(session);
  
  // Atualizar streak
  updateWorkoutStreak(session.date);
  
  // Atualizar estatísticas
  updateWorkoutStats();
  
  // Marcar para sincronização futura
  markForSync(session.id);
}

/**
 * Obter todas as sessões de treino
 */
export function getWorkoutSessions(): WorkoutSession[] {
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return data ? JSON.parse(data) : [];
}

/**
 * Obter sessão específica
 */
export function getWorkoutSession(id: string): WorkoutSession | null {
  const sessions = getWorkoutSessions();
  return sessions.find(s => s.id === id) || null;
}

/**
 * Obter última sessão de um template específico
 */
export function getLastWorkoutByTemplate(templateId: string): WorkoutSession | null {
  const sessions = getWorkoutSessions()
    .filter(s => s.workoutTemplateId === templateId)
    .sort((a, b) => b.date - a.date);
  
  return sessions[0] || null;
}

/**
 * Obter última sessão com exercício específico
 */
export function getLastWorkoutWithExercise(exerciseId: string): WorkoutSession | null {
  const sessions = getWorkoutSessions()
    .filter(s => s.exercises.some(ex => ex.exerciseId === exerciseId))
    .sort((a, b) => b.date - a.date);
  
  return sessions[0] || null;
}

/**
 * Atualizar histórico por exercício
 */
function updateExerciseHistory(session: WorkoutSession): void {
  const histories = getExerciseHistories();
  
  for (const exercise of session.exercises) {
    if (!exercise.completed) continue;
    
    let history = histories.find(h => h.exerciseId === exercise.exerciseId);
    
    if (!history) {
      history = {
        exerciseId: exercise.exerciseId,
        exerciseName: exercise.name,
        sessions: []
      };
      histories.push(history);
    }
    
    const totalVolume = calculateExerciseVolume(exercise.sets);
    const maxWeight = Math.max(...exercise.sets.filter(s => s.completed).map(s => s.weight));
    const bestSet = getBestSet(exercise.sets);
    
    history.sessions.push({
      date: session.date,
      sets: exercise.sets,
      totalVolume,
      maxWeight,
      estimated1RM: bestSet?.estimated1RM || 0
    });
    
    // Manter apenas últimas 50 sessões por exercício
    if (history.sessions.length > 50) {
      history.sessions = history.sessions.slice(-50);
    }
  }
  
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(histories));
}

/**
 * Obter histórico de todos os exercícios
 */
export function getExerciseHistories(): ExerciseHistory[] {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
}

/**
 * Obter histórico de exercício específico
 */
export function getExerciseHistory(exerciseId: string): ExerciseHistory | null {
  const histories = getExerciseHistories();
  return histories.find(h => h.exerciseId === exerciseId) || null;
}

/**
 * Atualizar streak de treinos
 */
function updateWorkoutStreak(workoutDate: number): void {
  let streak = getWorkoutStreak();
  
  const today = new Date(workoutDate);
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  // Se já treinou hoje, não atualiza
  if (streak.workoutDates.includes(todayTimestamp)) {
    return;
  }
  
  streak.workoutDates.push(todayTimestamp);
  streak.workoutDates.sort((a, b) => a - b);
  streak.totalWorkouts++;
  streak.lastWorkoutDate = todayTimestamp;
  
  // Calcular streak atual
  streak.currentStreak = calculateCurrentStreak(streak.workoutDates);
  
  // Atualizar longest streak
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }
  
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
}

/**
 * Calcular streak atual
 */
function calculateCurrentStreak(dates: number[]): number {
  if (dates.length === 0) return 0;
  
  const sortedDates = [...dates].sort((a, b) => b - a);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  let streak = 0;
  let currentDate = todayTimestamp;
  
  for (const date of sortedDates) {
    const dayDiff = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 0 || dayDiff === 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }
  
  return streak;
}

/**
 * Obter streak de treinos
 */
export function getWorkoutStreak(): WorkoutStreak {
  const data = localStorage.getItem(STORAGE_KEYS.STREAK);
  
  if (data) {
    return JSON.parse(data);
  }
  
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalWorkouts: 0,
    lastWorkoutDate: 0,
    workoutDates: []
  };
}

/**
 * Atualizar estatísticas gerais
 */
function updateWorkoutStats(): void {
  const sessions = getWorkoutSessions();
  
  const totalWorkouts = sessions.length;
  const totalVolume = sessions.reduce((sum, s) => sum + s.totalVolume, 0);
  const totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts / 60 : 0;
  
  // Exercícios favoritos (mais realizados)
  const exerciseCounts: Record<string, number> = {};
  sessions.forEach(session => {
    session.exercises.forEach(ex => {
      if (ex.completed) {
        exerciseCounts[ex.exerciseId] = (exerciseCounts[ex.exerciseId] || 0) + 1;
      }
    });
  });
  
  const favoriteExercises = Object.entries(exerciseCounts)
    .map(([exerciseId, count]) => ({ exerciseId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Records pessoais (maior peso x reps por exercício)
  const records: Record<string, { weight: number; reps: number; date: number }> = {};
  sessions.forEach(session => {
    session.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed) {
          const key = ex.exerciseId;
          const current = records[key];
          
          if (!current || set.weight > current.weight || 
              (set.weight === current.weight && set.reps > current.reps)) {
            records[key] = {
              weight: set.weight,
              reps: set.reps,
              date: session.date
            };
          }
        }
      });
    });
  });
  
  const personalRecords = Object.entries(records).map(([exerciseId, record]) => ({
    exerciseId,
    ...record
  }));
  
  const stats: WorkoutStats = {
    totalWorkouts,
    totalVolume,
    totalDuration: totalDuration / 60, // converter para minutos
    averageDuration,
    favoriteExercises,
    personalRecords
  };
  
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}

/**
 * Obter estatísticas gerais
 */
export function getWorkoutStats(): WorkoutStats {
  const data = localStorage.getItem(STORAGE_KEYS.STATS);
  
  if (data) {
    return JSON.parse(data);
  }
  
  return {
    totalWorkouts: 0,
    totalVolume: 0,
    totalDuration: 0,
    averageDuration: 0,
    favoriteExercises: [],
    personalRecords: []
  };
}

/**
 * Marcar sessão para sincronização futura
 */
function markForSync(sessionId: string): void {
  const pending = getPendingSync();
  if (!pending.includes(sessionId)) {
    pending.push(sessionId);
    localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(pending));
  }
}

/**
 * Obter sessões pendentes de sincronização
 */
export function getPendingSync(): string[] {
  const data = localStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
  return data ? JSON.parse(data) : [];
}

/**
 * Limpar sessões sincronizadas
 */
export function clearSyncedSessions(sessionIds: string[]): void {
  const pending = getPendingSync().filter(id => !sessionIds.includes(id));
  localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(pending));
}

/**
 * Salvar template de treino
 */
export function saveWorkoutTemplate(template: WorkoutTemplate): void {
  const templates = getWorkoutTemplates();
  const existingIndex = templates.findIndex(t => t.id === template.id);
  
  if (existingIndex >= 0) {
    templates[existingIndex] = template;
  } else {
    templates.push(template);
  }
  
  localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
}

/**
 * Obter todos os templates
 */
export function getWorkoutTemplates(): WorkoutTemplate[] {
  const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
  return data ? JSON.parse(data) : [];
}

/**
 * Obter template específico
 */
export function getWorkoutTemplate(id: string): WorkoutTemplate | null {
  const templates = getWorkoutTemplates();
  return templates.find(t => t.id === id) || null;
}
