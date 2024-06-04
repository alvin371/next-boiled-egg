import { ENDPOINTS } from "@/constant/endpoint";
import { API } from "@/utils";

export interface UploadResponse {
  originalname: string;
  filename: string;
  location: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await API.post<UploadResponse>(ENDPOINTS.FILES.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data;
  };