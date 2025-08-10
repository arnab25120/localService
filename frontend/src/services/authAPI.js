import axiosInstance from "./axiosInstance.js";

export const registerUser=(formData)=>{
    return axiosInstance.post("/users/register",formData);
};

export const loginUser = (formData) => {
  return axiosInstance.post("/users/login", formData);
};

// ⬇️ GET /users/logout
export const logoutUser = () => {
  return axiosInstance.get("/users/logout");
};

// ⬇️ POST /users/refresh-token (if using refresh flow)
export const refreshAccessToken = () => {
  return axiosInstance.post("/users/refresh-token");
};

// ⬇️ PATCH /users/change-password
export const changePassword = (passwordData) => {
  return axiosInstance.patch("/users/change-password", passwordData);
};
