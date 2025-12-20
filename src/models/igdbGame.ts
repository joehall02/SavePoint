interface GameCover {
    url: string;
}

export interface IGDBGame {
    id: number;
    cover?: GameCover | null;
    name: string;
}

export interface RawIGDBGame {
    id: number;
    cover?: {
        id: number;
        image_id: string;
    } | null;
    name: string;
}

export interface RawExternalGameDetails {
  id: number;
  name: string;
  storyline?: string | null;
  summary?: string | null;
  platforms?: Array<{
    id: number;
    name: string;
  }> | null;
  cover?: {
    id: number;
    image_id: string;
  } | null;
  videos?: Array<{
    id: number;
    video_id: string;
  }> | null;
  genres?: Array<{
    id: number;
    name: string;
  }> | null;
  artworks?: Array<{
    id: number;
    image_id: string;
  }> | null;
  release_dates?: Array<{
    id: number;
    date: number; // unix timestamp
    release_region?: {
      id: number;
      region?: string;
    } | null;
  }> | null;
}

export interface ExternalGameDetails {
  id: number;
  name: string;
  storyline?: string | null;
  summary?: string | null;
  platforms?: Array<{
    name?: string;
  }> | null;
  cover?: {
    url?: string;
  } | null;
  videos?: Array<{
    url?: string;
  }> | null;
  genres?: Array<{
    name?: string;
  }> | null;
  artworks?: Array<{
    url?: string;
  }> | null;
  release_dates?: Array<{
    date?: string; // unix timestamp
    region?: string | null;
  }> | null;
}