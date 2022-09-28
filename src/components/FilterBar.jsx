import { Button, Container, Col, Navbar, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { upper } from "../utils/helpers";

export default function FilterBar ({filters, setFilters}) {

    const navigate = useNavigate();
    if (filters.length === 0) {
        return <></>
    }

    const handleClick = (event) => {
        setFilters((old)=> {
            const newFilters = [];
            for (let key of old){
                if (key !== event.target.value)
                newFilters.push(key);
            }
            return newFilters;
        })
        navigate("/");
    }

    return (
        <Navbar bg='light' variant='light' fixed="top" style={{top: '50px', zIndex: '50'}}>
        <Container>
            {filters.map(filter => {
                        return (
                    <Col key={filter}>
                    <ButtonGroup>
                    <Button>
                        {upper(filter)}
                    </Button>
                    <Button value={filter} onClick={handleClick}>
                        X
                    </Button>
                    </ButtonGroup>
                    </Col>
                    )
                })}
        </Container>
        </Navbar>
    )


}