import axios from "axios";
import config from "../config/config.js";

axios.defaults.baseURL = "https://api.igdb.com/v4";
axios.defaults.headers.common["Authorization"] = `Bearer ${config.igdbAccessToken}`;
axios.defaults.timeout = 5000; // 5 Seconds Timeout

export const searchGame = async (searchParam: string) => {
  const response = (await axios.post("/games"), { data: `search ${searchParam}; fields name, cover.image_id; limit 6;` });

  return response.data;
};
