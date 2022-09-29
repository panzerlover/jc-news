import { Button, Container, Col, Navbar, ButtonGroup, Accordion, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { upper } from "../utils/helpers";

export default function FilterBar () {

    const {topic_slug} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleClick(){

    }

    const topBarVisible = (topic_slug === undefined);

    return (
        <Navbar bg="light" variant="light" fixed="top" style={{top: '50px', zIndex: '50', width: "100%"}} >
        <Accordion defaultActiveKey="-1">
            <Accordion.Item>
                <Accordion.Header eventKey="0">
                </Accordion.Header>
                <Accordion.Body>
                    dajskldaf;jsldj
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </Navbar>
    )


}