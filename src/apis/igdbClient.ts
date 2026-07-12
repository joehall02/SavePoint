import axios from "axios";
import config from "../config/config.js";
import { IGDBGame, ExternalGameDetails, RawExternalGameDetails, IGDBCount, GameCover, PlatformCover } from "../models/igdbGame.js";
import { IGDBClientProtocol } from "./protocols/IGDBClientProtocol.js";
import { mapExternalGameDetails, mapExternalGame, mapImageIdToUrl } from "../utils.js";
import * as enums from "../enums.js";
import { Pagination } from "../models/pagination.js";

axios.defaults.baseURL = config.igdbBaseUrl;
axios.defaults.headers.common["Authorization"] = `Bearer ${config.igdbAccessToken}`;
axios.defaults.headers.common["Client-ID"] = `${config.igdbClientId}`;
axios.defaults.headers.common["Content-Type"] = "text/plain";
axios.defaults.timeout = 5000; // 5 Seconds Timeout

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

// TODO: Needs moving into a seperate file
const makeCache = <T>() => {
  const cache = new Map<number, CacheEntry<T>>();
 
  const get = (key: number): T | undefined => {
	const entry = cache.get(key);
   
	if (!entry) return undefined;
	
	if (Date.now() > entry.expiresAt) {
	  cache.delete(key);
	  return undefined;
	}
	return entry.data;
  }

  const set = (key: number, value: T) => {
	cache.set(key, { data: value, expiresAt: Date.now() + CACHE_TTL_MS });
  }
 
  return { get, set }
}

const detailsCache = makeCache<ExternalGameDetails>();
const coverCache = makeCache<GameCover | null>();

export class IGDBClient implements IGDBClientProtocol {
  async searchGame (searchParam: string, igdbPlatformId: number | undefined, pagination: Pagination): Promise<Array<IGDBGame>> {
    let query = `
		search "${searchParam}"; 
		fields name, cover.image_id;
		limit ${pagination.limit}; 
		offset ${pagination.offset}; 
	`
	
    if (igdbPlatformId !== undefined) {
		query += `where (game_type = 0) & (platforms = [${igdbPlatformId}]);`
    } else {
	  // Filter by main game only (removes dlcs, etc)
	  query += `where (game_type = 0);`
	}

    const response = await axios.post("/games", query);

    return mapExternalGame(response.data as object[]);
  };

  async countGame (searchParam: string, igdbPlatformId: number | undefined): Promise<IGDBCount> {
	let query = `search "${searchParam}";`

    if (igdbPlatformId !== undefined) {
		query += `where (game_type = 0) & (platforms = [${igdbPlatformId}]);`
    } else {
	  // Filter by main game only (removes dlcs, etc)
	  query += `where (game_type = 0);`
	}

    const response = await axios.post<IGDBCount>("/games/count", query);

	return response.data
  }

  async fetchGameCover(gameId: number): Promise<GameCover | null> {
    const cached = coverCache.get(gameId);
    if (cached !== undefined) return cached;

    const response = await axios.post("/games", `fields cover.image_id; where id = ${gameId};`);
    const data = response.data as Array<{ cover?: { image_id: string } | null }>;

    const imageId = data[0]?.cover?.image_id;

    const result = imageId ? { url: mapImageIdToUrl(imageId, enums.ImageSize.r_1080p) } : null;
    coverCache.set(gameId, result);

    return result;
  }

  async fetchPlatformCovers(platformIds: number[]): Promise<Array<PlatformCover>> {
    const response = await axios.post("/platforms", `fields platform_logo.image_id; where id = (${platformIds.join(', ')}); limit ${platformIds.length};`);
    const data = response.data as Array<{ id: number; platform_logo?: { id: number; image_id: string } | null }>;

    return data
      .filter(p => p.platform_logo?.image_id)
      .map(p => ({ id: p.id, url: mapImageIdToUrl(p.platform_logo!.image_id, enums.ImageSize.screenshot_big) }));
  }

  async fetchGameDetails (gameId: number): Promise<ExternalGameDetails> {
    const cached = detailsCache.get(gameId);
    if (cached) return cached;

    const response = await axios.post("/games", `fields name, storyline, summary, platforms.name, cover.image_id, videos.video_id, genres.name, screenshots.image_id, release_dates.date, release_dates.release_region.region; where id = ${gameId};`);
    const data = response.data as RawExternalGameDetails[];

    const result = mapExternalGameDetails(data);
    detailsCache.set(gameId, result);

    return result;
  };
}

