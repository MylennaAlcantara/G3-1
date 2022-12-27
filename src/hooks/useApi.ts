import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.1.31:8099/user/"
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        /*return {
            token: '123456789'
        };
        const response = await api.post('/login', {token});
        return response.data;*/
    },
    logout: async () => {
        return {status: true}
        const response = await api.post('/logout');
        return response.data;
    }

})