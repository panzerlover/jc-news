import { useEffect, useState, useContext } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { getArticles } from "../utils/api";
import { dateDiff } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import ArticleModal from "./ArticleModal";
import SingleArticle from "./SingleArticle";
import FilterBar from "./FilterBar";

export default function ArticleList(){

    const user = useContext(UserContext)
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
                    <Card onClick={(event) => handleShow(event, article)}>
                        <Card.Body>
                            <Card.Title>
                                {article.title}
                            </Card.Title>
                            <Card.Subtitle>
                            <small href={`/articles/${article.topic}`}>#{article.topic}</small>
                            </Card.Subtitle>
                            <Card.Text>
                                <small className="text-muted">
                                {article.body.substring(0, 70)}...
                                </small>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                            <Col>
                            <small className="text-muted">{(article.author === user.username) ? "you" : article.author}</small>
                            </Col>
                            <Col>
                            <small className="text-muted">{dateDiff(article.created_at)} </small>
                            </Col>
                            <Col>
                            <small className="text-muted">&#8593;&#8595; {article.votes} </small>
                            </Col>
                            </Row>
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