import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Course {
  id: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  icon: string;
  difficulty: string;
  order_index: number;
  created_at: string;
}

export interface Badge {
  id: string;
  name_en: string;
  name_hi: string;
  description_en: string;
  description_hi: string;
  icon: string;
  requirement: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  story_en: string;
  story_hi: string;
  image_url?: string;
  approved: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}
