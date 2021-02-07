import axios from 'axios'

var api_url=process.env.VUE_APP_API_URL
export const api = axios.create({
    baseURL:api_url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials':true
    },
})

api.interceptors.request.use(function (config) {
    const auth = localStorage.getItem('Auth');
    config.headers.Auth =  auth;
    return config;
});
