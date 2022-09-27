import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";

import { getSingleArticle, voteOnArticle } from "../utils/api";
import { dateDiff } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import VoteBar from "./VoteBar";

export default function SingleArticle() {

    const {article_id} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [article, setArticle] = useState({});
    const [vote, castVote] = useState(0);

    useEffect(()=> {
        setLoading(true);
        getSingleArticle(article_id)
        .then((res)=> {
            setArticle(res.article);
            setLoading(false);
        }).catch((err)=> {
            setLoading(false);
            setError(true);
        })
    }, [article_id])

    useEffect(()=> {
        if (vote !== 0){

            voteOnArticle(article_id, vote)
            .then((res)=> {
                setArticle((article)=> {
                    const newArticle = {...article};
                    newArticle.votes = res.article.votes;
                    return newArticle;
                });
                console.log("voting successful! vote:", vote)
            })
            .catch((error)=> {
                console.error(error);
            })
        }
    }, [castVote])


    if (loading) return <LoadingSpinner loadingType="Article"/>;
    if (error) return <ErrorPage />;

    return (
            <Card>
                <Card.Header>
                <Card.Title>
                    <h2>
                    {article.title}
                    </h2>
                </Card.Title>
                <Card.Subtitle>
                    <small className="text-muted">{article.author} </small>
                    <small className="text-muted"> {dateDiff(article.created_at)} </small>
                    <small className="text-muted"> {article.topic}</small>
                </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <p>{article.body}</p>
                </Card.Body>
                <VoteBar votes={article.votes} castVote={castVote}/>
                <Button variant="primary" >
                    View Comments {<Badge bg="primary" pill>{article.comment_count}</Badge>}
                </Button>
            </Card>
    )


}