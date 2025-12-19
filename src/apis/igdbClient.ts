import axios from "axios";
import config from "../config/config.js";
import { IGDBGame, ExternalGameDetails, RawExternalGameDetails } from "../models/igdbGame.js";
import { IGDBClientProtocol } from "./protocols/IGDBClientProtocol.js";
import { mapExternalGameDetails, mapExternalGame } from "../utils.js";

axios.defaults.baseURL = config.igdbBaseUrl;
axios.defaults.headers.common["Authorization"] = `Bearer ${config.igdbAccessToken}`;
axios.defaults.headers.common["Client-ID"] = `${config.igdbClientId}`;
axios.defaults.headers.common["Content-Type"] = "text/plain";
axios.defaults.timeout = 5000; // 5 Seconds Timeout

export class IGDBClient implements IGDBClientProtocol {
  async searchGame (searchParam: string, searchLimit: number, igdbPlatformId: number | null): Promise<Array<IGDBGame>> {
    let query = `search "${searchParam}"; fields name, cover.image_id; limit ${searchLimit};`

    if (igdbPlatformId !== null) {
      query += `where (platforms = [${igdbPlatformId}]);`
    }

    const response = await axios.post("/games", query);

    return mapExternalGame(response.data as object[]);
  };


  async fetchGameDetails (gameId: number): Promise<ExternalGameDetails> {
    const response = await axios.post("/games", `fields name, storyline, summary, platforms.name, cover.image_id, videos.video_id, genres.name, artworks.image_id, release_dates.date, release_dates.release_region.region; where id = ${gameId};`);

    const data = response.data as RawExternalGameDetails[];

    return mapExternalGameDetails(data);
  };
}

