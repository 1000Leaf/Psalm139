
import React, { useState } from 'react';
import { generatePrayerFromVerse } from '../services/geminiService';
import { PrayerTone } from '../types';

const PrayerGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedPrayer, setGeneratedPrayer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prayerTone, setPrayerTone] = useState<PrayerTone>('祈求');
  
  const prayerVerse = {
    ref: "詩篇 139:23-24",
    text: "神啊，求你鑒察我，知道我的心思，試煉我，知道我的意念，看在我裏面有甚麼惡行沒有，引導我走永生的道路。"
  };
  
  const tones: PrayerTone[] = ['祈求', '感恩', '悔改'];

  const handleGeneratePrayer = async () => {
    if (!userInput.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setGeneratedPrayer('');

    try {
      const prayer = await generatePrayerFromVerse(userInput, prayerVerse, prayerTone);
      setGeneratedPrayer(prayer);
    } catch (err) {
      setError('無法生成禱告。請稍後再試。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 p-6 sm:p-8 bg-black bg-opacity-40 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl text-center">
      <h3 className="font-noto-serif text-2xl sm:text-3xl font-bold text-teal-400 mb-4">
        個人化的禱告
      </h3>
      <p className="text-gray-300 mb-6 max-w-xl mx-auto">
        默想這段經文，選擇一個禱告語氣，然後寫下你的感受或思緒，我們將為你生成一段個人化的禱告。
      </p>

      <blockquote className="font-noto-serif text-lg text-gray-200 border-l-4 border-teal-500 pl-4 mb-8 italic max-w-xl mx-auto">
        <p>"{prayerVerse.text}"</p>
        <cite className="block text-right mt-2 text-teal-400 not-italic">{prayerVerse.ref}</cite>
      </blockquote>

      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-300 text-lg mb-3 font-semibold">選擇禱告語氣：</label>
          <div className="flex justify-center items-center gap-3">
            {tones.map(tone => (
              <button
                key={tone}
                onClick={() => setPrayerTone(tone)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out border-2 ${
                  prayerTone === tone 
                  ? 'bg-teal-500 border-teal-500 text-white shadow-lg' 
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
        
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="寫下你的思緒或感受..."
          className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors duration-300 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={handleGeneratePrayer}
          disabled={isLoading || !userInput.trim()}
          className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成中...
            </>
          ) : (
            '生成禱告'
          )}
        </button>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {generatedPrayer && (
          <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-lg text-left animate-fade-in">
            <h4 className="text-teal-400 font-bold text-lg mb-2">你的禱告：</h4>
            <p className="font-noto-serif text-lg text-gray-200 whitespace-pre-wrap">{generatedPrayer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerGenerator;
