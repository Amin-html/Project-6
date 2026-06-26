import axios from 'axios';

// Базовый URL нашего Django API
const API = axios.create({
    baseURL: 'http://localhost:8000/api/', 
})

export default API;