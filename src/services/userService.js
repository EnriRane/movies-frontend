import http from "./httpRequest";
import config from "../config.json";

export function register(user) {
  return http.post(config.apiUrl + "/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
