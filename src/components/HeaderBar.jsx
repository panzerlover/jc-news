import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function HeaderBar(){

return (
    <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">JC News</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Articles</Nav.Link>
            <Nav.Link href="/topics">Topics</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    )
}