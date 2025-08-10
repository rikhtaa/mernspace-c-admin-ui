import type { Credentails } from "../../types";
import { api } from "./client";



//Auth service
export const login = (credentials: Credentails) => api.post('/auth/login', credentials)
export const self = () => api.get('/auth/self ')
export const logout = () => api.post('/auth/logout')
