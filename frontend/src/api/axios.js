import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:5000/api"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API
export const fetchProducts = async ({ search = "", category = "", page = 1, limit = 12 } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  params.append("page", page);
  params.append("limit", limit);

  const { data } = await API.get(`/products?${params.toString()}`);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await API.get("/products/categories");
  return data;
};

// Order API
export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};

export const fetchOrders = async (page = 1, limit = 10) => {
  const { data } = await API.get(`/orders?page=${page}&limit=${limit}`);
  return data;
};

export default API;
