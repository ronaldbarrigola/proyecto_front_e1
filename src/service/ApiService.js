import axios from 'axios'

const urlBase = "http://127.0.0.1:3000";

export function Api() {
    let token = localStorage.getItem("access_token") || "";

    const api = axios.create({
        baseURL: urlBase,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });

    // interceptor (errors 401, 403)
    api.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if(error.response.status === 401){
                console.log("INTERCEPTOR: *******: ")
                localStorage.removeItem("access_token")
                window.location.href = "/login"
            }

            return Promise.reject(error);
        }
    )

    return api;

}