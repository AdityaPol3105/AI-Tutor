export interface Course {
  id: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  icon: string;
  category: string;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title_en: string;
  title_hi: string;
  content_en: string;
  content_hi: string;
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
  requirement_type: string;
  requirement_count: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  story_en: string;
  story_hi: string;
  photo_url?: string;
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

export type Language = 'en' | 'hi';
