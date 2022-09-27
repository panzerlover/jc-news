import { useState } from "react";
import { ButtonGroup, Button, Row, Col } from "react-bootstrap";

export default function VoteBar({votes, castVote}){

    const [vote, setVote] = useState(0); 

    const makeVote = (e) => {
        const voteAsNum = parseInt(e.target.value);
        setVote(() =>{
            return voteAsNum;
        })
        castVote(voteAsNum);
    }

    return (
        <Row style={{padding: '0.2rem'}}>
        <Col className="m-auto">
        Votes: {votes + vote}
        </Col>
        <Col>
        <ButtonGroup>
            <Button variant="success" value="1" onClick={makeVote}>&#8593;</Button>
            <Button variant="danger" value="-1" onClick={makeVote}>&#8595;</Button>
        </ButtonGroup>
        </Col>
        </Row>
    )

}