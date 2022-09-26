import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Modal, Button } from "react-bootstrap";

import { getArticles } from "../utils/api";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import { dateDiff } from "../utils/helpers";
import ArticleModal from "./ArticleModal";

export default function ArticleList(){

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    const [show, setShow] = useState(false);
    const [article, setArticle] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (event, article) => {
        setArticle(article);
        setShow(true);
    };

    useEffect(()=> {
        setLoading(true);
        getArticles().then((res)=> {
            setArticles(res.articles);
            setLoading(false);
            setError(false);
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })
    }, [])

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />

    return (
        <div>
        <ListGroup variant="flush">
            {articles.map((article)=> {
                return (
                    <ListGroup.Item key={article.article_id} onClick={(event) => handleShow(event, article)}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {article.title}
                                </Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">author: {article.author} </small>
                                <small className="text-muted"> {dateDiff(article.created_at)} </small>
                                <small className="text-muted"> votes: {article.votes} </small>
                                <small className="text-muted"> {article.topic}</small>
                            </Card.Footer>
                        </Card>
                        
                    </ListGroup.Item>
                )
                
            })}
        </ListGroup>
        <ArticleModal show={show} setShow={setShow} article={article}/>
        </div>
    )

}