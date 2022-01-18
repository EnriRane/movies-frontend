import http from "./httpRequest";
import config from "../config.json";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(config.apiUrl + "/auth", {
    email,
    password,
  });
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function loginWithJWT(jwt) {
  localStorage.setItem("token", jwt);
}
export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJWT,
  getJwt,
};
