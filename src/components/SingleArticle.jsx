import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";

import { getSingleArticle } from "../utils/api";
import { dateDiff } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";

export default function SingleArticle() {

    const {article_id} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [article, setArticle] = useState({});

    useEffect(()=> {
        setLoading(true);
        getSingleArticle(article_id)
        .then((res)=> {
            setArticle(res.article);
            setLoading(false);

        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })


    }, [article_id])

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />;

    return (
            <Card>
                <Card.Header>
                <Card.Title>
                    <h2>
                    {article.title}
                    </h2>
                </Card.Title>
                <Card.Subtitle>
                    <small className="text-muted">{article.author} </small>
                    <small className="text-muted"> {dateDiff(article.created_at)} </small>
                    <small className="text-muted"> votes: {article.votes} </small>
                    <small className="text-muted"> {article.topic}</small>
                </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <p>{article.body}</p>
                </Card.Body>
                <Button variant="primary" >
                    View Comments {<Badge bg="primary" pill>{article.comment_count}</Badge>}
                </Button>
            </Card>
    )


}