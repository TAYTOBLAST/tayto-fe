import { request } from "@/api/index";

const Api = {
  getEthscriptionsByOwner(owner: string | undefined) {
    return request<any>("get", "/ins/api/ethscriptions/owned_by/" + owner);
  },
  getEthscriptions() {
    return request<any>("get", "/ins/api/ethscriptions");
  },
  validate(data: any) {
    return request<any>("post", "/api/inscription/validate", data);
  },
};

export default Api;
