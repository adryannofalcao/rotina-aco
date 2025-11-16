// Utilitários para gerenciar recursos Premium

import { PlanType } from './types';

export const PRICING = {
  premium_mensal: {
    price: 24.90,
    period: 'mensal' as const,
    name: 'Premium Mensal'
  },
  premium_anual: {
    price: 199.90,
    period: 'anual' as const,
    name: 'Premium Anual',
    monthlyEquivalent: 16.60
  }
};

// Limites de uso da IA para foto de refeição
export const AI_PHOTO_LIMITS = {
  free: 10, // 10 fotos por mês
  premium: -1 // Ilimitado (representado por -1)
};

// Verificar se usuário tem Premium ativo
export function isPremiumActive(planType: PlanType, expiryDate?: string): boolean {
  if (planType === 'free') return false;
  
  if (!expiryDate) return false;
  
  const expiry = new Date(expiryDate);
  const now = new Date();
  
  return expiry > now;
}

// Verificar quantas fotos de IA o usuário usou no mês atual
export function getAIPhotosUsedThisMonth(userId: string): number {
  // Buscar do localStorage (em produção seria do backend)
  const key = `ai_photos_${userId}_${getCurrentMonth()}`;
  const used = localStorage.getItem(key);
  return used ? parseInt(used) : 0;
}

// Incrementar contador de fotos de IA
export function incrementAIPhotoCount(userId: string): void {
  const key = `ai_photos_${userId}_${getCurrentMonth()}`;
  const current = getAIPhotosUsedThisMonth(userId);
  localStorage.setItem(key, (current + 1).toString());
}

// Verificar se usuário pode usar IA de foto
export function canUseAIPhoto(planType: PlanType, userId: string): { canUse: boolean; remaining: number; limit: number } {
  if (planType !== 'free') {
    // Premium tem uso ilimitado
    return { canUse: true, remaining: -1, limit: -1 };
  }
  
  // Free tem limite de 10 por mês
  const used = getAIPhotosUsedThisMonth(userId);
  const limit = AI_PHOTO_LIMITS.free;
  const remaining = limit - used;
  
  return {
    canUse: remaining > 0,
    remaining: Math.max(0, remaining),
    limit
  };
}

// Helper para obter mês atual no formato YYYY-MM
function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// Verificar se recurso específico está disponível
export function hasFeatureAccess(
  feature: string,
  planType: PlanType,
  expiryDate?: string
): boolean {
  // Recursos sempre disponíveis no Free
  const freeFeatures = [
    'criar_treinos',
    'registro_series',
    'modo_offline',
    'registro_refeicoes',
    'graficos_basicos',
    'comunidade_basica',
    'planos_basicos'
  ];
  
  if (freeFeatures.includes(feature)) return true;
  
  // Recursos Premium
  return isPremiumActive(planType, expiryDate);
}

// Lista de recursos por plano
export const FEATURES = {
  free: [
    'Criar treinos personalizados',
    'Registro de séries, repetições e cargas',
    'Modo offline (treinos e registros)',
    'Registro manual de refeições',
    'Gráficos básicos de evolução',
    'Acesso à comunidade básica (feed, likes)',
    'Planos prontos de treino (básicos)',
    'IA para foto de refeição (até 10 fotos/mês)'
  ],
  premium: [
    'Tudo do plano Free',
    'Planos prontos de treino avançados',
    'Planos alimentares sugeridos',
    'IA para foto de refeição (ILIMITADO)',
    'Gráficos avançados (volume, comparação)',
    'Análises automáticas da rotina',
    'Desafios exclusivos e ranking Premium',
    'Criar desafios personalizados com amigos',
    'Temas extras e personalização da Home',
    'Histórico completo (sem limite de tempo)',
    'Suporte prioritário'
  ]
};
