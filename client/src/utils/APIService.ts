import axios, { AxiosInstance } from "axios";

export class APIService {
  fetcher: AxiosInstance;
  constructor() {
    this.fetcher = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
    });
  }

  private static toFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  };

  async get(url: string) {
    try {
      const raw = await this.fetcher.get(url);
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async post(url: string, data: any, params?: object, isFormData = false) {
    data = isFormData ? APIService.toFormData(data) : data;

    try {
      const raw = await this.fetcher.post(url, data, {
        params,
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async put(url: string, data?: object, params?: object) {
    try {
      const raw = await this.fetcher.put(url, data, { params });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async deleteCall(url: string, data?: any, isFormData = false) {
    data = isFormData ? APIService.toFormData(data) : data;

    try {
      const raw = await this.fetcher.delete(url, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
        data,
      });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async patch(url: string, data?: any, isFormData = false) {
    data = isFormData ? APIService.toFormData(data) : data;

    try {
      const raw = await this.fetcher.patch(url, data, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }
}

const api = new APIService();
export default api;
