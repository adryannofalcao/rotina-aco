import { getExerciseMedia } from "./exercise-media";

/**
 * Configuração de mídias 3D e imagens para exercícios
 * Integrado com a biblioteca de exercícios
 */

export interface Muscle3DMedia {
  videoUrl: string;
  thumbnail: string;
  muscles: string[];
}

/**
 * Normaliza nomes de músculos para exibição
 */
export function normalizeMuscles(muscles: string[]): string[] {
  const muscleMap: Record<string, string> = {
    "Peitoral Maior": "Peitoral",
    "Peitoral Superior": "Peitoral Superior",
    "Peitoral Inferior": "Peitoral Inferior",
    "Latíssimo do Dorso": "Dorsal",
    "Trapézio": "Trapézio",
    "Deltoide": "Ombro",
    "Deltoide Anterior": "Ombro Anterior",
    "Deltoide Lateral": "Ombro Lateral",
    "Deltoide Posterior": "Ombro Posterior",
    "Bíceps": "Bíceps",
    "Tríceps": "Tríceps",
    "Quadríceps": "Quadríceps",
    "Posterior de Coxa": "Posterior",
    "Glúteos": "Glúteo",
    "Panturrilha": "Panturrilha",
    "Core": "Core",
    "Reto Abdominal": "Abdômen",
    "Lombar": "Lombar",
  };

  return muscles.map(m => muscleMap[m] || m);
}

/**
 * Busca mídia 3D para um exercício específico
 * Usa a biblioteca de exercícios como fonte principal
 */
export function get3DMediaForExercise(
  exerciseName: string,
  primaryMuscles: string[]
): Muscle3DMedia {
  // Tenta buscar na biblioteca de exercícios
  const exerciseMedia = getExerciseMedia(exerciseName);
  
  if (exerciseMedia) {
    return {
      videoUrl: exerciseMedia.imageUrl, // Usa a imagem como preview do vídeo
      thumbnail: exerciseMedia.imageUrl,
      muscles: normalizeMuscles(exerciseMedia.primaryMuscles),
    };
  }

  // Fallback: busca por grupo muscular
  const muscleGroup = primaryMuscles[0]?.toLowerCase() || "";
  
  const fallbackImages: Record<string, string> = {
    "peitoral": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80",
    "dorsal": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80",
    "latíssimo": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop&q=80",
    "ombro": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop&q=80",
    "deltoide": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop&q=80",
    "bíceps": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&q=80",
    "tríceps": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    "quadríceps": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop&q=80",
    "pernas": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop&q=80",
    "posterior": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop&q=80",
    "glúteo": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop&q=80",
    "panturrilha": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    "abdômen": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    "core": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    "lombar": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80",
  };

  // Busca imagem por grupo muscular
  let fallbackImage = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80";
  
  for (const [key, image] of Object.entries(fallbackImages)) {
    if (muscleGroup.includes(key)) {
      fallbackImage = image;
      break;
    }
  }

  return {
    videoUrl: fallbackImage,
    thumbnail: fallbackImage,
    muscles: normalizeMuscles(primaryMuscles),
  };
}

/**
 * Busca vídeo de execução do exercício
 */
export function getExerciseVideo(exerciseName: string): string | null {
  const exerciseMedia = getExerciseMedia(exerciseName);
  return exerciseMedia?.videoUrl || null;
}
