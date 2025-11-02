/*
  # Digital Literacy Platform Database Schema

  ## Overview
  This migration creates the database structure for an AI-powered digital literacy platform
  designed for rural communities. It supports course management, user progress tracking,
  achievements, and community testimonials.

  ## New Tables

  ### 1. courses
  - `id` (uuid, primary key) - Unique course identifier
  - `title_en` (text) - Course title in English
  - `title_hi` (text) - Course title in Hindi
  - `description_en` (text) - Course description in English
  - `description_hi` (text) - Course description in Hindi
  - `icon` (text) - Icon name for the course
  - `difficulty` (text) - Difficulty level (beginner, intermediate, advanced)
  - `order_index` (integer) - Display order
  - `created_at` (timestamp) - Record creation time

  ### 2. lessons
  - `id` (uuid, primary key) - Unique lesson identifier
  - `course_id` (uuid, foreign key) - Reference to parent course
  - `title_en` (text) - Lesson title in English
  - `title_hi` (text) - Lesson title in Hindi
  - `content_en` (text) - Lesson content in English
  - `content_hi` (text) - Lesson content in Hindi
  - `order_index` (integer) - Display order within course
  - `created_at` (timestamp) - Record creation time

  ### 3. user_progress
  - `id` (uuid, primary key) - Unique progress record identifier
  - `user_id` (uuid, foreign key) - Reference to authenticated user
  - `lesson_id` (uuid, foreign key) - Reference to completed lesson
  - `completed` (boolean) - Completion status
  - `completed_at` (timestamp) - Completion time
  - `created_at` (timestamp) - Record creation time

  ### 4. badges
  - `id` (uuid, primary key) - Unique badge identifier
  - `name_en` (text) - Badge name in English
  - `name_hi` (text) - Badge name in Hindi
  - `description_en` (text) - Badge description in English
  - `description_hi` (text) - Badge description in Hindi
  - `icon` (text) - Icon name for the badge
  - `requirement` (integer) - Number of lessons required to earn
  - `created_at` (timestamp) - Record creation time

  ### 5. user_badges
  - `id` (uuid, primary key) - Unique user badge record
  - `user_id` (uuid, foreign key) - Reference to authenticated user
  - `badge_id` (uuid, foreign key) - Reference to earned badge
  - `earned_at` (timestamp) - Time badge was earned
  - `created_at` (timestamp) - Record creation time

  ### 6. testimonials
  - `id` (uuid, primary key) - Unique testimonial identifier
  - `name` (text) - Learner's name
  - `location` (text) - Learner's location
  - `story_en` (text) - Success story in English
  - `story_hi` (text) - Success story in Hindi
  - `image_url` (text) - Profile photo URL (optional)
  - `approved` (boolean) - Moderation status
  - `created_at` (timestamp) - Record creation time

  ### 7. feedback
  - `id` (uuid, primary key) - Unique feedback identifier
  - `name` (text) - Submitter's name
  - `location` (text) - Submitter's location (optional)
  - `message` (text) - Feedback message
  - `user_id` (uuid, foreign key) - Reference to authenticated user (optional)
  - `created_at` (timestamp) - Record creation time

  ## Security
  
  All tables have Row Level Security (RLS) enabled with appropriate policies:
  
  - **courses** and **lessons**: Public read access, admin write access
  - **user_progress**: Users can read/write their own progress only
  - **badges**: Public read access
  - **user_badges**: Users can read their own badges only
  - **testimonials**: Public read for approved testimonials, authenticated users can submit
  - **feedback**: Authenticated users can submit and view their own feedback

  ## Notes
  
  - All tables use UUIDs for primary keys with automatic generation
  - Timestamps default to current time
  - Foreign key constraints ensure data integrity
  - Bilingual support (English/Hindi) for all user-facing content
  - Progress tracking tied to authenticated users via auth.uid()
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_hi text NOT NULL,
  description_en text NOT NULL,
  description_hi text NOT NULL,
  icon text NOT NULL,
  difficulty text DEFAULT 'beginner',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title_en text NOT NULL,
  title_hi text NOT NULL,
  content_en text NOT NULL,
  content_hi text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_hi text NOT NULL,
  description_en text NOT NULL,
  description_hi text NOT NULL,
  icon text NOT NULL,
  requirement integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  story_en text NOT NULL,
  story_hi text NOT NULL,
  image_url text,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  message text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policies for courses (public read)
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO public
  USING (true);

-- Policies for lessons (public read)
CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO public
  USING (true);

-- Policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for badges (public read)
CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  TO public
  USING (true);

-- Policies for user_badges
CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn badges"
  ON user_badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for testimonials
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Authenticated users can submit testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for feedback
CREATE POLICY "Users can submit feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample courses
INSERT INTO courses (title_en, title_hi, description_en, description_hi, icon, order_index) VALUES
  ('Basic Computer Skills', 'बुनियादी कंप्यूटर कौशल', 'Learn how to use a computer, keyboard, and mouse', 'कंप्यूटर, कीबोर्ड और माउस का उपयोग करना सीखें', 'Monitor', 1),
  ('Smartphone Basics', 'स्मार्टफोन मूल बातें', 'Master your smartphone - calls, messages, and apps', 'अपने स्मार्टफोन में महारत हासिल करें - कॉल, संदेश और ऐप्स', 'Smartphone', 2),
  ('Internet & Online Safety', 'इंटरनेट और ऑनलाइन सुरक्षा', 'Browse safely and protect yourself online', 'सुरक्षित ब्राउज़ करें और ऑनलाइन अपनी सुरक्षा करें', 'Shield', 3),
  ('Digital Payments', 'डिजिटल भुगतान', 'Learn UPI, QR codes, and safe online transactions', 'UPI, QR कोड और सुरक्षित ऑनलाइन लेनदेन सीखें', 'CreditCard', 4),
  ('Government Digital Services', 'सरकारी डिजिटल सेवाएं', 'Access Aadhaar, DigiLocker, and other e-services', 'आधार, डिजीलॉकर और अन्य ई-सेवाओं तक पहुंचें', 'Building', 5);

-- Insert sample badges
INSERT INTO badges (name_en, name_hi, description_en, description_hi, icon, requirement) VALUES
  ('Digital Beginner', 'डिजिटल शुरुआत', 'Complete your first lesson', 'अपना पहला पाठ पूरा करें', 'Award', 1),
  ('Internet Hero', 'इंटरनेट नायक', 'Complete 5 lessons', '5 पाठ पूरे करें', 'Trophy', 5),
  ('Safe User', 'सुरक्षित उपयोगकर्ता', 'Complete Internet Safety course', 'इंटरनेट सुरक्षा पाठ्यक्रम पूरा करें', 'ShieldCheck', 3),
  ('Digital Champion', 'डिजिटल चैंपियन', 'Complete all courses', 'सभी पाठ्यक्रम पूरे करें', 'Star', 10);

-- Insert sample testimonials
INSERT INTO testimonials (name, location, story_en, story_hi, approved) VALUES
  ('Ramesh Kumar', 'Rajasthan', 'Learning to use UPI has made my life so much easier. No more cash worries!', 'UPI का उपयोग सीखने से मेरा जीवन बहुत आसान हो गया है। अब नकदी की चिंता नहीं!', true),
  ('Meena Devi', 'Bihar', 'I can now video call my children in the city. Technology is wonderful!', 'अब मैं शहर में अपने बच्चों को वीडियो कॉल कर सकती हूं। तकनीक अद्भुत है!', true),
  ('Suresh Patil', 'Maharashtra', 'Got my Aadhaar card downloaded from DigiLocker. Very helpful lessons!', 'डिजीलॉकर से मेरा आधार कार्ड डाउनलोड किया। बहुत उपयोगी पाठ!', true);