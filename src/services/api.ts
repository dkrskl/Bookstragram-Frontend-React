import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:1453',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(function (response) {
    return {...response, ...response.data};
});
