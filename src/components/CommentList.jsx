import { useContext, useEffect, useState } from "react";
import { Card, Container} from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { getArticleComments, voteOnComment } from "../utils/api";
import DeleteButton from "./DeleteButton";
import ErrorPage from "./ErrorPage";
import PageBar from "./PageBar";
import LoadingSpinner from "./Spinner";
import VoteBar from "./VoteBar";


export default function CommentList({show, article_id, comments, setComments, pinnedComment}){

    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [vote, castVote] = useState({inc_votes: 0, voteId: null});
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [deletedComment, setDeletedComment] = useState(null);

    useEffect(()=> {
        setLoading(true);
        if (article_id !== undefined){
            getArticleComments(article_id, {params: {page: page, limit: limit}}).then(({comments, total_count})=> {
                setTotalCount(total_count);
                if (pinnedComment){
                    setComments([pinnedComment, ...comments])
                } else {
                    setComments(comments);
                }
                setLoading(false);
            }).catch((err)=> {
                setLoading(false);
                setError(true);
            })
        }
    },[article_id, show, setComments, page, limit, pinnedComment])

    useEffect(()=> {
        if (vote.inc_votes !== 0 && vote.voteId !== undefined){
            voteOnComment(vote.voteId, vote.inc_votes)
            .catch((error)=> {
                setError(true);
                voteOnComment(vote.voteId, -vote.inc_votes);
            })
        }
    }, [vote, castVote])
    
    if (!show) return <></>
    if (loading) return <LoadingSpinner loadingType="Comments"/>;
    if (error) return <ErrorPage />

    return (
        <Container>
            {comments.map((comment)=> 
                comment.comment_id !== deletedComment ? 
                <Card key={comment.comment_id}>
                    <Card.Body>
                        {comment.body}
                    </Card.Body>
                    <Card.Subtitle>
                        {(comment.author === user.username) ? "you" : comment.author}
                    </Card.Subtitle>
                    <Card.Footer>
                        {(comment.author === user.username) ? <DeleteButton commentId={comment.comment_id} setDeletedComment={setDeletedComment}/> : <></>}
                        <VoteBar votes={comment.votes} castVote={castVote} voteId={comment.comment_id}/>
                    </Card.Footer>
                </Card>    
                :
                <Card key={comment.comment_id}>
                    <Card.Body>
                        Comment Deleted
                    </Card.Body>
                </Card>
            )}
            <PageBar page={page} setPage={setPage} total_count={totalCount} limit={limit} setLimit={setLimit}/>
        </Container>
    )
}