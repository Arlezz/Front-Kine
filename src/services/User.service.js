import { del, put } from '../utils/httpClient';


const updateUserName = (email,name) => {
    return put(`users/update/${email}`,{
        name
    }).then((response) => {
        return response;
    });
}

const updateUserPassword = (email,oldPassword,password) => {
    return put(`users/${email}`,{
        oldPassword,
        password
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
    updateUserPassword,
    deleteUser
};

export default UserService;