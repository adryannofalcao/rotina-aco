"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Play, Dumbbell, Target, Zap, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/bottom-nav";
import { get3DMediaForExercise, normalizeMuscles } from "@/lib/muscle-3d-config";

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

export default function WorkoutsPage() {
  const router = useRouter();
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [showWorkoutChoice, setShowWorkoutChoice] = useState(false);

  useEffect(() => {
    const workouts = JSON.parse(localStorage.getItem("customWorkouts") || "[]");
    setSavedWorkouts(workouts);
  }, []);

  const handleNewWorkout = () => {
    setShowWorkoutChoice(true);
  };

  const handleCreateCustomWorkout = () => {
    router.push("/workout/create");
  };

  const handleChoosePresetWorkout = () => {
    router.push("/workout/presets");
  };

  const handleStartWorkout = (workoutId: string) => {
    router.push(`/workout/${workoutId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meus Treinos</h1>
            <p className="text-gray-400">Gerencie e execute seus treinos</p>
          </div>
          <Button
            onClick={handleNewWorkout}
            className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Treino
          </Button>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#00FF88]" />
              <p className="text-xs text-gray-400">Esta Semana</p>
            </div>
            <p className="text-2xl font-bold text-[#00FF88]">3</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#0066FF]" />
              <p className="text-xs text-gray-400">Streak</p>
            </div>
            <p className="text-2xl font-bold text-[#0066FF]">7</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-4 h-4 text-[#00FF88]" />
              <p className="text-xs text-gray-400">Total</p>
            </div>
            <p className="text-2xl font-bold text-[#00FF88]">{savedWorkouts.length}</p>
          </div>
        </div>

        {/* Treinos Salvos */}
        {savedWorkouts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Meus Treinos Salvos</h2>
            <div className="space-y-4">
              {savedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#00FF88]/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{workout.name}</h3>
                      <p className="text-sm text-gray-400">{workout.exercises.length} exercícios</p>
                    </div>
                    <Button
                      onClick={() => handleStartWorkout(workout.id)}
                      className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  </div>

                  {/* Grid de Exercícios */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {workout.exercises.slice(0, 4).map((exercise) => {
                      const media3D = get3DMediaForExercise(exercise.name, exercise.primaryMuscles);
                      
                      return (
                        <div
                          key={exercise.id}
                          className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden"
                        >
                          <div className="aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
                            <img
                              src={media3D.thumbnail}
                              alt={exercise.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-xs font-bold line-clamp-1">{exercise.name}</p>
                            <p className="text-xs text-gray-400">{exercise.targetSets}x{exercise.targetReps}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treinos Sugeridos */}
        <div>
          <h2 className="text-xl font-bold mb-4">Treinos Sugeridos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "treino-a", name: "Treino A - Peito e Tríceps", exercises: 5 },
              { id: "treino-b", name: "Treino B - Costas e Bíceps", exercises: 5 },
              { id: "treino-c", name: "Treino C - Pernas", exercises: 6 },
            ].map((treino) => (
              <div
                key={treino.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#00FF88]/30 transition-all"
              >
                <div className="p-3 bg-[#00FF88]/10 rounded-xl w-fit mb-4">
                  <Dumbbell className="w-6 h-6 text-[#00FF88]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{treino.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{treino.exercises} exercícios • 45-60 min</p>
                <Button
                  onClick={() => handleStartWorkout(treino.id)}
                  variant="outline"
                  className="w-full border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88]/10"
                >
                  Iniciar Treino
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Escolha de Treino */}
      {showWorkoutChoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-6 text-center">Como deseja criar seu treino?</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={handleCreateCustomWorkout}
                className="bg-gradient-to-br from-[#00FF88]/10 to-[#00CC6A]/10 border-2 border-[#00FF88]/30 rounded-2xl p-8 hover:border-[#00FF88] transition-all group text-left"
              >
                <div className="p-3 bg-[#00FF88]/10 rounded-xl w-fit mb-4 group-hover:bg-[#00FF88]/20 transition-all">
                  <Zap className="w-8 h-8 text-[#00FF88]" />
                </div>
                <h4 className="text-xl font-bold mb-3">Criar do Zero</h4>
                <p className="text-gray-400 leading-relaxed">
                  Monte seu treino personalizado escolhendo exercícios, séries e repetições.
                </p>
              </button>

              <button
                onClick={handleChoosePresetWorkout}
                className="bg-gradient-to-br from-[#0066FF]/10 to-[#0044CC]/10 border-2 border-[#0066FF]/30 rounded-2xl p-8 hover:border-[#0066FF] transition-all group text-left"
              >
                <div className="p-3 bg-[#0066FF]/10 rounded-xl w-fit mb-4 group-hover:bg-[#0066FF]/20 transition-all">
                  <Target className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h4 className="text-xl font-bold mb-3">Treino Pronto</h4>
                <p className="text-gray-400 leading-relaxed">
                  Escolha um treino personalizado para seu objetivo.
                </p>
              </button>
            </div>

            <Button
              onClick={() => setShowWorkoutChoice(false)}
              variant="outline"
              className="w-full mt-6 border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
