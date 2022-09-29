import { Button, Container } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

export default function ArticleModal({show, setShow, children}){

    const handleClose = () => {
        setShow(false)
    };

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