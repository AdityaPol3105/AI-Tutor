import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { TutorPage } from './pages/TutorPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { CommunityPage } from './pages/CommunityPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'courses':
        return <CoursesPage onNavigate={setCurrentPage} />;
      case 'tutor':
        return <TutorPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'community':
        return <CommunityPage />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
