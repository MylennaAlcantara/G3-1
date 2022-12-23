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
    signin: async ( matricula: string, senha: string)=>{
        return {
            user: {id: 5, matricula: 'Mylenna', senha: 1234},
            token: '123456789'
        };
        const response = await api.post('/all/', { matricula, senha});
        return response.data;
    },
    logout: async () => {
        return {status: true}
        const response = await api.post('/logout');
        return response.data;
    }

})