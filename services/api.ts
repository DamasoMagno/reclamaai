import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/";

export const api = axios.create({
  baseURL: url,
});
