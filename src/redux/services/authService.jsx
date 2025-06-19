import { LOGIN, FORGOT_PASSWORD, RESET_PASSWORD } from "../../api/constApi";
import { apiInstance } from "../../api/axiosApi";
import { baseUrl } from "../../api/baseUrl";

// Login API
export const LoginApi = (payload) => {
    return apiInstance.post(`${baseUrl}${LOGIN}`, payload);
};


// Forgot Password API
export const ForgotPasswordApi = (payload) => {
    return apiInstance.post(FORGOT_PASSWORD, payload);
};

// Reset Password API
export const ResetPasswordApi = (payload) => {
    return apiInstance.post(RESET_PASSWORD, payload);
};
