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

const AccountService = { login, register, getProfile };

export default AccountService;
