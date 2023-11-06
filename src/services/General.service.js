import { get, post } from '../utils/httpClient';


const searchTutorial = (tutorialName) => {
    return get(`/search/tutorial?query=${tutorialName}`);
}

const searchCapsule = (capsuleName) => {
    return get(`/search/capsule?query=${capsuleName}`);
}

const searchGame = (gameName) => {
    return get(`/search/game/?query=${gameName}`);
}

const getPosts = (type,order,pageNumber,batch) => {
    return get(`posts?sortType=${type}&sortDirection=${order}&pageNumber=${pageNumber}&pageSize=${batch}`);
}

const getPostsComments = (idPost) => {
    return get(`posts/${idPost}/comments`);
}

const uploadPost = (email,title,content) => {
    return post("posts", {
        email,
        title,
        content
    }).then((response) => {
        return response;
    });
}

const likeComment = (userName) => {
    return post("/comment/like", {
        userName
    });
}

const dislikeComment = (userName) => {
    return post("/comment/dislike", {
        userName
    });
}

const getLike = (page) => {
    return get(`/comment/like?page=${page}`);
}

/*const isFollowing = (streamerName) => {
    return get(`/stream/following/${streamerName}`);
}*/

const GeneralService = {
    searchTutorial,
    searchCapsule,
    searchGame,

    uploadPost,
    likeComment,
    dislikeComment,
    
    getLike,
    getPosts,
    getPostsComments,
    //isFollowingq
};

export default GeneralService;