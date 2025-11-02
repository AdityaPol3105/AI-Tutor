import { useEffect, useState } from 'react';
import { Monitor, Smartphone, Shield, CreditCard, Building, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Course } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CoursesPageProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, typeof Monitor> = {
  Monitor,
  Smartphone,
  Shield,
  CreditCard,
  Building,
};

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const { language, t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">
            {t('Loading courses...', 'पाठ्यक्रम लोड हो रहे हैं...')}
          </p>
        </div>
      </div>
    );
  }

  // ✅ Function to get HTML file link based on course title
  const getCourseLink = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('computer')) return '/computer.html';
    if (lowerTitle.includes('smartphone')) return '/internet.html';
    if (lowerTitle.includes('internet')) return '/cyber.html';
    if (lowerTitle.includes('payment')) return '/payments.html';
    if (lowerTitle.includes('government')) return '/govt.html';
    return '/default.html'; // fallback
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('Choose What You Want to Learn', 'चुनें कि आप क्या सीखना चाहते हैं')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              'Start your digital learning journey with easy, step-by-step courses designed for everyone',
              'सभी के लिए डिज़ाइन किए गए आसान, चरण-दर-चरण पाठ्यक्रमों के साथ अपनी डिजिटल सीखने की यात्रा शुरू करें'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = iconMap[course.icon] || Monitor;
            const courseLink = getCourseLink(course.title_en); // use English title for match

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-sky-400 to-green-400 p-8 text-white">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {language === 'en' ? course.title_en : course.title_hi}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {language === 'en' ? course.description_en : course.description_hi}
                  </p>

                  {/* ✅ Replaced button with a link */}
                  <a
                    href={courseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-green-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-sky-600 hover:to-green-600 transition-all text-center"
                  >
                    {t('Start Lesson', 'पाठ शुरू करें')}
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-sky-50 rounded-2xl p-8 text-center border-2 border-sky-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t('Need Help Choosing?', 'चुनने में मदद चाहिए?')}
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            {t(
              'Talk to our AI Tutor to find the perfect course for you!',
              'अपने लिए सही पाठ्यक्रम खोजने के लिए हमारे AI ट्यूटर से बात करें!'
            )}
          </p>
          <button
            onClick={() => onNavigate('tutor')}
            className="bg-sky-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-sky-700 transition-all"
          >
            {t('Talk to AI Tutor', 'AI ट्यूटर से बात करें')}
          </button>
        </div>
      </div>
    </div>
  );
}
