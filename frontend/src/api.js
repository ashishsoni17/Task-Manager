import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

api.interceptors.request.use(
    (res) => res,
    async (error) => {
        if(error.response.status === 401){
            try{
                const response = await api.get('/refresh');
                if(response.status === 200){
                    return api.request(error.config);
                }
            }catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
)


export default api;