import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {Container , Row, Col, Navbar} from 'react-bootstrap'

import { getArticlesWithParams } from "../utils/api";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./Spinner";
import FilterBar from "./FilterBar";
import SingleArticle from "./SingleArticle";
import ArticleModal from "./ArticleModal";
import SmallArticleCard from "./SmallArticleCard";
import PageBar from "./PageBar";

export default function ArticleList(){
    const {topic_slug} = useParams();
    const [searchParams, setSearchParams]= useSearchParams();
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
        const paramsObj = {}
        for (const [key, value] of searchParams){
            paramsObj[key] = value;
        }
        paramsObj.topic = topic_slug;
        paramsObj.limit = limit;
        paramsObj.p = page;
        if (paramsObj.sort_by === "comment_count"){
            paramsObj.limit = 999999999;
            paramsObj.sort_by = null;
            paramsObj.p = 1;
        }
        setLoading(true)
        getArticlesWithParams({params: paramsObj})
        .then(({articles, total_count})=> {
            setTotalCount(total_count);
            if (searchParams.get("sort_by") === "comment_count"){
                let sorted = [];
                if (searchParams.get("order") === "asc"){
                    sorted = articles.sort((a, b)=> a.comment_count > b.comment_count)
                } else {
                    sorted = articles.sort((a, b) => a.comment_count < b.comment_count)
                }
                let start = (page - 1)*limit;
                let end = page * limit;
                if (end > total_count){
                    setArticles(sorted.slice(start))
                }else {
                    setArticles(sorted.slice(start, end))
                }
            } else {
                setArticles(articles);
            }
            setLoading(false);
            setError(false);
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })

    }, [topic_slug, limit, setLimit, page, setPage, searchParams, setSearchParams])

    if (loading) return <LoadingSpinner loadingType="Articles"/>;
    if (error) return <ErrorPage />

    return (

    <Container>
        <FilterBar />
        <Container>
        <ArticleModal show={showModal} setShow={setShowModal}>
            <SingleArticle sentArticle={article}/>
        </ArticleModal>
        <Row xs={1} md={2} lg={3} className="g-4" style={{paddingTop: '50px'}}>
            {articles.map((article)=> {
                return (
                    <Col key={article.article_id}>
                        <SmallArticleCard article={article} handleShow={handleShow} />
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