import { useContext } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

export default function HeaderBar(){

    const user = useContext(UserContext);

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
            </Nav>
            </Container>
        <Navbar.Collapse>
            <Container>
                <Nav>
                    <Nav.Link href="/articles">Articles</Nav.Link>
                    <Nav.Link href="/topics">Topics</Nav.Link>
                </Nav>
            </Container>
        </Navbar.Collapse>
        </Navbar>
    );
}