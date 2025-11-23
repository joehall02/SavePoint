import axios from "axios";
import config from "../config/config.js";
import { IGDBGame } from "../models/igdbGame.js";
import { IGDBClientProtocol } from "./protocols/IGDBClientProtocol.js";

axios.defaults.baseURL = config.igdbBaseUrl;
axios.defaults.headers.common["Authorization"] = `Bearer ${config.igdbAccessToken}`;
axios.defaults.headers.common["Client-ID"] = `${config.igdbClientId}`;
axios.defaults.headers.common["Content-Type"] = "text/plain";
axios.defaults.timeout = 5000; // 5 Seconds Timeout

export class IGDBClient implements IGDBClientProtocol {
  async searchGame (searchParam: string, searchLimit: number): Promise<Array<IGDBGame>> {
    const response = await axios.post("/games", `search "${searchParam}"; fields name, cover.image_id; limit ${searchLimit};`);
  
    return response.data as Array<IGDBGame>;
  };
}

