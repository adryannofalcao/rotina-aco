/**
 * 🎯 BANCO DE DADOS DE EXERCÍCIOS COM ANIMAÇÕES 3D
 * 
 * ⚠️ IMPORTANTE PARA O DESENVOLVEDOR:
 * 
 * As URLs de vídeo (videoUrl) devem ser substituídas por animações 3D reais.
 * 
 * ESPECIFICAÇÕES DAS ANIMAÇÕES 3D:
 * 1. Modelo corporal 3D (masculino ou feminino) executando o movimento
 * 2. Músculos principais destacados em vermelho/laranja
 * 3. Músculos secundários destacados em azul ou cor suave
 * 4. Movimento contínuo em loop, suave, de 3 a 5 segundos
 * 5. Fundo branco ou cinza neutro
 * 6. Formato: MP4 ou WebM com boa compactação
 * 7. Resolução: 1080x1080 ou 1920x1080
 * 
 * FERRAMENTAS RECOMENDADAS PARA CRIAR ANIMAÇÕES:
 * - Blender (gratuito, open-source)
 * - Maya
 * - Cinema 4D
 * - Mixamo (para animações de personagens)
 * 
 * WORKFLOW SUGERIDO:
 * 1. Modelar corpo humano 3D com anatomia muscular
 * 2. Criar animação do movimento do exercício
 * 3. Aplicar materiais coloridos nos músculos (vermelho/laranja para principais, azul para secundários)
 * 4. Renderizar em loop de 3-5 segundos
 * 5. Exportar em MP4/WebM otimizado
 * 6. Hospedar em CDN ou storage (Vercel Blob, AWS S3, etc)
 * 7. Substituir URLs abaixo pelas URLs reais
 */

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string[];
  primaryMuscles: string[]; // Músculos principais (vermelho/laranja)
  secondaryMuscles: string[]; // Músculos secundários (azul)
  equipment: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  videoUrl: string; // URL da animação 3D em loop
  thumbnailUrl: string; // Foto/imagem do exercício
  description: string;
  instructions: string[];
}

