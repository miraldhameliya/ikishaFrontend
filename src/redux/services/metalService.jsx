import { apiInstance } from '../../api/axiosApi';
import { METAL_TYPE_CREATE } from '../../api/constApi';

export const createMetalType = async (payload) => {
  const response = await apiInstance.post(METAL_TYPE_CREATE, payload);
  return response.data;
}; 