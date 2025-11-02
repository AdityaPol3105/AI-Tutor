import { useState } from 'react';
import { Send, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('feedback').insert([
      {
        name: formData.name,
        location: formData.location,
        message: formData.message,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error submitting feedback:', error);
      alert(t('Failed to submit. Please try again.', 'सबमिट करने में विफल। कृपया पुन: प्रयास करें।'));
    } else {
      setSubmitted(true);
      setFormData({ name: '', location: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('Contact Us', 'हमसे संपर्क करें')}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t(
              'Have questions or feedback? We would love to hear from you!',
              'सवाल या सुझाव हैं? हम आपसे सुनना पसंद करेंगे!'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('Send Us a Message', 'हमें संदेश भेजें')}
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl text-green-700 text-center">
                  <p className="font-semibold text-lg">
                    {t('Thank you for your feedback!', 'आपकी प्रतिक्रिया के लिए धन्यवाद!')}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    {t('Your Name', 'आपका नाम')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500 transition-colors text-lg"
                    placeholder={t('Enter your name', 'अपना नाम दर्ज करें')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    {t('Location', 'स्थान')}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500 transition-colors text-lg"
                    placeholder={t('Your village/city', 'आपका गांव/शहर')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    {t('Message', 'संदेश')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500 transition-colors text-lg resize-none"
                    placeholder={t(
                      'Share your thoughts, questions, or suggestions...',
                      'अपने विचार, प्रश्न या सुझाव साझा करें...'
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-500 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('Send Message', 'संदेश भेजें')}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-r from-sky-500 to-green-500 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {t('Need Help Right Now?', 'अभी मदद चाहिए?')}
              </h3>
              <p className="text-lg mb-6 leading-relaxed">
                {t(
                  'Talk to our AI Tutor for instant answers to your questions',
                  'अपने सवालों के तुरंत जवाब के लिए हमारे AI शिक्षक से बात करें'
                )}
              </p>
              <button
                onClick={() => onNavigate('tutor')}
                className="bg-white text-sky-600 px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <MessageCircle size={20} />
                {t('Talk to AI Tutor', 'AI शिक्षक से बात करें')}
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('Get in Touch', 'संपर्क में रहें')}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {t('Email Us', 'ईमेल करें')}
                    </h3>
                    <p className="text-gray-600 text-base">support@digitalliteracy.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {t('Call Us', 'कॉल करें')}
                    </h3>
                    <p className="text-gray-600 text-base">+91 1800-123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('Toll-free support line', 'टोल-फ्री सपोर्ट लाइन')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {t('Visit Us', 'हमसे मिलें')}
                    </h3>
                    <p className="text-gray-600 text-base">
                      {t(
                        'Digital Literacy Center, New Delhi, India',
                        'डिजिटल साक्षरता केंद्र, नई दिल्ली, भारत'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {t('Supported By', 'समर्थित')}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {t(
                  'Our mission is supported by NGOs, educational institutions, and government initiatives working to bridge the digital divide in rural India.',
                  'हमारे मिशन को गैर सरकारी संगठनों, शैक्षणिक संस्थानों और ग्रामीण भारत में डिजिटल विभाजन को पाटने के लिए काम करने वाली सरकारी पहलों द्वारा समर्थित किया जाता है।'
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                {['NGO Partner', 'University', 'Govt Initiative', 'Tech Corp'].map(
                  (partner, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium"
                    >
                      {partner}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
