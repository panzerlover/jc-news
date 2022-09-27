import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { getTopics } from '../utils/api';
import { upper } from '../utils/helpers';
import { NavDropdown } from 'react-bootstrap';

export default function HeaderBar(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [topics, setTopics] = useState([])

    useEffect(()=> {
        setLoading(true);
        getTopics()
        .then((res)=> {
            setTopics(res.topics);
            setLoading(false);
        }).catch((error)=> {
            setLoading(false);
            setError(true);
        })

    }, []);


return (
    <Navbar bg="light" variant="light" fixed="top">
        <Container>
        <Navbar.Brand href="/">JC News</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Articles</Nav.Link>
            <NavDropdown title="Topics" id="topic-dropdown">
                <NavDropdown.Item href="/topics">View All</NavDropdown.Item>
                <NavDropdown.Divider />
                {topics.map((topic)=> {
                    return <NavDropdown.Item key={topic.slug} href={`/articles/${topic.slug}`}>{upper(topic.slug)}</NavDropdown.Item>

                })}
            </NavDropdown>
            <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    )
}