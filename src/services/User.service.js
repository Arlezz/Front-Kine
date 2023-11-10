import { get, post, del, put } from '../utils/httpClient';


const updateUserName = (email,name) => {
    return put(`users/update/${email}`,{
        name
    }).then((response) => {
        return response;
    });
}

const deleteUser = (email) => {
    return del(`users/${email}`)
    .then((response) => {
        return response;
    });
}


const UserService = {
    updateUserName,
    deleteUser
};

export default UserService;