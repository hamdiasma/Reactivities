import axios from "axios";
import { store } from "../store/store";

const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));


const agent = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

agent.interceptors.request.use(config=>{
    store.uiStore.isBusy()
    return config
})

agent.interceptors.response.use(
async response => {
    try {
        // Handle successful response
        await sleep(1000); // Simulate network delay
        return response;
    } catch (error) {
        console.error("Error in response interceptor:", error);
        return Promise.reject(error);
    } finally{
        store.uiStore.isIdle()
    }
},
  
);

export default agent