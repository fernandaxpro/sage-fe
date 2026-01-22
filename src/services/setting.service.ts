import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const settingService = {
  getGlobalSetting: () => instance.get(`${endpoint.SETTING}`),
  getCompanyAddress: () => instance.get(`${endpoint.SETTING}/company.address`),
};

export default settingService;
