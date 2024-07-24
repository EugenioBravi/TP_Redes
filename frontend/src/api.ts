import axios from "axios";
//Crea conexion con el backend
const api = axios.create({
  baseURL: "http://192.168.1.5:8000",
});

export default api;
