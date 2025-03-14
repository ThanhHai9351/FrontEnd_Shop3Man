import apiRequest from "@/service/api-request";

export interface DTORegister {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface DTOLogin {
    email: string
    password: string
}

const login = (data: DTOLogin) => apiRequest('/auth/login', 'POST', '', data);

const register = (data: DTORegister) => apiRequest('/auth/register', 'POST', '', data);

const getProfile = (token: string) => apiRequest('/user/me', 'GET', token);

const getAllAccounts = (token: string, data: { page?: number, limit?: number, search?: string }) => {
    const params = new URLSearchParams();
    if (data.page) params.set('page', data.page.toString());
    if (data.limit) params.set('limit', data.limit.toString());
    if (data.search) params.set('search', data.search);
    return apiRequest(`/user?${params.toString()}`, 'GET', token);
};

const getDetailAccount = (token: string, id: string) => apiRequest(`/user/${id}`, 'GET', token);

const AccountService = { login, register, getProfile, getAllAccounts , getDetailAccount};

export default AccountService;
