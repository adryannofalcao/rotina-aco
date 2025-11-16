/**
 * 🏋️ TIPOS PARA SISTEMA DE TREINO COMPLETO
 * Inspirado no Hevy - Registro rápido e visualização de evolução
 */

export interface SetRecord {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  timestamp?: number;
  restTime?: number; // tempo de descanso após a série (segundos)
}

export interface ExerciseInWorkout {
  id: string;
  exerciseId: string; // referência ao exercício no banco de dados
  name: string;
  videoUrl: string;
  thumbnailUrl?: string;
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
  targetSets: number;
  targetReps: number;
  sets: SetRecord[];
  completed: boolean;
  notes?: string;
  supersetWith?: string; // ID do exercício em superserie
}

export interface WorkoutSession {
  id: string;
  workoutTemplateId: string;
  workoutName: string;
  date: number; // timestamp
  startTime: number;
  endTime?: number;
  duration?: number; // segundos
  exercises: ExerciseInWorkout[];
  totalVolume: number; // kg total movido
  completionRate: number; // porcentagem
  notes?: string;
  shared?: boolean; // se foi compartilhado na comunidade
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  muscleGroups: string[];
  exercises: {
    exerciseId: string;
    targetSets: number;
    targetReps: number;
    restTime?: number;
    supersetWith?: string;
  }[];
  estimatedDuration: number; // minutos
  difficulty: "iniciante" | "intermediario" | "avancado";
  goal: "hipertrofia" | "forca" | "emagrecimento" | "condicionamento";
}

export interface ExerciseHistory {
  exerciseId: string;
  exerciseName: string;
  sessions: {
    date: number;
    sets: SetRecord[];
    totalVolume: number;
    maxWeight: number;
    estimated1RM: number;
  }[];
}

export interface WorkoutStreak {
  currentStreak: number; // dias consecutivos
  longestStreak: number;
  totalWorkouts: number;
  lastWorkoutDate: number;
  workoutDates: number[]; // timestamps dos dias treinados
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalVolume: number; // kg total movido em todos os treinos
  totalDuration: number; // minutos totais
  averageDuration: number; // minutos
  favoriteExercises: { exerciseId: string; count: number }[];
  personalRecords: { exerciseId: string; weight: number; reps: number; date: number }[];
}

/**
 * Calcular 1RM usando fórmula de Epley
 * 1RM = weight × (1 + reps / 30)
 */
export function calculate1RM(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
}

/**
 * Calcular volume de uma série
 */
export function calculateSetVolume(weight: number, reps: number): number {
  return weight * reps;
}

/**
 * Calcular volume total de um exercício
 */
export function calculateExerciseVolume(sets: SetRecord[]): number {
  return sets
    .filter(set => set.completed)
    .reduce((sum, set) => sum + calculateSetVolume(set.weight, set.reps), 0);
}

/**
 * Obter melhor série (maior 1RM estimado)
 */
export function getBestSet(sets: SetRecord[]): { set: SetRecord; estimated1RM: number } | null {
  const completedSets = sets.filter(set => set.completed && set.weight > 0 && set.reps > 0);
  
  if (completedSets.length === 0) return null;
  
  let bestSet = completedSets[0];
  let best1RM = calculate1RM(bestSet.weight, bestSet.reps);
  
  for (const set of completedSets) {
    const current1RM = calculate1RM(set.weight, set.reps);
    if (current1RM > best1RM) {
      best1RM = current1RM;
      bestSet = set;
    }
  }
  
  return { set: bestSet, estimated1RM: best1RM };
}

/**
 * Comparar treino atual com anterior
 */
export interface WorkoutComparison {
  volumeDiff: number; // diferença de volume (kg)
  volumeDiffPercent: number; // diferença percentual
  durationDiff: number; // diferença de tempo (segundos)
  completionDiff: number; // diferença de conclusão (%)
  improved: boolean; // se houve melhora geral
}

export function compareWorkouts(
  current: WorkoutSession,
  previous: WorkoutSession | null
): WorkoutComparison | null {
  if (!previous) return null;
  
  const volumeDiff = current.totalVolume - previous.totalVolume;
  const volumeDiffPercent = previous.totalVolume > 0 
    ? (volumeDiff / previous.totalVolume) * 100 
    : 0;
  
  const durationDiff = (current.duration || 0) - (previous.duration || 0);
  const completionDiff = current.completionRate - previous.completionRate;
  
  const improved = volumeDiff > 0 || (volumeDiff === 0 && completionDiff > 0);
  
  return {
    volumeDiff,
    volumeDiffPercent,
    durationDiff,
    completionDiff,
    improved
  };
}
