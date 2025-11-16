import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type Profile = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  weight?: number;
  height?: number;
  goal?: string;
  created_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  is_public: boolean;
};

export type Exercise = {
  id: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  rest_time?: number;
  notes?: string;
  order_index: number;
  muscle_group: string;
  video_url?: string;
  image_url?: string;
};

export type WorkoutLog = {
  id: string;
  user_id: string;
  workout_id: string;
  completed_at: string;
  duration_minutes?: number;
  notes?: string;
};

export type CommunityPost = {
  id: string;
  user_id: string;
  workout_id?: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'like' | 'comment' | 'workout_copy' | 'reminder';
  content: string;
  read: boolean;
  created_at: string;
  related_user_id?: string;
  related_post_id?: string;
};
