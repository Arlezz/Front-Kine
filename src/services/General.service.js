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

const uploadComment = (commentText) => {
    return post("/comment/create", {
        commentText
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

    uploadComment,
    likeComment,
    dislikeComment,
    
    getLike,
    //isFollowingq
};

export default GeneralService;