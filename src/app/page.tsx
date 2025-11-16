"use client";

import { Dumbbell, TrendingUp, Apple, Users, Zap, CheckCircle, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 via-transparent to-[#0066FF]/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center space-y-8">
            {/* Logo/Title com apenas Haltere */}
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-[#00FF88]/10 rounded-2xl border border-[#00FF88]/20">
                <Dumbbell className="w-12 h-12 sm:w-16 sm:h-16 text-[#00FF88]" />
              </div>
              
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#00FF88] to-[#00CC6A] bg-clip-text text-transparent mb-2">
                  Rotina de Aço
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-semibold">
                  Dieta e Treino
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Construa uma rotina sólida e sustentável.
              <br />
              <span className="text-[#00FF88] font-semibold">Treino + Alimentação + Evolução</span> em um só lugar.
            </p>

            {/* CTA Buttons - DESTAQUE PARA REGISTRO E LOGIN */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 px-4">
              <Button 
                size="lg"
                onClick={() => router.push("/onboarding")}
                className="w-full sm:w-auto bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:opacity-90 text-black font-bold text-lg px-10 py-7 rounded-xl shadow-2xl shadow-[#00FF88]/30 transition-all hover:scale-105"
              >
                <UserPlus className="w-6 h-6 mr-2" />
                Criar Conta Grátis
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10 font-semibold text-lg px-10 py-7 rounded-xl transition-all hover:scale-105"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Entrar
              </Button>
            </div>

            {/* Texto de incentivo */}
            <p className="text-sm sm:text-base text-gray-400 pt-4">
              Junte-se a milhares de pessoas transformando suas vidas! 💪
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto pt-8 px-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#00FF88]">3 em 1</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Integrado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#00FF88]">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 inline-block" />
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Comunidade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#00FF88]">24/7</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Disponível</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 px-4">
          Tudo que você precisa para{" "}
          <span className="text-[#00FF88]">evoluir</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#00FF88]/30 transition-all group">
            <div className="p-3 bg-[#00FF88]/10 rounded-xl w-fit mb-4 group-hover:bg-[#00FF88]/20 transition-all">
              <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-[#00FF88]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Treinos Personalizados</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Crie e registre seus treinos. Acompanhe séries, repetições e cargas com facilidade.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#00FF88]/30 transition-all group">
            <div className="p-3 bg-[#0066FF]/10 rounded-xl w-fit mb-4 group-hover:bg-[#0066FF]/20 transition-all">
              <Apple className="w-6 h-6 sm:w-8 sm:h-8 text-[#0066FF]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Alimentação Integrada</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Registre refeições, acompanhe calorias e bata suas metas diárias de nutrição.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#00FF88]/30 transition-all group">
            <div className="p-3 bg-[#00FF88]/10 rounded-xl w-fit mb-4 group-hover:bg-[#00FF88]/20 transition-all">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#00FF88]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Evolução em Gráficos</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Visualize seu progresso com gráficos claros de carga, peso e desempenho.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#00FF88]/30 transition-all group">
            <div className="p-3 bg-[#0066FF]/10 rounded-xl w-fit mb-4 group-hover:bg-[#0066FF]/20 transition-all">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#0066FF]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Modo Offline</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Treine sem internet. Seus dados sincronizam automaticamente quando voltar online.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#00FF88]/30 transition-all group">
            <div className="p-3 bg-[#00FF88]/10 rounded-xl w-fit mb-4 group-hover:bg-[#00FF88]/20 transition-all">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#00FF88]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Comunidade Ativa</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Conecte-se com outros atletas, compartilhe conquistas e participe de desafios em grupo.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 hover:border-[#00FF88]/30 transition-all group">
            <div className="p-3 bg-[#0066FF]/10 rounded-xl w-fit mb-4 group-hover:bg-[#0066FF]/20 transition-all">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#0066FF]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Foco na Constância</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Não é sobre motivação temporária. É sobre construir uma rotina que dura.
            </p>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="bg-[#1A1A1A] border-y border-[#2A2A2A] py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Problem */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-red-400">❌ O Problema</h3>
              <ul className="space-y-4 text-sm sm:text-base text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Começam a treinar e desistem em poucas semanas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Usam apps separados para treino, dieta e anotações</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Não acompanham evolução de forma clara</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Internet fraca ou instável na academia</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#00FF88]">✓ A Solução</h3>
              <ul className="space-y-4 text-sm sm:text-base text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#00FF88] mt-1">•</span>
                  <span>App único que integra treino + dieta + progresso</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00FF88] mt-1">•</span>
                  <span>Funciona offline e sincroniza quando online</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00FF88] mt-1">•</span>
                  <span>Gráficos claros de evolução e histórico completo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00FF88] mt-1">•</span>
                  <span>Comunidade ativa e desafios para manter motivação</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 px-4">
          Pronto para construir sua{" "}
          <span className="text-[#00FF88]">Rotina de Aço</span>?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-10 px-4">
          Junte-se a milhares de pessoas que transformaram suas vidas com consistência.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Button 
            size="lg"
            onClick={() => router.push("/onboarding")}
            className="w-full sm:w-auto bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:opacity-90 text-black font-bold text-xl px-12 py-7 rounded-xl shadow-2xl shadow-[#00FF88]/30 transition-all hover:scale-105"
          >
            <Zap className="w-6 h-6 mr-2" />
            Começar Gratuitamente
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10 font-semibold text-xl px-12 py-7 rounded-xl transition-all"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Já tenho conta
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© 2024 Rotina de Aço. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
