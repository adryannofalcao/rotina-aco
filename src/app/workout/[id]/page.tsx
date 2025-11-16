"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Play, 
  Pause, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Zap,
  Award,
  AlertCircle,
  Plus,
  Minus,
  Video,
  Share2,
  Users,
  Copy,
  History,
  Trash2,
  Camera,
  X,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RestTimer from "@/components/rest-timer";
import {
  WorkoutSession,
  ExerciseInWorkout,
  SetRecord,
  calculateExerciseVolume,
  getBestSet,
  calculate1RM,
  compareWorkouts
} from "@/lib/types/workout";
import {
  saveWorkoutSession,
  getLastWorkoutByTemplate,
  getLastWorkoutWithExercise,
  getWorkoutSession
} from "@/lib/storage/workout-storage";
import { get3DMediaForExercise, normalizeMuscles } from "@/lib/muscle-3d-config";

export default function WorkoutSessionPage() {
  const router = useRouter();
  const params = useParams();
  const workoutId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionId] = useState(`session-${Date.now()}`);
  const [startTime, setStartTime] = useState(0);
  
  const [exercises, setExercises] = useState<ExerciseInWorkout[]>([
    { 
      id: "1",
      exerciseId: "supino-reto",
      name: "Supino Reto", 
      videoUrl: "/animations/supino-reto.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop",
      primaryMuscles: ["Peitoral Maior"],
      secondaryMuscles: ["Tríceps", "Deltoide Anterior"],
      targetSets: 4, 
      targetReps: 12, 
      sets: [
        { setNumber: 1, weight: 0, reps: 0, completed: false },
        { setNumber: 2, weight: 0, reps: 0, completed: false },
        { setNumber: 3, weight: 0, reps: 0, completed: false },
        { setNumber: 4, weight: 0, reps: 0, completed: false },
      ],
      completed: false 
    },
    { 
      id: "2",
      exerciseId: "supino-inclinado",
      name: "Supino Inclinado", 
      videoUrl: "/animations/supino-inclinado.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=800&fit=crop",
      primaryMuscles: ["Peitoral Superior"],
      secondaryMuscles: ["Tríceps", "Deltoide Anterior"],
      targetSets: 3, 
      targetReps: 12, 
      sets: [
        { setNumber: 1, weight: 0, reps: 0, completed: false },
        { setNumber: 2, weight: 0, reps: 0, completed: false },
        { setNumber: 3, weight: 0, reps: 0, completed: false },
      ],
      completed: false 
    },
    { 
      id: "3",
      exerciseId: "crucifixo",
      name: "Crucifixo", 
      videoUrl: "/animations/crucifixo.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop",
      primaryMuscles: ["Peitoral Maior"],
      secondaryMuscles: ["Deltoide Anterior"],
      targetSets: 3, 
      targetReps: 15, 
      sets: [
        { setNumber: 1, weight: 0, reps: 0, completed: false },
        { setNumber: 2, weight: 0, reps: 0, completed: false },
        { setNumber: 3, weight: 0, reps: 0, completed: false },
      ],
      completed: false 
    },
    { 
      id: "4",
      exerciseId: "triceps-testa",
      name: "Tríceps Testa", 
      videoUrl: "/animations/triceps-testa.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
      primaryMuscles: ["Tríceps"],
      secondaryMuscles: [],
      targetSets: 3, 
      targetReps: 12, 
      sets: [
        { setNumber: 1, weight: 0, reps: 0, completed: false },
        { setNumber: 2, weight: 0, reps: 0, completed: false },
        { setNumber: 3, weight: 0, reps: 0, completed: false },
      ],
      completed: false 
    },
    { 
      id: "5",
      exerciseId: "triceps-corda",
      name: "Tríceps Corda", 
      videoUrl: "/animations/triceps-corda.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop",
      primaryMuscles: ["Tríceps"],
      secondaryMuscles: [],
      targetSets: 3, 
      targetReps: 15, 
      sets: [
        { setNumber: 1, weight: 0, reps: 0, completed: false },
        { setNumber: 2, weight: 0, reps: 0, completed: false },
        { setNumber: 3, weight: 0, reps: 0, completed: false },
      ],
      completed: false 
    },
  ]);
  
  const [showResults, setShowResults] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [lastWorkoutData, setLastWorkoutData] = useState<Record<string, string>>({});
  const [postPhoto, setPostPhoto] = useState<string>("");
  const [postCaption, setPostCaption] = useState("");

  useEffect(() => {
    loadLastWorkoutAndFillData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  useEffect(() => {
    if (!isActive) return;
    
    const autoSaveInterval = setInterval(() => {
      saveCurrentSession(false);
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, [isActive, exercises, elapsedTime]);

  const loadLastWorkoutAndFillData = () => {
    const lastWorkout = getLastWorkoutByTemplate(workoutId);
    
    if (lastWorkout) {
      const lastData: Record<string, string> = {};
      
      const updatedExercises = exercises.map(ex => {
        const lastEx = lastWorkout.exercises.find(e => e.exerciseId === ex.exerciseId);
        
        if (lastEx) {
          const completedSets = lastEx.sets.filter(s => s.completed);
          
          if (completedSets.length > 0) {
            const avgWeight = completedSets.reduce((sum, s) => sum + s.weight, 0) / completedSets.length;
            const avgReps = completedSets.reduce((sum, s) => sum + s.reps, 0) / completedSets.length;
            lastData[ex.exerciseId] = `${completedSets.length}x${Math.round(avgReps)} @ ${avgWeight.toFixed(1)}kg`;
            
            const newSets = ex.sets.map((set, idx) => {
              const lastSet = lastEx.sets[idx];
              return lastSet && lastSet.completed ? {
                ...set,
                weight: lastSet.weight,
                reps: lastSet.reps,
                completed: false
              } : set;
            });
            
            return { ...ex, sets: newSets };
          }
        }
        
        return ex;
      });
      
      setExercises(updatedExercises);
      setLastWorkoutData(lastData);
    }
  };

  const repeatLastWorkout = () => {
    const lastWorkout = getLastWorkoutByTemplate(workoutId);
    
    if (!lastWorkout) {
      alert("Nenhum treino anterior encontrado!");
      return;
    }
    
    const updatedExercises = exercises.map(ex => {
      const lastEx = lastWorkout.exercises.find(e => e.exerciseId === ex.exerciseId);
      
      if (lastEx) {
        const newSets = ex.sets.map((set, idx) => {
          const lastSet = lastEx.sets[idx];
          return lastSet ? {
            ...set,
            weight: lastSet.weight,
            reps: lastSet.reps,
            completed: false
          } : set;
        });
        
        return { ...ex, sets: newSets };
      }
      
      return ex;
    });
    
    setExercises(updatedExercises);
    alert("✓ Dados do último treino carregados!");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setStartTime(Date.now());
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const updateSetData = (exerciseId: string, setNumber: number, field: 'weight' | 'reps', value: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = ex.sets.map(set => 
          set.setNumber === setNumber ? { ...set, [field]: value } : set
        );
        return { ...ex, sets: updatedSets };
      }
      return ex;
    }));
  };

  const toggleSetComplete = (exerciseId: string, setNumber: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = ex.sets.map(set => 
          set.setNumber === setNumber ? { 
            ...set, 
            completed: !set.completed,
            timestamp: !set.completed ? Date.now() : set.timestamp
          } : set
        );
        const allSetsCompleted = updatedSets.every(s => s.completed);
        return { ...ex, sets: updatedSets, completed: allSetsCompleted };
      }
      return ex;
    }));
    
    setShowRestTimer(true);
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: SetRecord = {
          setNumber: ex.sets.length + 1,
          weight: lastSet?.weight || 0,
          reps: lastSet?.reps || 0,
          completed: false
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      }
      return ex;
    }));
  };

  const removeSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId && ex.sets.length > 1) {
        const updatedSets = ex.sets.slice(0, -1);
        return { ...ex, sets: updatedSets };
      }
      return ex;
    }));
  };

  const getTotalWeight = (exercise: ExerciseInWorkout) => {
    return calculateExerciseVolume(exercise.sets);
  };

  const get1RM = (exercise: ExerciseInWorkout) => {
    const best = getBestSet(exercise.sets);
    return best ? best.estimated1RM : 0;
  };

  const saveCurrentSession = (isComplete: boolean) => {
    const completedCount = exercises.filter(ex => ex.completed).length;
    const totalExercises = exercises.length;
    const completionRate = Math.round((completedCount / totalExercises) * 100);
    const totalVolume = exercises.reduce((sum, ex) => sum + getTotalWeight(ex), 0);
    
    const session: WorkoutSession = {
      id: sessionId,
      workoutTemplateId: workoutId,
      workoutName: "Treino A - Peito e Tríceps",
      date: Date.now(),
      startTime,
      endTime: isComplete ? Date.now() : undefined,
      duration: elapsedTime,
      exercises,
      totalVolume,
      completionRate
    };
    
    saveWorkoutSession(session);
    return session;
  };

  const handleFinish = () => {
    const session = saveCurrentSession(true);
    setIsActive(false);
    setShowResults(true);
  };

  const handleShareToCommunity = () => {
    setShowShareModal(true);
  };

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostToCommunity = () => {
    if (!postPhoto) {
      alert("Por favor, adicione uma foto!");
      return;
    }

    const session = saveCurrentSession(true);
    session.shared = true;
    session.postPhoto = postPhoto;
    session.postCaption = postCaption;
    saveWorkoutSession(session);
    
    alert("🎉 Treino compartilhado com a comunidade!");
    setShowPostModal(false);
    setShowShareModal(false);
    router.push("/community");
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const totalExercises = exercises.length;
  const completionRate = Math.round((completedCount / totalExercises) * 100);
  
  const getWorkoutAnalysis = () => {
    const totalVolume = exercises.reduce((sum, ex) => sum + getTotalWeight(ex), 0);
    
    const completedExercises = exercises.filter(ex => ex.completed);
    const avgWeight = completedExercises.length > 0
      ? completedExercises.reduce((sum, ex) => {
          const avgExWeight = ex.sets
            .filter(s => s.completed)
            .reduce((s, set) => s + set.weight, 0) / ex.sets.filter(s => s.completed).length;
          return sum + avgExWeight;
        }, 0) / completedExercises.length
      : 0;

    const recommendations = [];
    
    const lastWorkout = getLastWorkoutByTemplate(workoutId);
    const comparison = lastWorkout ? compareWorkouts(
      {
        id: sessionId,
        workoutTemplateId: workoutId,
        workoutName: "Treino A",
        date: Date.now(),
        startTime,
        duration: elapsedTime,
        exercises,
        totalVolume,
        completionRate
      },
      lastWorkout
    ) : null;
    
    if (comparison) {
      if (comparison.improved) {
        recommendations.push(`🎉 Você melhorou! Volume ${comparison.volumeDiff > 0 ? '+' : ''}${comparison.volumeDiff.toFixed(1)}kg (${comparison.volumeDiffPercent > 0 ? '+' : ''}${comparison.volumeDiffPercent.toFixed(1)}%)`);
      } else {
        recommendations.push(`Volume ${comparison.volumeDiff.toFixed(1)}kg comparado ao último treino. Continue se esforçando!`);
      }
    }
    
    if (completionRate === 100) {
      recommendations.push("Excelente! Você completou todos os exercícios.");
      if (elapsedTime < 2700) {
        recommendations.push("Seu tempo foi ótimo. Considere aumentar a carga em 2-5kg nos próximos treinos.");
      }
    } else if (completionRate >= 80) {
      recommendations.push("Bom treino! Você completou a maioria dos exercícios.");
      recommendations.push("Tente completar todos na próxima sessão para maximizar resultados.");
    } else {
      recommendations.push("Continue se esforçando! Tente completar mais exercícios no próximo treino.");
    }

    if (elapsedTime > 3600) {
      recommendations.push("Treino longo. Considere reduzir o tempo de descanso entre séries.");
    } else if (elapsedTime < 1800) {
      recommendations.push("Treino rápido. Certifique-se de estar executando com boa técnica.");
    }

    if (completionRate >= 90 && elapsedTime < 3000) {
      recommendations.push("🎯 Você está apto a aumentar a carga! Adicione 2-5kg nos exercícios principais.");
    }

    return {
      totalVolume,
      avgWeight: avgWeight.toFixed(1),
      recommendations,
      comparison
    };
  };

  const analysis = showResults ? getWorkoutAnalysis() : null;

  if (showResults && analysis) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Treino Finalizado!</h1>
          </div>

          <div className="bg-gradient-to-br from-[#00FF88]/20 to-[#0066FF]/20 border border-[#00FF88]/30 rounded-2xl p-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00FF88] rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Parabéns! 🎉</h2>
            <p className="text-gray-300 text-lg">
              Você completou {completedCount} de {totalExercises} exercícios
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Tempo Total</p>
              <p className="text-2xl font-bold text-[#00FF88]">{formatTime(elapsedTime)}</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Conclusão</p>
              <p className="text-2xl font-bold text-[#0066FF]">{completionRate}%</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Volume Total</p>
              <p className="text-2xl font-bold text-[#00FF88]">{analysis.totalVolume}kg</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Carga Média</p>
              <p className="text-2xl font-bold text-[#0066FF]">{analysis.avgWeight}kg</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#00FF88]/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#00FF88]" />
              </div>
              <h3 className="text-xl font-bold">Análise do Treino</h3>
            </div>
            
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#0A0A0A] rounded-lg">
                  {rec.includes("🎯") || rec.includes("🎉") ? (
                    <Award className="w-5 h-5 text-[#00FF88] mt-0.5 flex-shrink-0" />
                  ) : rec.includes("Excelente") || rec.includes("Bom") ? (
                    <CheckCircle className="w-5 h-5 text-[#00FF88] mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-gray-300 leading-relaxed">{rec.replace("🎯 ", "").replace("🎉 ", "")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0066FF]/20 to-[#00FF88]/20 border border-[#0066FF]/30 rounded-2xl p-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0066FF]/20 rounded-full mb-4">
              <Users className="w-8 h-8 text-[#0066FF]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Compartilhe sua conquista!</h3>
            <p className="text-gray-300 mb-6">
              Mostre seu progresso para a comunidade e inspire outros atletas! 💪
            </p>
            <Button
              onClick={handleShareToCommunity}
              className="bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:opacity-90 text-white font-bold px-8 py-6 text-lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar na Comunidade
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              className="flex-1 bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold py-6"
            >
              Voltar ao Dashboard
            </Button>
            <Button
              onClick={() => {
                setShowResults(false);
                setElapsedTime(0);
                loadLastWorkoutAndFillData();
              }}
              variant="outline"
              className="flex-1 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10 py-6"
            >
              Novo Treino
            </Button>
          </div>
        </div>

        {/* Modal de Escolha de Compartilhamento */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0066FF]/20 rounded-full mb-4">
                  <Users className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Deseja compartilhar?</h3>
                <p className="text-gray-400">
                  Compartilhe seu treino com a comunidade e inspire outros!
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowShareModal(false);
                    router.push("/dashboard");
                  }}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  Não, obrigado
                </Button>
                <Button
                  onClick={() => {
                    setShowShareModal(false);
                    setShowPostModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:opacity-90 text-white font-bold"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Sim, compartilhar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Post na Comunidade */}
        {showPostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 max-w-lg w-full my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Criar Post</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPostModal(false)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Foto */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Foto Pós-Treino</label>
                {postPhoto ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img src={postPhoto} alt="Post" className="w-full h-full object-cover" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPostPhoto("")}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={handleChoosePhoto}
                    className="w-full aspect-square border-2 border-dashed border-[#2A2A2A] rounded-xl flex flex-col items-center justify-center hover:border-[#00FF88]/30 transition-all"
                  >
                    <ImageIcon className="w-12 h-12 text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">Clique para adicionar foto</p>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelected}
                  className="hidden"
                />
              </div>

              {/* Legenda */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Legenda</label>
                <Textarea
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="Conte como foi seu treino..."
                  className="bg-[#0A0A0A] border-[#2A2A2A] min-h-[100px]"
                />
              </div>

              {/* Info do Treino */}
              <div className="bg-[#0A0A0A] rounded-xl p-4 mb-6 border border-[#2A2A2A]">
                <p className="text-sm text-gray-400 mb-3">Dados do treino:</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Treino:</span>
                    <span className="font-bold text-[#00FF88]">Treino A - Peito e Tríceps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duração:</span>
                    <span className="font-bold text-[#00FF88]">{formatTime(elapsedTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Volume:</span>
                    <span className="font-bold text-[#00FF88]">{analysis.totalVolume}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Exercícios:</span>
                    <span className="font-bold text-[#00FF88]">{completedCount}/{totalExercises}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePostToCommunity}
                className="w-full bg-gradient-to-r from-[#0066FF] to-[#00FF88] hover:opacity-90 text-white font-bold py-6"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Publicar na Comunidade
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Treino A - Peito e Tríceps</h1>
              <p className="text-sm text-gray-400">5 exercícios • 45-60 min</p>
            </div>
          </div>
          <Button
            onClick={repeatLastWorkout}
            variant="outline"
            className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            Repetir Último
          </Button>
        </div>

        <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/20 rounded-2xl p-8 mb-8 text-center">
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">
              {!isActive ? "Pronto para começar?" : isPaused ? "Pausado" : "Tempo de Treino"}
            </p>
            <div className="text-6xl font-bold text-[#00FF88] font-mono">
              {formatTime(elapsedTime)}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            {!isActive ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Treino
              </Button>
            ) : (
              <>
                <Button
                  onClick={handlePause}
                  size="lg"
                  variant="outline"
                  className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10 px-8"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Retomar
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pausar
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleFinish}
                  size="lg"
                  className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold px-8"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Finalizar
                </Button>
              </>
            )}
          </div>

          {isActive && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-[#00FF88]" />
              <span className="text-gray-400">
                {completedCount} de {totalExercises} exercícios concluídos
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Exercícios</h3>
          {exercises.map((exercise, index) => {
            const lastWorkoutInfo = lastWorkoutData[exercise.exerciseId];
            const best = getBestSet(exercise.sets);
            const media3D = get3DMediaForExercise(exercise.name, exercise.primaryMuscles);
            const muscles = normalizeMuscles(exercise.primaryMuscles);
            const secondaryMuscles = normalizeMuscles(exercise.secondaryMuscles);
            
            return (
              <div
                key={exercise.id}
                className={`bg-[#1A1A1A] border rounded-2xl overflow-hidden transition-all ${
                  exercise.completed
                    ? "border-[#00FF88] bg-[#00FF88]/5"
                    : "border-[#2A2A2A] hover:border-[#00FF88]/30"
                }`}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
                        <img 
                          src={media3D.thumbnail} 
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold">{exercise.name}</h4>
                        <p className="text-sm text-gray-400">
                          {exercise.targetSets} séries • {exercise.targetReps} reps • Volume: {getTotalWeight(exercise)}kg
                        </p>
                        
                        {lastWorkoutInfo && (
                          <div className="flex items-center gap-2 mt-2 text-xs">
                            <History className="w-3 h-3 text-[#0066FF]" />
                            <span className="text-[#0066FF]">Último treino: {lastWorkoutInfo}</span>
                          </div>
                        )}
                        
                        {best && (
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <Award className="w-3 h-3 text-[#00FF88]" />
                            <span className="text-[#00FF88]">1RM estimado: ~{best.estimated1RM}kg</span>
                          </div>
                        )}
                        
                        {(muscles.length > 0 || secondaryMuscles.length > 0) && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {muscles.slice(0, 2).map((muscle, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30"
                              >
                                {muscle}
                              </span>
                            ))}
                            {secondaryMuscles.slice(0, 1).map((muscle, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 rounded-full bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exercise.completed && (
                        <CheckCircle className="w-6 h-6 text-[#00FF88]" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedExercise === exercise.id && (
                  <div className="border-t border-[#2A2A2A] p-6 space-y-6">
                    <div className="relative">
                      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#2A2A2A]">
                        <img
                          src={media3D.videoUrl}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
                          <span className="text-gray-400">Músculos Principais</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#0066FF]"></div>
                          <span className="text-gray-400">Músculos Secundários</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold text-sm text-gray-400 uppercase">Registrar Séries</h5>
                      {exercise.sets.map((set) => (
                        <div
                          key={set.setNumber}
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                            set.completed
                              ? "bg-[#00FF88]/10 border-[#00FF88]/30"
                              : "bg-[#0A0A0A] border-[#2A2A2A]"
                          }`}
                        >
                          <span className="text-sm font-bold text-gray-400 w-16">
                            Série {set.setNumber}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateSetData(exercise.id, set.setNumber, 'weight', Math.max(0, set.weight - 2.5))}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <div className="w-20 text-center">
                              <Input
                                type="number"
                                value={set.weight || ''}
                                onChange={(e) => updateSetData(exercise.id, set.setNumber, 'weight', parseFloat(e.target.value) || 0)}
                                className="h-8 text-center bg-[#1A1A1A] border-[#2A2A2A]"
                                placeholder="0"
                              />
                              <span className="text-xs text-gray-500">kg</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateSetData(exercise.id, set.setNumber, 'weight', set.weight + 2.5)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <span className="text-gray-600">×</span>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateSetData(exercise.id, set.setNumber, 'reps', Math.max(0, set.reps - 1))}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <div className="w-20 text-center">
                              <Input
                                type="number"
                                value={set.reps || ''}
                                onChange={(e) => updateSetData(exercise.id, set.setNumber, 'reps', parseInt(e.target.value) || 0)}
                                className="h-8 text-center bg-[#1A1A1A] border-[#2A2A2A]"
                                placeholder="0"
                              />
                              <span className="text-xs text-gray-500">reps</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateSetData(exercise.id, set.setNumber, 'reps', set.reps + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex-1 text-right">
                            <span className="text-sm text-gray-400">
                              {set.weight * set.reps}kg
                            </span>
                          </div>

                          <Button
                            onClick={() => toggleSetComplete(exercise.id, set.setNumber)}
                            variant={set.completed ? "default" : "outline"}
                            size="sm"
                            className={
                              set.completed
                                ? "bg-[#00FF88] hover:bg-[#00CC6A] text-black"
                                : "border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88]/10"
                            }
                          >
                            {set.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              "OK"
                            )}
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={() => addSet(exercise.id)}
                          variant="outline"
                          className="flex-1 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Série
                        </Button>
                        {exercise.sets.length > 1 && (
                          <Button
                            onClick={() => removeSet(exercise.id)}
                            variant="outline"
                            className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remover Série
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showRestTimer && <RestTimer defaultTime={90} />}
    </div>
  );
}
