import axiosInstance from "./axiosInstance";

// Provider routes
export const getMyServices = () => axiosInstance.get("/services/provider/my-services");

export const deleteService = (id) => axiosInstance.delete(`/services/provider/${id}`);

export const createService = (serviceData) => axiosInstance.post("/services/provider/create", serviceData);

export const updateService = (id, serviceData) => axiosInstance.patch(`/services/provider/${id}`, serviceData);

// Public routes
export const getServiceById = (id) => axiosInstance.get(`/services/${id}`);

export const getAllServices = (params) => axiosInstance.get("/services", { params });

export const getServicesByCategory = (category, params) => 
  axiosInstance.get(`/services/category/${category}`, { params });

// Admin routes (if needed)
export const getPendingServices = () => axiosInstance.get("/services/admin/pending");

export const approveService = (id) => axiosInstance.patch(`/services/admin/approve/${id}`);

export const rejectService = (id) => axiosInstance.patch(`/services/admin/reject/${id}`);