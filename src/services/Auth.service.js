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

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const recoverPassword = (email) => {
    return post(`passwordRecovery?email=${email}`)
        .then((response) => {
            return response;
        });
};

const changePasswordWithCode = (email, passwordRecoveryCode, newPassword) => {
    return post(`updatePasswordWithCode`, {
            email,
            passwordRecoveryCode,
            newPassword
        })
        .then((response) => {
            return response;
        });
}

const AuthService = {
    register,
    login,
    logout,
    recoverPassword,
    changePasswordWithCode,
    getCurrentUser,
};

export default AuthService;