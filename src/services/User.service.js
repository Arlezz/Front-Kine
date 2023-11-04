import { get, post, del } from '../utils/httpClient';



const getUser = (user) => {
    return get(API_URL + "");
}


const UserService = {
    getProfile,
};

export default UserService;