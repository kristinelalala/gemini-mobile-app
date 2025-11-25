
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { ITINERARY_DATA } from './constants';
import { ActivityType } from './types';

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
            zoomControl: false, // We'll add it in a better position or custom
            attributionControl: false
        });

        // Switch to Google Maps Tile Layer for explicit Language Support (zh-TW)
        // lyrs=m (standard roadmap), hl=zh-TW (Traditional Chinese)
        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=zh-TW', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google Maps'
        }).addTo(map);

        leafletMapRef.current = map;

        // Collect all coordinates to fit bounds later
        const bounds: L.LatLngExpression[] = [];

        // Add Markers
        ITINERARY_DATA.forEach(day => {
            day.activities.forEach(activity => {
                if (activity.coordinates) {
                    const { lat, lng } = activity.coordinates;
                    const color = getColorForType(activity.type);
                    
                    // Create Custom HTML Icon
                    const icon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `
                            <div style="
                                background-color: ${color};
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                                border: 3px solid white;
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">
                                <div style="width: 6px; height: 6px; background-color: white; border-radius: 50%;"></div>
                            </div>
                        `,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12],
                        popupAnchor: [0, -12]
                    });

                    const marker = L.marker([lat, lng], { icon })
                        .addTo(map)
                        .bindPopup(`
                            <div class="font-serif-tc p-1">
                                <div class="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">${day.displayDate}</div>
                                <div class="font-bold text-slate-900 text-sm mb-1">${activity.title}</div>
                                <div class="text-xs text-slate-500">${activity.jpTitle || activity.location}</div>
                            </div>
                        `, {
                            closeButton: false,
                            className: 'custom-popup'
                        });

                    bounds.push([lat, lng]);
                }
            });
        });

        // Fit Bounds
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        // Cleanup
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
            
            {/* Legend / Overlay */}
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 max-w-[200px]">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 font-serif-tc">地圖圖例</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-medium font-serif-tc">住宿</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400 border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-medium font-serif-tc">餐飲</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-300 border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-medium font-serif-tc">購物</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#10b981] border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-medium font-serif-tc">觀光</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#60a5fa] border-2 border-white shadow-sm"></div>
                        <span className="text-[10px] text-slate-600 font-medium font-serif-tc">交通</span>
                    </div>
                </div>
            </div>
            
            <style>{`
                .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    padding: 0;
                }
                .leaflet-popup-content {
                    margin: 12px 16px;
                }
                .leaflet-popup-tip {
                    background: white;
                }
            `}</style>
        </div>
    );
};
