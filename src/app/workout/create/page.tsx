"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save,
  Dumbbell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

const EXERCISE_LIBRARY = [
  // Peito
  { name: "Supino Reto", category: "Peito" },
  { name: "Supino Inclinado", category: "Peito" },
  { name: "Supino Declinado", category: "Peito" },
  { name: "Crucifixo", category: "Peito" },
  { name: "Flexão", category: "Peito" },
  
  // Costas
  { name: "Barra Fixa", category: "Costas" },
  { name: "Remada Curvada", category: "Costas" },
  { name: "Remada Cavalinho", category: "Costas" },
  { name: "Pulldown", category: "Costas" },
  { name: "Levantamento Terra", category: "Costas" },
  
  // Pernas
  { name: "Agachamento", category: "Pernas" },
  { name: "Leg Press", category: "Pernas" },
  { name: "Cadeira Extensora", category: "Pernas" },
  { name: "Cadeira Flexora", category: "Pernas" },
  { name: "Stiff", category: "Pernas" },
  
  // Ombros
  { name: "Desenvolvimento", category: "Ombros" },
  { name: "Elevação Lateral", category: "Ombros" },
  { name: "Elevação Frontal", category: "Ombros" },
  { name: "Remada Alta", category: "Ombros" },
  
  // Bíceps
  { name: "Rosca Direta", category: "Bíceps" },
  { name: "Rosca Alternada", category: "Bíceps" },
  { name: "Rosca Martelo", category: "Bíceps" },
  { name: "Rosca Scott", category: "Bíceps" },
  
  // Tríceps
  { name: "Tríceps Testa", category: "Tríceps" },
  { name: "Tríceps Corda", category: "Tríceps" },
  { name: "Tríceps Francês", category: "Tríceps" },
  { name: "Mergulho", category: "Tríceps" },
];

export default function CreateWorkoutPage() {
  const router = useRouter();
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const filteredExercises = EXERCISE_LIBRARY.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: 3,
      reps: 12,
      weight: 0
    };
    setExercises([...exercises, newExercise]);
    setShowExerciseLibrary(false);
    setSearchTerm("");
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: keyof Exercise, value: number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      alert("Por favor, dê um nome ao seu treino!");
      return;
    }
    
    if (exercises.length === 0) {
      alert("Adicione pelo menos um exercício!");
      return;
    }

    // Salvar no localStorage (em produção, seria uma API)
    const workouts = JSON.parse(localStorage.getItem("customWorkouts") || "[]");
    const newWorkout = {
      id: Date.now().toString(),
      name: workoutName,
      exercises,
      createdAt: new Date().toISOString()
    };
    workouts.push(newWorkout);
    localStorage.setItem("customWorkouts", JSON.stringify(workouts));

    alert("Treino salvo com sucesso!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
          <h1 className="text-2xl font-bold">Criar Treino Personalizado</h1>
        </div>

        {/* Nome do Treino */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-400">
            Nome do Treino
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Ex: Treino A - Peito e Tríceps"
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]"
          />
        </div>

        {/* Lista de Exercícios */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Exercícios ({exercises.length})</h3>
            <Button
              onClick={() => setShowExerciseLibrary(true)}
              className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Exercício
            </Button>
          </div>

          {exercises.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum exercício adicionado</p>
              <p className="text-sm mt-1">Clique em "Adicionar Exercício" para começar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00FF88]/10 text-[#00FF88] font-bold text-sm">
                        {index + 1}
                      </div>
                      <h4 className="font-bold">{exercise.name}</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Séries</label>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(exercise.id, "sets", parseInt(e.target.value) || 0)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-center focus:outline-none focus:border-[#00FF88]"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Repetições</label>
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(exercise.id, "reps", parseInt(e.target.value) || 0)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-center focus:outline-none focus:border-[#00FF88]"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Carga (kg)</label>
                      <input
                        type="number"
                        value={exercise.weight}
                        onChange={(e) => updateExercise(exercise.id, "weight", parseInt(e.target.value) || 0)}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-center focus:outline-none focus:border-[#00FF88]"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botão Salvar */}
        <Button
          onClick={saveWorkout}
          className="w-full bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold py-6 text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Salvar Treino
        </Button>

        {/* Modal Biblioteca de Exercícios */}
        {showExerciseLibrary && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Biblioteca de Exercícios</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowExerciseLibrary(false)}
                  className="rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </div>

              {/* Busca */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar exercício..."
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]"
                />
              </div>

              {/* Categorias */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-[#00FF88] text-black"
                        : "bg-[#0A0A0A] text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Lista de Exercícios */}
              <div className="space-y-2">
                {filteredExercises.map((exercise, index) => (
                  <button
                    key={index}
                    onClick={() => addExercise(exercise.name)}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#00FF88]/30 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold group-hover:text-[#00FF88] transition-colors">
                          {exercise.name}
                        </h4>
                        <p className="text-sm text-gray-400">{exercise.category}</p>
                      </div>
                      <Plus className="w-5 h-5 text-[#00FF88]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
