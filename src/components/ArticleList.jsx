import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import { getArticles } from "../utils/api";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";

export default function ArticleList(){

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(()=> {
        setLoading(true);
        getArticles().then((res)=> {
            setArticles(res.articles);
            setLoading(false);
            setError(false);
        }).catch((err)=> {
            console.error(err);
            setLoading(false);
            setError(true);
        })
    }, [])

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />

    return (
        <ListGroup variant="flush">
            {articles.map((article)=> {
                return (
                    <ListGroup.Item key={article.article_id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {article.title}
                                </Card.Title>
                                <Card.Text>
                                <small className="text-muted">author: {article.author} </small>
                                <small className="text-muted">created at: {article.created_at} </small>
                                <small className="text-muted">votes: {article.votes} </small>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{article.topic}</small>

                            </Card.Footer>
                        </Card>

                    </ListGroup.Item>
                )

            })}
        </ListGroup>
    )

}