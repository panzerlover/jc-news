import axios from "axios";

const api = axios.create({
    baseURL: 'https://joseph-craven-newsapp.herokuapp.com/api/'
});

export const getArticles = () => {
    return api.get('/articles').then(res => res.data);
}

export const getArticlesWithParams = (params) => {
    return api.get('/articles', params).then(res => res.data);
}

export const getArticleComments = (id, params) => {
    return api.get(`/articles/${id}/comments`, params).then(res => res.data);
}

export const getSingleArticle = (id) => {
    return api.get(`/articles/${id}`).then(res=> res.data);
}

export const voteOnArticle = (id, vote) => {
    return api.patch(`/articles/${id}`, {inc_votes: vote})
    .then(res => res.data);
}

export const commentOnArticle = (id, body) => {
    return api.post(`/articles/${id}/comments`, body)
    .then(res => res.data);
}

export const voteOnComment = (id, vote) => {
    return api.patch(`/comments/${id}`, {inc_votes: vote})
    .then(res=> res.data);
}

export const deleteComment = (id) => {
    return api.delete(`/comments/${id}`).then(()=> "delete successful");

}

export const getTopics = () => {
    return api.get('topics').then((res)=> res.data);
}