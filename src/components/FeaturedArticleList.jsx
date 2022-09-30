import { Accordion, Button, Container } from "react-bootstrap"
import SmallArticleCard from "./SmallArticleCard"


export default function FeaturedArticleList({articles, title, handleShow, sort, order}){

    return (
        <Container>
        <Accordion.Header>
            <h3>
                {title}
            </h3>
        </Accordion.Header>
        <Accordion.Body>
            {articles.map((article)=> 
                <SmallArticleCard key={`top${article.article_id}`} article={article} handleShow={handleShow}/>
            )}
            <Button href={`/articles?sort_by=${sort}&order=${order}`}>
                See More {title}
            </Button>
        </Accordion.Body>
        </Container>
    )

}