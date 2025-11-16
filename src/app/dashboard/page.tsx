"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Calendar,
  Plus,
  User,
  Crown,
  Zap,
  Flame,
  Play,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/bottom-nav";
import PremiumModal from "@/components/premium-modal";
import WorkoutCalendar from "@/components/workout-calendar";
import { canUseAIPhoto, incrementAIPhotoCount } from "@/lib/premium";
import { getWorkoutStreak, getWorkoutStats } from "@/lib/storage/workout-storage";
import { get3DMediaForExercise, normalizeMuscles } from "@/lib/muscle-3d-config";

interface UserData {
  name: string;
  currentWeight: string;
  targetWeight: string;
  goal: string;
  level: string;
  frequency: string;
  planType?: 'free' | 'premium_mensal' | 'premium_anual';
}

interface WorkoutExercise {
  id: string;
  name: string;
  videoUrl: string;
  thumbnailUrl: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  targetSets: number;
  targetReps: number;
}

interface SavedWorkout {
  id: string;
  name: string;
  goal: string;
  exercises: WorkoutExercise[];
  createdAt: string;
  preset?: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState<string>("");
  const [workoutStats, setWorkoutStats] = useState({ totalWorkouts: 0, totalVolume: 0, currentStreak: 0 });
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) {
      router.push("/onboarding");
    } else {
      const parsed = JSON.parse(data);
      if (!parsed.planType) {
        parsed.planType = 'free';
      }
      setUserData(parsed);

      const stats = getWorkoutStats();
      const streak = getWorkoutStreak();
      setWorkoutStats({
        totalWorkouts: stats.totalWorkouts,
        totalVolume: stats.totalVolume,
        currentStreak: streak.currentStreak
      });

      const workouts = JSON.parse(localStorage.getItem("customWorkouts") || "[]");
      setSavedWorkouts(workouts);
    }
  }, [router]);

  const isPremium = userData?.planType !== 'free';

  const handleStartWorkout = (workoutId: string) => {
    router.push(`/workout/${workoutId}`);
  };

  if (!userData) {
    return null;
  }

  const goalLabels: Record<string, string> = {
    hipertrofia: "Hipertrofia",
    emagrecimento: "Emagrecimento",
    condicionamento: "Condicionamento",
    forca: "Força",
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#00FF88]/10 rounded-xl border border-[#00FF88]/20">
                <Dumbbell className="w-6 h-6 text-[#00FF88]" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-[#00FF88] to-[#00CC6A] bg-clip-text text-transparent">
                  Rotina de Aço
                </h1>
                <p className="text-xs text-gray-400">Dieta e Treino</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!isPremium && (
                <Button
                  onClick={() => router.push("/plans")}
                  className="bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:opacity-90 text-black font-bold"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Assinar Premium
                </Button>
              )}
              {isPremium && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#00FF88]/20 to-[#00CC6A]/20 border border-[#00FF88]/30 rounded-full">
                  <Crown className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-sm font-semibold text-[#00FF88]">Premium</span>
                </div>
              )}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold">{userData.name}</p>
                <p className="text-xs text-gray-400">{goalLabels[userData.goal]}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => router.push("/profile")}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Bem-vindo de volta, {userData.name}! 💪
          </h2>
          <p className="text-gray-300">
            Pronto para mais um dia de evolução?
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-[#1A1A1A]/50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Peso Atual</p>
              <p className="text-2xl font-bold text-[#00FF88]">{userData.currentWeight}kg</p>
            </div>
            <div className="bg-[#1A1A1A]/50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Meta</p>
              <p className="text-2xl font-bold text-[#0066FF]">{userData.targetWeight}kg</p>
            </div>
            <div className="bg-[#1A1A1A]/50 rounded-xl p-4">
              <p className="text-sm text-gray-400">Frequência</p>
              <p className="text-2xl font-bold text-[#00FF88]">{userData.frequency}x/sem</p>
            </div>
          </div>
        </div>

        {/* Card de Resumo do Dia */}
        <div className="bg-gradient-to-br from-[#0066FF]/10 to-[#00FF88]/10 border border-[#0066FF]/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-[#00FF88]" />
            <h3 className="text-xl font-bold">Seu Dia Hoje</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A]/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell className="w-5 h-5 text-[#00FF88]" />
                <h4 className="font-bold">Treino</h4>
              </div>
              {workoutStats.totalWorkouts > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Último treino:</span>
                    <span className="text-sm font-semibold text-[#00FF88]">Ontem</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Streak:</span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <Flame className="w-4 h-4 text-[#FF6B6B]" />
                      {workoutStats.currentStreak} dias
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Nenhum treino hoje</p>
              )}
            </div>

            <div className="bg-[#1A1A1A]/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Apple className="w-5 h-5 text-[#0066FF]" />
                <h4 className="font-bold">Alimentação</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Calorias:</span>
                  <span className="text-sm font-semibold">0 / 2500 kcal</span>
                </div>
                <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] w-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Atalhos Rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => router.push("/workouts")}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#00FF88]/30 transition-all text-left"
          >
            <Dumbbell className="w-8 h-8 text-[#00FF88] mb-3" />
            <p className="font-bold mb-1">Treinos</p>
            <p className="text-xs text-gray-400">{savedWorkouts.length} salvos</p>
          </button>
          <button
            onClick={() => router.push("/community")}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0066FF]/30 transition-all text-left"
          >
            <Target className="w-8 h-8 text-[#0066FF] mb-3" />
            <p className="font-bold mb-1">Comunidade</p>
            <p className="text-xs text-gray-400">Descubra</p>
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#00FF88]/30 transition-all text-left"
          >
            <TrendingUp className="w-8 h-8 text-[#00FF88] mb-3" />
            <p className="font-bold mb-1">Progresso</p>
            <p className="text-xs text-gray-400">{workoutStats.totalWorkouts} treinos</p>
          </button>
          <button
            onClick={() => router.push("/notifications")}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0066FF]/30 transition-all text-left"
          >
            <Calendar className="w-8 h-8 text-[#0066FF] mb-3" />
            <p className="font-bold mb-1">Calendário</p>
            <p className="text-xs text-gray-400">Ver histórico</p>
          </button>
        </div>

        {/* Treinos Recentes */}
        {savedWorkouts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Treinos Recentes</h3>
              <Button
                onClick={() => router.push("/workouts")}
                variant="ghost"
                className="text-[#00FF88]"
              >
                Ver todos
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {savedWorkouts.slice(0, 2).map((workout) => (
                <div
                  key={workout.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#00FF88]/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold">{workout.name}</h4>
                      <p className="text-sm text-gray-400">{workout.exercises.length} exercícios</p>
                    </div>
                    <Button
                      onClick={() => handleStartWorkout(workout.id)}
                      size="sm"
                      className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Iniciar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendário */}
        <WorkoutCalendar />
      </main>

      <BottomNav />
      <PremiumModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature={premiumFeature}
      />
    </div>
  );
}
