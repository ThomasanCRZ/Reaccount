const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
    REGISTER: `${API_BASE_URL}/register`,
    LOGIN: `${API_BASE_URL}/login`,
    LOGOUT: `${API_BASE_URL}/logout`,
    TRANSACTIONS: `${API_BASE_URL}/transactions/`,
    TRANSACTIONS_CREATE: `${API_BASE_URL}/transactions/store`,
}