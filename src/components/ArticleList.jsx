import { useEffect, useState } from "react";
import { Row, Col, Card, Container, Button, Badge } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

import { getArticles, getArticlesByTopicSlug } from "../utils/api";
import { upper } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";
import { dateDiff } from "../utils/helpers";
import ArticleModal from "./ArticleModal";

export default function ArticleList(){

    const {topic_slug} = useParams(); 
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

    useEffect(()=> {
        setLoading(true)
        getArticlesByTopicSlug(topic_slug)
        .then((res) =>{
            setArticles(res.articles);
            setLoading(false);
            setError(false);
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })

    }, [topic_slug])

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />

    return (
        <Container>

        {topic_slug ? 
        <Container>
            <h3>
            {"Filters: "}
        <Badge>
            {upper(topic_slug)} 
        </Badge>
            </h3>
        </Container>
        : <></>
        }
        <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
            {articles.map((article)=> {
                return (
                    <Col key={article.article_id}>
                    <Card >
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
                    </Col>
                )
                
            })}
        </Row>
        </Container>
        </Container>
    )

}