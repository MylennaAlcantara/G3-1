import axios from "axios";

const api = axios.create({
     URL: "https://randomuser.me/api/",
});

export default api;