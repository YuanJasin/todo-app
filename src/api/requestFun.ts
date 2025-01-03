import instance from "./axiosConfig";

export const requestFun = () => {
  
  const GET = <T, P = object>(url: string, params?: P): Promise<T> =>
    instance.get(url, { params }).then(response => response.data);
  
  const POST = <T, D = object>(url: string, data?: D): Promise<T> =>
    instance.post(url, data).then(response => response.data);
  
  const PUT = <T, D = object>(url: string, data?: D): Promise<T> =>
    instance.put(url, data).then(response => response.data);
  
  const DEL = <T, P = object>(url: string, params?: P): Promise<T> =>
    instance.delete(url, { params }).then(response => response.data);
  
  return {
    GET,
    POST,
    PUT,
    DEL
  }
}

