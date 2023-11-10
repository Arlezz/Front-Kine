import { post } from '../utils/httpClient';

const API_URL = process.env.REACT_APP_API_URL;


const login = (email, password) => {
    return post("signin", {
            email,
            password
        })
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response));
            return response;
        });
};

const register = (email, name, role) => {
    return post("signup", {
            email,
            name,
            role
        })
        .then((response) => {
            return response;
        });
};


const recovery = (email) => {
    return post(API_URL + "recover", {
            email
    });
}

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    recovery,
    logout,
    getCurrentUser,
};

export default AuthService;