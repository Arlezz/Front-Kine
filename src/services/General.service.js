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

const getTutorials = () => {
    return get("tutorials");
}

const getCapsules = () => {
    return get("capsules");
}

const getGames = () => {
    return get("games");
}


const getPosts = (type,order,pageNumber,batch) => {
    return get(`posts?sortType=${type}&sortDirection=${order}&pageNumber=${pageNumber}&pageSize=${batch}`);
}

const getPostsComments = (idPost) => {
    return get(`posts/${idPost}/comments`)
    .then((response) => {
        return response;
    });
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

const uploadComment = (postId,email,content,inResponse) => {
    return post(`comments`, {
        postId,
        email,
        content
    }).then((response) => {
        return response;
    });
}

const responseComment = (postId,email,content,inResponse) => {
    return post(`comments?inResponse=${inResponse}`, {
        postId,
        email,
        content
    }).then((response) => {
        return response;
    });
}

const likePosts = (postId,email) => {
    return post("posts/like", {
        postId,
        email
    }).then((response) => {
        return response;
    });
}

const likeComments = (commentId,email) => {
    return post("comments/like", {
        commentId,
        email
    }).then((response) => {
        return response;
    });
}

const dislikePosts = (postId,email) => {
    return post("posts/dislike", {
        postId,
        email
    }).then((response) => {
        return response;
    });
}

const dislikeComments = (commentId,email) => {
    return post("comments/dislike", {
        commentId,
        email
    }).then((response) => {
        return response;
    });
}


const hasLikedPost = (postId,email) => {
    return get(`posts/${postId}/hasLiked?email=${email}`).then((response) => {
        return response;
    });
}

const hasLikedComments = (commentId,email) => {
    return get(`comments/${commentId}/hasLiked?email=${email}`).then((response) => {
        return response;
    });
}

const getAlumnos = () => {
    return get("users/roles/estudiante");
}

const getProfesores = () => {
    return get("users/roles/profesor");
}



const GeneralService = {
    searchTutorial,
    searchCapsule,
    searchGame,

    getTutorials,
    getCapsules,
    getGames,
    getAlumnos,
    getProfesores,
    getPosts,
    getPostsComments,

    uploadPost,
    uploadComment,
    responseComment,
    likePosts,
    likeComments,
    dislikePosts,
    dislikeComments,
    
    hasLikedPost,
    hasLikedComments,
    
};

export default GeneralService;