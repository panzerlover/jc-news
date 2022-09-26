import axios from "axios";

const api = axios.create({
    baseURL: 'https://joseph-craven-newsapp.herokuapp.com/api/'
});

export const getArticles= () => {
    return api.get('articles').then((res)=>  res.data);
};

export const getTopics = () => {
    return api.get('topics').then((res)=> res.data);
}

export const getArticlesByTopicSlug = (slug) => {
    return api.get('/articles', {params: {topic: slug}}).then(res => res.data);
}