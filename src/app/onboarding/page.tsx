"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, ArrowRight, ArrowLeft } from "lucide-react";

type Goal = "hipertrofia" | "emagrecimento" | "condicionamento" | "forca";
type Level = "iniciante" | "intermediario" | "avancado";
type Frequency = "3" | "4" | "5" | "6";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    currentWeight: "",
    targetWeight: "",
    goal: "" as Goal,
    level: "" as Level,
    frequency: "" as Frequency,
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Salvar dados e redirecionar para dashboard
      localStorage.setItem("userData", JSON.stringify(formData));
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.currentWeight !== "" && formData.targetWeight !== "";
      case 3:
        return formData.goal !== "";
      case 4:
        return formData.level !== "" && formData.frequency !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-[#00FF88]/10 rounded-xl border border-[#00FF88]/20">
              <Dumbbell className="w-8 h-8 text-[#00FF88]" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00FF88] to-[#00CC6A] bg-clip-text text-transparent">
              Rotina de Aço
            </h1>
          </div>
          <p className="text-gray-400">Vamos configurar seu perfil</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                  s <= step ? "bg-[#00FF88]" : "bg-[#2A2A2A]"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 text-center">
            Etapa {step} de 4
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
          {/* Step 1: Nome */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Qual é o seu nome?</h2>
                <p className="text-gray-400">Vamos personalizar sua experiência</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder:text-gray-500 h-12 text-lg"
                />
              </div>
            </div>
          )}

          {/* Step 2: Peso */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Seus dados físicos</h2>
                <p className="text-gray-400">
                  Isso nos ajuda a acompanhar sua evolução
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentWeight">Peso Atual (kg)</Label>
                  <Input
                    id="currentWeight"
                    type="number"
                    placeholder="75"
                    value={formData.currentWeight}
                    onChange={(e) =>
                      setFormData({ ...formData, currentWeight: e.target.value })
                    }
                    className="bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder:text-gray-500 h-12 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Peso Ideal (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    placeholder="80"
                    value={formData.targetWeight}
                    onChange={(e) =>
                      setFormData({ ...formData, targetWeight: e.target.value })
                    }
                    className="bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder:text-gray-500 h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Objetivo */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Qual é o seu objetivo?</h2>
                <p className="text-gray-400">
                  Vamos criar treinos personalizados para você
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "hipertrofia", label: "Hipertrofia", emoji: "💪" },
                  { value: "emagrecimento", label: "Emagrecimento", emoji: "🔥" },
                  { value: "condicionamento", label: "Condicionamento", emoji: "⚡" },
                  { value: "forca", label: "Força", emoji: "🏋️" },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() =>
                      setFormData({ ...formData, goal: goal.value as Goal })
                    }
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.goal === goal.value
                        ? "border-[#00FF88] bg-[#00FF88]/10"
                        : "border-[#2A2A2A] hover:border-[#00FF88]/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{goal.emoji}</div>
                    <div className="font-semibold">{goal.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Nível e Frequência */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Quase lá!</h2>
                <p className="text-gray-400">
                  Últimas informações para personalizar seus treinos
                </p>
              </div>

              {/* Nível */}
              <div className="space-y-3">
                <Label>Nível de Experiência</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "iniciante", label: "Iniciante" },
                    { value: "intermediario", label: "Intermediário" },
                    { value: "avancado", label: "Avançado" },
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() =>
                        setFormData({ ...formData, level: level.value as Level })
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.level === level.value
                          ? "border-[#00FF88] bg-[#00FF88]/10"
                          : "border-[#2A2A2A] hover:border-[#00FF88]/50"
                      }`}
                    >
                      <div className="font-semibold text-sm">{level.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequência */}
              <div className="space-y-3">
                <Label>Frequência Semanal</Label>
                <div className="grid grid-cols-4 gap-3">
                  {["3", "4", "5", "6"].map((freq) => (
                    <button
                      key={freq}
                      onClick={() =>
                        setFormData({ ...formData, frequency: freq as Frequency })
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.frequency === freq
                          ? "border-[#00FF88] bg-[#00FF88]/10"
                          : "border-[#2A2A2A] hover:border-[#00FF88]/50"
                      }`}
                    >
                      <div className="font-bold text-lg">{freq}x</div>
                      <div className="text-xs text-gray-400">semana</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-[#2A2A2A] hover:bg-[#2A2A2A] h-12"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 4 ? "Finalizar" : "Continuar"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
