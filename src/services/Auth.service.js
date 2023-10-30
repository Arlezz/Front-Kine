import { post } from '../utils/httpClient';

const API_URL = "/auth/";

const register = (userName, userEmail, userRut) => {
    return post(API_URL + "signup", {
        userName,
        userEmail,
        userRut
    });
};

const login = (userEmail, userPassword) => {
    return post(API_URL + "signin", {
            userEmail,
            userPassword
        })
        .then((response) => {
            if (response.accessToken) {
                localStorage.setItem("user", JSON.stringify(response));
            }
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