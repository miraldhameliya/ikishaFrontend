import { apiInstance } from "../../api/axiosApi";
import { DIAMOND_CLARITY_CREATE, DIAMOND_CLARITY_LIST, DIAMOND_CLARITY_UPDATE, DIAMOND_STATUS_UPDATE } from "../../api/constApi";

export const fetchDiamondClarity = async ({ page = 1, limit = 10, search = '' }) => {
  const payload = { page, limit, search };
  const response = await apiInstance.post(DIAMOND_CLARITY_LIST, payload);
  return response.data;
}

export const createDiamondClarity = async (payload) => {
  const response = await apiInstance.post(DIAMOND_CLARITY_CREATE, payload);
  return response.data;
}

export const updateDiamondClarity = async (payload) => {
  const response = await apiInstance.post(DIAMOND_CLARITY_UPDATE, payload);
  return response.data;
}

export const statusChange = async ({ diamondclaritiesId }) => {
  const response = await apiInstance.post(DIAMOND_STATUS_UPDATE, { diamondclaritiesId });
  return response.data;
} 