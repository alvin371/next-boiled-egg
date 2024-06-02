import { API_URL } from "@/helpers";
import axios from "axios";

// TODO: implement getToken function when needed
// export const getToken = () => {
//   // decrypt token
//   const encryptedToken = localStorage.getItem(LocalStorageKey.Token);
//   if (encryptedToken) {
//     const decryptedToken = decryptValue(encryptedToken);
//     return JSON.parse(decryptedToken);
//   }
//   return null;
// };

export const API = axios.create({
  baseURL: API_URL
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //   },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error, "erroraerawrawe");
    // return Promise.reject(error);
  }
);
