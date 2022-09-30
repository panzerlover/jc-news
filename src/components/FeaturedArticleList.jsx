import { Accordion, Button, Container, Row } from "react-bootstrap"
import ErrorPage from "./ErrorPage"
import SmallArticleCard from "./SmallArticleCard"


export default function FeaturedArticleList({articles, title, handleShow, sort, order}){

    if (!articles || !title || !handleShow || !sort || !order) return <ErrorPage />

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
              <Row style={{marginTop: '10px'}}>
                <Button href={`/articles?sort_by=${sort}&order=${order}`}>
                    See More {title}
                </Button>
            </Row>
        </Accordion.Body>
        </Container>
    )

}