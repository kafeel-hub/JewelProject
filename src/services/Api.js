import axios from "axios";
const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com";
const create = (baseURL = baseUrl) => {
  const apis = axios.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
    },
    timeout: 200000,
  });

  const getDemo = (data) => {
    return apis.get(`/users`);
  };
  return {
    getDemo,
  };
};
export default {
  create,
};
