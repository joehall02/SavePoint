import axios from "axios";
import config from "../config/config.js";

axios.defaults.baseURL = config.igdbBaseUrl;
axios.defaults.headers.common["Authorization"] = `Bearer ${config.igdbAccessToken}`;
axios.defaults.headers.common["Client-ID"] = `${config.igdbClientId}`;
axios.defaults.headers.common["Content-Type"] = "text/plain";
axios.defaults.timeout = 5000; // 5 Seconds Timeout

export const searchGame = async (searchParam: string, searchLimit: number) => {
  const response = await axios.post("/games", `search "${searchParam}"; fields name, cover.image_id; limit ${searchLimit};`);

  return response.data;
};
