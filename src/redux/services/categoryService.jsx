import { apiInstance } from "../../api/axiosApi";
import { ALL_WOP, CATEGORY_CREATE, CATEGORY_LIST, CATEGORY_STATUS_UPDATE, CATEGORY_UPDATE } from "../../api/constApi";

const toFormData = (obj) => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
};

export const fetchCategory = async ({ page = 1, limit = 10, search = '' }) => {
    const payload = { page, limit, search };
    const response = await apiInstance.post(CATEGORY_LIST, payload, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
}

export const createCategory = async (payload) => {
    const formData = toFormData(payload);
    const response = await apiInstance.post(CATEGORY_CREATE, formData);
    return response.data;
}

export const updateCategory = async (payload) => {
    const formData = toFormData(payload);
    const response = await apiInstance.post(CATEGORY_UPDATE, formData);
    return response.data;
}

export const updateCategoryStatus = async ({ categoryid, status }) => {
    return apiInstance.post(CATEGORY_STATUS_UPDATE, { categoryid, status });
};

export const allWop = async ({ page = 1, limit = 10, search = '' }) => {
    const payload = { page, limit, search };
    const response = await apiInstance.get(ALL_WOP, { data: payload });
    return response.data;
};