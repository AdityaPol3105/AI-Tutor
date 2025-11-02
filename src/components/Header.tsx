import { Languages, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label_en: 'Home', label_hi: 'मुखपृष्ठ' },
    { id: 'courses', label_en: 'Courses', label_hi: 'पाठ्यक्रम' },
    { id: 'tutor', label_en: 'AI Tutor', label_hi: 'AI शिक्षक' },
    { id: 'achievements', label_en: 'Achievements', label_hi: 'उपलब्धियाँ' },
    { id: 'community', label_en: 'Community', label_hi: 'समुदाय' },
    { id: 'contact', label_en: 'Contact', label_hi: 'संपर्क' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-green-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DL</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">
                {t('Digital Literacy', 'डिजिटल साक्षरता')}
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-sky-600'
                    : 'text-gray-600 hover:text-sky-600'
                }`}
              >
                {language === 'en' ? item.label_en : item.label_hi}
              </button>
            ))}

            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
            >
              <Languages size={18} />
              <span className="font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium py-2 transition-colors ${
                    currentPage === item.id
                      ? 'text-sky-600'
                      : 'text-gray-600'
                  }`}
                >
                  {language === 'en' ? item.label_en : item.label_hi}
                </button>
              ))}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-sky-50 text-sky-700 w-full text-lg font-medium"
              >
                <Languages size={20} />
                <span>{language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
