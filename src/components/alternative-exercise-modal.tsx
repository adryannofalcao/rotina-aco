"use client";

import { useState } from "react";
import { X, Search, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAlternativeExercises, getAllExercises, ExerciseMedia } from "@/lib/exercise-media";

interface AlternativeExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentExercise: string;
  onSelectAlternative: (exercise: ExerciseMedia) => void;
}

export default function AlternativeExerciseModal({
  isOpen,
  onClose,
  currentExercise,
  onSelectAlternative
}: AlternativeExerciseModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const alternatives = getAlternativeExercises(currentExercise);
  const allExercises = getAllExercises();

  if (!isOpen) return null;

  const filteredExercises = searchTerm
    ? allExercises.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.primaryMuscles.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : alternatives;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#2A2A2A]">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Exercícios Alternativos</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              {searchTerm ? "Resultados da busca" : `Alternativas para ${currentExercise}`}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 sm:p-6 border-b border-[#2A2A2A]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar exercício ou músculo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0A0A0A] border-[#2A2A2A]"
            />
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Nenhum exercício encontrado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExercises.map((exercise) => (
                <button
                  key={exercise.name}
                  onClick={() => {
                    onSelectAlternative(exercise);
                    onClose();
                  }}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#00FF88]/30 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm sm:text-base mb-1">{exercise.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {exercise.primaryMuscles.map((muscle, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-[#00FF88] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="p-4 sm:p-6 border-t border-[#2A2A2A] bg-[#0A0A0A]">
          <p className="text-xs text-gray-400 text-center">
            💡 Dica: Use exercícios alternativos quando a máquina estiver ocupada ou para variar o treino
          </p>
        </div>
      </div>
    </div>
  );
}
