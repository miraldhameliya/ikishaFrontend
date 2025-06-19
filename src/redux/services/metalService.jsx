import { apiInstance } from '../../api/axiosApi';
import { METAL_TYPE_CREATE, METAL_TYPE_LIST } from '../../api/constApi';

export const createMetalType = async (payload) => {
  const response = await apiInstance.post(METAL_TYPE_CREATE, payload);
  return response.data;
};

export const getMetalTypes = async () => {
  const response = await apiInstance.get(METAL_TYPE_LIST);
  return response.data;
}; 