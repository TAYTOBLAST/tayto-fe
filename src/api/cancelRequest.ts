import { message } from "antd";
import axios from "axios";

const pending = new Map();

export const addPending = (config: any) => {
  const url = [config.method, config.url].join("&");

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        pending.set(url, cancel);
      }
    });
};

export const removePending = (config: any) => {
  const url = [config.method, config.url].join("&");

  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);

    cancel(url);
    pending.delete(url);
  }
};

export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }

  pending.clear();
};

/**
 * 处理异常
 * @param {*} error
 */
export function httpErrorStatusHandle(error: any) {
  if (axios.isCancel(error)) return console.error("cancel：" + error.message);
  let message = "";

  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "The interface is redirected！";
        break;
      case 400:
        message = "The parameter is incorrect！";
        break;
      case 401:
        message =
          "You are not logged in, or your login has timed out, please log in first！";
        break;
      case 403:
        message = "You do not have permission to operate！";
        break;
      case 404:
        message = `Error requesting address: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = "Request timed out！";
        break;
      case 409:
        message = "The same data already exists in the system！";
        break;
      case 500:
        message = "Server internal error！";
        break;
      case 501:
        message = "Service not implemented！";
        break;
      case 502:
        message = "Gateway error！";
        break;
      case 503:
        message = "Service is not available！";
        break;
      case 504:
        message =
          "The service is temporarily inaccessible, please try again later.！";
        break;
      case 505:
        message = "HTTP version is not supported！";
        break;
      default:
        message = "Abnormal problems, please contact customer service！";
        break;
    }
  }

  if (error.message.includes("timeout")) message = "Network request timeout！";
  if (error.message.includes("Network"))
    message = window.navigator.onLine
      ? "Server side exception！"
      : "You are disconnected！";
  showMessage(message);
}

const messageList1: any[] = [];

export function showMessage(msg: any) {
  if (!messageList1.includes(msg)) {
    messageList1.push(msg);
    message.error(msg).then((e: any) => {
      const index = messageList1.findIndex((i) => i == msg);

      messageList1.splice(index, 1);
    });
  }
}
