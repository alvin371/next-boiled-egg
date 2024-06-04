"use client";
import { ENDPOINTS } from "@/constant/endpoint";
import { API } from "@/utils";

export type Product = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};
export interface ProductItem {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export const getListProduct = ({
  params
}: {
  params: {
    title: string;
    categoryId: string | undefined;
    page: number;
    perPage: number;
  };
}) => ({
  queryKey: [ENDPOINTS.PRODUCT, params.title, params.categoryId],
  queryFn: async () => {
    const response = await API.get(ENDPOINTS.PRODUCT, { params });
    return JSON.parse(JSON.stringify(response.data));
  }
});

export const getProductDetail = (id: number) => ({
  queryKey: [ENDPOINTS.PRODUCT, id],
  queryFn: () => API.get(`${ENDPOINTS.PRODUCT}/${id}`)
});


export const updateProduct = (id: number, data: Product) => ({
  key: [ENDPOINTS.PRODUCT, id],
  fn: () => API.put(`${ENDPOINTS.PRODUCT}/${id}`, data)
});

export const createProduct = async (data: ProductItem) => {
  const response = await API.post(ENDPOINTS.PRODUCT, data);
  return response.data;
};

export const editProduct = async (id: number, data: ProductItem) => {
  const response = await API.put(`${ENDPOINTS.PRODUCT}/${id}`, data);
  return response.data;
}

export const deleteProduct = async (id: number) => {
  await API.delete(`${ENDPOINTS.PRODUCT}/${id}`);
}