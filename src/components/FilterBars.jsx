import { Button, Container, Col, Navbar, ButtonGroup } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { upper } from "../utils/helpers";

export default function FilterBars () {

    const {topic_slug} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleClick(){

    }

    const topBarVisible = (topic_slug === undefined);

    return (
        <>
        <Navbar bg='light' variant='light' fixed="top" style={{top: '50px', zIndex: '50'}} className={(topBarVisible ? "d-none" : "d-block")}>        
        <Container>
            <Col key={topic_slug}>
            <ButtonGroup>
            <Button>
                {upper(topic_slug)}
            </Button>
            <Button value={topic_slug} onClick={handleClick}>
                X
            </Button>
            </ButtonGroup>
            </Col>
        </Container>
        </Navbar>
        <Navbar>
        <Container>
            
        </Container>
        </Navbar>
        </>
    )


}