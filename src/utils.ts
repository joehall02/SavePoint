import { RawExternalGameDetails, ExternalGameDetails, IGDBGame, RawIGDBGame } from "./models/igdbGame.js";

export function mapExternalGameDetails(data: object[]): ExternalGameDetails {

  const raw = data[0] as RawExternalGameDetails;

  return {
    id: raw.id,
    name: raw.name,
    storyline: raw.storyline ?? null,
    summary: raw.summary ?? null,
    platforms: raw.platforms?.map((p) => ({ name: p.name })) ?? null,
    cover: raw.cover ? { url: raw.cover.url } : null,
    videos: raw.videos?.map((v) => ({ video_id: v.video_id })) ?? null,
    genres: raw.genres?.map((g) => ({ name: g.name })) ?? null,
    artworks: raw.artworks?.map((a) => ({ url: a.url })) ?? null,
    release_dates: raw.release_dates?.map((r) => ({ date: r.date })) ?? null,
  };
}

export function mapExternalGame(data: object[]): IGDBGame[] {
  const rawList = data as RawIGDBGame[];

  return rawList.map((raw) => ({
    id: raw.id,
    name: raw.name,
    cover: raw.cover ? { image_id: raw.cover.image_id } : null,
  }));
}

