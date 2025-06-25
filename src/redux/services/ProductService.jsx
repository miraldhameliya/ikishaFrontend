import { apiInstance } from "../../api/axiosApi";
import { ADD_PRODUCT_LIST, ALLWOP, PRODUCT_DETAIL, PRODUCT_LIST, UPDATE_PRODUCT_LIST, VIEW_ONE_PRODUCT, VIEW_PRODUCT_LIST } from "../../api/constApi";

export const fetchAllProduct = async ({ page = 1, limit = 10, search = "", categoryId = "" }) => {
    try {
        const response = await apiInstance.post(PRODUCT_LIST, {
            page,
            limit,
            search,
            categoryId
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


export const addProduct = async (payload) => {  
        const response = await apiInstance.post(ADD_PRODUCT_LIST, payload);
        return response.data;
}

export const updateProduct = async (payload) => {
    const response = await apiInstance.put(UPDATE_PRODUCT_LIST, payload);
    return response.data;
}

export const allWop = async ({ page = 1, limit = 10, search = ''}) => {
    const payload = { page, limit, search };
    const response = await apiInstance.get(ALLWOP, { data: payload });
    return response.data;
}

export const viewProduct = async (productId, diamondtypeId = '') => {
    const url = `/admin/products/getone?productId=${productId}${diamondtypeId ? `&diamondtypeId=${diamondtypeId}` : ''}`;
    const response = await apiInstance.get(url);
    return response.data;
}

export const viewProductDetail = async(payload) => {
    const response = await apiInstance.post(PRODUCT_DETAIL, payload);
    return response.data;
}