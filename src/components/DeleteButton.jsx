import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { deleteComment } from "../utils/api";

export default function DeleteButton ({commentId, setDeletedComment, setComments}){

    const [timesClicked, setTimesClick] = useState(0);
    const [error, setError] = useState(null);

    const handleClick= () => {
        setTimesClick((old)=> old + 1);
    }

    const handleReset = () => {
        setTimesClick(0);
    }

    useEffect(()=> {
        if (timesClicked === 2){
            deleteComment(commentId).then(()=> {
                setTimesClick(0);
                setDeletedComment((previous)=> {
                    if (null !== previous){
                        setComments((old)=> {
                            const newComments = [];
                            old.forEach(comment => {
                                if (comment.comment_id !== previous) newComments.push(comment)
                            })
                            return newComments;
                        })
                    }
                    return commentId})
            }).catch((error)=> {
                setError(true);
            })
        }

    },[timesClicked, commentId, setComments, setDeletedComment])

    if (error) return <Button disabled>Something went Wrong</Button>

    if (timesClicked === 0) return <Button onClick={handleClick}>Delete Comment</Button>
    if (timesClicked === 1) return (
        <>
        <p>Are you Sure?</p>
            <Button onClick={handleClick}>Yes</Button>
            <Button onClick={handleReset}>Cancel</Button>
        </>
    )
    if (timesClicked === 2) return (
        <p>Deleting...</p>
    )

}