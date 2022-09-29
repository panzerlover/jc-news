import { useContext } from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'

import { dateDiff } from '../utils/helpers';

export default function SmallArticleCard({article, handleShow}){

    const user = useContext(UserContext);

 return (
    <Card>
        <Card.Body>
            <Card.Title>
                {article.title}
            </Card.Title>
            <Card.Subtitle>
            <a href={`/articles/${article.topic}`}>#{article.topic}</a>
            </Card.Subtitle>
            <Card.Text>
                <small className="text-muted">
                {article.body.substring(0, 70)}...
                </small>
            </Card.Text>
        </Card.Body>
        <Button variant="link" onClick={(event) => handleShow(event, article)}>Read Full Article</Button>
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
 )

}