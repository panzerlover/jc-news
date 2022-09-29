import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

import { getTopics } from '../utils/api';
import { upper } from '../utils/helpers';

export default function HeaderBar(){
    const [topics, setTopics] = useState([])
    useEffect(()=> {
        getTopics()
        .then((res)=> {
            setTopics(res.topics);
        })
    }, []);

return (
    <Navbar bg="light" variant="light" fixed="top" style={{zIndex: '100'}}>
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