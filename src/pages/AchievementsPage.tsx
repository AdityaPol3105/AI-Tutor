import { useEffect, useState } from 'react';
import { Award, Trophy, ShieldCheck, Star, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Badge } from '../lib/supabase';

const iconMap: Record<string, any> = {
  Award,
  Trophy,
  ShieldCheck,
  Star,
};

export function AchievementsPage() {
  const { language, t } = useLanguage();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [earnedBadges] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBadges() {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('requirement');

      if (error) {
        console.error('Error fetching badges:', error);
      } else {
        setBadges(data || []);
      }
      setLoading(false);
    }

    fetchBadges();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">
            {t('Loading achievements...', 'उपलब्धियां लोड हो रही हैं...')}
          </p>
        </div>
      </div>
    );
  }

  const completedLessons = 0;
  const totalLessons = 15;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('Your Achievements', 'आपकी उपलब्धियां')}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t(
              'Track your progress and unlock badges as you learn',
              'अपनी प्रगति को ट्रैक करें और सीखते समय बैज अनलॉक करें'
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('Learning Progress', 'सीखने की प्रगति')}
            </h2>
            <span className="text-3xl font-bold text-sky-600">
              {completedLessons}/{totalLessons}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-green-500 h-6 rounded-full transition-all duration-500 flex items-center justify-center"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 10 && (
                <span className="text-white text-sm font-bold">
                  {progressPercentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">
            {t(
              'Complete more lessons to unlock achievements and badges!',
              'उपलब्धियां और बैज अनलॉक करने के लिए अधिक पाठ पूरे करें!'
            )}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            {t('Available Badges', 'उपलब्ध बैज')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => {
              const IconComponent = iconMap[badge.icon] || Award;
              const isEarned = earnedBadges.includes(badge.id);
              const isLocked = !isEarned;

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-8 text-center transition-all transform hover:scale-105 ${
                    isEarned
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-xl'
                      : 'bg-white shadow-md border-2 border-dashed border-gray-300'
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      isEarned
                        ? 'bg-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {isLocked ? (
                      <Lock size={48} className="text-gray-400" />
                    ) : (
                      <IconComponent
                        size={48}
                        className={isEarned ? 'text-yellow-600' : 'text-gray-400'}
                      />
                    )}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isEarned ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {language === 'en' ? badge.name_en : badge.name_hi}
                  </h3>
                  <p
                    className={`text-base leading-relaxed ${
                      isEarned ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {language === 'en' ? badge.description_en : badge.description_hi}
                  </p>
                  {isLocked && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        {t(
                          `Complete ${badge.requirement} lesson${badge.requirement > 1 ? 's' : ''} to unlock`,
                          `अनलॉक करने के लिए ${badge.requirement} पाठ पूरे करें`
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-500 to-green-500 rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('Keep Learning!', 'सीखते रहें!')}
          </h2>
          <p className="text-xl leading-relaxed mb-6">
            {t(
              'Every lesson you complete brings you closer to becoming digitally confident',
              'आपके द्वारा पूरा किया गया प्रत्येक पाठ आपको डिजिटल रूप से आत्मविश्वासी बनने के करीब लाता है'
            )}
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-4xl font-bold mb-1">{completedLessons}</p>
              <p className="text-sm">
                {t('Lessons Completed', 'पाठ पूर्ण')}
              </p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-4xl font-bold mb-1">{earnedBadges.length}</p>
              <p className="text-sm">
                {t('Badges Earned', 'बैज अर्जित')}
              </p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-4xl font-bold mb-1">{Math.round(progressPercentage)}%</p>
              <p className="text-sm">
                {t('Progress', 'प्रगति')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
