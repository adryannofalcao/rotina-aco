// Tipos do sistema Rotina de Aço

export type PlanType = 'free' | 'premium_mensal' | 'premium_anual';

export interface User {
  id: string;
  email: string;
  nome: string;
  pesoAtual: number;
  pesoIdeal: number;
  objetivo: 'hipertrofia' | 'emagrecimento' | 'condicionamento' | 'manutencao';
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  frequenciaSemanal: number;
  dataCadastro: string;
  // Campos de plano
  planType: PlanType;
  planStartDate?: string;
  planExpiryDate?: string;
}

export interface Exercicio {
  id: string;
  nome: string;
  grupoMuscular: string;
  equipamento: string;
  descricao?: string;
  videoUrl?: string;
}

export interface Serie {
  numero: number;
  repeticoes: number;
  carga: number;
  concluida: boolean;
}

export interface ExercicioTreino {
  exercicioId: string;
  exercicio: Exercicio;
  series: Serie[];
  observacoes?: string;
}

export interface Treino {
  id: string;
  nome: string; // Ex: "Treino A", "Treino B"
  tipo: string; // Ex: "Peito e Tríceps", "Costas e Bíceps"
  exercicios: ExercicioTreino[];
  dataCriacao: string;
  isPremium?: boolean; // Indica se é treino avançado
}

export interface TreinoRealizado {
  id: string;
  treinoId: string;
  treino: Treino;
  data: string;
  duracao: number; // em minutos
  exerciciosRealizados: ExercicioTreino[];
  observacoes?: string;
}

export interface Refeicao {
  id: string;
  tipo: 'cafe' | 'almoco' | 'jantar' | 'lanche';
  descricao: string;
  calorias: number;
  proteinas?: number;
  carboidratos?: number;
  gorduras?: number;
  data: string;
  hora: string;
  fotoUrl?: string; // Para IA de foto (Premium)
}

export interface MetaDiaria {
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

export interface ProgressoExercicio {
  exercicioId: string;
  exercicio: Exercicio;
  historico: {
    data: string;
    cargaMaxima: number;
    repeticoes: number;
  }[];
}

// Recursos Premium
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  requiresPremium: boolean;
}

// Preços
export interface PricingPlan {
  type: PlanType;
  name: string;
  price: number;
  period: 'mensal' | 'anual';
  features: string[];
  highlighted?: boolean;
}
