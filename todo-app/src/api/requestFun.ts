import instance from "./axiosConfig";

export const requestFun = () => {
  
  const GET = <T>(url: string, params?: object): Promise<T> =>
    instance.get(url, { params });
  
  const POST = <T>(url: string, data?: object): Promise<T> =>
    instance.post(url, data);
  
  const PUT = <T>(url: string, data?: object): Promise<T> =>
    instance.put(url, data);
  
  const DEL = <T>(url: string): Promise<T> => instance.delete(url);
  
  return {
    GET,
    POST,
    PUT,
    DEL
  }
}

