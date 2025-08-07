import type { Credentails } from "../types";
import { api } from "./client";



//Auth service
export const login = (credentials: Credentails) => api.post('/auth/login', credentials)