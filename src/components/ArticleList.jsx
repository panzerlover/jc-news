import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Container , Row, Col} from 'react-bootstrap'

import { getArticles, getArticlesWithParams } from "../utils/api";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./Spinner";
import FilterBars from "./FilterBars";
import SingleArticle from "./SingleArticle";
import ArticleModal from "./ArticleModal";
import SmallArticleCard from "./SmallArticleCard";

export default function ArticleList(){

    const {topic_slug} = useParams();
    // const [searchParams, setSearchParams]= useSearchParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [article, setArticle] = useState({});

    const handleShow = (event, article) => {
        setArticle(article);
        setShowModal(true);
    };

    useEffect(()=> {
        setLoading(true)
        getArticles().then((res) => {
            setArticles(res.articles);
            setLoading(false);
        } 
        )
    }, [])

    useEffect(()=> {
        setLoading(true)
        getArticlesWithParams({topic: topic_slug})
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

    const listStyle = (topic_slug === undefined) ? {paddingTop: '0px'} : {paddingTop: '50px'};

    return (

    <Container>
            <FilterBars />
        <Container>
        <ArticleModal show={showModal} setShow={setShowModal}>
            <SingleArticle sentArticle={article}/>
        </ArticleModal>
        <Row xs={1} md={2} lg={3} className="g-4" style={listStyle}>
            {articles.map((article)=> {
                return (
                    <Col key={article.article_id}>
                        <SmallArticleCard article={article} handleShow={handleShow}/>
                    </Col>
                )
            })}
        </Row>
        </Container>
    </Container>
)

}