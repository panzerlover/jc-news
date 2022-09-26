import { useState } from 'react';
import { Badge, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { dateDiff } from '../utils/helpers';

export default function ArticleModal({show, setShow, article}){

    const handleClose = () => {
        setShow(false)
    };

    return (
        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{article.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Header>
                                <small className="text-muted">author: {article.author} </small>
                                <small className="text-muted"> {dateDiff(article.created_at)} </small>
                                <small className="text-muted"> votes: {article.votes} </small>
                                <small className="text-muted"> {article.topic}</small>
                            </Modal.Header>
                            <Modal.Body>{article.body}</Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                View Comments {<Badge bg="primary" pill>{article.comment_count}</Badge>}
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                         </Modal>
    )


}