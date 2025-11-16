"use client";

import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Dumbbell,
  Zap,
  TrendingUp,
  Target,
  Flame,
  Activity,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXERCISES_DATABASE, getExercisesByGoal } from "@/lib/exercises";
import { get3DMediaForExercise, normalizeMuscles } from "@/lib/muscle-3d-config";

// Treinos específicos por objetivo com exercícios do banco de dados
const PRESET_WORKOUTS = [
  {
    id: "hipertrofia-iniciante",
    name: "Hipertrofia - Iniciante",
    goal: "hipertrofia",
    level: "Iniciante",
    icon: Dumbbell,
    color: "from-[#00FF88] to-[#00CC6A]",
    description: "Treino focado em ganho de massa muscular para iniciantes",
    duration: "45-60 min",
    frequency: "3-4x/semana",
    exerciseIds: ["supino-reto", "crucifixo", "triceps-corda", "triceps-testa"],
    defaultSets: 3,
    defaultReps: 12
  },
  {
    id: "hipertrofia-intermediario",
    name: "Hipertrofia - Intermediário",
    goal: "hipertrofia",
    level: "Intermediário",
    icon: TrendingUp,
    color: "from-[#00FF88] to-[#00CC6A]",
    description: "Treino avançado para maximizar ganho de massa muscular",
    duration: "60-75 min",
    frequency: "4-5x/semana",
    exerciseIds: ["supino-reto", "supino-inclinado", "crucifixo", "flexao", "triceps-testa", "triceps-corda"],
    defaultSets: 4,
    defaultReps: 10
  },
  {
    id: "hipertrofia-avancado",
    name: "Hipertrofia - Avançado",
    goal: "hipertrofia",
    level: "Avançado",
    icon: Target,
    color: "from-[#00FF88] to-[#00CC6A]",
    description: "Treino intenso para atletas avançados focado em hipertrofia máxima",
    duration: "75-90 min",
    frequency: "5-6x/semana",
    exerciseIds: ["supino-reto", "supino-inclinado", "crucifixo", "flexao", "barra-fixa", "remada-curvada", "triceps-testa"],
    defaultSets: 4,
    defaultReps: 8
  },
  {
    id: "forca-iniciante",
    name: "Força - Iniciante",
    goal: "forca",
    level: "Iniciante",
    icon: Zap,
    color: "from-[#0066FF] to-[#0044CC]",
    description: "Treino focado em ganho de força com cargas progressivas",
    duration: "50-60 min",
    frequency: "3x/semana",
    exerciseIds: ["agachamento", "supino-reto", "levantamento-terra", "desenvolvimento"],
    defaultSets: 4,
    defaultReps: 6
  },
  {
    id: "forca-avancado",
    name: "Força - Avançado",
    goal: "forca",
    level: "Avançado",
    icon: Target,
    color: "from-[#0066FF] to-[#0044CC]",
    description: "Treino intenso para atletas avançados focado em força máxima",
    duration: "75-90 min",
    frequency: "4-5x/semana",
    exerciseIds: ["agachamento", "supino-reto", "levantamento-terra", "desenvolvimento", "barra-fixa"],
    defaultSets: 5,
    defaultReps: 5
  },
  {
    id: "emagrecimento-iniciante",
    name: "Emagrecimento - Iniciante",
    goal: "emagrecimento",
    level: "Iniciante",
    icon: Flame,
    color: "from-[#FF6B6B] to-[#FF4444]",
    description: "Treino metabólico para queima de gordura e definição",
    duration: "40-50 min",
    frequency: "4-5x/semana",
    exerciseIds: ["burpees", "mountain-climbers", "agachamento-jump", "flexao", "prancha"],
    defaultSets: 3,
    defaultReps: 15
  },
  {
    id: "emagrecimento-intenso",
    name: "Emagrecimento - Intenso",
    goal: "emagrecimento",
    level: "Intermediário",
    icon: Flame,
    color: "from-[#FF6B6B] to-[#FF4444]",
    description: "Treino HIIT para máxima queima de calorias",
    duration: "30-40 min",
    frequency: "5-6x/semana",
    exerciseIds: ["burpees", "mountain-climbers", "agachamento-jump", "flexao", "prancha", "corrida"],
    defaultSets: 4,
    defaultReps: 20
  },
  {
    id: "condicionamento",
    name: "Condicionamento Físico",
    goal: "condicionamento",
    level: "Todos os níveis",
    icon: Activity,
    color: "from-[#00FF88] to-[#0066FF]",
    description: "Treino funcional para melhorar resistência e condicionamento",
    duration: "45-60 min",
    frequency: "3-4x/semana",
    exerciseIds: ["corrida", "burpees", "agachamento", "flexao", "prancha"],
    defaultSets: 4,
    defaultReps: 15
  },
];

