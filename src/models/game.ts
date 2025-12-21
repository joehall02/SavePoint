export interface Game {
  title: string;
  condition: string;
  notes?: string;
  boxIncluded: boolean;
  rating?: number;
  igdbId: number;
  platformId: number;
}

export interface PartialGame {
  id: number;
  title: String;
}

export interface GameDetails {
  title: string;
  condition: string;
  notes?: string;
  boxIncluded: number;
  rating?: number;
  igdbId: number;
  platformId: number;
}