import { useState, useEffect } from "react"
import { Accordion, Button } from "react-bootstrap";
import { getArticlesWithParams } from "../utils/api";
import SmallArticleCard from "./SmallArticleCard";
import ArticleModal from "./ArticleModal";
import SingleArticle from "./SingleArticle";

export default function HomePage(){

    const [topArticles, setTopArticles] = useState([]);
    const [newArticles, setNewArticles] = useState([]);
    const [article, setArticle] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        getArticlesWithParams({params: {limit: "3", sort_by: "votes", order: "desc"}})
        .then(({articles})=> {
            setTopArticles(articles)
        })
        getArticlesWithParams({params: {limit: "3", sort_by: "created_at", order: "desc"}})
        .then(({articles}) => {
            setNewArticles(articles)
        })
    },[])

    const handleShow = (event, article) => {
        setArticle(article);
        setShowModal(true);
    };

    return (
        <>
        <ArticleModal show={showModal} setShow={setShowModal}>
            <SingleArticle sentArticle={article}/>
        </ArticleModal>
        <Accordion flush alwaysOpen defaultActiveKey={["0", "1"]}>
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <h2>
                    Top Voted Articles
                </h2>
            </Accordion.Header>
            <Accordion.Body>
            {topArticles.map((article)=> 
                        <SmallArticleCard key={`top${article.article_id}`} article={article} handleShow={handleShow}/>
                        )}
                <Button>
                    See More Top Articles
                </Button>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>
        <h2> Newest Articles </h2>
            </Accordion.Header>
            <Accordion.Body>
                {newArticles.map((article)=> 
                <SmallArticleCard key={`new${article.article_id}`}article={article} handleShow={handleShow}/>
                )}
            <Button variant="primary">
                    See More New Articles
            </Button>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        </>
    )

}