export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  rating: number; // IMDb rating e.g. 8.6
  releaseYear: number;
  language: string;
  runtime: number; // minutes
  director: string;
  cast: string[];
  streamingPlatforms: string[]; // e.g. ["Netflix", "Prime Video", "Disney+"]
  trailerKey: string; // YouTube video ID
  budget: string; // e.g. "$165M"
  revenue: string; // e.g. "$701M"
  reviews: Review[];
  popularity: number; // ranking score
  keywords: string[];
}

export interface AIRecommendation {
  movie: Movie;
  matchScore: number;
  whyRecommended: string;
}

export interface UserStats {
  moviesWatched: number;
  totalMinutes: number;
  genresDistribution: { [genre: string]: number };
}

export interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
  favoriteGenres: string[];
  favoriteActors: string[];
  favoriteDirectors: string[];
  viewingHistory: string[]; // movie IDs
  stats: UserStats;
  theme: 'dark' | 'amoled'; // Netflix dark theme variations
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}
