"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, TrendingUp, Calendar, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getExerciseHistory } from "@/lib/storage/workout-storage";
import { ExerciseHistory } from "@/lib/types/workout";

export default function ExerciseHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const exerciseId = params.exerciseId as string;
  
  const [history, setHistory] = useState<ExerciseHistory | null>(null);

  useEffect(() => {
    const data = getExerciseHistory(exerciseId);
    setHistory(data);
  }, [exerciseId]);

  if (!history) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Nenhum histórico encontrado para este exercício</p>
          <Button
            onClick={() => router.back()}
            className="mt-4 bg-[#00FF88] hover:bg-[#00CC6A] text-black"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const sortedSessions = [...history.sessions].sort((a, b) => b.date - a.date);
  const maxWeight = Math.max(...history.sessions.map(s => s.maxWeight));
  const max1RM = Math.max(...history.sessions.map(s => s.estimated1RM));
  const totalVolume = history.sessions.reduce((sum, s) => sum + s.totalVolume, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{history.exerciseName}</h1>
            <p className="text-sm text-gray-400">{history.sessions.length} sessões registradas</p>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[#00FF88]" />
              <p className="text-2xl font-bold text-[#00FF88]">{maxWeight}kg</p>
            </div>
            <p className="text-xs text-gray-400">Maior Carga</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#0066FF]" />
              <p className="text-2xl font-bold text-[#0066FF]">{max1RM}kg</p>
            </div>
            <p className="text-xs text-gray-400">Melhor 1RM</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-[#00FF88]" />
              <p className="text-2xl font-bold text-[#00FF88]">{totalVolume}kg</p>
            </div>
            <p className="text-xs text-gray-400">Volume Total</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-[#0066FF]" />
              <p className="text-2xl font-bold text-[#0066FF]">{history.sessions.length}</p>
            </div>
            <p className="text-xs text-gray-400">Sessões</p>
          </div>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Evolução de Carga</h3>
          
          <div className="relative h-64">
            {/* Eixo Y (Peso) */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-400">
              <span>{maxWeight}kg</span>
              <span>{Math.round(maxWeight * 0.75)}kg</span>
              <span>{Math.round(maxWeight * 0.5)}kg</span>
              <span>{Math.round(maxWeight * 0.25)}kg</span>
              <span>0kg</span>
            </div>

            {/* Área do Gráfico */}
            <div className="ml-12 h-full border-l border-b border-[#2A2A2A] relative">
              {/* Linhas de Grade */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <div
                  key={percent}
                  className="absolute left-0 right-0 border-t border-[#2A2A2A]/30"
                  style={{ top: `${100 - percent}%` }}
                />
              ))}

              {/* Pontos e Linha */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Linha conectando pontos */}
                <polyline
                  points={sortedSessions
                    .reverse()
                    .map((session, index) => {
                      const x = (index / (sortedSessions.length - 1)) * 100;
                      const y = 100 - (session.maxWeight / maxWeight) * 100;
                      return `${x}%,${y}%`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="#00FF88"
                  strokeWidth="2"
                  className="drop-shadow-lg"
                />

                {/* Pontos */}
                {sortedSessions.map((session, index) => {
                  const x = (index / (sortedSessions.length - 1)) * 100;
                  const y = 100 - (session.maxWeight / maxWeight) * 100;
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="#00FF88"
                      className="drop-shadow-lg"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Eixo X (Datas) */}
            <div className="ml-12 mt-2 flex justify-between text-xs text-gray-400">
              {sortedSessions.length > 0 && (
                <>
                  <span>{new Date(sortedSessions[0].date).toLocaleDateString()}</span>
                  <span>{new Date(sortedSessions[sortedSessions.length - 1].date).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Lista de Sessões */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Histórico de Sessões</h3>
          
          <div className="space-y-4">
            {sortedSessions.map((session, index) => (
              <div
                key={index}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#0066FF]" />
                    <div>
                      <p className="font-semibold">
                        {new Date(session.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(session.date).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">1RM Estimado</p>
                    <p className="text-lg font-bold text-[#00FF88]">{session.estimated1RM}kg</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-400">Séries</p>
                    <p className="text-lg font-bold">{session.sets.filter(s => s.completed).length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Maior Carga</p>
                    <p className="text-lg font-bold text-[#0066FF]">{session.maxWeight}kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Volume</p>
                    <p className="text-lg font-bold text-[#00FF88]">{session.totalVolume}kg</p>
                  </div>
                </div>

                {/* Detalhes das Séries */}
                <div className="border-t border-[#2A2A2A] pt-3 mt-3">
                  <p className="text-xs text-gray-400 mb-2">Séries realizadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.sets
                      .filter(s => s.completed)
                      .map((set, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full text-sm"
                        >
                          {set.weight}kg × {set.reps}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
