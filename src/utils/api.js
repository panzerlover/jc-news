import axios from "axios";

const api = axios.create({
    baseURL: 'https://joseph-craven-newsapp.herokuapp.com/api/'
});

// export const getArticles= () => {
//     return api.get('articles').then((res)=>  res.data);
// };

export const getArticles = (slug) => {
    return api.get('/articles', {params: {topic: slug}}).then(res => res.data);
}

export const getSingleArticle = (id) => {
    return api.get(`/articles/${id}`).then(res=> res.data);
}

export const voteOnArticle = (id, vote) => {
    return api.patch(`/articles/${id}`, {inc_votes: vote})
    .then(res => res.data);
}

export const getTopics = () => {
    return api.get('topics').then((res)=> res.data);
}