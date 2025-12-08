interface GameCover {
    image_id: string;
}

export interface IGDBGame {
    id: number;
    cover?: GameCover | null;
    name: string;
}

export interface ImageItem {
  url: string;
}

export interface IdName {
  name: string;
}

export interface VideoItem {
  video_id: string;
}

export interface ReleaseDateItem {
  date: number; // unix timestamp
}

export interface ExternalGameDetails {
  id: number;
  name: string;
  storyline?: string | null;
  summary?: string | null;
  platforms?: IdName[] | null;
  cover?: ImageItem | null;
  videos?: VideoItem[] | null;
  genres?: IdName[] | null;
  artworks?: ImageItem[] | null;
  release_dates?: ReleaseDateItem[] | null;
}