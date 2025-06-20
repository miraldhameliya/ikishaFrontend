import { apiInstance } from "../../api/axiosApi";
import { DIAMOND_SHAPE_LIST, DIAMOND_SHAPE_UPDATE, DIMOND_SHAPE, DIAMOND_SHAPE_STATUS_UPDATE } from "../../api/constApi";

export const createDiamondShape = async (payload) => {
  const response = await apiInstance.post(DIMOND_SHAPE, payload);
  return response.data;
}

export const updateDiamondShape = async (payload) => {
  const response = await apiInstance.post(DIAMOND_SHAPE_UPDATE, payload);
  return response.data;
}

export const fetchDiamondShape = async ({ page = 1, limit = 10, search = '' }) => {
  const payload = { page, limit, search };
  const response = await apiInstance.post(DIAMOND_SHAPE_LIST, payload);
  return response.data;
}

export const changeDiamondShapeStatus = async ({ diamondshapeId, status }) => {
  const response = await apiInstance.post(DIAMOND_SHAPE_STATUS_UPDATE, { diamondshapeId, status });
  return response.data;
}