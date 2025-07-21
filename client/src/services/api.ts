import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true, //send + receive cookies
    headers: {
        "Content-Type" : "application/json",
    },
});