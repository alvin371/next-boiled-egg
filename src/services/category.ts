import { ENDPOINTS } from "@/constant/endpoint";
import { API } from "@/utils";

export const getListCategories = () => ({
  queryKey: [ENDPOINTS.CATEGORIES],
  queryFn: async () => {
    const response = await API.get(ENDPOINTS.CATEGORIES);
    return JSON.parse(JSON.stringify(response.data));
  }
});
