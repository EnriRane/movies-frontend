import http from "./httpRequest";
import config from "../config.json";
export function getGenres() {
  return http.get(config.apiUrl + "/genres");
}
