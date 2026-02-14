export interface Photo {
  id: string;
  event_id: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  created_at: string;
  updated_at: string;
  photos: Photo[];
}

export type Season = "spring" | "summer" | "fall" | "winter";
