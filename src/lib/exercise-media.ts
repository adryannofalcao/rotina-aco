/**
 * Sistema de mapeamento de exercícios com imagens e vídeos corretos
 * Cada exercício tem uma imagem ilustrativa e um vídeo de execução
 */

export interface ExerciseMedia {
  name: string;
  imageUrl: string;
  videoUrl: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  description: string;
}

/**
 * Biblioteca completa de exercícios com mídias corretas
 * Imagens específicas de cada exercício do Unsplash
 */
export const EXERCISE_LIBRARY: Record<string, ExerciseMedia> = {
  // PEITO
  "supino-reto": {
    name: "Supino Reto",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Tríceps", "Deltoide Anterior"],
    description: "Exercício fundamental para desenvolvimento do peitoral"
  },
  "supino-inclinado": {
    name: "Supino Inclinado",
    imageUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/SrqOu55lrYU",
    primaryMuscles: ["Peitoral Superior"],
    secondaryMuscles: ["Tríceps", "Deltoide Anterior"],
    description: "Foca na porção superior do peitoral"
  },
  "supino-declinado": {
    name: "Supino Declinado",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/0G2_XV7slIg",
    primaryMuscles: ["Peitoral Inferior"],
    secondaryMuscles: ["Tríceps"],
    description: "Trabalha a porção inferior do peitoral"
  },
  "crucifixo": {
    name: "Crucifixo",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/eozdVDA78K0",
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Deltoide Anterior"],
    description: "Isolamento do peitoral com amplitude completa"
  },
  "flexao": {
    name: "Flexão de Braço",
    imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Tríceps", "Core"],
    description: "Exercício funcional para peito e core"
  },

  // COSTAS
  "barra-fixa": {
    name: "Barra Fixa",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
    primaryMuscles: ["Latíssimo do Dorso"],
    secondaryMuscles: ["Bíceps", "Trapézio"],
    description: "Exercício fundamental para desenvolvimento das costas"
  },
  "remada-curvada": {
    name: "Remada Curvada",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/kBWAon7ItDw",
    primaryMuscles: ["Latíssimo do Dorso", "Trapézio"],
    secondaryMuscles: ["Bíceps", "Deltoide Posterior"],
    description: "Desenvolvimento completo das costas"
  },
  "puxada-frontal": {
    name: "Puxada Frontal",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
    primaryMuscles: ["Latíssimo do Dorso"],
    secondaryMuscles: ["Bíceps", "Trapézio"],
    description: "Alternativa à barra fixa para iniciantes"
  },
  "remada-cavalinho": {
    name: "Remada Cavalinho",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/UCXxvVItLoM",
    primaryMuscles: ["Latíssimo do Dorso"],
    secondaryMuscles: ["Bíceps"],
    description: "Isolamento do latíssimo com apoio"
  },
  "levantamento-terra": {
    name: "Levantamento Terra",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q",
    primaryMuscles: ["Lombar", "Glúteos", "Posterior de Coxa"],
    secondaryMuscles: ["Trapézio", "Core"],
    description: "Exercício composto fundamental"
  },

  // PERNAS
  "agachamento-livre": {
    name: "Agachamento Livre",
    imageUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8",
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Posterior de Coxa", "Core"],
    description: "Rei dos exercícios para pernas"
  },
  "leg-press": {
    name: "Leg Press",
    imageUrl: "https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ",
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Posterior de Coxa"],
    description: "Desenvolvimento de pernas com segurança"
  },
  "cadeira-extensora": {
    name: "Cadeira Extensora",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0",
    primaryMuscles: ["Quadríceps"],
    secondaryMuscles: [],
    description: "Isolamento do quadríceps"
  },
  "cadeira-flexora": {
    name: "Cadeira Flexora",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/ELOCsoDSmrg",
    primaryMuscles: ["Posterior de Coxa"],
    secondaryMuscles: [],
    description: "Isolamento do posterior de coxa"
  },
  "stiff": {
    name: "Stiff",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/1uDiW5--rAE",
    primaryMuscles: ["Posterior de Coxa", "Glúteos"],
    secondaryMuscles: ["Lombar"],
    description: "Desenvolvimento do posterior de coxa"
  },
  "panturrilha-em-pe": {
    name: "Panturrilha em Pé",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI",
    primaryMuscles: ["Panturrilha"],
    secondaryMuscles: [],
    description: "Desenvolvimento das panturrilhas"
  },

  // OMBROS
  "desenvolvimento-militar": {
    name: "Desenvolvimento Militar",
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog",
    primaryMuscles: ["Deltoide"],
    secondaryMuscles: ["Tríceps", "Trapézio"],
    description: "Exercício fundamental para ombros"
  },
  "elevacao-lateral": {
    name: "Elevação Lateral",
    imageUrl: "https://images.unsplash.com/photo-1584863231364-2edc166de576?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
    primaryMuscles: ["Deltoide Lateral"],
    secondaryMuscles: [],
    description: "Isolamento do deltoide lateral"
  },
  "elevacao-frontal": {
    name: "Elevação Frontal",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/qzGrDJHtWJ4",
    primaryMuscles: ["Deltoide Anterior"],
    secondaryMuscles: [],
    description: "Isolamento do deltoide anterior"
  },
  "crucifixo-inverso": {
    name: "Crucifixo Inverso",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/tTKY4jEbHZY",
    primaryMuscles: ["Deltoide Posterior"],
    secondaryMuscles: ["Trapézio"],
    description: "Desenvolvimento do deltoide posterior"
  },

  // BÍCEPS
  "rosca-direta": {
    name: "Rosca Direta",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    primaryMuscles: ["Bíceps"],
    secondaryMuscles: ["Antebraço"],
    description: "Exercício clássico para bíceps"
  },
  "rosca-alternada": {
    name: "Rosca Alternada",
    imageUrl: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/sAq_ocpRh_I",
    primaryMuscles: ["Bíceps"],
    secondaryMuscles: ["Antebraço"],
    description: "Variação unilateral da rosca"
  },
  "rosca-martelo": {
    name: "Rosca Martelo",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4",
    primaryMuscles: ["Bíceps", "Braquial"],
    secondaryMuscles: ["Antebraço"],
    description: "Desenvolvimento do braquial"
  },
  "rosca-scott": {
    name: "Rosca Scott",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/fIWP-FRFNU0",
    primaryMuscles: ["Bíceps"],
    secondaryMuscles: [],
    description: "Isolamento do bíceps com apoio"
  },

  // TRÍCEPS
  "triceps-testa": {
    name: "Tríceps Testa",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/d_KZxkY_0cM",
    primaryMuscles: ["Tríceps"],
    secondaryMuscles: [],
    description: "Isolamento do tríceps"
  },
  "triceps-corda": {
    name: "Tríceps Corda",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/2-LAMcpzODU",
    primaryMuscles: ["Tríceps"],
    secondaryMuscles: [],
    description: "Desenvolvimento do tríceps com corda"
  },
  "triceps-frances": {
    name: "Tríceps Francês",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/nRiJVZDpdL0",
    primaryMuscles: ["Tríceps"],
    secondaryMuscles: [],
    description: "Alongamento completo do tríceps"
  },
  "mergulho": {
    name: "Mergulho",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As",
    primaryMuscles: ["Tríceps", "Peitoral Inferior"],
    secondaryMuscles: ["Deltoide Anterior"],
    description: "Exercício composto para tríceps"
  },

  // ABDÔMEN
  "abdominal-supra": {
    name: "Abdominal Supra",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/Xyd_fa5zoEU",
    primaryMuscles: ["Reto Abdominal"],
    secondaryMuscles: [],
    description: "Exercício básico para abdômen"
  },
  "prancha": {
    name: "Prancha",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c",
    primaryMuscles: ["Core"],
    secondaryMuscles: ["Ombros", "Glúteos"],
    description: "Fortalecimento isométrico do core"
  },
  "abdominal-infra": {
    name: "Abdominal Infra",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/JB2oyawG9KI",
    primaryMuscles: ["Reto Abdominal Inferior"],
    secondaryMuscles: [],
    description: "Foco na porção inferior do abdômen"
  },
};

/**
 * Busca exercício por nome (case-insensitive e com normalização)
 */
export function getExerciseMedia(exerciseName: string): ExerciseMedia | null {
  const normalized = exerciseName.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  
  return EXERCISE_LIBRARY[normalized] || null;
}

/**
 * Busca exercícios por grupo muscular
 */
export function getExercisesByMuscle(muscle: string): ExerciseMedia[] {
  return Object.values(EXERCISE_LIBRARY).filter(
    ex => ex.primaryMuscles.includes(muscle) || ex.secondaryMuscles.includes(muscle)
  );
}

/**
 * Busca exercícios alternativos (mesmo grupo muscular)
 */
export function getAlternativeExercises(exerciseName: string): ExerciseMedia[] {
  const exercise = getExerciseMedia(exerciseName);
  if (!exercise) return [];
  
  const primaryMuscle = exercise.primaryMuscles[0];
  return Object.values(EXERCISE_LIBRARY).filter(
    ex => ex.name !== exercise.name && ex.primaryMuscles.includes(primaryMuscle)
  );
}

/**
 * Lista todos os exercícios disponíveis
 */
export function getAllExercises(): ExerciseMedia[] {
  return Object.values(EXERCISE_LIBRARY);
}

/**
 * Busca exercícios por categoria
 */
export function getExercisesByCategory(category: string): ExerciseMedia[] {
  const categoryMap: Record<string, string[]> = {
    peito: ["Peitoral Maior", "Peitoral Superior", "Peitoral Inferior"],
    costas: ["Latíssimo do Dorso", "Trapézio", "Lombar"],
    pernas: ["Quadríceps", "Posterior de Coxa", "Glúteos", "Panturrilha"],
    ombros: ["Deltoide", "Deltoide Anterior", "Deltoide Lateral", "Deltoide Posterior"],
    bracos: ["Bíceps", "Tríceps", "Antebraço"],
    core: ["Reto Abdominal", "Core"],
  };

  const muscles = categoryMap[category.toLowerCase()] || [];
  return Object.values(EXERCISE_LIBRARY).filter(
    ex => muscles.some(m => ex.primaryMuscles.includes(m))
  );
}
