import { Button, Container } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ErrorPage from './ErrorPage';

export default function ArticleModal({show, setShow, children}){

    const handleClose = () => {
        setShow(false)
    };

    if (null === show || !setShow || !children) return <ErrorPage />

    return (
        <Modal show={show} onHide={handleClose}>
            <Container>
                {children}
            </Container>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}