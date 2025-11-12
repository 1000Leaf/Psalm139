import React, { useState } from 'react';
import { VerseSection, Verse } from './types';
import VerseCard from './components/VerseCard';
import PrayerGenerator from './components/PrayerGenerator';
import MusicPlayer from './components/MusicPlayer';

const psalmSections: VerseSection[] = [
  {
    theme: "神的全知：祂認識我",
    verses: [
      { "ref": "139:1", "text": "耶和華啊，你已經鑒察我，認識我。" },
      { "ref": "139:2", "text": "我坐下，我起來，你都曉得；你從遠處知道我的意念。" },
      { "ref": "139:3", "text": "我行路，我躺臥，你都細察；你也深知我一切所行的。" },
      { "ref": "139:4", "text": "耶和華啊，我舌頭上的話，你沒有一句不知道的。" },
      { "ref": "139:5", "text": "你在我前後環繞我，按手在我身上。" },
      { "ref": "139:6", "text": "這樣的知識奇妙，是我不能測的，至高，是我不能及的。" }
    ]
  },
  {
    theme: "神的全在：祂無處不在",
    verses: [
      { "ref": "139:7", "text": "我往哪裏去躲避你的靈？我往哪裏去逃、躲避你的面？" },
      { "ref": "139:8", "text": "我若升到天上，你在那裏；我若在陰間下榻，你也在那裏。" },
      { "ref": "139:9", "text": "我若展開清晨的翅膀，飛到海極居住，" },
      { "ref": "139:10", "text": "就是在那裏，你的手必引導我；你的右手也必扶持我。" },
      { "ref": "139:11", "text": "我若說：黑暗必定遮蔽我，我周圍的亮光必成為黑夜；" },
      { "ref": "139:12", "text": "黑暗也不能遮蔽我，使你不見，黑夜卻如白晝發亮。黑暗和光明，在你 看都是一樣。" }
    ]
  },
  {
    theme: "神的創造：祂塑造我",
    verses: [
      { "ref": "139:13", "text": "我的肺腑是你所造的；我在母腹中，你已覆庇我。" },
      { "ref": "139:14", "text": "我要稱謝你，因我受造，奇妙可畏；你的作為奇妙，這是我心深知道的。" },
      { "ref": "139:15", "text": "我在暗中受造，在地的深處被聯絡；那時，我的形體並不向你隱藏。" },
      { "ref": "139:16", "text": "我未成形的體質，你的眼早已看見了；你所定的日子，我尚未度一日，你都寫在你的冊上了。" }
    ]
  },
  {
    theme: "神的意念：祂珍視我",
    verses: [
      { "ref": "139:17", "text": "神啊，你的意念向我何等寶貴！其數何等眾多！" },
      { "ref": "139:18", "text": "我若數點，比海沙更多；我睡醒的時候，仍和你同在。" }
    ]
  },
  {
    theme: "正直的禱告：引導我",
     verses: [
      { "ref": "139:19", "text": "神啊，你必要殺戮惡人；所以，你們好流人血的，離開我去吧！" },
      { "ref": "139:20", "text": "因為他們說惡言頂撞你；你的仇敵也妄稱你的名。" },
      { "ref": "139:21", "text": "耶和華啊，恨惡你的，我豈不恨惡他們嗎？攻擊你的，我豈不憎嫌他們嗎？" },
      { "ref": "139:22", "text": "我切切地恨惡他們，以他們為仇敵。" },
      { "ref": "139:23", "text": "神啊，求你鑒察我，知道我的心思，試煉我，知道我的意念，" },
      { "ref": "139:24", "text": "看在我裏面有甚麼惡行沒有，引導我走永生的道路。" }
    ]
  }
];

const App: React.FC = () => {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);

  const handleVerseSelect = (verse: Verse) => {
    // Toggle selection
    if (selectedVerse?.ref === verse.ref) {
      setSelectedVerse(null);
    } else {
      setSelectedVerse(verse);
    }
  };

  const toggleMusicPlayer = () => {
    setIsMusicPlayerVisible(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-teal-400 selection:text-gray-900">
      <div 
        className="fixed inset-0 bg-cover bg-center z-0" 
        style={{backgroundImage: "url('https://picsum.photos/seed/psalm139/1920/1080')", filter: 'blur(4px) brightness(0.4)'}}
      ></div>
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <header className="text-center mb-16">
          <h1 className="font-noto-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-300 tracking-wider animate-fade-in-down">
            詩篇 139
          </h1>
          <p 
            className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-down"
            style={{ animationDelay: '200ms', opacity: 0 }}
          >
            一場關於神的同在、大能和對你獨特創造的默想之旅。
          </p>
        </header>

        <div className="space-y-12">
          {psalmSections.map((section, index) => (
            <VerseCard
              key={index}
              section={section}
              index={index}
              selectedVerse={selectedVerse}
              onVerseSelect={handleVerseSelect}
            />
          ))}
        </div>
        
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: `${psalmSections.length * 150}ms`, opacity: 0 }}
        >
          <PrayerGenerator />
        </div>

      </main>

      {isMusicPlayerVisible && <MusicPlayer onClose={toggleMusicPlayer} />}

      <button
        onClick={toggleMusicPlayer}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-500 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-400"
        title="播放背景音樂"
        aria-label="播放或隱藏背景音樂"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-13c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
        </svg>
      </button>

      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm">
        <p>Crafted with contemplation. Inspired by Psalm 139.</p>
      </footer>
    </div>
  );
};

export default App;