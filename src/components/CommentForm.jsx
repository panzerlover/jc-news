import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { commentOnArticle } from "../utils/api";
import ErrorPage from "./ErrorPage";

export default function CommentForm({show, article_id, setPinnedComment}){

    const user = useContext(UserContext);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [comment, setComment] = useState("");

    const validComment = (comment.trim().length !== 0);

    const handleSubmit = (e)  => {
        e.preventDefault()
        setSubmitting(true);
        if (validComment){
            const body = {
                username: user.username,
                body: comment
            };
            commentOnArticle(article_id, body)
            .then((res)=> {              
                setPinnedComment(res.comment);  
                setSubmitting(false);
                setComment("");
            })
            .catch((err)=> {
                setError(true);
                setSubmitting(false);
            })
        }
    }
    if (!show) return <></>
    if (error) return <ErrorPage />

    return (
            <Form disabled={submitting}>
                <Form.Group className="mb-3">
                    <Form.Control
                    id="commentTextArea" 
                    as="textarea"
                    placeholder="write your comment here"
                    onChange={(e)=> setComment(e.target.value)} value={comment}/>
                </Form.Group>
                <Button variant={validComment ? "primary" : "secondary"} type="submit" onClick={handleSubmit} disabled={!validComment}>
                    Post
                </Button>
            </Form>
    )

}