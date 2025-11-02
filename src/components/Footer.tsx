import { Facebook, Twitter, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DL</span>
              </div>
              <h3 className="ml-3 text-xl font-bold">
                {t('Digital Literacy', 'डिजिटल साक्षरता')}
              </h3>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              {t(
                'Empowering rural communities with digital knowledge',
                'डिजिटल ज्ञान के साथ ग्रामीण समुदायों को सशक्त बनाना'
              )}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('Quick Links', 'त्वरित लिंक')}
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer text-base">
                {t('About Us', 'हमारे बारे में')}
              </li>
              <li className="hover:text-white cursor-pointer text-base">
                {t('Courses', 'पाठ्यक्रम')}
              </li>
              <li className="hover:text-white cursor-pointer text-base">
                {t('Success Stories', 'सफलता की कहानियाँ')}
              </li>
              <li className="hover:text-white cursor-pointer text-base">
                {t('Contact', 'संपर्क')}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('Connect With Us', 'हमसे जुड़ें')}
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-base">
            {t(
              '© 2025 AI Digital Tutor | Bridging the Digital Divide | Learn. Grow. Empower.',
              '© 2025 AI डिजिटल शिक्षक | डिजिटल विभाजन को पाटना | सीखें। बढ़ें। सशक्त बनें।'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
