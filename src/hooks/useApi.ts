import axios from "axios";

const api = axios.create({
    baseURL: "https://api.google.com"
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            token: '123456789'
        };
        const response = await api.post('/validate', {token});
        return response.data;
    },
    signin: async (company: string, matricula: string, password: string)=>{
        
        return {
            user: {id: 5, matricula: 'Mylenna', company: 'G3'},
            token: '123456789'
        };
        const response = await api.post('/signin', {company, matricula, password});
        return response.data;
    },
    logout: async () => {
        return { status: true};
        const response = await api.post('/logout');
        return response.data;
    }

})