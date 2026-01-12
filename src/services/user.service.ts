import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IProfile } from "@/types/Profile";


const userService = {
    getProfileById: (id: string) => instance.get(`${endpoint.ADMIN}/customer/${id}`),
    updateProfileById: (payload: IProfile, id: string) => instance.put(`${endpoint.ADMIN}/customer/${id}`, payload),
    uploadProfilePicture: (payload: FormData) => instance.post(`${endpoint.ADMIN}/catalogue/cdn/upload`, payload,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
}

export default userService;