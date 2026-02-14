export interface Photo {
  id: string;
  event_id: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface BackgroundImage {
  id: string;
  event_id: string;
  url: string;
  prompt: string | null;
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
  photos: Photo[];
  backgrounds: BackgroundImage[];
}

export type Season = "spring" | "summer" | "fall" | "winter";
