import { showToast } from "@/utils/tostifyalert";
import axios, { AxiosResponse } from "axios";


type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

interface AxiosConfigParams {
  method: RequestMethod;
  url: string;
  data?: any;
  successMessage?: string;
  headers?: Record<string, any>;
}

const handleSuccess = (successMessage: string): void => {
  successMessage && showToast(successMessage, "success");
};

const handleFailure = (message: string): void => {
  showToast(message, "error");
  throw new Error(message);
};

const axiosConfig = async ({
  method,
  url,
  data,
  successMessage = "",
  headers = {},
}: AxiosConfigParams): Promise<any> => {
  try {
    const response: AxiosResponse =
      method === "post" || method === "put" || method === "patch"
        ? await axios[method](url, data, { headers })
        : await axios[method](url, { headers });

    handleSuccess(successMessage);

    return response.data.data;
  } catch (error: any) {
    let message = error.response
      ? error.response.data.message
      : "خطا در انجام درخواست";
    handleFailure(message);
  }
};

export default axiosConfig;
