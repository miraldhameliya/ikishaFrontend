import { apiInstance } from "../../api/axiosApi";
import { ALLWOP_TYPE, DIAMOND_TYPE_LIST, DIAMOND_TYPE_STATUS_UPDATE, DIAMOND_TYPE_UPDATE, DIMOND_TYPE } from "../../api/constApi";

export const createDiamondType = async (payload) => {
  const response = await apiInstance.post(DIMOND_TYPE, payload);
  return response.data;
}

export const updateDiamondType = async (payload) => {
  const response = await apiInstance.post(DIAMOND_TYPE_UPDATE, payload);
  return response.data;
}

export const fetchDiamondType = async ({ page = 1, limit = 10, search = '' }) => {
  const payload = { page, limit, search };
  const response = await apiInstance.post(DIAMOND_TYPE_LIST, payload);
  return response.data;
}

export const changeDiamondTypeStatus = async ({ diamondtypeId, status }) => {
  const response = await apiInstance.post(DIAMOND_TYPE_STATUS_UPDATE, { diamondtypeId, status });
  return response.data;
}

export const fetchDiamondTypes = async (search = '') => {
  try {
    const response = await apiInstance.get(DIAMOND_TYPE_LIST, {
      params: { search }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching diamond types:", error);
    throw error;
  }
};

export const allWopType = async ({ search = '' }) => {
  // const payload = { page, limit, search };
  const response = await apiInstance.get(ALLWOP_TYPE, {  search : ''});
  return response.data;
}