"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Settings, 
  TrendingUp, 
  Dumbbell, 
  Calendar, 
  Award,
  Target,
  Flame,
  Edit,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/bottom-nav";
import { getWorkoutStats, getWorkoutStreak } from "@/lib/storage/workout-storage";

interface UserData {
  name: string;
  currentWeight: string;
  targetWeight: string;
  goal: string;
  level: string;
  frequency: string;
  planType?: 'free' | 'premium_mensal' | 'premium_anual';
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [workoutStats, setWorkoutStats] = useState({ totalWorkouts: 0, totalVolume: 0, currentStreak: 0 });

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }

    const stats = getWorkoutStats();
    const streak = getWorkoutStreak();
    setWorkoutStats({
      totalWorkouts: stats.totalWorkouts,
      totalVolume: stats.totalVolume,
      currentStreak: streak.currentStreak
    });
  }, []);

  const handleLogout = () => {
    if (confirm("Deseja realmente sair?")) {
      localStorage.clear();
      router.push("/onboarding");
    }
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
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header com Avatar */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00FF88] to-[#0066FF] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#00FF88] rounded-full flex items-center justify-center border-2 border-[#0A0A0A]">
              <Edit className="w-4 h-4 text-black" />
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
          <p className="text-gray-400">{goalLabels[userData.goal]}</p>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <Dumbbell className="w-6 h-6 text-[#00FF88] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#00FF88]">{workoutStats.totalWorkouts}</p>
            <p className="text-xs text-gray-400">Treinos</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-[#FF6B6B] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#FF6B6B]">{workoutStats.currentStreak}</p>
            <p className="text-xs text-gray-400">Dias Seguidos</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <TrendingUp className="w-6 h-6 text-[#0066FF] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#0066FF]">{Math.round(workoutStats.totalVolume)}</p>
            <p className="text-xs text-gray-400">kg Total</p>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Informações Pessoais</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#00FF88]" />
                <span className="text-gray-400">Peso Atual</span>
              </div>
              <span className="font-bold">{userData.currentWeight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#0066FF]" />
                <span className="text-gray-400">Meta de Peso</span>
              </div>
              <span className="font-bold">{userData.targetWeight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#00FF88]" />
                <span className="text-gray-400">Frequência</span>
              </div>
              <span className="font-bold">{userData.frequency}x por semana</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <span className="text-gray-400">Nível</span>
              </div>
              <span className="font-bold capitalize">{userData.level}</span>
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Conquistas</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🔥", name: "Streak 7 dias", unlocked: workoutStats.currentStreak >= 7 },
              { icon: "💪", name: "10 Treinos", unlocked: workoutStats.totalWorkouts >= 10 },
              { icon: "🏆", name: "1000kg Total", unlocked: workoutStats.totalVolume >= 1000 },
              { icon: "⚡", name: "Streak 30 dias", unlocked: workoutStats.currentStreak >= 30 },
              { icon: "🎯", name: "50 Treinos", unlocked: workoutStats.totalWorkouts >= 50 },
              { icon: "👑", name: "5000kg Total", unlocked: workoutStats.totalVolume >= 5000 },
            ].map((achievement, index) => (
              <div
                key={index}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center p-3 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-[#00FF88]/20 to-[#0066FF]/20 border border-[#00FF88]/30"
                    : "bg-[#0A0A0A] border border-[#2A2A2A] opacity-50"
                }`}
              >
                <span className="text-3xl mb-2">{achievement.icon}</span>
                <p className="text-xs text-center font-medium">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push("/settings")}
            variant="outline"
            className="w-full justify-start border-[#2A2A2A] hover:bg-[#1A1A1A]"
          >
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
