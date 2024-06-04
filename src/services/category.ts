import { ENDPOINTS } from "@/constant/endpoint";
import { API } from "@/utils";

export interface Category {
  id: number;
  name: string;
  image: string;
}


export const getListCategories = () => ({
  queryKey: [ENDPOINTS.CATEGORIES],
  queryFn: async () => {
    const response = await API.get(ENDPOINTS.CATEGORIES);
    return JSON.parse(JSON.stringify(response.data));
  }
});
