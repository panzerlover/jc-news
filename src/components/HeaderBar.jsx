import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    <>
    {[false].map((expand) => 
        <Navbar key="expandingnavbar" bg="light" variant="light" fixed="top" style={{zIndex: '100'}} className="mg-3" expand={expand}>
        <Container>

        <Navbar.Brand href="/">JC News</Navbar.Brand>
        <Nav.Link href="/articles">Articles</Nav.Link>
        <Nav.Link href="/topics" className="justify-content-start">Topics</Nav.Link>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="justify-content-end"/>
        <Navbar.Offcanvas 
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        placement="end"
        >
        <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
        Options
        </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="me-auto">
            <Navbar.Text>
            Signed in as: <a href="/profile">{user.username}</a>
            </Navbar.Text>
                <Nav.Item>
                    <Nav.Link href="/topics">Browse All Topics</Nav.Link>
                </Nav.Item>
            <Navbar.Text>
                <h2>Filters</h2>
            </Navbar.Text>
            <Form onSubmit={handleSubmit}>
            <Form.Group key="inputTopicGroup">
                <Form.Label htmlFor="inputTopic">Topics:</Form.Label>
                <Form.Select id="inputTopic" onChange={(event) => handleChange(event, 'topic')}>
                    <option key="inputTopicAll" value="">All</option>
                    {topics.map((topic)=> {
                        return <option key={topic.slug} value={topic.slug}>{upper(topic.slug)}</option>
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group key="inputSortGroup">
                <Form.Label htmlFor="inputSort">Sort By:</Form.Label>
                <Form.Select id="inputSort" onChange={(event) => handleChange(event, 'sort_by')}>
                    <option key="inputSortCreatedAt" value="created_at">Date posted</option>
                    <option key="inputSortVotes" value="votes">Number of Votes</option>
                    <option key="inputSortComments" value="comment_count">Number of Comments</option>
                </Form.Select>
            </Form.Group>
            <Form.Group key="inputOrderGroup">
                <Form.Label htmlFor="inputOrder">Order</Form.Label>
                <Form.Select onChange={(event) => handleChange(event, 'order')}>
                    <option key="inputOrderAsc" value="asc">Ascending</option>
                    <option key="inputOrderDesc" value="desc">Descending</option>
                </Form.Select>
            </Form.Group>
            <Form.Group key="inputLimitGroup">
                <Form.Label htmlFor="inputResultsPerPage">Results Per Page</Form.Label>
                <Form.Select onChange={(event) => handleChange(event, 'limit')}>
                    <option key="inputLimit10" value="10">10</option>
                    <option key="inputLimit20" value="20">20</option>
                    <option key="inputLimit30" value="30">30</option>
                    <option key="inputLimit40" value="40">40</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit">Set Filters</Button>
            </Form>
            </Nav>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
            </Navbar>
        )}
        </>
    );
}