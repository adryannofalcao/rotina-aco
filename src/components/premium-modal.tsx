"use client";

import { X, Check, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING, FEATURES } from "@/lib/premium";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

export default function PremiumModal({ isOpen, onClose, feature }: PremiumModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#2A2A2A] transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border-b border-[#2A2A2A] p-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[#00FF88]/20 rounded-2xl mb-4">
            <Crown className="w-12 h-12 text-[#00FF88]" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Desbloqueie o{" "}
            <span className="text-[#00FF88]">Rotina de Aço Premium</span>
          </h2>
          <p className="text-gray-300 text-lg">
            {feature 
              ? `Este recurso está disponível apenas no plano Premium`
              : `Acelere seus resultados com recursos avançados`}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Pitch */}
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-300 leading-relaxed">
              A versão Free já é suficiente para você começar sua Rotina de Aço: criar treinos, 
              registrar cargas, usar o modo offline e acompanhar sua evolução básica. Mas, se você 
              quer <span className="text-[#00FF88] font-semibold">acelerar resultados</span> e ter 
              uma visão muito mais completa do seu progresso, o Premium foi feito pra você.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Mensal */}
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#00FF88]/30 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Premium Mensal</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-[#00FF88]">
                    R$ {PRICING.premium_mensal.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </div>
              <Button 
                className="w-full bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold py-6 rounded-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Assinar Mensal
              </Button>
            </div>

            {/* Anual - Destacado */}
            <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border-2 border-[#00FF88] rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black px-4 py-1 rounded-full text-sm font-bold">
                Mais Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Premium Anual</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-[#00FF88]">
                    R$ {PRICING.premium_anual.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400">/ano</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Equivale a R$ {PRICING.premium_anual.monthlyEquivalent.toFixed(2)}/mês
                </p>
                <p className="text-[#00FF88] font-semibold text-sm mt-1">
                  Economize 33%
                </p>
              </div>
              <Button 
                className="w-full bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold py-6 rounded-xl"
              >
                <Crown className="w-5 h-5 mr-2" />
                Assinar Anual
              </Button>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 text-center">
              O que você ganha com o Premium
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Features */}
              <div>
                <h4 className="font-semibold text-gray-400 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  Plano Free
                </h4>
                <ul className="space-y-3">
                  {FEATURES.free.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Features */}
              <div>
                <h4 className="font-semibold text-[#00FF88] mb-4 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Rotina de Aço Premium
                </h4>
                <ul className="space-y-3">
                  {FEATURES.premium.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      <span className={index === 0 ? "text-gray-400" : "text-white"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              É a diferença entre apenas treinar e realmente{" "}
              <span className="text-[#00FF88] font-semibold">
                entender e controlar a sua evolução
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
