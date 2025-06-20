import { apiInstance } from '../../api/axiosApi';
import { baseUrl } from '../../api/baseUrl';
import { SIZE_LIST, SIZE_CREATE, SIZE_UPDATE, SIZE_STATUS_UPDATE } from '../../api/constApi';

export const fetchSizes = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await apiInstance.post(SIZE_LIST, { page, limit, search });
  return response.data;
};

export const createSize = async (payload) => {
  const response = await apiInstance.post(SIZE_CREATE, payload);
  return response.data;
};

export const updateSize = async (payload) => {
  const response = await apiInstance.post(SIZE_UPDATE, payload);
  return response.data;
};

export const updateSizeStatus = async (sizeid) => {
  const response = await apiInstance.post(SIZE_STATUS_UPDATE, { sizeid });
  return response.data;
}; 

