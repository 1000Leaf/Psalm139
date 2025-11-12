import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
  onClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  const musicUrl = "https://drive.google.com/file/d/1Xd8tqkXkI6x_l-PKc0vcyJUL_c3XkqO1/preview";

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current) {
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();
    
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);


  return (
    <div
      ref={playerRef}
      className="fixed z-50 bg-black bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl w-[400px] h-[200px] flex flex-col animate-fade-in"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: 'none'
      }}
    >
      <div 
        className="h-10 bg-gray-800/50 flex items-center justify-between px-4 rounded-t-xl cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h4 className="font-semibold text-teal-400">背景音樂</h4>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          title="關閉"
          aria-label="關閉音樂播放器"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-grow rounded-b-xl overflow-hidden">
        <iframe
          src={musicUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay"
          title="Psalm 139 Music"
        ></iframe>
      </div>
    </div>
  );
};

export default MusicPlayer;