export const EXERCISES_DATABASE: Exercise[] = [
  // ========================================
  // PEITO (CHEST)
  // ========================================
  {
    id: "supino-reto",
    name: "Supino Reto",
    category: "peito",
    muscleGroup: ["peito", "triceps", "ombros"],
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Tríceps", "Deltoide Anterior"],
    equipment: "Barra",
    difficulty: "intermediario",
    videoUrl: "/animations/supino-reto.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop",
    description: "Exercício fundamental para desenvolvimento do peitoral maior",
    instructions: [
      "Deite no banco com os pés firmes no chão",
      "Segure a barra com pegada um pouco mais larga que os ombros",
      "Desça a barra controladamente até o peito",
      "Empurre a barra de volta à posição inicial"
    ]
  },
  {
    id: "supino-inclinado",
    name: "Supino Inclinado",
    category: "peito",
    muscleGroup: ["peito", "triceps", "ombros"],
    primaryMuscles: ["Peitoral Superior"],
    secondaryMuscles: ["Tríceps", "Deltoide Anterior"],
    equipment: "Barra",
    difficulty: "intermediario",
    videoUrl: "/animations/supino-inclinado.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=800&fit=crop",
    description: "Foca na parte superior do peitoral",
    instructions: [
      "Ajuste o banco em 30-45 graus",
      "Deite e segure a barra",
      "Desça controladamente até a parte superior do peito",
      "Empurre de volta à posição inicial"
    ]
  },
  {
    id: "crucifixo",
    name: "Crucifixo",
    category: "peito",
    muscleGroup: ["peito"],
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Deltoide Anterior"],
    equipment: "Halteres",
    difficulty: "iniciante",
    videoUrl: "/animations/crucifixo.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop",
    description: "Exercício de isolamento para o peitoral",
    instructions: [
      "Deite no banco com halteres nas mãos",
      "Abra os braços em arco até sentir alongamento no peito",
      "Retorne à posição inicial mantendo leve flexão nos cotovelos"
    ]
  },
  {
    id: "flexao",
    name: "Flexão",
    category: "peito",
    muscleGroup: ["peito", "triceps", "core"],
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Tríceps", "Core", "Deltoide Anterior"],
    equipment: "Peso Corporal",
    difficulty: "iniciante",
    videoUrl: "/animations/flexao.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=800&fit=crop",
    description: "Exercício clássico de peso corporal para peito",
    instructions: [
      "Posição de prancha com mãos na largura dos ombros",
      "Desça o corpo mantendo-o reto",
      "Empurre de volta à posição inicial"
    ]
  },

  // ========================================
  // COSTAS (BACK)
  // ========================================
  {
    id: "barra-fixa",
    name: "Barra Fixa",
    category: "costas",
    muscleGroup: ["costas", "biceps"],
    primaryMuscles: ["Latíssimo do Dorso"],
    secondaryMuscles: ["Bíceps", "Trapézio"],
    equipment: "Barra Fixa",
    difficulty: "intermediario",
    videoUrl: "/animations/barra-fixa.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=800&fit=crop",
    description: "Exercício fundamental para desenvolvimento das costas",
    instructions: [
      "Segure a barra com pegada pronada (palmas para frente)",
      "Puxe o corpo até o queixo passar a barra",
      "Desça controladamente"
    ]
  },
  {
    id: "remada-curvada",
    name: "Remada Curvada",
    category: "costas",
    muscleGroup: ["costas", "biceps"],
    primaryMuscles: ["Latíssimo do Dorso", "Trapézio"],
    secondaryMuscles: ["Bíceps", "Deltoide Posterior"],
    equipment: "Barra",
    difficulty: "intermediario",
    videoUrl: "/animations/remada-curvada.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop",
    description: "Exercício composto para espessura das costas",
    instructions: [
      "Incline o tronco para frente mantendo costas retas",
      "Puxe a barra em direção ao abdômen",
      "Contraia as escápulas no topo do movimento"
    ]
  },
  {
    id: "levantamento-terra",
    name: "Levantamento Terra",
    category: "costas",
    muscleGroup: ["costas", "pernas", "core"],
    primaryMuscles: ["Eretores da Espinha", "Glúteos", "Isquiotibiais"],
    secondaryMuscles: ["Trapézio", "Quadríceps", "Core"],
    equipment: "Barra",
    difficulty: "avancado",
    videoUrl: "/animations/levantamento-terra.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
    description: "Exercício completo para corpo todo",
    instructions: [
      "Posicione-se com barra sobre os pés",
      "Segure a barra e levante mantendo costas retas",
      "Estenda quadris e joelhos simultaneamente",
      "Desça controladamente"
    ]
  },

  // ========================================
  // PERNAS (LEGS)
  // ========================================
  {
    id: "agachamento",
    name: "Agachamento",
    category: "pernas",
    muscleGroup: ["pernas", "gluteos", "core"],
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Isquiotibiais", "Core"],
    equipment: "Barra",
    difficulty: "intermediario",
    videoUrl: "/animations/agachamento.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=800&fit=crop",
    description: "Rei dos exercícios para pernas",
    instructions: [
      "Posicione a barra nas costas",
      "Desça até coxas paralelas ao chão",
      "Mantenha joelhos alinhados com os pés",
      "Empurre pelos calcanhares para subir"
    ]
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "pernas",
    muscleGroup: ["pernas", "gluteos"],
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Isquiotibiais"],
    equipment: "Máquina",
    difficulty: "iniciante",
    videoUrl: "/animations/leg-press.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=800&fit=crop",
    description: "Exercício seguro para desenvolvimento de pernas",
    instructions: [
      "Posicione os pés na plataforma na largura dos ombros",
      "Desça controladamente flexionando os joelhos",
      "Empurre a plataforma de volta"
    ]
  },
  {
    id: "agachamento-jump",
    name: "Agachamento Jump",
    category: "pernas",
    muscleGroup: ["pernas", "gluteos", "cardio"],
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Panturrilhas", "Core"],
    equipment: "Peso Corporal",
    difficulty: "intermediario",
    videoUrl: "/animations/agachamento-jump.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
    description: "Exercício pliométrico para potência e queima de calorias",
    instructions: [
      "Agache até coxas paralelas ao chão",
      "Exploda para cima saltando",
      "Aterrisse suavemente e repita"
    ]
  },

  // ========================================
  // OMBROS (SHOULDERS)
  // ========================================
  {
    id: "desenvolvimento",
    name: "Desenvolvimento",
    category: "ombros",
    muscleGroup: ["ombros", "triceps"],
    primaryMuscles: ["Deltoide"],
    secondaryMuscles: ["Tríceps", "Trapézio Superior"],
    equipment: "Barra",
    difficulty: "intermediario",
    videoUrl: "/animations/desenvolvimento.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=800&fit=crop",
    description: "Exercício principal para ombros",
    instructions: [
      "Segure a barra na altura dos ombros",
      "Empurre a barra acima da cabeça",
      "Desça controladamente"
    ]
  },
  {
    id: "elevacao-lateral",
    name: "Elevação Lateral",
    category: "ombros",
    muscleGroup: ["ombros"],
    primaryMuscles: ["Deltoide Lateral"],
    secondaryMuscles: ["Trapézio"],
    equipment: "Halteres",
    difficulty: "iniciante",
    videoUrl: "/animations/elevacao-lateral.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
    description: "Isolamento para deltoide lateral",
    instructions: [
      "Segure halteres ao lado do corpo",
      "Eleve os braços lateralmente até altura dos ombros",
      "Desça controladamente"
    ]
  },

  // ========================================
  // BRAÇOS (ARMS)
  // ========================================
  {
    id: "rosca-direta",
    name: "Rosca Direta",
    category: "biceps",
    muscleGroup: ["biceps"],
    primaryMuscles: ["Bíceps"],
    secondaryMuscles: ["Antebraços"],
    equipment: "Barra",
    difficulty: "iniciante",
    videoUrl: "/animations/rosca-direta.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop",
    description: "Exercício clássico para bíceps",
    instructions: [
      "Segure a barra com pegada supinada",
      "Flexione os cotovelos levando a barra ao peito",
      "Desça controladamente"
    ]
  },
  {
    id: "triceps-testa",
    name: "Tríceps Testa",
    category: "triceps",
    muscleGroup: ["triceps"],
    primaryMuscles: ["Tríceps"],
    secondaryMuscles: [],
    equipment: "Barra",
    difficulty: "intermediario",
    videoUrl: "/animations/triceps-testa.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
    description: "Exercício de isolamento para tríceps",
    instructions: [
      "Deite no banco segurando a barra acima da testa",
      "Flexione apenas os cotovelos descendo a barra",
      "Estenda os cotovelos de volta"
    ]
  },
  {
    id: "triceps-corda",
    name: "Tríceps Corda",
    category: "triceps",
    muscleGroup: ["triceps"],
    primaryMuscles: ["Tríceps"],
    secondaryMuscles: [],
    equipment: "Polia",
    difficulty: "iniciante",
    videoUrl: "/animations/triceps-corda.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop",
    description: "Exercício de isolamento para tríceps com corda",
    instructions: [
      "Segure a corda na polia alta",
      "Empurre para baixo estendendo os cotovelos",
      "Retorne controladamente"
    ]
  },

  // ========================================
  // CORE / ABDÔMEN
  // ========================================
  {
    id: "prancha",
    name: "Prancha",
    category: "core",
    muscleGroup: ["core"],
    primaryMuscles: ["Reto Abdominal", "Transverso do Abdômen"],
    secondaryMuscles: ["Oblíquos", "Eretores da Espinha"],
    equipment: "Peso Corporal",
    difficulty: "iniciante",
    videoUrl: "/animations/prancha.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
    description: "Exercício isométrico para core",
    instructions: [
      "Apoie-se nos antebraços e pontas dos pés",
      "Mantenha o corpo reto como uma prancha",
      "Contraia o abdômen durante todo o exercício"
    ]
  },
  {
    id: "abdominal",
    name: "Abdominal",
    category: "core",
    muscleGroup: ["core"],
    primaryMuscles: ["Reto Abdominal"],
    secondaryMuscles: ["Oblíquos"],
    equipment: "Peso Corporal",
    difficulty: "iniciante",
    videoUrl: "/animations/abdominal.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
    description: "Exercício clássico para abdômen",
    instructions: [
      "Deite de costas com joelhos flexionados",
      "Eleve o tronco em direção aos joelhos",
      "Desça controladamente"
    ]
  },

  // ========================================
  // CARDIO / METABÓLICO
  // ========================================
  {
    id: "burpees",
    name: "Burpees",
    category: "cardio",
    muscleGroup: ["corpo-todo", "cardio"],
    primaryMuscles: ["Corpo Todo"],
    secondaryMuscles: [],
    equipment: "Peso Corporal",
    difficulty: "intermediario",
    videoUrl: "/animations/burpees.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
    description: "Exercício metabólico completo",
    instructions: [
      "Agache e apoie as mãos no chão",
      "Jogue as pernas para trás em posição de flexão",
      "Faça uma flexão",
      "Puxe as pernas de volta e salte"
    ]
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "cardio",
    muscleGroup: ["core", "cardio"],
    primaryMuscles: ["Core", "Quadríceps"],
    secondaryMuscles: ["Ombros"],
    equipment: "Peso Corporal",
    difficulty: "iniciante",
    videoUrl: "/animations/mountain-climbers.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
    description: "Exercício cardio para core",
    instructions: [
      "Posição de prancha alta",
      "Alterne trazendo os joelhos ao peito rapidamente",
      "Mantenha o core contraído"
    ]
  },
  {
    id: "corrida",
    name: "Corrida",
    category: "cardio",
    muscleGroup: ["pernas", "cardio"],
    primaryMuscles: ["Quadríceps", "Isquiotibiais", "Panturrilhas"],
    secondaryMuscles: ["Glúteos", "Core"],
    equipment: "Nenhum",
    difficulty: "iniciante",
    videoUrl: "/animations/corrida.mp4", // ⚠️ SUBSTITUIR POR ANIMAÇÃO 3D REAL
    thumbnailUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=800&fit=crop",
    description: "Exercício cardiovascular fundamental",
    instructions: [
      "Mantenha postura ereta",
      "Aterrisse com meio do pé",
      "Mantenha ritmo constante",
      "Respire de forma controlada"
    ]
  }
];

