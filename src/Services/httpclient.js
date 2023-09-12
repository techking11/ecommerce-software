import axios from "axios";
import API from './api';

let httpClient = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;