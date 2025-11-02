import { useEffect, useState } from 'react';
import { Heart, MapPin, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Testimonial } from '../lib/supabase';

export function CommunityPage() {
  const { language, t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
      } else {
        setTestimonials(data || []);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">
            {t('Loading stories...', 'कहानियाँ लोड हो रही हैं...')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('Stories from Learners', 'शिक्षार्थियों की कहानियाँ')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t(
              'Real stories from people who transformed their lives through digital literacy',
              'उन लोगों की वास्तविक कहानियाँ जिन्होंने डिजिटल साक्षरता के माध्यम से अपने जीवन को बदल दिया'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-base">{testimonial.location}</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Heart
                    size={40}
                    className="absolute -top-2 -left-2 text-sky-200 opacity-50"
                  />
                  <p className="text-lg text-gray-700 leading-relaxed relative z-10 pl-6">
                    "{language === 'en' ? testimonial.story_en : testimonial.story_hi}"
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-medium">
                      {t('Inspiring', 'प्रेरणादायक')}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm font-medium">
                      {t('Share', 'साझा करें')}
                    </span>
                  </button>
                </div>
              </div>
              <div
                className={`h-2 ${
                  index % 3 === 0
                    ? 'bg-gradient-to-r from-sky-400 to-blue-400'
                    : index % 3 === 1
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400'
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t('Share Your Story', 'अपनी कहानी साझा करें')}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t(
              'Have you learned something new? Inspire others by sharing your digital learning journey!',
              'क्या आपने कुछ नया सीखा है? अपनी डिजिटल सीखने की यात्रा साझा करके दूसरों को प्रेरित करें!'
            )}
          </p>
          <button className="bg-gradient-to-r from-sky-500 to-green-500 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
            {t('Submit Your Story', 'अपनी कहानी सबमिट करें')}
          </button>
        </div>

        <div className="mt-16 bg-gradient-to-r from-sky-500 to-green-500 rounded-3xl p-10 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">{testimonials.length}+</p>
              <p className="text-xl">
                {t('Success Stories', 'सफलता की कहानियाँ')}
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-xl">
                {t('Active Learners', 'सक्रिय शिक्षार्थी')}
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-xl">
                {t('Villages Reached', 'गाँव पहुंचे')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
