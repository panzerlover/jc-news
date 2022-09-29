import { useEffect, useState } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getArticles } from "../utils/api";
import { dateDiff } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import ArticleModal from "./ArticleModal";
import SingleArticle from "./SingleArticle";
import FilterBar from "./FilterBar";

export default function ArticleList(){

    const {topic_slug} = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filters, setFilters] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [article, setArticle] = useState({});

    const handleShow = (event, article) => {
        setArticle(article);
        setShowModal(true);
    };

    useEffect(()=> {
        setFilters((old)=> {
            if (!old.includes(topic_slug) && topic_slug !== undefined){
                old.push(topic_slug)
            } 
            return old;
        })
        setLoading(true)
        getArticles(topic_slug)
        .then(({articles})=> {
            setArticles(articles);
            setLoading(false);
            setError(false);
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })

    }, [topic_slug])

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />

    const listStyle = (filters.length === 0) ? {paddingTop: '0px'} : {paddingTop: '50px'};

    return (
        <Container>
            <FilterBar filters={filters} setFilters={setFilters}/>
        <Container>
        <ArticleModal show={showModal} setShow={setShowModal}>
            <SingleArticle sentArticle={article}/>
        </ArticleModal>
        <Row xs={1} md={2} lg={3} className="g-4" style={listStyle}>
            {articles.map((article)=> {
                return (
                    <Col key={article.article_id}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {article.title}
                            </Card.Title>
                            <Card.Text>
                            <small className="text-muted">author: {article.author} </small>
                            <small className="text-muted">{dateDiff(article.created_at)} </small>
                            <small className="text-muted">votes: {article.votes} </small>
                            </Card.Text>
                        </Card.Body>
                            <Button type="primary" onClick={(event) => handleShow(event, article)}>Read</Button>
                        <Card.Footer>
                            <small className="text-muted">{article.topic}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                )
            })}
        </Row>
        <Row>

        </Row>
        </Container>
        {/* <BottomBar filters={[topic_slug]} displaying={pageData}></BottomBar> */}
        </Container>
    )

}