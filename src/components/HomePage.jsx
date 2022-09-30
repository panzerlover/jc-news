import { useState, useEffect } from "react"
import { Accordion, Button, Container} from "react-bootstrap";
import { getArticlesWithParams } from "../utils/api";
import ArticleModal from "./ArticleModal";
import SingleArticle from "./SingleArticle";
import FeaturedArticleList from "./FeaturedArticleList";

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
        <Container>
        <ArticleModal show={showModal} setShow={setShowModal}>
            <SingleArticle sentArticle={article}/>
        </ArticleModal>
        <Accordion flush alwaysOpen defaultActiveKey={["0", "1"]}>
            <Accordion.Item eventKey="0">
                <FeaturedArticleList articles={topArticles} title="Top Articles" handleShow={handleShow} sort="votes" order="desc"/>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <FeaturedArticleList articles={newArticles} title="New Articles" handleShow={handleShow} sort="created_at" order="asc"/>
            </Accordion.Item>
        </Accordion>
        <Container style={{marginTop: "10px"}}>
            <Button href="/articles">View All Articles</Button>
        </Container>
        <Container style={{marginTop: "10px"}}>
            <Button href="/topics">View All Topics</Button>
        </Container>
        </Container>
    )

}