import axios from "axios";

const api = axios.create({
    baseURL: 'https://joseph-craven-newsapp.herokuapp.com/api/'
});

export const getArticles= () => {
    return api.get('/articles').then((res)=>  res.data);
};
    