/**
 * Funções auxiliares para buscar exercícios
 */

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISES_DATABASE.find(ex => ex.id === id);
};

export const getExercisesByCategory = (category: string): Exercise[] => {
  return EXERCISES_DATABASE.filter(ex => ex.category === category);
};

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return EXERCISES_DATABASE.filter(ex => 
    ex.muscleGroup.includes(muscleGroup)
  );
};

export const getExercisesByDifficulty = (difficulty: Exercise["difficulty"]): Exercise[] => {
  return EXERCISES_DATABASE.filter(ex => ex.difficulty === difficulty);
};

export const getExercisesByGoal = (goal: "hipertrofia" | "forca" | "emagrecimento" | "condicionamento"): Exercise[] => {
  switch (goal) {
    case "hipertrofia":
      return EXERCISES_DATABASE.filter(ex => 
        ["peito", "costas", "pernas", "ombros", "biceps", "triceps"].includes(ex.category)
      );
    case "forca":
      return EXERCISES_DATABASE.filter(ex => 
        ["agachamento", "levantamento-terra", "supino-reto", "desenvolvimento", "barra-fixa"].includes(ex.id)
      );
    case "emagrecimento":
      return EXERCISES_DATABASE.filter(ex => 
        ex.category === "cardio" || ex.muscleGroup.includes("cardio")
      );
    case "condicionamento":
      return EXERCISES_DATABASE.filter(ex => 
        ex.category === "cardio" || ex.equipment === "Peso Corporal"
      );
    default:
      return EXERCISES_DATABASE;
  }
};
