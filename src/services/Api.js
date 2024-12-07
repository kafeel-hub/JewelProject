import axios from "axios";
import store from "../store";
const baseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "http://bestojewelapi-dev.us-east-1.elasticbeanstalk.com/api";

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
  const logIn = (data) => {
    return apis.post("/User/AuthenticateUser", data);
  };

  const getCompanylist = (data) => {
    return apis.get(
      `/Inventory/GetUserCompanyList?userId=${data?.userId}`,

      { headers: { Authorization: `Bearer ${data?.token}` } }
    );
  };

  const getCompanyLocation = (data) => {
    return apis.get(
      `/Inventory/GetCompanyLocationList?UserId=${data?.userId}&CompanyId=${data.companyId}`,
      { headers: { Authorization: `Bearer ${data.token}` } }
    );
  };
  const getCompanyDetails = (data) => {
    return apis.get(
      `/Inventory/GetCompanyLocation?UserId=${data?.userId}&CompanyId=${data.companyId}&LocationId=${data.locationId}`,

      { headers: { Authorization: `Bearer ${data.token}` } }
    );
  };
  return {
    getDemo,
    logIn,
    getCompanylist,
    getCompanyLocation,
    getCompanyDetails,
  };
};
export default {
  create,
};
