import axios from 'axios';

//import placeholder from '../placeholder.jpg';

const API = process.env.REACT_APP_API_URL;

/*function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}*/

export function get(url) {
    //console.log(API + url);
    return axios.get(API + url)
        .then(response => response.data);
}

/*export function getImg(url) {
    return fetch(API + url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return placeholder;
            }
        })
        .then(response => response.data)
        .catch(error => {
            return placeholder;
        });
}*/

export function post(url, data) {
    return axios.post(API + url, data)
        .then(response => response.data);
}

/*export function postImage(url, data) {
    return fetch(API + url, {
        method: 'POST',
        headers: authHeader(),
        body: data
    })
        .then(response => response.json());
}*/

export function put(url, data) {
    return axios.put(API + url, data)
        .then(response => response.data);

}

export function del(url) {
    return axios.delete(API + url)
        .then(response => response.data);
}