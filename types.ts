
export enum ActivityType {
  HOTEL = 'HOTEL',
  FOOD = 'FOOD',
  SIGHTSEEING = 'SIGHTSEEING',
  SHOPPING = 'SHOPPING',
  TRANSPORT = 'TRANSPORT',
  OTHER = 'OTHER'
}

export interface Activity {
  id: string;
  time?: string;
  title: string;
  jpTitle?: string; // Japanese title for "Show to clerk"
  location: string;
  notes: string[];
  type: ActivityType;
  important?: boolean;
  mapQuery?: string;
  mapUrl?: string; // Direct URL for the map
  imageUrl?: string; // Cover image for the activity
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface WeatherInfo {
  temp: string;
  high: string;
  low: string;
  condition: string;
  icon: 'sun' | 'cloud' | 'rain' | 'cloud-sun';
}

export interface DayItinerary {
  date: string;
  displayDate: string;
  weekday: string;
  title: string;
  heroImage: string; // Main background for the day
  weather: WeatherInfo;
  clothingSuggestion: string; // New field for daily outfit advice
  activities: Activity[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}