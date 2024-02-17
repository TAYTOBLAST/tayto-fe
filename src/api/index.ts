import type { AxiosRequestConfig, Method } from "axios";

import axios from "axios";
import qs from "qs";

import {
  addPending,
  httpErrorStatusHandle,
  removePending,
} from "./cancelRequest";

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    removePending(config); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    //当请求路径不是这两个的时候, 添加token请求头
    const tk = {
      timefix: new Date().getTime(),
    };

    if (!config.url.includes("?")) {
      config.url = `${config.url}?${qs.stringify(tk)}`;
    } else {
      config.url = `${config.url}${qs.stringify(tk)}`;
    }

    if ((config.method === "get" || config.method === "GET") && config.data) {
      config.url = `${config.url}&${qs.stringify(config.data)}`;
      delete config.data;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response: any) => {
    removePending(response); // 在请求结束后，移除本次请求

    // dataAxios 是 axios 返回数据中的 data
    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      //处理手动cancel
      console.log("这是手动cancel的");
    }

    // 将当前请求从请求列表中移除
    const config = error.config;

    config && removePending(error.config);
    httpErrorStatusHandle(error); // 处理错误状态码

    return Promise.reject(error);
  }
);

export type Response<T = any> = {
  code: string;
  msg: string;
  data: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 * @param config
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  if (method === "post") {
    return axiosInstance.post(url, data, config);
  } else if (method === "delete") {
    return axiosInstance.delete(url, data);
  } else if (method === "put") {
    return axiosInstance.put(url, data);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
