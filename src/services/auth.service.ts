import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin } from "@/types/Auth";


const authService = {
    login: (payload: ILogin) => instance.post(`${endpoint.CUSTOMER}/auth/login`, payload),
    getProfileWithToken: (token: string) => instance.get(`${endpoint.CUSTOMER}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
    getProfile: (id: string) => instance.get(`${endpoint.ADMIN}/customer/${id}`)
}

export default authService;