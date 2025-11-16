"use client";

import { Crown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING, FEATURES } from "@/lib/premium";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] bg-[#1A1A1A]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FF88] to-[#00CC6A] bg-clip-text text-transparent">
            Planos Rotina de Aço
          </h1>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-[#00FF88]/10 rounded-2xl mb-6">
          <Crown className="w-12 h-12 text-[#00FF88]" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Escolha o plano ideal para sua{" "}
          <span className="text-[#00FF88]">evolução</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Comece gratuitamente ou desbloqueie todo o potencial com o Premium
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl font-bold text-[#00FF88]">R$ 0</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-gray-400">Ideal para começar sua Rotina de Aço</p>
            </div>

            <Button 
              variant="outline"
              className="w-full border-[#2A2A2A] hover:bg-[#2A2A2A] mb-8 py-6"
            >
              Plano Atual
            </Button>

            <div className="space-y-4">
              <p className="font-semibold text-sm text-gray-400 uppercase">Recursos incluídos:</p>
              {FEATURES.free.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Mensal */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium Mensal</h3>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl font-bold text-[#00FF88]">
                  R$ {PRICING.premium_mensal.price.toFixed(2)}
                </span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-gray-400">Flexibilidade para testar</p>
            </div>

            <Button 
              className="w-full bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold mb-8 py-6"
            >
              Assinar Mensal
            </Button>

            <div className="space-y-4">
              <p className="font-semibold text-sm text-[#00FF88] uppercase">Tudo do Free +</p>
              {FEATURES.premium.slice(1).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Anual - Destacado */}
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#0066FF]/10 border-2 border-[#00FF88] rounded-2xl p-8 relative lg:scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black px-6 py-2 rounded-full text-sm font-bold">
              Mais Popular
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium Anual</h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-[#00FF88]">
                  R$ {PRICING.premium_anual.price.toFixed(2)}
                </span>
                <span className="text-gray-400">/ano</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Equivale a R$ {PRICING.premium_anual.monthlyEquivalent.toFixed(2)}/mês
              </p>
              <p className="text-[#00FF88] font-bold">
                Economize 33%
              </p>
            </div>

            <Button 
              className="w-full bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold mb-8 py-6"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar Anual
            </Button>

            <div className="space-y-4">
              <p className="font-semibold text-sm text-[#00FF88] uppercase">Tudo do Free +</p>
              {FEATURES.premium.slice(1).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#1A1A1A] border-y border-[#2A2A2A] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Comparação Completa de Recursos
          </h3>

          <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1A1A1A]">
                <tr>
                  <th className="text-left p-6 font-bold">Recurso</th>
                  <th className="text-center p-6 font-bold">Free</th>
                  <th className="text-center p-6 font-bold text-[#00FF88]">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {[
                  { name: "Criar treinos personalizados", free: true, premium: true },
                  { name: "Registro de séries, repetições e cargas", free: true, premium: true },
                  { name: "Modo offline (treinos e registros)", free: true, premium: true },
                  { name: "Registro manual de refeições", free: true, premium: true },
                  { name: "Gráficos básicos de evolução", free: true, premium: true },
                  { name: "Acesso à comunidade básica", free: "Limitado", premium: "Completo" },
                  { name: "Planos prontos de treino", free: "Básicos", premium: "Avançados" },
                  { name: "Planos alimentares sugeridos", free: false, premium: true },
                  { name: "IA para foto de refeição", free: false, premium: true },
                  { name: "Uso da IA de refeição", free: false, premium: "Ilimitado" },
                  { name: "Gráficos avançados", free: false, premium: true },
                  { name: "Análises automáticas da rotina", free: false, premium: true },
                  { name: "Desafios exclusivos e ranking", free: false, premium: true },
                  { name: "Criar desafios personalizados", free: false, premium: true },
                  { name: "Temas extras e personalização", free: false, premium: true },
                  { name: "Histórico completo", free: false, premium: true },
                  { name: "Suporte prioritário", free: false, premium: true },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="p-6 text-gray-300">{item.name}</td>
                    <td className="p-6 text-center">
                      {item.free === true ? (
                        <Check className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : item.free === false ? (
                        <X className="w-5 h-5 text-gray-600 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-400">{item.free}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {item.premium === true ? (
                        <Check className="w-5 h-5 text-[#00FF88] mx-auto" />
                      ) : (
                        <span className="text-sm text-[#00FF88] font-semibold">{item.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-6">
          Pronto para acelerar seus resultados?
        </h3>
        <p className="text-xl text-gray-300 mb-10">
          É a diferença entre apenas treinar e realmente{" "}
          <span className="text-[#00FF88] font-semibold">
            entender e controlar a sua evolução
          </span>
          .
        </p>
        <Button 
          size="lg"
          className="bg-[#00FF88] hover:bg-[#00CC6A] text-black font-bold text-xl px-12 py-7 rounded-xl"
        >
          <Crown className="w-6 h-6 mr-2" />
          Assinar Premium Agora
        </Button>
      </div>
    </div>
  );
}
