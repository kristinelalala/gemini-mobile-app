import React from 'react';
import { WeatherInfo } from '../types';
import { Cloud, CloudRain, Sun, CloudSun } from 'lucide-react';

interface WeatherWidgetProps {
  weather: WeatherInfo;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  const getIcon = () => {
    switch (weather.icon) {
      case 'sun': return <Sun className="w-6 h-6 text-slate-900 stroke-1" />;
      case 'cloud': return <Cloud className="w-6 h-6 text-slate-400 stroke-1" />;
      case 'rain': return <CloudRain className="w-6 h-6 text-slate-600 stroke-1" />;
      case 'cloud-sun': return <CloudSun className="w-6 h-6 text-slate-800 stroke-1" />;
      default: return <Sun className="w-6 h-6 text-slate-900 stroke-1" />;
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 py-2 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
      <div className="pl-2">
        {getIcon()}
      </div>
      <div className="flex flex-col border-l border-slate-200 pl-4">
         <div className="flex items-baseline gap-1">
            <span className="text-2xl font-playfair font-bold text-slate-900">{weather.temp}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{weather.condition}</span>
         </div>
         <div className="flex gap-3 text-[10px] text-slate-400 font-mono">
            <span>H: {weather.high}</span>
            <span>L: {weather.low}</span>
         </div>
      </div>
    </div>
  );
};