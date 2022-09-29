import { useState, useEffect, useContext } from 'react';
import { useRouteError, useSearchParams } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas, Form, Button} from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

import { getTopics } from '../utils/api';
import { upper } from '../utils/helpers';

export default function HeaderBar({filters, setFilters}){

    const user = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [topics, setTopics] = useState([])
    useEffect(()=> {
        getTopics()
        .then((res)=> {
            setTopics(res.topics);
        })
    }, []);

    const handleChange = (event, type) => {
        setFilters((old)=> {
            const newFilter = {...old};
            newFilter[type] = event.target.value;
            return newFilter;
        })
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        setSearchParams(filters)
    }

return (
    
        <Navbar bg="light" variant="light" fixed="top" style={{zIndex: '100'}}>
        <Container>

        <Navbar.Brand href="/">JC News</Navbar.Brand>
            <Nav>
        <Navbar.Text >
            <small style={{textDecoration: 'underline'}}>
                {user.username}
                </small>
        </Navbar.Text>
        <Nav.Link href="/articles">Articles</Nav.Link>
        <Nav.Link href="/topics">Topics</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    );
}