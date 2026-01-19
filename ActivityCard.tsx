import React, { useState, useEffect } from 'react';
import { Activity, ActivityType } from '../types';
import { MapPin, ArrowUpRight, Languages, Hotel, Utensils, ShoppingBag, Train, Camera } from 'lucide-react';
import { ShowCardModal } from './ShowCardModal';

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [activity.imageUrl]);

  const openMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activity.mapUrl) {
      window.open(activity.mapUrl, '_blank');
      return;
    }
    const query = activity.mapQuery || activity.jpTitle || activity.location;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  const handleShowCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activity.jpTitle) {
      setShowModalOpen(true);
    }
  };

  const getTypeLabel = (type: ActivityType) => {
    switch (type) {
        case ActivityType.FOOD: return 'Dining';
        case ActivityType.SHOPPING: return 'Shopping';
        case ActivityType.SIGHTSEEING: return 'Sightseeing';
        case ActivityType.HOTEL: return 'Hotel';
        case ActivityType.TRANSPORT: return 'Travel';
        default: return 'Activity';
    }
  };

  const getCategoryIcon = (type: ActivityType) => {
    switch (type) {
        case ActivityType.HOTEL: return <Hotel className="w-4 h-4" />;
        case ActivityType.FOOD: return <Utensils className="w-4 h-4" />;
        case ActivityType.SHOPPING: return <ShoppingBag className="w-4 h-4" />;
        case ActivityType.SIGHTSEEING: return <Camera className="w-4 h-4" />;
        case ActivityType.TRANSPORT: return <Train className="w-4 h-4" />;
        default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className="flex gap-4 sm:gap-6 relative group z-10 w-full">
        {/* Time / Icon Column */}
        <div className="flex-shrink-0 w-[50px] sm:w-[60px] pt-1 flex flex-col items-center z-10 bg-[#FDFDFD]">
          {activity.time ? (
             <div className="flex flex-col items-center">
                 <span className="text-sm font-bold font-mono text-slate-900 tracking-tight">
                    {activity.time}
                 </span>
             </div>
          ) : (
             <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-1">
                 {getCategoryIcon(activity.type)}
             </div>
          )}
        </div>

        {/* Card Content - Clean & Editorial */}
        <div className="flex-grow pb-4">
          <div 
            onClick={openMap}
            className="bg-white rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer border border-slate-50"
          >
            
            {/* Image Section */}
            {activity.imageUrl && !imageError && (
              <div className="h-40 w-full overflow-hidden relative">
                <img 
                  src={activity.imageUrl} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  onError={() => setImageError(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                 <div className="absolute top-0 left-0 p-3">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-[9px] font-bold font-playfair px-3 py-1 uppercase tracking-widest shadow-sm border border-slate-100">
                        {getTypeLabel(activity.type)}
                    </span>
                </div>
              </div>
            )}

            <div className="p-5">
               {/* Header */}
               <div className="flex justify-between items-start mb-1 gap-2">
                 <h3 className="font-serif-tc font-bold text-slate-900 text-lg leading-snug">
                    {activity.title}
                 </h3>
                 <ArrowUpRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
               </div>

               {/* Location */}
               <div className="flex items-center text-xs text-slate-400 mb-4 font-sans tracking-wide">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate max-w-[180px]">{activity.location}</span>
               </div>

               {/* Divider */}
               <div className="w-8 h-px bg-slate-200 mb-4"></div>

               {/* Notes */}
               {activity.notes && activity.notes.length > 0 && (
                <div className="space-y-1.5 mb-5">
                    {activity.notes.map((note, idx) => (
                        <p key={idx} className="text-[13px] text-slate-600 font-medium leading-relaxed font-serif-tc">
                           {note}
                        </p>
                    ))}
                </div>
              )}

              {/* Actions Footer */}
              {activity.jpTitle && (
                  <div className="flex justify-end pt-2 border-t border-slate-50">
                    <button 
                        onClick={handleShowCard}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-900 transition-all duration-300"
                    >
                        <Languages className="w-3 h-3 text-slate-400 group-hover:text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white">
                            Show Card
                        </span>
                    </button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShowCardModal 
        isOpen={showModalOpen} 
        onClose={() => setShowModalOpen(false)} 
        title={activity.title}
        jpTitle={activity.jpTitle || ''}
      />
    </>
  );
};