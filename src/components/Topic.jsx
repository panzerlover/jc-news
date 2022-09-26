import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import { getArticlesByTopicSlug } from "../utils/api";
import {upper} from "../utils/helpers"; 
import { Accordion, Badge, Card, ListGroup } from "react-bootstrap";
import AccordionItem from 'react-bootstrap/esm/AccordionItem';


export default function Topic (){
    
    const {topic_slug} = useParams()
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(()=> {
        setLoading(true);
        getArticlesByTopicSlug(topic_slug)
        .then(res => {
            setArticles(res.articles);
            setLoading(false);
        }).catch((err)=> {
            console.error(err);
            setLoading(false);
            setError(true);
        })

    }, [topic_slug])
    

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />

    return (
        <div className="container">
        <h1>Articles Related to {upper(topic_slug)}:</h1>
        <ListGroup>
            {articles.map(article => {
                return (
                    <ListGroup.Item key={article.article_id}>{article.title}</ListGroup.Item>
                )
            })}
        </ListGroup>
        </div>
    )

}