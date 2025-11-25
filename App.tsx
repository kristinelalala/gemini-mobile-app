
import React, { useState, useEffect, useRef } from 'react';
import { ITINERARY_DATA } from './constants';
import ActivityCard from './components/ActivityCard/ActivityCard.tsx';
import { AIChatModal } from './components/AIChatModal';
import { WeatherWidget } from './components/WeatherWidget';
import { CostView } from './components/CostView';
import { MapView } from './components/MapView';
import { MessageCircle, Map as MapIcon, Calendar, Wallet } from 'lucide-react';

const App: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'PLAN' | 'COST' | 'MAP'>('PLAN');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const activeDay = ITINERARY_DATA[activeDayIndex];

  // Preload images
  useEffect(() => {
    ITINERARY_DATA.forEach(day => {
      const img = new Image();
      img.src = day.heroImage;
    });
  }, []);

  // Reset scroll when day changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeDayIndex, currentView]);

  const scrollToTop = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'COST':
        return <CostView />;
      case 'MAP':
        return <MapView />;
      case 'PLAN':
      default:
        return (
          <>
                {/* Date Navigation - Minimalist Tabs */}
                <div className="flex justify-between items-center px-6 py-4 bg-[#FDFDFD] sticky top-0 z-30 border-b border-slate-50/50">
                    <div className="flex gap-5 overflow-x-auto no-scrollbar w-full">
                        {ITINERARY_DATA.map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveDayIndex(idx)}
                            className={`flex-shrink-0 flex flex-col items-center transition-all group relative pb-2`}
                        >
                            <span className={`text-[10px] font-playfair tracking-widest uppercase mb-1 ${idx === activeDayIndex ? 'text-slate-900 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                            {day.weekday}
                            </span>
                            <span className={`text-xl font-playfair ${idx === activeDayIndex ? 'text-slate-900 italic font-semibold' : 'text-slate-300 group-hover:text-slate-400'}`}>
                                {day.displayDate.split('月')[1].replace('日', '')}
                            </span>
                            {idx === activeDayIndex && (
                                <div className="absolute bottom-0 w-1 h-1 bg-slate-900 rounded-full"></div>
                            )}
                        </button>
                        ))}
                    </div>
                </div>

                <div className="pb-20">
                    {/* Day Hero Section */}
                    <div className="px-6 py-8">
                        <div className="flex justify-between items-end mb-6">
                            <div className="flex flex-col">
                                <span className="text-slate-400 text-[10px] font-playfair tracking-[0.2em] uppercase mb-2 ml-1">
                                    April {activeDay.date.split('-')[2]}
                                </span>
                                <div className="flex items-baseline leading-none">
                                <span className="text-6xl font-playfair font-black text-slate-900 mr-2">
                                    Day
                                </span>
                                <span className="text-6xl font-playfair text-slate-900 italic decoration-4 underline-offset-4 decoration-slate-200">
                                    {activeDayIndex + 1}
                                </span>
                                </div>
                                <h2 className="font-serif-tc font-bold text-2xl text-slate-800 mt-4 leading-relaxed">
                                {activeDay.title}
                                </h2>
                            </div>
                        </div>
                        
                        <WeatherWidget weather={activeDay.weather} />

                        {/* Hero Image Card */}
                        <div className="w-full aspect-[4/3] rounded-sm overflow-hidden mb-8 relative group shadow-sm">
                            <img 
                                src={activeDay.heroImage} 
                                className="w-full h-full object-cover grayscale-[20%] contrast-110 group-hover:grayscale-0 transition-all duration-1000 ease-out" 
                                alt="Day Hero"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/90 backdrop-blur-md p-3 border-l-2 border-slate-900 shadow-sm">
                                    <p className="text-slate-800 text-xs font-serif-tc leading-relaxed">
                                        <span className="font-bold mr-1">Outfit:</span>
                                        {activeDay.clothingSuggestion}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center mb-8 opacity-30">
                                <span className="h-px w-12 bg-slate-900"></span>
                                <span className="mx-2 text-xs font-playfair italic">Itinerary</span>
                                <span className="h-px w-12 bg-slate-900"></span>
                        </div>

                        {/* Timeline */}
                        <div className="relative space-y-8">
                            {/* Vertical Line - Stops earlier (bottom-12) to avoid looking like it dangles */}
                            <div className="absolute left-[29px] top-2 bottom-12 w-px bg-slate-200 z-0"></div>

                            {activeDay.activities.map((activity) => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                        
                        {/* End of Day Marker - Cleaned up spacing and removed vertical line */}
                        <div className="flex flex-col items-center mt-4 opacity-40">
                            <div className="text-center font-playfair italic text-slate-400 text-sm">
                                End of Day {activeDayIndex + 1}
                            </div>
                        </div>
                    </div>
                </div>
          </>
        );
    }
  };

  return (
    <div className="w-full h-full max-w-md mx-auto bg-[#FDFDFD] relative flex flex-col shadow-2xl overflow-hidden font-sans border-x border-slate-100">
      
      {/* Sticky Header */}
      <div 
        onClick={scrollToTop}
        className="pt-10 pb-2 px-6 bg-[#FDFDFD]/90 backdrop-blur-sm z-40 sticky top-0 border-b border-slate-50 cursor-pointer"
      >
        <div className="flex flex-col items-center mx-auto">
          <div className="flex items-center gap-2">
             <div className="w-px h-4 bg-slate-900 rotate-12"></div>
             <h1 className="font-serif-tc font-bold text-lg tracking-[0.1em] text-slate-900">2026♡Japan GO！</h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto relative z-20 scroll-smooth bg-[#FDFDFD]">
        {renderContent()}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 bg-slate-900 rounded-full shadow-2xl shadow-slate-900/20 flex items-center justify-center text-white hover:scale-105 transition-transform border border-slate-800 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Bottom Info Bar - Minimalist */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#FDFDFD]/95 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-8 pb-2 z-30">
        <button 
            onClick={() => setCurrentView('PLAN')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'PLAN' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Calendar className="w-5 h-5 stroke-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-playfair">Plan</span>
        </button>
        <button 
            onClick={() => setCurrentView('MAP')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'MAP' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <MapIcon className="w-5 h-5 stroke-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-playfair">Map</span>
        </button>
         <button 
            onClick={() => setCurrentView('COST')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'COST' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Wallet className="w-5 h-5 stroke-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-playfair">Cost</span>
        </button>
      </div>

      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
