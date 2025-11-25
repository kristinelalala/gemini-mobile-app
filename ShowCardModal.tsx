import React from 'react';
import { X } from 'lucide-react';

interface ShowCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  jpTitle: string;
}

export const ShowCardModal: React.FC<ShowCardModalProps> = ({ isOpen, onClose, title, jpTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 flex flex-col items-center text-center relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>

        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
          Show to Clerk / Driver
        </span>

        <h2 className="text-xl text-slate-500 mb-4 font-medium">{title}</h2>
        
        <div className="w-full h-px bg-slate-200 mb-8"></div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight font-jp break-words w-full">
          {jpTitle}
        </h1>
        
        <p className="mt-8 text-slate-400 text-sm">Tap anywhere to close</p>
      </div>
    </div>
  );
};