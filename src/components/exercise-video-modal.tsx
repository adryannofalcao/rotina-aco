"use client";

import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExerciseVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  videoUrl: string;
  description: string;
}

export default function ExerciseVideoModal({
  isOpen,
  onClose,
  exerciseName,
  videoUrl,
  description
}: ExerciseVideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#2A2A2A] sticky top-0 bg-[#1A1A1A] z-10">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">{exerciseName}</h3>
            <p className="text-xs sm:text-sm text-gray-400">Como executar corretamente</p>
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

        {/* Video Player */}
        <div className="p-4 sm:p-6">
          <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title={exerciseName}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Description */}
          <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#2A2A2A]">
            <h4 className="font-bold mb-2 text-sm sm:text-base">Sobre o exercício</h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{description}</p>
          </div>

          {/* Tips */}
          <div className="mt-4 bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border border-[#00FF88]/20 rounded-xl p-4">
            <h4 className="font-bold mb-3 text-sm sm:text-base flex items-center gap-2">
              <Play className="w-4 h-4 text-[#00FF88]" />
              Dicas de Execução
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#00FF88] mt-1">•</span>
                <span>Mantenha a postura correta durante todo o movimento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF88] mt-1">•</span>
                <span>Controle a velocidade na fase excêntrica (descida)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF88] mt-1">•</span>
                <span>Respire corretamente: expire no esforço, inspire no relaxamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF88] mt-1">•</span>
                <span>Foque na conexão mente-músculo durante a execução</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
