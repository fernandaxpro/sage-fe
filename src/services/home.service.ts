import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const homeService = {
    getHomeData: () => instance.get(`${endpoint.CUSTOMER}/sys`)
}

export default homeService