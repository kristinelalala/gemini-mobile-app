
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { ITINERARY_DATA } from '../constants';
import { ActivityType } from '../types';

// Tailwind color mapping for icons
const getColorForType = (type: ActivityType) => {
    switch (type) {
        case ActivityType.FOOD: return '#fb7185'; // rose-400
        case ActivityType.SHOPPING: return '#fdba74'; // orange-300
        case ActivityType.SIGHTSEEING: return '#10b981'; // emerald-500
        case ActivityType.HOTEL: return '#1e293b'; // slate-800
        case ActivityType.TRANSPORT: return '#60a5fa'; // blue-400
        default: return '#94a3b8';
    }
};

export const MapView: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || leafletMapRef.current) return;

        // Initialize Map
        const map = L.map(mapRef.current, {
            center: [35.6895, 139.6917], // Tokyo center
            zoom: 12,
            zoomControl: false,
            attributionControl: false
        });

        // Use Google Maps Tile Layer for Traditional Chinese support
        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=zh-TW', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google Maps'
        }).addTo(map);

        leafletMapRef.current = map;

        const bounds: L.LatLngExpression[] = [];

        // Add Markers for all activities with coordinates
        ITINERARY_DATA.forEach(day => {
            day.activities.forEach(activity => {
                if (activity.coordinates) {
                    const { lat, lng } = activity.coordinates;
                    const color = getColorForType(activity.type);
                    
                    // Create Custom Div Icon
                    const icon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `
                            <div style="
                                background-color: ${color};
                                width: 26px;
                                height: 26px;
                                border-radius: 50%;
                                border: 2.5px solid white;
                                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: transform 0.2s;
                            " class="marker-pin">
                                <div style="width: 5px; height: 5px; background-color: white; border-radius: 50%;"></div>
                            </div>
                        `,
                        iconSize: [26, 26],
                        iconAnchor: [13, 13],
                        popupAnchor: [0, -13]
                    });

                    // Enhanced Popup Content with Notes from constants.ts
                    const notesHtml = activity.notes && activity.notes.length > 0 
                        ? `<div style="margin-top: 8px; border-top: 1px solid #f1f5f9; padding-top: 8px;">
                             ${activity.notes.map(note => `<div style="font-size: 10px; color: #64748b; line-height: 1.4; margin-bottom: 2px;">• ${note}</div>`).join('')}
                           </div>`
                        : '';

                    const marker = L.marker([lat, lng], { icon })
                        .addTo(map)
                        .bindPopup(`
                            <div style="font-family: 'Noto Serif TC', serif; min-width: 160px; max-width: 220px; padding: 4px;">
                                <div style="font-size: 9px; color: #94a3b8; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">
                                    ${day.displayDate} ${day.weekday}
                                </div>
                                <div style="font-weight: 900; color: #0f172a; font-size: 14px; line-height: 1.3; margin-bottom: 4px;">
                                    ${activity.title}
                                </div>
                                ${activity.jpTitle ? `<div style="font-size: 11px; color: #475569; font-family: 'Noto Sans JP', sans-serif; margin-bottom: 4px;">${activity.jpTitle}</div>` : `<div style="font-size: 11px; color: #64748b;">${activity.location}</div>`}
                                ${notesHtml}
                            </div>
                        `, {
                            closeButton: false,
                            className: 'custom-popup'
                        });

                    bounds.push([lat, lng]);
                }
            });
        });

        // Fit Bounds to show all markers
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [40, 40] });
        }

        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-full relative bg-slate-50">
            <div ref={mapRef} className="w-full h-full z-0" />
            
            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 max-w-[160px] animate-fade-in">
                <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-3 font-serif-tc border-b border-slate-100 pb-2">地圖圖例</h3>
                <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-bold font-serif-tc">住宿</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-rose-400 border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-bold font-serif-tc">餐飲</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-300 border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-bold font-serif-tc">購物</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#10b981] border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-bold font-serif-tc">觀光</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#60a5fa] border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-bold font-serif-tc">交通</span>
                    </div>
                </div>
            </div>
            
            <style>{`
                .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    padding: 4px;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .leaflet-popup-content {
                    margin: 12px;
                }
                .leaflet-popup-tip {
                    background: white;
                }
                .marker-pin:hover {
                    transform: scale(1.2);
                    z-index: 1000 !important;
                }
            `}</style>
        </div>
    );
};
