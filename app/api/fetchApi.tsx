import axiosInstance from "./Axios";

export const urlBackend="http://localhost:8080"
export const getStoreAll = async () => {
    try {
      const { data } = await axiosInstance.get(`${urlBackend}/store/get-all`,{  withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
export const getCateloryAll = async () => {
    try {
      const { data } = await axiosInstance.get(`${urlBackend}/product/get-catelory`,
        
        {  withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  export const getSearchStore = async (key:any,page:number) => {
    try {
      const { data } = await axiosInstance.get(`${urlBackend}/store/search-store?search=${key}&page=${page}`,{  withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  export const getStoreById=async(id:any)=>{
    try{
        const {data}=await axiosInstance.get(`${urlBackend}/store/get-store/${id}`,{  withCredentials: true,
        })
        return data
    }catch(error){
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
  }
  export const getProductAll=async()=>{
    try{
        const {data}=await axiosInstance.get(`${urlBackend}/product/get-all`,{  withCredentials: true,
        })
        return data
    }catch(error){
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
  }
export const register=async(createAuth:any)=>{
    try{
        const {data}=await axiosInstance.post(`${urlBackend}/auth/register`,createAuth,{  withCredentials: true,
        })
        return data
    }catch(error){
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}
export const login=async(createAuth:any)=>{
    try{
        const {data}=await axiosInstance.post(`${urlBackend}/auth/login`,createAuth,{  withCredentials: true,
        })
        return data
    }catch(error){
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}
export const postOrder=async(createOrder:any)=>{
  // http://localhost:8080/don-hang
  try{
    const {data}=await axiosInstance.post(`${urlBackend}/don-hang`,createOrder,{  withCredentials: true,
    })
    return data
}catch(error){
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error to handle it in the calling code
}
}
export const getUserById=async()=>{
  try{
    const {data}=await axiosInstance.get(`${urlBackend}/user/detail`,{  withCredentials: true,
    })
    return data
}catch(error){
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error to handle it in the calling code
}
}