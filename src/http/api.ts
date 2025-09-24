import type { CreateTenant, CreateUserData, Credentails, Tenant } from "../../types";
import { api } from "./client";



//Auth service
export const login = (credentials: Credentails) => api.post('/auth/login', credentials)
export const self = () => api.get('/auth/self ')
export const logout = () => api.post('/auth/logout')
export const getUsers = (queryString: string) => api.get(`/users?${queryString}`)
export const getTenants = (queryString: string) => api.get(`/tenants?${queryString}`)
export const getAllTenants = () => api.get(`/tenants`)
export const createUser = (user: CreateUserData)=> api.post('/users', user)
export const createTenant = (tenant: CreateTenant)=> api.post('/tenants', tenant)
