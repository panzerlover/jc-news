import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Container , Row, Col, Navbar} from 'react-bootstrap'

import { getArticles, getArticlesWithParams } from "../utils/api";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./Spinner";
import FilterBar from "./FilterBar";
import SingleArticle from "./SingleArticle";
import ArticleModal from "./ArticleModal";
import SmallArticleCard from "./SmallArticleCard";
import PageBar from "./PageBar";

export default function ArticleList(){

    const {topic_slug} = useParams();
    // const [searchParams, setSearchParams]= useSearchParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [article, setArticle] = useState({});

    const handleShow = (event, article) => {
        setArticle(article);
        setShowModal(true);
    };

    useEffect(()=> {
        setLoading(true)
        getArticles().then((res) => {
            setTotalCount(res.total_count)
            setArticles(res.articles);
            setLoading(false);
        } 
        ).catch((err)=> {
            setLoading(false);
            setError(true);
        })
    }, [])

    useEffect(()=> {
        setLoading(true)
        getArticlesWithParams({topic: topic_slug})
        .then(({articles, total_count})=> {
            setTotalCount(total_count);
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
        <FilterBar />
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
        <Container fluid>

        <Navbar bg='light' variant='light' fixed="bottom" style={{zIndex: '50'}}>

        <PageBar page={page} setPage={setPage} total_count={totalCount} limit={limit} setLimit={setLimit}/>
        </Navbar>
        </Container>
    </Container>
)

}