import { get, post, del } from '../utils/httpClient';


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

const deleteTutorial = (id,email) => {
    return del(`tutorials/${id}/${email}`);
}

const getCapsules = () => {
    return get("capsules");
}

const deleteCapsule = (id,email) => {
    return del(`capsules/${id}/${email}`);
}

const getGames = () => {
    return get("games");
}

const deleteGame = (id,email) => {
    return del(`games/${id}/${email}`);
}


const getPosts = (type,order,pageNumber,batch,email) => {
    console.log(`posts?sortType=${type}&sortDirection=${order}&pageNumber=${pageNumber}&pageSize=${batch}&email=${email}`);
    return get(`posts?sortType=${type}&sortDirection=${order}&pageNumber=${pageNumber}&pageSize=${batch}&email=${email}`);
}

const getAllPosts = () => {
    return get(`posts`);
}

const delPost = (id,email) => {
    return del(`posts/${id}/${email}`);
}

const getComements = () => {
    return get("comments");
}

const delComment = (id,email) => {
    return del(`comments/${id}/${email}`);
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

const likeComments = (commentId, postId,email) => {
    return post("comments/like", {
        commentId,
        postId,
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

const uploadTutorials = (email,url) => {
    return post("tutorials", {
        email,
        url,
    }).then((response) => {
        return response;
    });
}

const uploadCapsules = (email,url) => {
    return post("capsules", {
        email,
        url,
    }).then((response) => {
        return response;
    });
}

const uploadGames = (email,url,title,description) => {
    return post("games", {
        email,
        url,
        title,
        description
    }).then((response) => {
        return response;
    });
}

const getHistorial = () => {
    return get("history");
}

const searchContent = (contentName) => {
    return get(`browse?q=${contentName}`);
}

const getMiTutorials = (email) => {
    return get(`tutorials/${email}`);
}

const getMiCapsules = (email) => {
    return get(`capsules/${email}`);
}

const getMiGames = (email) => {
    return get(`games/${email}`);
}



const GeneralService = {
    searchTutorial,
    searchCapsule,
    searchContent,
    searchGame,

    uploadTutorials,
    uploadCapsules,
    uploadGames,
    uploadPost,
    uploadComment,

    getTutorials,
    getCapsules,
    getGames,
    getAlumnos,
    getProfesores,
    getPosts,
    getAllPosts,
    getComements,
    getPostsComments,
    getHistorial,
    getMiTutorials,
    getMiCapsules,
    getMiGames,

    deleteTutorial,
    deleteCapsule,
    deleteGame,
    delComment,
    delPost,

    responseComment,
    likePosts,
    likeComments,
    dislikePosts,
    dislikeComments,
    hasLikedPost,
    hasLikedComments,
    
};

export default GeneralService;