export default function PresetWorkoutsPage() {
  const router = useRouter();

  const selectWorkout = (workout: typeof PRESET_WORKOUTS[0]) => {
    // Buscar exercícios do banco de dados
    const exercises = workout.exerciseIds.map((id, idx) => {
      const exercise = EXERCISES_DATABASE.find(ex => ex.id === id);
      if (!exercise) return null;
      
      return {
        id: `${workout.id}-${idx}`,
        name: exercise.name,
        videoUrl: exercise.videoUrl,
        thumbnailUrl: exercise.thumbnailUrl,
        primaryMuscles: exercise.primaryMuscles,
        secondaryMuscles: exercise.secondaryMuscles,
        targetSets: workout.defaultSets,
        targetReps: workout.defaultReps,
        sets: Array.from({ length: workout.defaultSets }, (_, i) => ({
          setNumber: i + 1,
          weight: 0,
          reps: 0,
          completed: false
        })),
        completed: false
      };
    }).filter(Boolean);

    // Salvar treino selecionado
    const workouts = JSON.parse(localStorage.getItem("customWorkouts") || "[]");
    const newWorkout = {
      id: workout.id,
      name: workout.name,
      goal: workout.goal,
      exercises,
      createdAt: new Date().toISOString(),
      preset: true
    };
    workouts.push(newWorkout);
    localStorage.setItem("customWorkouts", JSON.stringify(workouts));

    alert(`✅ Treino "${workout.name}" adicionado com sucesso!`);
    router.push("/dashboard");
  };

  // Agrupar treinos por objetivo
  const workoutsByGoal = {
    hipertrofia: PRESET_WORKOUTS.filter(w => w.goal === "hipertrofia"),
    forca: PRESET_WORKOUTS.filter(w => w.goal === "forca"),
    emagrecimento: PRESET_WORKOUTS.filter(w => w.goal === "emagrecimento"),
    condicionamento: PRESET_WORKOUTS.filter(w => w.goal === "condicionamento"),
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Treinos Prontos</h1>
            <p className="text-gray-400">Escolha um treino personalizado para seu objetivo</p>
          </div>
        </div>

        {/* Seção: Hipertrofia */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#00FF88] to-[#00CC6A] rounded-lg">
              <Dumbbell className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Hipertrofia</h2>
              <p className="text-sm text-gray-400">Ganho de massa muscular</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutsByGoal.hipertrofia.map((workout) => {
              const Icon = workout.icon;
              const exercises = workout.exerciseIds.map(id => EXERCISES_DATABASE.find(ex => ex.id === id)).filter(Boolean);
              
              return (
                <div
                  key={workout.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#00FF88]/30 transition-all group"
                >
                  {/* Header do Card */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${workout.color} bg-opacity-10 rounded-xl`}>
                        <Icon className="w-8 h-8 text-[#00FF88]" />
                      </div>
                      <span className="text-xs text-gray-400">{workout.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{workout.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Nível:</span>
                        <span className="font-semibold">{workout.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Frequência:</span>
                        <span className="font-semibold">{workout.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Exercícios:</span>
                        <span className="font-semibold">{workout.exerciseIds.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Grid de Exercícios com Bonecos 3D - Sistema Automático */}
                  <div className="px-6 pb-4">
                    <h4 className="text-sm font-bold mb-3 text-gray-400">Exercícios inclusos:</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {exercises.slice(0, 4).map((exercise: any) => {
                        // Sistema automático de animações 3D - 100% seguro
                        const media3D = get3DMediaForExercise(exercise.primaryMuscles);
                        const muscles = normalizeMuscles(exercise.primaryMuscles);
                        
                        return (
                          <div
                            key={exercise.id}
                            className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#00FF88]/30 transition-all"
                          >
                            {/* Thumbnail 3D - Sistema Automático */}
                            <div className="relative aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center overflow-hidden">
                              <img
                                src={media3D.thumbnail}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="p-2 bg-[#00FF88] rounded-full">
                                  <Play className="w-4 h-4 text-black" />
                                </div>
                              </div>
                            </div>
                            {/* Nome do Exercício */}
                            <div className="p-2">
                              <p className="text-xs font-semibold line-clamp-1">{exercise.name}</p>
                              {muscles.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {muscles.slice(0, 1).map((muscle: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] px-1.5 py-0.5 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-full border border-[#FF6B6B]/30"
                                    >
                                      {muscle}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Botão de Adicionar */}
                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => selectWorkout(workout)}
                      className="w-full bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold"
                    >
                      Adicionar Treino
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção: Força */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#0066FF] to-[#0044CC] rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Força</h2>
              <p className="text-sm text-gray-400">Aumento de força máxima</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutsByGoal.forca.map((workout) => {
              const Icon = workout.icon;
              const exercises = workout.exerciseIds.map(id => EXERCISES_DATABASE.find(ex => ex.id === id)).filter(Boolean);
              
              return (
                <div
                  key={workout.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#0066FF]/30 transition-all group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${workout.color} bg-opacity-10 rounded-xl`}>
                        <Icon className="w-8 h-8 text-[#0066FF]" />
                      </div>
                      <span className="text-xs text-gray-400">{workout.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{workout.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Nível:</span>
                        <span className="font-semibold">{workout.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Frequência:</span>
                        <span className="font-semibold">{workout.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Exercícios:</span>
                        <span className="font-semibold">{workout.exerciseIds.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-4">
                    <h4 className="text-sm font-bold mb-3 text-gray-400">Exercícios inclusos:</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {exercises.slice(0, 4).map((exercise: any) => {
                        const media3D = get3DMediaForExercise(exercise.primaryMuscles);
                        const muscles = normalizeMuscles(exercise.primaryMuscles);
                        
                        return (
                          <div
                            key={exercise.id}
                            className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#0066FF]/30 transition-all"
                          >
                            <div className="relative aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center overflow-hidden">
                              <img
                                src={media3D.thumbnail}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="p-2 bg-[#0066FF] rounded-full">
                                  <Play className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="p-2">
                              <p className="text-xs font-semibold line-clamp-1">{exercise.name}</p>
                              {muscles.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {muscles.slice(0, 1).map((muscle: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] px-1.5 py-0.5 bg-[#0066FF]/20 text-[#0066FF] rounded-full border border-[#0066FF]/30"
                                    >
                                      {muscle}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => selectWorkout(workout)}
                      className="w-full bg-[#0066FF] hover:bg-[#0044CC] text-white font-bold"
                    >
                      Adicionar Treino
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção: Emagrecimento */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#FF6B6B] to-[#FF4444] rounded-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Emagrecimento</h2>
              <p className="text-sm text-gray-400">Queima de gordura e definição</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutsByGoal.emagrecimento.map((workout) => {
              const Icon = workout.icon;
              const exercises = workout.exerciseIds.map(id => EXERCISES_DATABASE.find(ex => ex.id === id)).filter(Boolean);
              
              return (
                <div
                  key={workout.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#FF6B6B]/30 transition-all group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${workout.color} bg-opacity-10 rounded-xl`}>
                        <Icon className="w-8 h-8 text-[#FF6B6B]" />
                      </div>
                      <span className="text-xs text-gray-400">{workout.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{workout.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Nível:</span>
                        <span className="font-semibold">{workout.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Frequência:</span>
                        <span className="font-semibold">{workout.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Exercícios:</span>
                        <span className="font-semibold">{workout.exerciseIds.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-4">
                    <h4 className="text-sm font-bold mb-3 text-gray-400">Exercícios inclusos:</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {exercises.slice(0, 4).map((exercise: any) => {
                        const media3D = get3DMediaForExercise(exercise.primaryMuscles);
                        const muscles = normalizeMuscles(exercise.primaryMuscles);
                        
                        return (
                          <div
                            key={exercise.id}
                            className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#FF6B6B]/30 transition-all"
                          >
                            <div className="relative aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center overflow-hidden">
                              <img
                                src={media3D.thumbnail}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="p-2 bg-[#FF6B6B] rounded-full">
                                  <Play className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="p-2">
                              <p className="text-xs font-semibold line-clamp-1">{exercise.name}</p>
                              {muscles.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {muscles.slice(0, 1).map((muscle: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] px-1.5 py-0.5 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-full border border-[#FF6B6B]/30"
                                    >
                                      {muscle}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => selectWorkout(workout)}
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF4444] text-white font-bold"
                    >
                      Adicionar Treino
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção: Condicionamento */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#00FF88] to-[#0066FF] rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Condicionamento</h2>
              <p className="text-sm text-gray-400">Resistência e funcional</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutsByGoal.condicionamento.map((workout) => {
              const Icon = workout.icon;
              const exercises = workout.exerciseIds.map(id => EXERCISES_DATABASE.find(ex => ex.id === id)).filter(Boolean);
              
              return (
                <div
                  key={workout.id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#00FF88]/30 transition-all group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${workout.color} bg-opacity-10 rounded-xl`}>
                        <Icon className="w-8 h-8 text-[#00FF88]" />
                      </div>
                      <span className="text-xs text-gray-400">{workout.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{workout.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Nível:</span>
                        <span className="font-semibold">{workout.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Frequência:</span>
                        <span className="font-semibold">{workout.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Exercícios:</span>
                        <span className="font-semibold">{workout.exerciseIds.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-4">
                    <h4 className="text-sm font-bold mb-3 text-gray-400">Exercícios inclusos:</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {exercises.slice(0, 4).map((exercise: any) => {
                        const media3D = get3DMediaForExercise(exercise.primaryMuscles);
                        const muscles = normalizeMuscles(exercise.primaryMuscles);
                        
                        return (
                          <div
                            key={exercise.id}
                            className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#00FF88]/30 transition-all"
                          >
                            <div className="relative aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center overflow-hidden">
                              <img
                                src={media3D.thumbnail}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="p-2 bg-[#00FF88] rounded-full">
                                  <Play className="w-4 h-4 text-black" />
                                </div>
                              </div>
                            </div>
                            <div className="p-2">
                              <p className="text-xs font-semibold line-clamp-1">{exercise.name}</p>
                              {muscles.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {muscles.slice(0, 1).map((muscle: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] px-1.5 py-0.5 bg-[#00FF88]/20 text-[#00FF88] rounded-full border border-[#00FF88]/30"
                                    >
                                      {muscle}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => selectWorkout(workout)}
                      className="w-full bg-gradient-to-r from-[#00FF88] to-[#0066FF] hover:opacity-90 text-black font-bold"
                    >
                      Adicionar Treino
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
