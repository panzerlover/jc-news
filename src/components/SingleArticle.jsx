import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Badge, Container, Row, Col } from "react-bootstrap";

import { getSingleArticle, voteOnArticle } from "../utils/api";
import { dateDiff } from "../utils/helpers";
import LoadingSpinner from "./Spinner";
import ErrorPage from "./ErrorPage";
import VoteBar from "./VoteBar";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function SingleArticle({sentArticle}) {

    const {article_id} = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [article, setArticle] = useState({});
    const [vote, castVote] = useState({inc_votes: 0, voteId: article.article_id});
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false);
    const [makingComment, setMakingComment] = useState(false);
    const [pinnedComment, setPinnedComment] = useState(null);
   
    useEffect(()=> {
        if (!sentArticle){
            setLoading(true);
            getSingleArticle(article_id)
            .then((res)=> {
                setArticle(res.article);
                setLoading(false);
            }).catch((err)=> {
                setLoading(false);
                setError(err);
            })
        } else {
            setArticle(sentArticle)
        }
    }, [article_id, sentArticle])

    useEffect(()=> {
        if (vote.inc_votes !== 0){
            voteOnArticle(vote.voteId, vote.inc_votes)
            .catch((error)=> {
                setError(true);
                voteOnArticle(vote.voteId, -vote.inc_votes);
            })
        }
    }, [vote, castVote])

    const commentClick = () => {
        setShowComments((old)=> {
            if (old === true){
                setMakingComment(false);
            }
            return !old;
        })
    }

    const makeCommentClick = () => {
        setMakingComment((old)=> {
            return !old;
        })
    }
    if (loading) return <LoadingSpinner loadingType="Article"/>;
    if (error) return <ErrorPage error={error} type={"article"}/>;

    return (
            <Container className="article-wrapper">
                <Row className="article header">
                    <h1>
                    {article.title}
                    </h1>
                </Row>
                <Row className="article">
                    <Col>
                    <small className="text-muted">{article.author} </small>
                    <small className="text-muted"> {dateDiff(article.created_at)} </small>
                    <small className="text-muted"> {article.topic}</small>
                    </Col>
                </Row>
                <Row className="article body">
                    {showComments ? 
                    <p style={{height: '4rem', overflow: 'scroll'}}>{article.body}</p>
                    :
                    <p>{article.body}</p>
                     }
                </Row>
                    {sentArticle ? 
                    <Button variant="link" href={`/article/${article.article_id}`}>View As Page</Button>
                    : <></>}
                <Row>
                <VoteBar votes={article.votes} castVote={castVote} voteId={article.article_id}/>
                </Row>
                <Button variant="primary" onClick={commentClick}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                    {showComments ? <></> : <Badge bg="primary" pill>{article.comment_count}</Badge>}
                </Button>
                {showComments ? 
                    <Button variant="primary" onClick={makeCommentClick}>
                        {makingComment ? 'Cancel' : 'Leave Comment'}
                    </Button>
                : <></>
                }
                <CommentForm show={makingComment} article_id={article.article_id} setComments={setComments} setPinnedComment={setPinnedComment} />
                <CommentList show={showComments} article_id={article.article_id} comments={comments} setComments={setComments} pinnedComment={pinnedComment}/>
            </Container>
    )


}