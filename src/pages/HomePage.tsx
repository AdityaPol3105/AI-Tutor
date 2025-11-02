import { Smartphone, Shield, Users, BookOpen, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: Smartphone,
      title_en: 'AI-Powered Learning',
      title_hi: 'AI-संचालित सीखना',
      desc_en: 'Personalized lessons adapted to your pace and learning style',
      desc_hi: 'आपकी गति और सीखने की शैली के अनुसार व्यक्तिगत पाठ',
    },
    {
      icon: Globe,
      title_en: 'Local Language Support',
      title_hi: 'स्थानीय भाषा समर्थन',
      desc_en: 'Learn in Hindi, English, or your preferred regional language',
      desc_hi: 'हिंदी, अंग्रेजी या अपनी पसंदीदा क्षेत्रीय भाषा में सीखें',
    },
    {
      icon: Zap,
      title_en: 'Step-by-Step Guidance',
      title_hi: 'चरण-दर-चरण मार्गदर्शन',
      desc_en: 'Simple, clear instructions that anyone can follow',
      desc_hi: 'सरल, स्पष्ट निर्देश जिन्हें कोई भी अनुसरण कर सकता है',
    },
  ];

  const whyMatters = [
    {
      icon: BookOpen,
      title_en: 'Access to Information',
      title_hi: 'जानकारी तक पहुंच',
      desc_en: 'Open doors to knowledge and opportunities',
      desc_hi: 'ज्ञान और अवसरों के द्वार खोलें',
    },
    {
      icon: Users,
      title_en: 'Connect with Loved Ones',
      title_hi: 'प्रियजनों से जुड़ें',
      desc_en: 'Stay in touch through calls and messages',
      desc_hi: 'कॉल और संदेशों के माध्यम से संपर्क में रहें',
    },
    {
      icon: Shield,
      title_en: 'Safe & Secure',
      title_hi: 'सुरक्षित',
      desc_en: 'Learn to protect yourself online',
      desc_hi: 'ऑनलाइन अपनी सुरक्षा करना सीखें',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t(
              'Empowering Rural India with Digital Knowledge',
              'डिजिटल ज्ञान के साथ ग्रामीण भारत को सशक्त बनाना'
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t(
              'An AI tutor that makes learning smartphones, internet safety, and online services easy for everyone.',
              'एक AI शिक्षक जो सभी के लिए स्मार्टफोन, इंटरनेट सुरक्षा और ऑनलाइन सेवाएं सीखना आसान बनाता है।'
            )}
          </p>
          <button
            onClick={() => onNavigate('courses')}
            className="bg-gradient-to-r from-sky-500 to-green-500 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {t('Start Learning', 'सीखना शुरू करें')}
          </button>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            {t('Why Digital Literacy Matters', 'डिजिटल साक्षरता क्यों महत्वपूर्ण है')}
          </h2>
          <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t(
              "In today's world, being digitally literate opens the door to better opportunities. Our AI-powered tutor teaches rural learners how to use smartphones, the internet, and digital payments through simple lessons and conversations — anytime, anywhere.",
              'आज की दुनिया में, डिजिटल रूप से साक्षर होना बेहतर अवसरों का द्वार खोलता है। हमारा AI-संचालित शिक्षक ग्रामीण शिक्षार्थियों को सरल पाठों और बातचीत के माध्यम से स्मार्टफोन, इंटरनेट और डिजिटल भुगतान का उपयोग करना सिखाता है - कभी भी, कहीं भी।'
            )}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {whyMatters.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-green-400 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t(item.title_en, item.title_hi)}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t(item.desc_en, item.desc_hi)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            {t('How Our AI Tutor Helps', 'हमारा AI शिक्षक कैसे मदद करता है')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon size={32} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t(feature.title_en, feature.title_hi)}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t(feature.desc_en, feature.desc_hi)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-500 to-green-500 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('Our Mission', 'हमारा मिशन')}
          </h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            {t(
              'We aim to empower every person in rural India with the skills to navigate the digital world confidently. With AI guidance, multilingual lessons, and easy examples, technology becomes a friend, not a challenge.',
              'हम ग्रामीण भारत में हर व्यक्ति को डिजिटल दुनिया में आत्मविश्वास से नेविगेट करने के कौशल के साथ सशक्त बनाना चाहते हैं। AI मार्गदर्शन, बहुभाषी पाठ और आसान उदाहरणों के साथ, प्रौद्योगिकी एक दोस्त बन जाती है, चुनौती नहीं।'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
