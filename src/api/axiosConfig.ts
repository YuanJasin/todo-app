import axios from "axios"

const instance = axios.create({
    baseURL:'https://test.com',
    timeout:5000,
    headers:{
        'Content-Type':'application/json'
    }
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
instance.interceptors.response.use(
    response => {
      const res = response.data;
      if (res.code !== 200) {
        // 处理错误
        return Promise.reject(new Error(res.message || 'Error'));
      } else {
        return res;
      }
    },
    error => {
      console.error("Response error:", error);
      return Promise.reject(error);
    }
  );

export default instance;