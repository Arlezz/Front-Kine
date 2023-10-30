import { get, post, del } from '../utils/httpClient';

const API_URL = "/user";

const getProfile = () => {
    return get(API_URL + "/profile");
}


const UserService = {
    getProfile,
};

export default UserService;