import { useEffect, useState } from "react"
import { Button, ButtonGroup, DropdownButton } from "react-bootstrap";
import { deleteComment } from "../utils/api";

export default function DeleteButton ({commentId, setDeletedComment}){

    const [timesClicked, setTimesClick] = useState(0);

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
                setDeletedComment(commentId)
            }).catch((error)=> {
                console.error(error);
            })
        }

    },[timesClicked])

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