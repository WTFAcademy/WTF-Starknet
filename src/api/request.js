import axios from "axios";
import { refreshSession } from "./auth";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://api.wtf.academy/"
    : "https://api.wtf.academy/";
console.log("BASE_URL: ", BASE_URL);

let request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

request.interceptors.request.use(async (config) => {
  const accountInfo = localStorage.getItem("supabase.auth.token");

  if (accountInfo) {
    let access_token =
      JSON.parse(accountInfo)["currentSession"]["access_token"];

    console.log("token过期：", accountInfo.expiresAt);
    if (+new Date() >= accountInfo.expiresAt * 1000) {
      console.log("过期");
      access_token = await refreshSession();
    }

    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

export default request;
