import axios from 'axios';

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.accessToken) {
        return { 'authorization': "Bearer "+user.accessToken };
    } else {
        return {};
    }
}

const API = process.env.REACT_APP_API_URL;

export function get(url) {
    return axios.get(API + url, { headers: authHeader() })
        .then(response => response.data);
}

export function post(url, data) {
    return axios.post(API + url, data, { headers: authHeader() })
        .then(response => response.data);
}

export function put(url, data) {
    return axios.put(API + url, data, { headers: authHeader() })
        .then(response => response.data);
}

export function del(url) {
    return axios.delete(API + url, { headers: authHeader() })
        .then(response => response.data);
}