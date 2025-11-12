import React, { useState } from 'react';
import { VerseSection, Verse } from '../types';

interface VerseCardProps {
  section: VerseSection;
  index: number;
  selectedVerse: Verse | null;
  onVerseSelect: (verse: Verse) => void;
}

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const VerseCard: React.FC<VerseCardProps> = ({ section, index, selectedVerse, onVerseSelect }) => {
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const handleCopyVerse = (verse: Verse) => {
    const fullVerseText = `詩篇 ${verse.ref} - ${verse.text}`;
    navigator.clipboard.writeText(fullVerseText).then(() => {
      setCopiedRef(verse.ref);
      setTimeout(() => setCopiedRef(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  return (
    <section 
      className="bg-black bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 ease-in-out animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
    >
      <div className="p-6 sm:p-8">
        <h2 className="font-noto-serif text-2xl sm:text-3xl font-bold text-teal-400 mb-6 border-b-2 border-teal-400/30 pb-3">
          {section.theme}
        </h2>
        <div className="space-y-2">
          {section.verses.map((verse, vIndex) => {
            const isSelected = selectedVerse?.ref === verse.ref;
            return (
              <div key={vIndex} className="relative group">
                <p 
                  onClick={() => onVerseSelect(verse)}
                  className={`font-noto-serif text-lg sm:text-xl text-gray-200 leading-relaxed cursor-pointer rounded-lg p-2 transition-all duration-300 ease-in-out ${
                    isSelected ? 'bg-teal-500/20 pr-12' : 'hover:bg-gray-500/10'
                  }`}
                >
                  <span className="font-sans text-teal-500 mr-2 text-sm align-super">{verse.ref.split(':')[1]}</span>
                  {verse.text}
                </p>
                {isSelected && (
                  <button 
                    onClick={() => handleCopyVerse(verse)}
                    title="複製經文"
                    aria-label="複製經文"
                    className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-white hover:bg-teal-500/30 transition-colors duration-200 animate-fade-in"
                  >
                    {copiedRef === verse.ref ? <CheckIcon /> : <CopyIcon />}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerseCard;