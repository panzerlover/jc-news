import { useEffect, useState } from "react";
import { Card, Container, Row} from "react-bootstrap";
import { getArticleComments } from "../utils/api";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./Spinner";
import VoteBar from "./VoteBar";


export default function CommentList({show, article_id}){

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(()=> {
        setLoading(true);
        if (article_id !== undefined){
            
            getArticleComments(article_id).then(({comments})=> {
                setComments(comments);
                setLoading(false);
            }).catch((err)=> {
                setLoading(false);
                setError(true);
            })
        }
    },[article_id, show])
    
    if (!show) return <></>
    if (loading) return <LoadingSpinner loadingType="Comments"/>;
    if (error) return <ErrorPage />

    return (
        <Container className="wrapper">
            
            {comments.map((comment)=> {
                return (
                    <Row key={comment.comment_id} style={{padding: "0.2rem 0rem"}}>
                        <Card>
                        <Card.Text className="comment-text">
                        {comment.body}
                        </Card.Text>
                        <Card.Subtitle>
                        {comment.author}
                        </Card.Subtitle>
                        <Card.Footer style={{padding: '0px'}}>
                        <VoteBar votes={comment.votes}/>
                        </Card.Footer>
                        </Card>
                </Row> 
                )
            })}
        </Container>
    )
}