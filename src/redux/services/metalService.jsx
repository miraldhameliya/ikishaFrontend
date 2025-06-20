import { apiInstance } from '../../api/axiosApi';
import { METAL_TYPE_CREATE, METAL_TYPE_LIST, METAL_TYPE_UPDATE, METAL_TYPE_STATUS_UPDATE } from '../../api/constApi';

export const createMetalType = async (payload) => {
  const response = await apiInstance.post(METAL_TYPE_CREATE, payload);
  return response.data;
};
// console.log("???????????metal",response);

export const fetchMetalTypes = async ({ page = 1, limit = 10, search = '' }) => {
  const payload = { page, limit, search };
  const response = await apiInstance.post(METAL_TYPE_LIST, payload);
  return response.data;
}; 

export const updateMetalType = async (payload) => {
  const response = await apiInstance.post(METAL_TYPE_UPDATE, payload);
  return response.data;
}

export const updateMetalTypeStatus = async (metaltypeId) => {
  const response = await apiInstance.post(METAL_TYPE_STATUS_UPDATE, { metaltypeId });
  return response.data;
};