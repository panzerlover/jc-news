import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Badge, Container, Row, Col } from "react-bootstrap";

import { getSingleArticle, voteOnArticle } from "../utils/api";
import { dateDiff } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import VoteBar from "./VoteBar";

export default function SingleArticle({sentArticle}) {

    const {article_id} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [article, setArticle] = useState({});
    const [vote, castVote] = useState(0);

    useEffect(()=> {
        if (!sentArticle){
            setLoading(true);
            getSingleArticle(article_id)
            .then((res)=> {
                setArticle(res.article);
                setLoading(false);
            }).catch((err)=> {
                setLoading(false);
                setError(true);
            })
        } else {
            setArticle(sentArticle)
        }
    }, [article_id, sentArticle])

    useEffect(()=> {
        if (vote !== 0){
            voteOnArticle(article.article_id, vote)
            .catch((error)=> {
                setError(true);
                voteOnArticle(article.article_id, -vote);
            })
        }
    }, [vote, castVote, article.article_id])


    if (loading) return <LoadingSpinner loadingType="Article"/>;
    if (error) return <ErrorPage />;

    return (
            <Container>
                <Row style={{padding: '1.5rem 0.2rem 0'}}>
                    <h1>
                    {article.title}
                    </h1>
                </Row>
                <Row style={{padding: '0.5rem 0.2rem'}}>
                    <Col>
                    <small className="text-muted">{article.author} </small>
                    <small className="text-muted"> {dateDiff(article.created_at)} </small>
                    <small className="text-muted"> {article.topic}</small>
                    </Col>
                </Row>
                <Row style={{padding: '0 0.2rem', textAlign: 'left'}}>
                    <p>{article.body}</p>
                </Row>
                    {sentArticle ? 
                    <Button variant="link" href={`/article/${article.article_id}`}>View As Page</Button>
                    : <></>}
                <VoteBar votes={article.votes} castVote={castVote}/>
                <Button variant="primary" >
                    View Comments {<Badge bg="primary" pill>{article.comment_count}</Badge>}
                </Button>
            </Container>
    )


}