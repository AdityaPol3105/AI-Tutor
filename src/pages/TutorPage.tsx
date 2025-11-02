import { useState } from 'react';
import { Send, Mic, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function TutorPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t(
        'Hello! I am your digital literacy tutor. Ask me anything about using your phone, internet, or digital services. How can I help you today?',
        'नमस्ते! मैं आपका डिजिटल साक्षरता शिक्षक हूं। मुझसे अपने फोन, इंटरनेट या डिजिटल सेवाओं के बारे में कुछ भी पूछें। मैं आज आपकी कैसे मदद कर सकता हूं?'
      ),
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const sampleQuestions = [
    {
      en: 'How do I make a video call?',
      hi: 'मैं वीडियो कॉल कैसे करूं?',
    },
    {
      en: 'What is UPI payment?',
      hi: 'UPI भुगतान क्या है?',
    },
    {
      en: 'How to stay safe online?',
      hi: 'ऑनलाइन सुरक्षित कैसे रहें?',
    },
    {
      en: 'How to download Aadhaar card?',
      hi: 'आधार कार्ड कैसे डाउनलोड करें?',
    },
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: t(
          "Great question! Let me guide you step by step. First, make sure you have a stable internet connection. Then, open the app you want to use for the video call. Would you like me to explain any specific app like WhatsApp or Google Meet?",
          'बढ़िया सवाल! मैं आपको चरण-दर-चरण मार्गदर्शन करता हूं। पहले, सुनिश्चित करें कि आपके पास एक स्थिर इंटरनेट कनेक्शन है। फिर, वह ऐप खोलें जिसका आप वीडियो कॉल के लिए उपयोग करना चाहते हैं। क्या आप चाहेंगे कि मैं व्हाट्सएप या गूगल मीट जैसे किसी विशिष्ट ऐप की व्याख्या करूं?'
        ),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-green-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t('Talk to Your AI Tutor', 'अपने AI शिक्षक से बात करें')}
          </h1>
          <p className="text-lg text-gray-700">
            {t(
              'Ask me anything about using your phone or the internet',
              'मुझसे अपने फोन या इंटरनेट के बारे में कुछ भी पूछें'
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-5 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AI</span>
                      </div>
                      <span className="font-semibold text-sm">
                        {t('Digital Tutor', 'डिजिटल शिक्षक')}
                      </span>
                    </div>
                  )}
                  <p className="text-lg leading-relaxed">{message.text}</p>
                  {message.sender === 'ai' && (
                    <button className="mt-3 flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors">
                      <Volume2 size={18} />
                      <span className="text-sm font-medium">
                        {t('Listen', 'सुनें')}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-center text-gray-600 mb-3 font-medium">
                {t('Try asking:', 'पूछने का प्रयास करें:')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(t(question.en, question.hi))}
                    className="text-left p-4 bg-sky-50 hover:bg-sky-100 rounded-xl text-gray-700 transition-colors border border-sky-200"
                  >
                    {t(question.en, question.hi)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Mic size={24} />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t(
                  'Type your question here...',
                  'यहां अपना प्रश्न टाइप करें...'
                )}
                className="flex-1 px-5 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-sky-500 to-green-500 text-white rounded-xl flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              {t(
                'Press Enter to send, or use the microphone for voice input',
                'भेजने के लिए Enter दबाएं, या वॉयस इनपुट के लिए माइक्रोफ़ोन का उपयोग करें'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
